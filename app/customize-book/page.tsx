import type { Metadata } from "next";
import CustomizeBookPage from "../../components/CustomizeBookPage";

export const metadata: Metadata = {
  title: "Customize Your Notebook | Dwarkadhish Paper Products",
  description:
    "Choose a notebook cover template, upload artwork, personalise the design and select quantity from Dwarkadhish Paper Products.",
};

export default function Page() {
  return <CustomizeBookPage />;
}
