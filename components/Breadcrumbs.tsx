import React from 'react';
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex items-center flex-wrap gap-2 text-xs tracking-wider text-[#777777]">
        <li>
          <Link href="/" className="hover:text-[#C5A059] transition-colors">
            HOME
          </Link>
        </li>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <React.Fragment key={idx}>
              <li aria-hidden="true" className="text-[#444444]">
                /
              </li>
              <li>
                {isLast || !item.href ? (
                  <span className="text-[#CCCCCC] font-normal uppercase" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <Link href={item.href} className="hover:text-[#C5A059] transition-colors uppercase">
                    {item.label}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
