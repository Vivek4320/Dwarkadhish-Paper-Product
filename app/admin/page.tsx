import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { query } from "../../lib/db";
import AdminDashboard from "../../components/AdminDashboard";

type OrderRow = {
  id: string;
  amount_paise: number;
  currency: string;
  customer: { fullName?: string; email?: string; phone?: string } | string;
  item: { templateName?: string; templateId?: string; quantity?: number; pages?: number } | string;
  status: string;
  created_at: string;
};

function parseJson<T>(value: T | string): T {
  if (typeof value !== "string") return value;
  try {
    return JSON.parse(value) as T;
  } catch {
    return {} as T;
  }
}

export default async function AdminPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const allowedAdmins = (process.env.ADMIN_USER_IDS || "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);

  if (!allowedAdmins.includes(userId)) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f7f7] px-5">
        <section className="max-w-md rounded-2xl border border-[#eee] bg-white p-8 text-center shadow-sm">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-rose-50 text-xl text-[#df151d]">!</div>
          <h1 className="mt-4 text-xl font-bold text-[#171717]">Admin access required</h1>
          <p className="mt-2 text-sm leading-6 text-[#777]">
            This account is not listed in ADMIN_USER_IDS. Add your Clerk User ID to the environment variables to grant dashboard access.
          </p>
          <Link href="/" className="mt-6 inline-flex rounded-lg bg-[#df151d] px-5 py-3 text-sm font-semibold text-white">Back to Store</Link>
        </section>
      </main>
    );
  }

  let orders: OrderRow[] = [];
  let databaseError = false;
  try {
    const result = await query(
      "SELECT id, amount_paise, currency, customer, item, status, created_at FROM customer_orders ORDER BY created_at DESC LIMIT 100",
    );
    orders = result.rows.map((row) => ({
      ...row,
      customer: parseJson(row.customer),
      item: parseJson(row.item),
    })) as OrderRow[];
  } catch (error) {
    databaseError = true;
    console.error("Admin dashboard order query failed:", error);
  }

  const allCustomers = new Set(
    orders.map((order) => {
      const customer = parseJson(order.customer);
      return customer.email?.toLowerCase() || customer.phone || customer.fullName || order.id;
    }),
  );

  const today = new Date();
  const weeklySales = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (6 - index));
    const key = date.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
    const amount = orders.reduce((sum, order) => {
      const created = new Date(order.created_at);
      return created.toDateString() === date.toDateString()
        ? sum + Number(order.amount_paise || 0)
        : sum;
    }, 0);
    return { label: key, amount };
  });

  const productCount = 4;
  const totalRevenue = orders.reduce((sum, order) => sum + Number(order.amount_paise || 0), 0);

  return (
    <AdminDashboard
      orders={orders.map((order) => ({
        ...order,
        customer: parseJson(order.customer),
        item: parseJson(order.item),
      }))}
      totalOrders={orders.length}
      totalRevenue={totalRevenue}
      customerCount={allCustomers.size}
      productCount={productCount}
      weeklySales={weeklySales}
      databaseError={databaseError}
    />
  );
}
