import React from 'react';
import { useWallet } from '../contexts/WalletContext';
import { Wallet, LogOut, Loader2 } from 'lucide-react';

const WalletButton = ({ className = "" }) => {
  const { wallet, balance, connect, disconnect } = useWallet();

  const handleConnect = async () => {
    try {
      await connect();
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    }
  };

  if (wallet?.loading) {
    return (
      <div className={`flex items-center px-4 py-2 bg-gray-200 text-gray-600 rounded-lg ${className}`}>
        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
        Conectando...
      </div>
    );
  }

  if (wallet?.connected && wallet?.publicKey) {
    return (
      <div className={`flex items-center space-x-3 ${className}`}>
        {/* Wallet Info */}
        <div className="flex flex-col items-end">
          <div className="flex items-center px-3 py-2 bg-green-100 text-green-800 rounded-lg">
            <Wallet className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">
              {wallet.publicKey.substring(0, 4)}...{wallet.publicKey.substring(wallet.publicKey.length - 4)}
            </span>
          </div>
          {balance !== null && (
            <div className="text-xs text-gray-600 mt-1">
              Balance: {balance} CO₂
            </div>
          )}
        </div>
        
        {/* Disconnect Button */}
        <button
          onClick={handleDisconnect}
          className="flex items-center px-3 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg transition-colors duration-200"
          title="Desconectar wallet"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleConnect}
      className={`flex items-center px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors duration-200 ${className}`}
    >
      <Wallet className="w-5 h-5 mr-2" />
      Conectar Wallet
    </button>
  );
};

export default WalletButton;
