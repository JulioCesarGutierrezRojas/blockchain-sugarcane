export default function Dashboard() {
    const user = {
        first_name: "Mario",
        last_name: "López",
        email: "mario@example.com",
    };

    const farms = [
        { id: 1, name: "El Progreso", total_hectares: 12.4, status: "Activo" },
        { id: 2, name: "Las Palmas", total_hectares: 8.2, status: "Inactivo" },
    ];

    const calculations = [
        {
            id: 1,
            farm: "El Progreso",
            date: "2025-10-27",
            co2_captured_tons: 30.1823,
            verification_status: "Activo",
        },
    ];

    return (
        <div className="p-10 bg-[var(--color-background)] min-h-screen">
            <h2 className="text-4xl font-bold text-[var(--color-primary)] mb-8">
                Bienvenido(a), {user.first_name}
            </h2>

            {/* Cultivos */}
            <section className="mb-12">
                <h3 className="text-2xl font-semibold text-[var(--color-secondary)] mb-4">
                    Tus Cultivos
                </h3>
                <div className="grid grid-cols-2 gap-6">
                    {farms.map((f) => (
                        <div
                            key={f.id}
                            className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-6 shadow"
                        >
                            <h4 className="text-xl font-bold text-[var(--color-primary)]">
                                {f.name}
                            </h4>
                            <p className="text-[var(--color-text-light)] text-sm">
                                {f.total_hectares} ha
                            </p>
                            <span
                                className={`inline-block mt-2 px-3 py-1 text-sm rounded-lg ${f.status === "Activo"
                                        ? "bg-[var(--color-success-bg)] text-[var(--color-success)]"
                                        : "bg-[var(--color-warning-bg)] text-[var(--color-warning)]"
                                    }`}
                            >
                                {f.status}
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Cálculos */}
            <section>
                <h3 className="text-2xl font-semibold text-[var(--color-secondary)] mb-4">
                    Últimos Cálculos de CO₂
                </h3>
                <table className="w-full border border-gray-300 rounded-xl">
                    <thead className="bg-[var(--color-secondary-light)] text-[var(--color-secondary)]">
                        <tr>
                            <th className="p-3 text-left">Cultivo</th>
                            <th className="p-3 text-left">Fecha</th>
                            <th className="p-3 text-left">CO₂ (t)</th>
                            <th className="p-3 text-left">Estatus</th>
                        </tr>
                    </thead>
                    <tbody>
                        {calculations.map((c) => (
                            <tr key={c.id} className="border-t border-[var(--color-border)]">
                                <td className="p-3">{c.farm}</td>
                                <td className="p-3">{c.date}</td>
                                <td className="p-3 text-[var(--color-primary)] font-semibold">
                                    {c.co2_captured_tons}
                                </td>
                                <td className="p-3">
                                    <span
                                        className={`px-3 py-1 rounded-lg text-sm ${c.verification_status === "Activo"
                                                ? "bg-[var(--color-success-bg)] text-[var(--color-success)]"
                                                : "bg-[var(--color-warning-bg)] text-[var(--color-warning)]"
                                            }`}
                                    >
                                        {c.verification_status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}
