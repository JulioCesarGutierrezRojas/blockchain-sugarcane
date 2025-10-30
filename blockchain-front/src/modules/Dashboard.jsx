import React, { useState, useEffect } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { useAuth } from '../contexts/AuthContext';
import apiService from '../services/apiService';
import { Coins, RefreshCw } from 'lucide-react';

export default function Dashboard() {
    const { wallet, balance, refreshBalance, issueToken } = useWallet();
    const { user } = useAuth();
    const [farms, setFarms] = useState([]);
    const [calculations, setCalculations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            loadDashboardData();
        }
    }, [user]);

    const loadDashboardData = async () => {
        setLoading(true);
        try {
            console.log('Dashboard: Loading data for user:', user.id);
            // Load user's farms
            const farmsResult = await apiService.getFarmsByUser(user.id);
            console.log('Dashboard: Farms result:', farmsResult);
            
            if (farmsResult.success && Array.isArray(farmsResult.data)) {
                setFarms(farmsResult.data);
                
                // Load CO2 calculations for each farm
                const allCalculations = [];
                for (const farm of farmsResult.data) {
                    const calcResult = await apiService.getCo2CalculationsByFarm(farm.id);
                    console.log(`Dashboard: Calculations for farm ${farm.id}:`, calcResult);
                    
                    if (calcResult.success && Array.isArray(calcResult.data)) {
                        allCalculations.push(...calcResult.data.map(calc => ({
                            ...calc,
                            farmName: farm.name
                        })));
                    }
                }
                setCalculations(allCalculations);
            } else {
                console.log('Dashboard: No farms found or invalid response');
                setFarms([]);
                setCalculations([]);
            }
        } catch (error) {
            console.error('Error loading dashboard data:', error);
            setFarms([]);
            setCalculations([]);
        } finally {
            setLoading(false);
        }
    };

    const handleRefreshBalance = async () => {
        await refreshBalance();
    };

    const handleIssueToken = async (calculationId, co2Amount) => {
        try {
            const calculation = calculations.find(c => c.id === calculationId);
            if (!calculation) return;

            await issueToken({
                location: calculation.location || 'Farm Location',
                co2_amount: co2Amount,
                date: new Date().toISOString().split('T')[0],
                valid_until: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 year from now
                auditor: 'Sistema Automatizado'
            });
            
            // Refresh data after issuing token
            await loadDashboardData();
        } catch (error) {
            console.error('Error issuing token:', error);
        }
    };

    if (loading) {
        return (
            <div className="p-10 bg-[var(--color-background)] min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)] mx-auto mb-4"></div>
                    <p className="text-[var(--color-text-light)]">Cargando datos...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-10 bg-[var(--color-background)] min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-4xl font-bold text-[var(--color-primary)]">
                    Bienvenido(a), {user?.first_name || 'Usuario'}
                </h2>
                
                {/* Balance Section */}
                <div className="flex items-center space-x-4">
                    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-4">
                        <div className="flex items-center space-x-2">
                            <Coins className="w-6 h-6 text-[var(--color-primary)]" />
                            <div>
                                <p className="text-sm text-[var(--color-text-light)]">Balance CO₂</p>
                                <p className="text-xl font-bold text-[var(--color-primary)]">
                                    {balance !== null ? `${balance} tokens` : 'Cargando...'}
                                </p>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={handleRefreshBalance}
                        className="flex items-center px-3 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:opacity-80 transition-opacity"
                    >
                        <RefreshCw className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Cultivos */}
            <section className="mb-12">
                <h3 className="text-2xl font-semibold text-[var(--color-secondary)] mb-4">
                    Tus Cultivos ({farms.length})
                </h3>
                {farms.length === 0 ? (
                    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-8 text-center">
                        <p className="text-[var(--color-text-light)]">
                            No tienes cultivos registrados. ¡Registra tu primer cultivo!
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {farms.map((f) => (
                            <div
                                key={f.id}
                                className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-6 shadow"
                            >
                                <h4 className="text-xl font-bold text-[var(--color-primary)]">
                                    {f.name}
                                </h4>
                                <p className="text-[var(--color-text-light)] text-sm mb-2">
                                    {f.total_hectares} hectáreas
                                </p>
                                <p className="text-[var(--color-text-light)] text-sm mb-3">
                                    Ubicación: {f.location || 'No especificada'}
                                </p>
                                <span
                                    className={`inline-block px-3 py-1 text-sm rounded-lg ${
                                        f.status === "active" || f.status === "Activo"
                                            ? "bg-[var(--color-success-bg)] text-[var(--color-success)]"
                                            : "bg-[var(--color-warning-bg)] text-[var(--color-warning)]"
                                    }`}
                                >
                                    {f.status === "active" ? "Activo" : f.status || "Inactivo"}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Cálculos */}
            <section>
                <h3 className="text-2xl font-semibold text-[var(--color-secondary)] mb-4">
                    Últimos Cálculos de CO₂ ({calculations.length})
                </h3>
                {calculations.length === 0 ? (
                    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-8 text-center">
                        <p className="text-[var(--color-text-light)]">
                            No hay cálculos de CO₂ disponibles.
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border border-gray-300 rounded-xl">
                            <thead className="bg-[var(--color-secondary-light)] text-[var(--color-secondary)]">
                                <tr>
                                    <th className="p-3 text-left">Cultivo</th>
                                    <th className="p-3 text-left">Fecha</th>
                                    <th className="p-3 text-left">CO₂ (t)</th>
                                    <th className="p-3 text-left">Estatus</th>
                                    <th className="p-3 text-left">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {calculations.map((c) => (
                                    <tr key={c.id} className="border-t border-[var(--color-border)]">
                                        <td className="p-3">{c.farmName}</td>
                                        <td className="p-3">{c.calculation_date || c.date}</td>
                                        <td className="p-3 text-[var(--color-primary)] font-semibold">
                                            {c.co2_captured_tons}
                                        </td>
                                        <td className="p-3">
                                            <span
                                                className={`px-3 py-1 rounded-lg text-sm ${
                                                    c.verification_status === "verified" || c.verification_status === "Activo"
                                                        ? "bg-[var(--color-success-bg)] text-[var(--color-success)]"
                                                        : "bg-[var(--color-warning-bg)] text-[var(--color-warning)]"
                                                }`}
                                            >
                                                {c.verification_status === "verified" ? "Verificado" : c.verification_status || "Pendiente"}
                                            </span>
                                        </td>
                                        <td className="p-3">
                                            {(c.verification_status === "verified" || c.verification_status === "Activo") && (
                                                <button
                                                    onClick={() => handleIssueToken(c.id, c.co2_captured_tons)}
                                                    className="flex items-center px-3 py-1 bg-[var(--color-primary)] text-white rounded-lg hover:opacity-80 transition-opacity text-sm"
                                                >
                                                    <Coins className="w-4 h-4 mr-1" />
                                                    Emitir Token
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </div>
    );
}
