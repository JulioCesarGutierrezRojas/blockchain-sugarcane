// Import Freighter API functions directly
const getFreighterAPI = () => {
  try {
    // Import the functions at runtime to avoid bundling issues
    return import('@stellar/freighter-api').then(module => {
      
      // Handle both named exports and default exports
      if (module.getAddress) {
        // Named exports (Freighter API v5+)
        return {
          isConnected: module.isConnected,
          getAddress: module.getAddress,
          getNetwork: module.getNetwork,
          signTransaction: module.signTransaction
        };
      } else if (module.default) {
        // Default export
        return module.default;
      }
      
      throw new Error('Could not find Freighter API functions');
    });
  } catch (error) {
    console.error('Freighter API not available:', error);
    return Promise.resolve(null);
  }
};

class WalletService {
  constructor() {
    this.isConnected = false;
    this.publicKey = null;
    this.network = null;
  }

  /**
   * Connect to Freighter wallet
   * @returns {Promise<Object>} Connection result with publicKey and network
   */
  async connect() {
    try {
      const api = await getFreighterAPI();
      
      if (!api) {
        throw new Error('Freighter wallet is not installed or available');
      }

      // Check if Freighter is available
      if (!await this.isAvailable()) {
        throw new Error('Freighter wallet is not installed');
      }

      // Get user's public key (this prompts connection)
      // Use getAddress instead of getPublicKey (Freighter API v5+)
      if (typeof api.getAddress !== 'function') {
        throw new Error('getAddress function not available in Freighter API');
      }
      
      this.publicKey = await api.getAddress();
      
      // Try different ways to access getNetwork
      let getNetwork;
      if (typeof api.getNetwork === 'function') {
        getNetwork = api.getNetwork;
      } else if (api.default && typeof api.default.getNetwork === 'function') {
        getNetwork = api.default.getNetwork;
      } else {
        // Fallback to testnet if we can't get the network
        this.network = 'testnet';
        this.isConnected = true;
        return {
          success: true,
          publicKey: this.publicKey,
          network: this.network
        };
      }
      
      this.network = await getNetwork();
      this.isConnected = true;

      return {
        success: true,
        publicKey: this.publicKey,
        network: this.network
      };
    } catch (error) {
      console.error('Wallet connection error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Disconnect from wallet
   */
  disconnect() {
    this.isConnected = false;
    this.publicKey = null;
    this.network = null;
  }

  /**
   * Check if Freighter is available
   * @returns {Promise<boolean>}
   */
  async isAvailable() {
    try {
      const api = await getFreighterAPI();
      if (!api || !api.isConnected) {
        return false;
      }
      // isConnected checks if the extension is available, not if user is connected
      return typeof api.isConnected === 'function';
    } catch (error) {
      return false;
    }
  }

  /**
   * Get current wallet connection status
   * @returns {Promise<Object>}
   */
  async getConnectionStatus() {
    try {
      const api = await getFreighterAPI();
      if (!api) {
        return { connected: false };
      }

      if (await this.isAvailable() && await api.isConnected()) {
        this.publicKey = await api.getAddress();
        this.network = await api.getNetwork();
        this.isConnected = true;
        
        return {
          connected: true,
          publicKey: this.publicKey,
          network: this.network
        };
      }
      return { connected: false };
    } catch (error) {
      return { connected: false, error: error.message };
    }
  }

  /**
   * Sign a transaction with Freighter
   * @param {string} transactionXdr - Transaction XDR to sign
   * @param {Object} options - Signing options
   * @returns {Promise<string>} Signed transaction XDR
   */
  async signTransaction(transactionXdr, options = {}) {
    try {
      if (!this.isConnected) {
        throw new Error('Wallet not connected');
      }

      const api = await getFreighterAPI();
      if (!api || !api.signTransaction) {
        throw new Error('Freighter API not available');
      }

      const signedXdr = await api.signTransaction(transactionXdr, {
        network: this.network,
        ...options
      });

      return signedXdr;
    } catch (error) {
      console.error('Transaction signing error:', error);
      throw error;
    }
  }

  /**
   * Get wallet public key
   * @returns {string|null}
   */
  getPublicKey() {
    return this.publicKey;
  }

  /**
   * Get current network
   * @returns {string|null}
   */
  getNetwork() {
    return this.network;
  }

  /**
   * Check if wallet is connected
   * @returns {boolean}
   */
  getIsConnected() {
    return this.isConnected;
  }
}

// Create singleton instance
const walletService = new WalletService();

export default walletService;