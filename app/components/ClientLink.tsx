'use client';

import Link from 'next/link';

export default function ClientLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return <Link href={href}>{children}</Link>;
}
