import { ReactNode } from "react";
import Navigation from "./Navigation";

type LayoutProps = {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = async ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col items-center px-4 sm:px-0">
      <Navigation />
      <main>
        {children}
      </main>
    </div>
  );
};
  
export default Layout;