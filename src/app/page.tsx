import Link from 'next/link';

import { auth } from '@/lib/nextAuth';

export default async function Home() {
  const session = await auth()
  const loggedIn = !!session?.user

  return (
    <div>
      <h1 className="text-heading-green">Shemale Cup</h1>

      <p>
        Tervetuloa turnaussivustolle NHL-pelisarjan herruudesta!
      </p>

      {!loggedIn && 
        <div className='pt-5'>
          <Link
            href="/login"
            className="text-link-green hover:text-link-active-green"
          >
            Kirjaudu sisään
          </Link>
        </div>
      }
    </div>
  );
}
