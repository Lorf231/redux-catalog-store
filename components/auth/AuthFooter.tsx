'use client';

import Link from 'next/link';

interface AuthFooterProps {
  text: string;
  linkText: string;
  href: string;
}

const AuthFooter = ({ text, linkText, href }: AuthFooterProps) => (
  <div className="mt-8 pt-6 border-t border-gray-100 text-center">
    <p className="text-sm text-gray-600">
      {text}{' '}
      <Link href={href} className="text-primary font-bold hover:underline transition-all">
        {linkText}
      </Link>
    </p>
  </div>
);

export default AuthFooter;