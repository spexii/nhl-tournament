'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useCurrentSession } from '@/hooks/useCurrentSession';
import { isAdmin } from '@/lib/utils';
import { LogoutButton } from './LogoutButton';

const Navigation: React.FC = () => {
  const { session, status } = useCurrentSession()

  const authenticated = status === 'authenticated';
  const admin = isAdmin(session?.user.role)

  const pathname = usePathname();
  
  const links = [];

  if (authenticated) {
    links.push(
      { href: '/', text: 'Etusivu' },
      { href: '/tournaments', text: 'Turnaukset' },
      { href: '/statistics', text: 'Tilastot' },
    );
  }

  if(admin) {
    links.push(
      { href: '/admin', text: 'Ylläpito' },
    );
  }

  if(links.length === 0) {
    return null;
  }

  return (
    <nav className="flex w-full max-w-7xl m-6 justify-center space-x-4 hidden lg:flex text-xl font-open-sans">
      {links.map(link => (
        <Link
          key={link.href}
          href={link.href}
          className={`
            relative uppercase
            ${pathname === link.href ? 'text-link-active-green selected' : 'text-link-green'}
            hover:text-link-active-green
          `}
        >
          {link.text}
        </Link>
      ))}
      {authenticated && <LogoutButton />}
    </nav>
  );
};
  
export default Navigation;