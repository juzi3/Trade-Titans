"use client";

import Footer from "../components/Footer";
import Nav from "../components/Nav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center mx-auto relative">
      <Nav />
      <main className="pt-24 pb-48">{children}</main>
      <Footer />
    </div>
  );
}
