import { ReactNode } from "react";

import Navigation from "./Navigation";

type LayoutProps = {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = async ({ children }) => {
  return (
    <div className="min-h-screen w-full max-w-7xl flex flex-col items-center px-4 sm:px-0">
      <div className="top">
        <img src="/images/top.png" />
      </div>
      <Navigation />
      <main className="w-full p-2.5 xl:p-0">
        {children}
      </main>
    </div>
  );
};
  
export default Layout;