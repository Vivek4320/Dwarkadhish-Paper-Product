import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { query } from "../../lib/db";
import AdminDashboard from "../../components/AdminDashboard";

type Customer = { fullName?: string; email?: string; phone?: string };
type Item = {
  templateName?: string;
  templateId?: string;
  quantity?: number;
  pages?: number;
};
type OrderRow = {
  id: string;
  amount_paise: number;
  currency: string;
  customer: Customer | string;
  item: Item | string;
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
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-rose-50 text-xl text-[#df151d]">
            !
          </div>
          <h1 className="mt-4 text-xl font-bold text-[#171717]">
            Admin access required
          </h1>
          <p className="mt-2 text-sm leading-6 text-[#777]">
            This account is not listed in ADMIN_USER_IDS. Add this Clerk User ID
            to your environment variables to grant dashboard access.
          </p>
          <code className="mt-3 block break-all rounded-lg bg-[#f7f7f7] p-3 text-xs text-[#333]">
            {userId}
          </code>
          <Link
            href="/"
            className="mt-6 inline-flex rounded-lg bg-[#df151d] px-5 py-3 text-sm font-semibold text-white"
          >
            Back to Store
          </Link>
        </section>
      </main>
    );
  }

  let orders: OrderRow[] = [];
  let totalOrders = 0;
  let totalRevenue = 0;
  let customerCount = 0;
  let weeklySales: { label: string; amount: number }[] = [];
  let databaseError = false;

  try {
    const [summary, recent, sales] = await Promise.all([
      query(
        `SELECT COUNT(*)::int AS total_orders,
                COALESCE(SUM(amount_paise), 0)::bigint AS total_revenue,
                COUNT(DISTINCT COALESCE(NULLIF(LOWER(customer->>'email'), ''), NULLIF(customer->>'phone', ''), id::text))::int AS customer_count
         FROM customer_orders`,
      ),
      query(
        "SELECT id, amount_paise, currency, customer, item, status, created_at FROM customer_orders ORDER BY created_at DESC LIMIT 100",
      ),
      query(
        `SELECT created_at::date AS day, COALESCE(SUM(amount_paise), 0)::bigint AS amount
         FROM customer_orders
         WHERE created_at >= CURRENT_DATE - INTERVAL '29 days'
         GROUP BY created_at::date
         ORDER BY day ASC`,
      ),
    ]);

    totalOrders = Number(summary.rows[0]?.total_orders || 0);
    totalRevenue = Number(summary.rows[0]?.total_revenue || 0);
    customerCount = Number(summary.rows[0]?.customer_count || 0);
    orders = recent.rows.map((row) => ({
      ...row,
      customer: parseJson<Customer>(row.customer),
      item: parseJson<Item>(row.item),
    })) as OrderRow[];

    const amountsByDay = new Map<string, number>(
      sales.rows.map((row) => [
        new Date(row.day).toISOString().slice(0, 10),
        Number(row.amount || 0),
      ]),
    );
    const today = new Date();
    weeklySales = Array.from({ length: 30 }, (_, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (29 - index));
      const key = date.toISOString().slice(0, 10);
      return {
        label: date.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
        }),
        amount: amountsByDay.get(key) || 0,
      };
    });
  } catch (error) {
    databaseError = true;
    console.error("Admin dashboard data query failed:", error);
  }

  return (
    <AdminDashboard
      orders={orders.map((order) => ({
        ...order,
        customer: parseJson<Customer>(order.customer),
        item: parseJson<Item>(order.item),
      }))}
      totalOrders={totalOrders}
      totalRevenue={totalRevenue}
      customerCount={customerCount}
      productCount={8}
      weeklySales={weeklySales}
      databaseError={databaseError}
    />
  );
}
