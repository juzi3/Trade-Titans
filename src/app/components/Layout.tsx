"use client";

import Footer from "./Footer";
import Nav from "./Nav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center mx-auto relative">
      <Nav />
      <main className="pt-24 pb-80">{children}</main>
      <Footer />
    </div>
  );
}
