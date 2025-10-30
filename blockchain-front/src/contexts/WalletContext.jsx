import React, { createContext, useContext, useState, useEffect } from 'react';
import walletService from '../services/walletService.js';
import apiService from '../services/apiService.js';
import { useAuth } from './AuthContext.jsx';
import Swal from 'sweetalert2';

const WalletContext = createContext();

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

export const WalletProvider = ({ children }) => {
  const { user, updateUser } = useAuth();
  const [wallet, setWallet] = useState({
    connected: false,
    publicKey: null,
    network: null,
    loading: false
  });
  
  const [balance, setBalance] = useState(null);

  // Check wallet connection status on component mount
  useEffect(() => {
    checkConnection();
  }, []);

  // Check if wallet is already connected
  const checkConnection = async () => {
    setWallet(prev => ({ ...prev, loading: true }));
    
    try {
      const status = await walletService.getConnectionStatus();
      
      if (status.connected) {
        setWallet({
          connected: true,
          publicKey: status.publicKey,
          network: status.network,
          loading: false
        });
        
        // Try to get user data and balance
        await loadUserData(status.publicKey);
        await loadBalance(status.publicKey);
      } else {
        setWallet(prev => ({ ...prev, loading: false }));
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error);
      setWallet(prev => ({ ...prev, loading: false }));
    }
  };

  // Connect to Freighter wallet
  const connect = async () => {
    setWallet(prev => ({ ...prev, loading: true }));
    
    try {
      const result = await walletService.connect();
      
      if (result.success) {
        setWallet({
          connected: true,
          publicKey: result.publicKey,
          network: result.network,
          loading: false
        });

        // Show success message
        await Swal.fire({
          icon: 'success',
          title: '¡Wallet conectado!',
          text: `Conectado con éxito: ${result.publicKey.substring(0, 10)}...`,
          timer: 3000,
          showConfirmButton: false
        });

        // Load user data and balance
        await loadUserData(result.publicKey);
        await loadBalance(result.publicKey);
        
        return { success: true };
      } else {
        setWallet(prev => ({ ...prev, loading: false }));
        
        await Swal.fire({
          icon: 'error',
          title: 'Error de conexión',
          text: result.error || 'No se pudo conectar al wallet'
        });
        
        return { success: false, error: result.error };
      }
    } catch (error) {
      setWallet(prev => ({ ...prev, loading: false }));
      
      await Swal.fire({
        icon: 'error',
        title: 'Error de conexión',
        text: 'Ocurrió un error inesperado al conectar el wallet'
      });
      
      return { success: false, error: error.message };
    }
  };

  // Disconnect wallet
  const disconnect = async () => {
    walletService.disconnect();
    setWallet({
      connected: false,
      publicKey: null,
      network: null,
      loading: false
    });
    setBalance(null);
    
    await Swal.fire({
      icon: 'info',
      title: 'Wallet desconectado',
      text: 'Has desconectado tu wallet exitosamente',
      timer: 2000,
      showConfirmButton: false
    });
  };

  // Load user data from backend and update stellar address if needed
  const loadUserData = async (publicKey) => {
    try {
      if (user && !user.stellar_address) {
        // Update user's stellar address in backend
        const updateResult = await apiService.updateUser(user.id, { stellar_address: publicKey });
        if (updateResult.success) {
          const updatedUser = { ...user, stellar_address: publicKey };
          updateUser(updatedUser);
        }
      }
    } catch (error) {
      console.error('Error updating stellar address:', error);
    }
  };

  // Load wallet balance
  const loadBalance = async (publicKey) => {
    try {
      const result = await apiService.getAccountBalance(publicKey);
      if (result.success) {
        setBalance(result.data.balance);
      }
    } catch (error) {
      console.error('Error loading balance:', error);
    }
  };

  // Refresh balance
  const refreshBalance = async () => {
    if (wallet.publicKey) {
      await loadBalance(wallet.publicKey);
    }
  };

  // Issue CO2 token
  const issueToken = async (tokenData) => {
    if (!wallet.connected) {
      throw new Error('Wallet not connected');
    }

    try {
      // Add farmer address from wallet
      const dataWithFarmer = {
        ...tokenData,
        farmer: wallet.publicKey
      };

      const result = await apiService.issueToken(dataWithFarmer);
      
      if (result.success) {
        // Refresh balance after issuing token
        await refreshBalance();
        
        await Swal.fire({
          icon: 'success',
          title: '¡Token CO₂ emitido!',
          text: 'El token se ha emitido correctamente',
          timer: 3000
        });
        
        return result;
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'Error al emitir token',
        text: error.message || 'Ocurrió un error inesperado'
      });
      throw error;
    }
  };

  const contextValue = {
    wallet,
    balance,
    connect,
    disconnect,
    refreshBalance,
    issueToken,
    loadUserData
  };

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
};