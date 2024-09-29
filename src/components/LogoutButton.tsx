"use client"

import { signOut } from "next-auth/react"
 
export const LogoutButton = () => {
  return <button
    className="uppercase text-link-green hover:text-link-active-green"
    onClick={() => signOut()}
  >
    Kirjaudu ulos
  </button>
}