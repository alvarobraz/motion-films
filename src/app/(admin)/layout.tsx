import React from 'react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-white antialiased">
      <main className="mx-auto max-w-7xl px-8 py-10">{children}</main>
    </div>
  );
}
