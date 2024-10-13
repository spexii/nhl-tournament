import { ReactNode } from "react";

import Navigation from "./Navigation";
import MobileMenu from "./MobileMenu";

type LayoutProps = {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = async ({ children }) => {
  return (
    <div className="min-h-screen w-full max-w-7xl flex flex-col items-center">
      <div className="w-full px-4">
        <img src="/images/top.png" />
      </div>
      <div className="hidden lg:block">
        <Navigation />
      </div>
      <div className="block lg:hidden w-full">
          <MobileMenu />
      </div>
      <main className="w-full px-4">
        {children}
      </main>
    </div>
  );
};
  
export default Layout;