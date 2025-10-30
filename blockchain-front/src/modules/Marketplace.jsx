import React, { useState, useEffect } from 'react';
import { useWallet } from '../contexts/WalletContext';
import apiService from '../services/apiService';
import { Calendar, MapPin, User, Coins, Wallet } from 'lucide-react';
import Swal from 'sweetalert2';

export default function Marketplace() {
    const { wallet, balance, refreshBalance, connect } = useWallet();
    const [allCalculations, setAllCalculations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadMarketplaceData();
    }, []);

    const loadMarketplaceData = async () => {
        setLoading(true);
        try {
            const result = await apiService.getAllCo2Calculations();
            if (result.success && result.data) {
                // Filter only verified calculations that could be tokenized
                const verifiedCalculations = result.data.filter(
                    calc => calc.verification_status === 'verified' || calc.verification_status === 'Activo'
                );
                setAllCalculations(verifiedCalculations);
            }
        } catch (error) {
            console.error('Error loading marketplace data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleBuyToken = async (calculation) => {
        if (!wallet.connected) {
            await Swal.fire({
                icon: 'warning',
                title: 'Wallet no conectado',
                text: 'Necesitas conectar tu wallet para comprar tokens'
            });
            return;
        }

        // Simulate purchase (in a real app, this would involve a blockchain transaction)
        const result = await Swal.fire({
            title: '¿Confirmar compra?',
            text: `¿Deseas comprar ${calculation.co2_captured_tons} toneladas de CO₂ por $${(calculation.co2_captured_tons * 10).toFixed(2)}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, comprar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            await Swal.fire({
                icon: 'success',
                title: '¡Compra exitosa!',
                text: 'Los tokens CO₂ han sido transferidos a tu wallet',
                timer: 3000
            });
            
            // Refresh balance after purchase
            await refreshBalance();
        }
    };

    if (loading) {
        return (
            <div className="p-10 bg-[var(--color-background)] min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)] mx-auto mb-4"></div>
                    <p className="text-[var(--color-text-light)]">Cargando mercado...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-10 bg-[var(--color-background)] min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-4xl font-bold text-[var(--color-primary)]">
                    Mercado de Créditos de Carbono
                </h2>
                
                {wallet.connected && (
                    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-4">
                        <div className="flex items-center space-x-2">
                            <Coins className="w-6 h-6 text-[var(--color-primary)]" />
                            <div>
                                <p className="text-sm text-[var(--color-text-light)]">Tu Balance</p>
                                <p className="text-xl font-bold text-[var(--color-primary)]">
                                    {balance !== null ? `${balance} CO₂` : 'Cargando...'}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {allCalculations.length === 0 ? (
                <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-12 text-center">
                    <Coins className="w-16 h-16 text-[var(--color-text-light)] mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-2">
                        No hay tokens disponibles
                    </h3>
                    <p className="text-[var(--color-text-light)]">
                        Actualmente no hay créditos de carbono disponibles en el mercado.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {allCalculations.map((calc) => (
                        <div key={calc.id} className="bg-[var(--color-surface)] rounded-3xl shadow-lg p-6 hover:scale-105 transition-transform border border-[var(--color-border)]">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-semibold text-[var(--color-secondary)]">
                                    Token CO₂ #{calc.id}
                                </h3>
                                <span className="px-3 py-1 bg-[var(--color-success-bg)] text-[var(--color-success)] rounded-full text-sm">
                                    Verificado
                                </span>
                            </div>
                            
                            <div className="space-y-3 mb-4">
                                <div className="flex items-center text-sm text-[var(--color-text-light)]">
                                    <Coins className="w-4 h-4 mr-2" />
                                    <span>{calc.co2_captured_tons} toneladas CO₂</span>
                                </div>
                                
                                <div className="flex items-center text-sm text-[var(--color-text-light)]">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    <span>{calc.calculation_date || 'Fecha no disponible'}</span>
                                </div>
                                
                                {calc.location && (
                                    <div className="flex items-center text-sm text-[var(--color-text-light)]">
                                        <MapPin className="w-4 h-4 mr-2" />
                                        <span>{calc.location}</span>
                                    </div>
                                )}
                            </div>
                            
                            <div className="border-t border-[var(--color-border)] pt-4">
                                <p className="text-3xl font-bold text-[var(--color-primary)] mb-4">
                                    ${(calc.co2_captured_tons * 10).toFixed(2)} USD
                                </p>
                                
                                <button 
                                    onClick={() => handleBuyToken(calc)}
                                    className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white w-full py-2 rounded-lg shadow transition-colors duration-200"
                                    disabled={!wallet.connected}
                                >
                                    {wallet.connected ? 'Comprar Token' : 'Conectar Wallet'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            
            {/* Wallet connection section */}
            <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <User className="w-6 h-6 text-blue-600 mr-3" />
                        <div>
                            <h4 className="font-semibold text-blue-800">Conecta tu Wallet</h4>
                            <p className="text-sm text-blue-600">Conecta tu wallet Freighter para comprar créditos de carbono</p>
                        </div>
                    </div>
                    <button
                        onClick={connect}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors duration-200"
                    >
                        <Wallet className="w-5 h-5 mr-2" />
                        Conectar Wallet
                    </button>
                </div>
            </div>
        </div>
    );
}
