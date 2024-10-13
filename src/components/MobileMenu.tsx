'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { useCurrentSession } from '@/hooks/useCurrentSession';
import { getLinks, isAdmin } from '@/lib/utils';
import { LogoutButton } from './LogoutButton';

const MobileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const { session, status } = useCurrentSession()

  const authenticated = status === 'authenticated';
  const admin = isAdmin(session?.user.role)

  const pathname = usePathname();

  const links = getLinks(authenticated, admin);

  if(links.length === 0) {
    return null;
  }

  return (
    <div className="w-full mt-3">
      <div className="flex justify-end relative">
        <button onClick={toggleMenu} className={`mobile-menu-button ${isOpen ? "open" : ""} mr-3`}>
          <div className={`line ${isOpen ? "open" : ""}`}></div>
          <div className={`line ${isOpen ? "open" : ""}`}></div>
          <div className={`line ${isOpen ? "open" : ""}`}></div>
        </button>

        <nav className={`mobile-menu ${isOpen ? "open" : ""}`}>
          <ul>
            {links.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={toggleMenu}
                  className={`
                    uppercase
                    ${pathname === link.href ? 'text-link-active-green' : 'text-link-green'}
                    hover:text-link-active-green
                  `}
                >
                  {link.text}
                </Link>
              </li>
            ))}
            {authenticated && <li><LogoutButton /></li>}
          </ul>
        </nav>
      </div>
    </div>
  );
};
  
export default MobileMenu;