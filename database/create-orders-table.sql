-- Dwarkadhish Paper Products: customer order history
-- Run this in the Neon SQL Editor against the same database used by DATABASE_URL.
-- Safe to run more than once.

CREATE TABLE IF NOT EXISTS public.customer_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner text NOT NULL,
  razorpay_order_id text NOT NULL UNIQUE,
  razorpay_payment_id text NOT NULL UNIQUE,
  amount_paise integer NOT NULL CHECK (amount_paise >= 0),
  currency text NOT NULL DEFAULT 'INR',
  customer jsonb NOT NULL,
  item jsonb NOT NULL,
  status text NOT NULL DEFAULT 'paid',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS customer_orders_owner_idx
  ON public.customer_orders (owner, created_at DESC);

-- Verify that the table exists.
SELECT table_schema, table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name = 'customer_orders';
