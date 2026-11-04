"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type DashboardOrder = {
  id: string;
  amount_paise: number;
  currency: string;
  customer: { fullName?: string; email?: string; phone?: string };
  item: {
    templateName?: string;
    templateId?: string;
    quantity?: number;
    pages?: number;
  };
  status: string;
  created_at: string;
};

type Props = {
  orders: DashboardOrder[];
  totalOrders: number;
  totalRevenue: number;
  customerCount: number;
  productCount: number;
  weeklySales: { label: string; amount: number }[];
  databaseError?: boolean;
};

const money = (paise: number, currency = "INR") =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(paise / 100);

const dateLabel = (value: string) =>
  new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });

function statusStyle(status: string) {
  const value = status.toLowerCase();
  if (["paid", "delivered", "captured", "completed"].includes(value))
    return "bg-emerald-50 text-emerald-700";
  if (["processing", "created", "pending"].includes(value))
    return "bg-amber-50 text-amber-700";
  if (["shipped", "dispatched"].includes(value))
    return "bg-blue-50 text-blue-700";
  return "bg-rose-50 text-rose-700";
}

export default function AdminDashboard({
  orders,
  totalOrders,
  totalRevenue,
  customerCount,
  productCount,
  weeklySales,
  databaseError = false,
}: Props) {
  const [search, setSearch] = useState("");
  const [range, setRange] = useState("7");
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const filteredOrders = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return orders;
    return orders.filter((order) =>
      [
        order.id,
        order.customer?.fullName,
        order.customer?.email,
        order.customer?.phone,
        order.item?.templateName,
        order.status,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(term),
    );
  }, [orders, search]);

  const statusCounts = useMemo(() => {
    return orders.reduce(
      (counts, order) => {
        const status = order.status.toLowerCase();
        if (["paid", "captured", "delivered", "completed"].includes(status))
          counts.completed += 1;
        else if (["shipped", "dispatched"].includes(status))
          counts.shipped += 1;
        else if (["processing", "created", "pending"].includes(status))
          counts.processing += 1;
        else counts.other += 1;
        return counts;
      },
      { completed: 0, shipped: 0, processing: 0, other: 0 },
    );
  }, [orders]);

  const chartValues = range === "7" ? weeklySales.slice(-7) : weeklySales;
  const maxSales = Math.max(1, ...chartValues.map((day) => day.amount));

  return (
    <div className="min-h-screen bg-[#f7f7f7] text-[#171717]">
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[238px] flex-col bg-gradient-to-b from-[#191919] to-[#101010] px-3 py-5 text-white transition-transform lg:translate-x-0 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Link
          href="/admin"
          className="flex flex-col items-center border-b border-white/10 pb-7"
        >
          <span className="grid h-11 w-11 place-items-center rounded-full border-2 border-[#d9ad4e] text-2xl font-bold tracking-[-.16em] text-[#e7b84e]">
            dp
          </span>
          <span className="mt-3 text-center text-[9px] tracking-[.28em] text-[#eee]">
            DWARKADHISH PAPER PRODUCTS
          </span>
        </Link>
        <nav className="mt-7 space-y-1 text-sm">
          <a
            href="#overview"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3 rounded-lg bg-gradient-to-r from-[#ed1c24] to-[#c90d16] px-4 py-3 text-white"
          >
            <span>⌂</span>Dashboard
          </a>
          <a
            href="#recent-orders"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-[#e3e3e3] hover:bg-white/10"
          >
            <span>▣</span>Orders
          </a>
          <Link
            href="/products"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-[#e3e3e3] hover:bg-white/10"
          >
            <span>⬡</span>Products
          </Link>
          <a
            href="#customers"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-[#e3e3e3] hover:bg-white/10"
          >
            <span>♙</span>Customers
          </a>
        </nav>
        <div className="mt-auto overflow-hidden rounded-xl border border-[#3a3022] bg-[radial-gradient(ellipse_at_bottom_right,#44301a,#161616_70%)] p-4">
          <p className="max-w-[110px] text-sm font-bold leading-5 text-[#e9c363]">
            Give more than expected.
          </p>
          <div className="mt-5 flex h-20 items-end justify-end gap-1.5">
            <span className="h-12 w-9 rounded-t border border-[#bca16a] bg-[#c90d18]" />
            <span className="h-16 w-9 rounded-t border border-[#bca16a] bg-[#171717]" />
            <span className="h-14 w-9 rounded-t border border-[#bca16a] bg-[#e8d5ad]" />
          </div>
        </div>
      </aside>

      {menuOpen && (
        <button
          aria-label="Close navigation"
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
        />
      )}

      <main className="min-h-screen lg:pl-[238px]">
        <header className="sticky top-0 z-20 flex h-[62px] items-center justify-between gap-3 border-b border-[#eaeaea] bg-white px-4 sm:px-7">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <button
              aria-label="Open navigation"
              onClick={() => setMenuOpen(true)}
              className="rounded-lg border border-[#e4e4e4] px-3 py-2 text-lg lg:hidden"
            >
              ☰
            </button>
            <label className="flex h-10 w-full max-w-[450px] items-center gap-2 rounded-lg border border-[#e4e4e4] px-3 text-[#777]">
              <span className="text-xl">⌕</span>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search orders, products, customers..."
                className="w-full bg-transparent text-xs outline-none placeholder:text-[#aaa]"
              />
            </label>
          </div>
          <div className="flex shrink-0 items-center gap-3 border-l border-[#eee] pl-3">
            <span className="hidden text-xs text-[#777] sm:inline">Admin</span>
            <button onClick={async () => { await fetch("/api/admin/logout", { method: "POST" }); router.replace("/admin/login"); router.refresh(); }} className="rounded-lg border border-[#e5e5e5] px-3 py-2 text-xs font-semibold text-[#444] hover:bg-[#f7f7f7]">Logout</button>
          </div>
        </header>

        <div id="overview" className="mx-auto max-w-[1680px] px-4 py-6 sm:px-7">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-[#df151d]">Welcome Back,</p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-[31px]">
                Dwarkadhish Paper Products
              </h1>
              <p className="mt-2 text-sm text-[#858585]">
                Manage your products, orders, customers and website content from
                here.
              </p>
            </div>
            <div className="rounded-lg border border-[#e6e6e6] bg-white px-4 py-3">
              <p className="text-xs font-bold text-[#555]">Today</p>
              <p className="mt-1 text-xs text-[#777]">
                {new Date().toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          {databaseError && (
            <div
              role="alert"
              className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800"
            >
              Dashboard data could not be loaded. Check the database connection
              and try refreshing.
            </div>
          )}

          <section className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <article className="rounded-xl border border-[#f9e8e8] bg-gradient-to-br from-[#fff0f0] to-white p-5">
              <p className="text-xs text-[#555]">Total Orders</p>
              <p className="mt-2 text-3xl font-bold">
                {totalOrders.toLocaleString("en-IN")}
              </p>
              <p className="mt-2 text-xs text-[#888]">All recorded orders</p>
            </article>
            <article className="rounded-xl border border-[#f4ead2] bg-gradient-to-br from-[#fff9e9] to-white p-5">
              <p className="text-xs text-[#555]">Total Customers</p>
              <p className="mt-2 text-3xl font-bold">
                {customerCount.toLocaleString("en-IN")}
              </p>
              <p className="mt-2 text-xs text-[#888]">
                Unique customer records
              </p>
            </article>
            <article className="rounded-xl border border-[#eee] bg-gradient-to-br from-[#f8f8f8] to-white p-5">
              <p className="text-xs text-[#555]">Products in Catalogue</p>
              <p className="mt-2 text-3xl font-bold">
                {productCount.toLocaleString("en-IN")}
              </p>
              <p className="mt-2 text-xs text-[#888]">
                Current website product listings
              </p>
            </article>
            <article className="rounded-xl border border-[#f4ead2] bg-gradient-to-br from-[#fff9e9] to-white p-5">
              <p className="text-xs text-[#555]">Total Revenue</p>
              <p className="mt-2 text-2xl font-bold">{money(totalRevenue)}</p>
              <p className="mt-2 text-xs text-[#888]">Recorded payments</p>
            </article>
          </section>

          <section className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,1.55fr)_minmax(300px,.9fr)]">
            <article className="rounded-xl border border-[#eaeaea] bg-white p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-bold">Sales Overview</h2>
                <select
                  value={range}
                  onChange={(event) => setRange(event.target.value)}
                  className="rounded-md border border-[#e5e5e5] bg-white px-3 py-2 text-xs outline-none"
                >
                  <option value="7">Last 7 Days</option>
                  <option value="30">Last 30 Days</option>
                </select>
              </div>
              <div className="mt-7 flex h-48 items-end gap-2 border-b border-l border-[#eee] px-2 sm:gap-3">
                {chartValues.map((day) => (
                  <div
                    key={day.label}
                    className="flex h-full min-w-0 flex-1 flex-col justify-end"
                  >
                    <div
                      title={money(day.amount)}
                      className="w-full rounded-t bg-gradient-to-t from-[#c90d16] to-[#ffb7b9]"
                      style={{
                        height: `${Math.max(day.amount ? 5 : 0, (day.amount / maxSales) * 100)}%`,
                      }}
                    />
                    <span className="mt-2 truncate text-center text-[9px] text-[#777]">
                      {day.label}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[11px] text-[#888]">
                Revenue from recorded customer orders
              </p>
            </article>

            <article className="rounded-xl border border-[#eaeaea] bg-white p-5">
              <h2 className="font-bold">Order Status</h2>
              <div className="mt-6 space-y-5">
                {[
                  ["Paid / Completed", statusCounts.completed, "#d9ad4e"],
                  ["Processing", statusCounts.processing, "#df151d"],
                  ["Shipped", statusCounts.shipped, "#222"],
                  ["Other", statusCounts.other, "#999"],
                ].map(([label, count, color]) => (
                  <div key={String(label)}>
                    <div className="mb-2 flex justify-between gap-3 text-xs">
                      <span className="text-[#666]">{label}</span>
                      <strong>{Number(count)}</strong>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-[#f1f1f1]">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${totalOrders ? (Number(count) / totalOrders) * 100 : 0}%`,
                          backgroundColor: String(color),
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-xs text-[#888]">
                {totalOrders} orders in total
              </p>
            </article>
          </section>

          <section
            id="recent-orders"
            className="mt-5 rounded-xl border border-[#eaeaea] bg-white p-4 sm:p-5"
          >
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-bold">Recent Orders</h2>
              <a
                href="#recent-orders"
                className="text-xs font-semibold text-[#df151d]"
              >
                View All ↓
              </a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse text-left text-xs">
                <thead className="bg-[#f6f6f6] text-[#666]">
                  <tr>
                    {[
                      "Order ID",
                      "Customer",
                      "Product",
                      "Amount",
                      "Status",
                      "Date",
                    ].map((heading) => (
                      <th key={heading} className="px-3 py-3 font-semibold">
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.slice(0, 8).map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-[#f0f0f0] last:border-0"
                    >
                      <td className="px-3 py-4 font-semibold text-[#333]">
                        #{order.id.slice(0, 8).toUpperCase()}
                      </td>
                      <td className="px-3 py-4">
                        <div className="font-medium">
                          {order.customer?.fullName || "Customer"}
                        </div>
                        <div className="mt-1 text-[10px] text-[#888]">
                          {order.customer?.email || order.customer?.phone || ""}
                        </div>
                      </td>
                      <td className="px-3 py-4">
                        {order.item?.templateName || "Custom Notebook"}
                        <div className="mt-1 text-[10px] text-[#888]">
                          {order.item?.quantity || 1} item(s)
                        </div>
                      </td>
                      <td className="px-3 py-4 font-semibold">
                        {money(order.amount_paise, order.currency)}
                      </td>
                      <td className="px-3 py-4">
                        <span
                          className={`inline-flex rounded-md px-2 py-1 text-[10px] font-semibold capitalize ${statusStyle(order.status)}`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-3 py-4 text-[#666]">
                        {dateLabel(order.created_at)}
                      </td>
                    </tr>
                  ))}
                  {filteredOrders.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-3 py-10 text-center text-[#888]"
                      >
                        {search
                          ? "No matching orders found."
                          : "No orders have been recorded yet."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-[10px] text-[#999]">
              Showing {Math.min(filteredOrders.length, 8)} of{" "}
              {filteredOrders.length} matching orders
            </p>
          </section>

          <section id="customers" className="mt-5 grid gap-4 lg:grid-cols-2">
            <article className="rounded-xl border border-[#eaeaea] bg-white p-5">
              <h2 className="font-bold">Quick Actions</h2>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <Link
                  href="/products"
                  className="rounded-lg bg-[#fff0f0] px-4 py-3 text-sm font-semibold text-[#df151d] hover:bg-[#ffe4e4]"
                >
                  Browse Products <span className="float-right">›</span>
                </Link>
                <a
                  href="#recent-orders"
                  className="rounded-lg bg-[#f6f6f6] px-4 py-3 text-sm font-semibold hover:bg-[#eee]"
                >
                  View Orders <span className="float-right">›</span>
                </a>
                <Link
                  href="/"
                  className="rounded-lg bg-[#f6f6f6] px-4 py-3 text-sm font-semibold hover:bg-[#eee]"
                >
                  Open Storefront <span className="float-right">›</span>
                </Link>
                <Link
                  href="/customize-book"
                  className="rounded-lg bg-[#f6f6f6] px-4 py-3 text-sm font-semibold hover:bg-[#eee]"
                >
                  Customise Book Page <span className="float-right">›</span>
                </Link>
              </div>
            </article>
            <article className="rounded-xl border border-[#eaeaea] bg-white p-5">
              <h2 className="font-bold">Customer Snapshot</h2>
              <p className="mt-2 text-sm text-[#777]">
                Unique customers found in your recorded order history.
              </p>
              <p className="mt-5 text-3xl font-bold">
                {customerCount.toLocaleString("en-IN")}
              </p>
              <p className="mt-1 text-xs text-[#888]">
                Customers identified by email or phone
              </p>
            </article>
          </section>

          <footer className="flex flex-wrap justify-between gap-2 py-7 text-[10px] text-[#999]">
            <span>
              © {new Date().getFullYear()} Dwarkadhish Paper Products
            </span>
            <span>Admin Dashboard</span>
          </footer>
        </div>
      </main>
    </div>
  );
}
