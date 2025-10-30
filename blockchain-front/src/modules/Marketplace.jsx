export default function Marketplace() {
    return (
        <div className="p-10 bg-[var(--color-background)] min-h-screen">
            <h2 className="text-4xl font-bold text-[var(--color-primary)] mb-8 text-center">
                Mercado de Créditos de Carbono
            </h2>

            <div className="grid grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-[var(--color-surface)] rounded-3xl shadow-lg p-6 hover:scale-105 transition-transform border border-[var(--color-border)]">
                        <h3 className="text-xl font-semibold text-[var(--color-secondary)] mb-2">
                            Token CO₂ #{i}
                        </h3>
                        <p className="text-[var(--color-text-light)] text-sm mb-4">1 tonelada de CO₂ capturada</p>
                        <p className="text-3xl font-bold text-[var(--color-primary)] mb-4">$10</p>
                        <button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white w-full py-2 rounded-lg shadow">
                            Comprar
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
