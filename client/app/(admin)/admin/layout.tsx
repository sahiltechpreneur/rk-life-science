import { Metadata } from "next";
import AdminClientWrapper from "@/components/admin/AdminClientWrapper";

export const metadata: Metadata = {
  title: "R. K. Life Science | Admin Dashboard",
  description: "Wholesale distributor for nutraceutical products",
};

export default function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <AdminClientWrapper>{children}</AdminClientWrapper>;
}