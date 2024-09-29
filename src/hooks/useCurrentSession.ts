import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

// Huge thanks to:
// https://github.com/nextauthjs/next-auth/issues/9504#issuecomment-1901351841

/**
 * A hook to retrieve the current session on every page load,
 * but only if it's not already set. 
 *
 * This was found when there was a need to get the user role
 * based navigation rendered reliably without flickering in
 * every situation.
 * 
 * The built-in `useSession` hook from NextAuth.js was tested
 * but it didn't work as expected. When using `router.push` to
 * navigate to home page after logging in, the navigation was
 * not rendered at all until the page was hard refreshed.
 *
 * @returns {Object} The current session and its status.
 */
export const useCurrentSession = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [status, setStatus] = useState<string>("unauthenticated");
  const pathName = usePathname();

  const retrieveSession = useCallback(async () => {
    try {
      setStatus("loading");
      const sessionData = await getSession();

      if (sessionData) {
        setSession(sessionData);
        setStatus("authenticated");
        return;
      }

      setStatus("unauthenticated");
      setSession(null);
    } catch (error) {
      setStatus("unauthenticated");
      setSession(null);
    }
  }, []);

  useEffect(() => {
    // Session is retrieved and set only if it's not already set.
    // In other words this happens only when user is not authenticated yet.
    // This prevents for example navigation from being flickery. This happens
    // because navigation has conditionally rendered items based on user role.
    if (!session) {
      retrieveSession();
    }

    // Use the pathname to force a re-render when the user navigates to a new page
  }, [retrieveSession, session, pathName]);

  return { session, status };
};