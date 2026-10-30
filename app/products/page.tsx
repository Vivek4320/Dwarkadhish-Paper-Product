import type { Metadata } from "next";
import ProductsPage from "../../components/ProductsPage";

export const metadata: Metadata = {
  title: "Products | Dwarkadhish Paper Products",
  description:
    "Explore notebooks, diaries, stationery and customised paper products from Dwarkadhish Paper Products, Jamnagar.",
};

export default function Page() {
  return <ProductsPage />;
}
