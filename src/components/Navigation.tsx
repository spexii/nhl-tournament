'use client'

import { useAuth } from "@/lib/AuthContext";

const Navigation: React.FC = () => {
  const { authenticated, admin } = useAuth();
  
  const links = [
    { href: '/', text: 'Etusivu' },
  ];

  if (authenticated) {
    links.push(
      { href: '/tournaments', text: 'Turnaukset' },
      { href: '/statistics', text: 'Tilastot' },
    );
  }

  if(admin) {
    links.push(
      { href: '/admin', text: 'Ylläpito' },
    );
  }

  if(authenticated) {
    links.push(
      { href: '/logout', text: 'Kirjaudu ulos' },
    );
  } else {
    links.push(
      { href: '/login', text: 'Kirjaudu sisään' },
    );
  }

  return (
    <nav className="flex w-full max-w-7xl m-6 p-6 justify-center space-x-4">
      {links.map(link => (
        <a key={link.href} href={link.href} className="text-xl font-bold hover:underline">{link.text}</a>
      ))}
    </nav>
  );
};
  
export default Navigation;