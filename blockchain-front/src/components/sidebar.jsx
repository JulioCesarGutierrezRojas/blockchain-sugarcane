import { NavLink } from "react-router-dom";
import { Home, Leaf, BarChart3, ShoppingBag, Database } from "lucide-react";

export default function Sidebar() {
    const links = [
        { to: "/", label: "Inicio", icon: <Home size={20} /> },
        { to: "/registro", label: "Registro", icon: <Leaf size={20} /> },
        { to: "/resultado", label: "Resultado", icon: <BarChart3 size={20} /> },
        { to: "/dashboard", label: "Dashboard", icon: <BarChart3 size={20} /> },
        { to: "/mercado", label: "Mercado", icon: <ShoppingBag size={20} /> },
        { to: "/explorador", label: "Explorer", icon: <Database size={20} /> },
    ];

    return (
        <aside className="fixed left-0 top-0 h-full w-64 bg-[var(--color-surface)] border-r border-[var(--color-border)] shadow-lg flex flex-col">
            {/* Encabezado */}
            <div className="p-6 border-b border-[var(--color-border)]">
                <h2 className="text-xl font-bold text-[var(--color-primary)]">
                    Token CO₂ Caña
                </h2>
                <p className="text-[var(--color-text-light)] text-sm">
                    Plataforma sostenible
                </p>
            </div>

            {/* Navegación */}
            <nav className="flex-1 p-4 space-y-2">
                {links.map(({ to, label, icon }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${isActive
                                ? "bg-[var(--color-primary)] text-white shadow-md"
                                : "text-[var(--color-text)] hover:bg-[var(--color-background)]"
                            }`
                        }
                    >
                        {icon}
                        <span>{label}</span>
                    </NavLink>
                ))}
            </nav>

            {/* Footer del sidebar */}
            <div className="p-4 text-center border-t border-[var(--color-border)] text-[var(--color-text-light)] text-sm">
                <p>© 2025 CO₂ Caña</p>
            </div>
        </aside>
    );
}
