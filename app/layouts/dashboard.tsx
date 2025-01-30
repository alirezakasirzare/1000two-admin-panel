import { Outlet } from "react-router";
import { Header } from "~/components/layout/header";
import { Sidebar } from "~/components/layout/sidebar";

const Layout = () => {
  return (
    <div className="container mx-auto px-20 py-4">
      <Header />
      <main className="flex gap-x-4 mt-4">
        <Sidebar />
        <div className="grow">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
