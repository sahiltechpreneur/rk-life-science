import { Metadata } from "next";
import AdminClientWrapper from "@/components/admin/AdminClientWrapper";

export const metadata: Metadata = {
  title: "Admin Dashboard | R. K. Life Science",
  description: "Admin dashboard for managing products, orders, and users",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <AdminClientWrapper>{children}</AdminClientWrapper>;
}