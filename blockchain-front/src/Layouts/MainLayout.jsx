import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen bg-[var(--color-background)]">
      <Sidebar />

      <div className="flex-1 ml-64 flex flex-col">
        
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
