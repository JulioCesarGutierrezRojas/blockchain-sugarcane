import AxiosClient from '../config/axios.js';

class ApiService {
  constructor() {
    this.axiosClient = AxiosClient;
    this.baseURL = AxiosClient.defaults.baseURL;
  }

  // ==================== User Operations ====================
  
  /**
   * Create a new user
   * @param {Object} userData - User data
   * @returns {Promise<Object>}
   */
  async createUser(userData) {
    try {
      const response = await AxiosClient.post('/users', userData);
      const apiResponse = response.data;
      
      // Handle different response formats
      if (apiResponse.message && apiResponse.data) {
        // Standard format from user controller
        return { success: true, data: apiResponse.data };
      } else if (apiResponse.type === 'SUCCESS') {
        // ApiResponse format
        return { success: true, data: apiResponse.result };
      } else {
        return { success: false, error: apiResponse.message || apiResponse.text || 'Error al crear usuario' };
      }
    } catch (error) {
      console.error('Create user API error:', error);
      return { success: false, error: error.response?.data?.message || error.response?.data?.text || error.message };
    }
  }

  /**
   * Get user by Stellar address
   * @param {string} stellarAddress - Stellar public key
   * @returns {Promise<Object>}
   */
  async getUserByStellarAddress(stellarAddress) {
    try {
      const response = await AxiosClient.get(`/users/stellar/${stellarAddress}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data || error.message };
    }
  }

  /**
   * Update user data
   * @param {number} userId - User ID
   * @param {Object} userData - Updated user data
   * @returns {Promise<Object>}
   */
  async updateUser(userId, userData) {
    try {
      const response = await AxiosClient.put(`/users/${userId}`, userData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data || error.message };
    }
  }

  // ==================== Farm Operations ====================

  /**
   * Create a new farm
   * @param {Object} farmData - Farm data
   * @returns {Promise<Object>}
   */
  async createFarm(farmData) {
    try {
      const response = await AxiosClient.post('/farms', farmData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data || error.message };
    }
  }

  /**
   * Get farms by user ID
   * @param {number} userId - User ID
   * @returns {Promise<Object>}
   */
  async getFarmsByUser(userId) {
    try {
      const response = await AxiosClient.get(`/farms/user/${userId}`);
      const apiResponse = response.data;
      
      // Handle different response formats
      if (apiResponse.message && apiResponse.data) {
        // Standard format from controller
        return { success: true, data: Array.isArray(apiResponse.data) ? apiResponse.data : [] };
      } else if (apiResponse.type === 'SUCCESS') {
        // ApiResponse format
        return { success: true, data: Array.isArray(apiResponse.result) ? apiResponse.result : [] };
      } else if (Array.isArray(apiResponse)) {
        // Direct array response
        return { success: true, data: apiResponse };
      } else {
        return { success: true, data: [] }; // Default to empty array if no farms
      }
    } catch (error) {
      console.error('Get farms API error:', error);
      return { success: false, error: error.response?.data?.message || error.response?.data?.text || error.message };
    }
  }

  /**
   * Update farm data
   * @param {number} farmId - Farm ID
   * @param {Object} farmData - Updated farm data
   * @returns {Promise<Object>}
   */
  async updateFarm(farmId, farmData) {
    try {
      const response = await AxiosClient.put(`/farms/${farmId}`, farmData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data || error.message };
    }
  }

  // ==================== CO2 Calculations ====================

  /**
   * Create a new CO2 calculation
   * @param {Object} calculationData - CO2 calculation data
   * @returns {Promise<Object>}
   */
  async createCo2Calculation(calculationData) {
    try {
      const response = await AxiosClient.post('/co2-calculations', calculationData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data || error.message };
    }
  }

  /**
   * Get CO2 calculations by farm ID
   * @param {number} farmId - Farm ID
   * @returns {Promise<Object>}
   */
  async getCo2CalculationsByFarm(farmId) {
    try {
      const response = await AxiosClient.get(`/co2-calculations/farm/${farmId}`);
      const apiResponse = response.data;
      
      // Handle different response formats
      if (apiResponse.message && apiResponse.data) {
        // Standard format from controller
        return { success: true, data: Array.isArray(apiResponse.data) ? apiResponse.data : [] };
      } else if (apiResponse.type === 'SUCCESS') {
        // ApiResponse format
        return { success: true, data: Array.isArray(apiResponse.result) ? apiResponse.result : [] };
      } else if (Array.isArray(apiResponse)) {
        // Direct array response
        return { success: true, data: apiResponse };
      } else {
        return { success: true, data: [] }; // Default to empty array
      }
    } catch (error) {
      console.error('Get CO2 calculations API error:', error);
      return { success: false, error: error.response?.data?.message || error.response?.data?.text || error.message };
    }
  }

  /**
   * Get all CO2 calculations
   * @returns {Promise<Object>}
   */
  async getAllCo2Calculations() {
    try {
      const response = await AxiosClient.get('/co2-calculations');
      const apiResponse = response.data;
      
      // Handle different response formats
      if (apiResponse.message && apiResponse.data) {
        // Standard format from controller
        return { success: true, data: Array.isArray(apiResponse.data) ? apiResponse.data : [] };
      } else if (apiResponse.type === 'SUCCESS') {
        // ApiResponse format
        return { success: true, data: Array.isArray(apiResponse.result) ? apiResponse.result : [] };
      } else if (Array.isArray(apiResponse)) {
        // Direct array response
        return { success: true, data: apiResponse };
      } else {
        return { success: true, data: [] }; // Default to empty array
      }
    } catch (error) {
      console.error('Get all CO2 calculations API error:', error);
      return { success: false, error: error.response?.data?.message || error.response?.data?.text || error.message };
    }
  }

  // ==================== Token Operations ====================

  /**
   * Issue CO2 token
   * @param {Object} tokenData - Token issuance data
   * @returns {Promise<Object>}
   */
  async issueToken(tokenData) {
    try {
      const response = await AxiosClient.post('/token/issue', tokenData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data || error.message };
    }
  }

  /**
   * Get account balance
   * @param {string} farmerAddress - Farmer's Stellar address
   * @returns {Promise<Object>}
   */
  async getAccountBalance(farmerAddress) {
    try {
      const response = await AxiosClient.get(`/token/balance/${farmerAddress}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data || error.message };
    }
  }

  // ==================== Authentication ====================

  /**
   * Login user
   * @param {Object} credentials - User credentials
   * @returns {Promise<Object>}
   */
  async login(credentials) {
    try {
      const response = await AxiosClient.post('/login', credentials);
      const apiResponse = response.data;
      
      // Handle backend's custom ApiResponse format
      if (apiResponse.type === 'SUCCESS') {
        return { success: true, data: apiResponse.result };
      } else {
        return { success: false, error: apiResponse.text || 'Error de autenticación' };
      }
    } catch (error) {
      console.error('ApiService: Login API error:', error);
      return { success: false, error: error.response?.data?.text || error.message };
    }
  }

  /**
   * Logout user
   * @returns {Promise<Object>}
   */
  async logout() {
    try {
      const response = await AxiosClient.post('/logout');
      const apiResponse = response.data;
      
      if (apiResponse.type === 'SUCCESS') {
        return { success: true, data: apiResponse.result };
      } else {
        return { success: false, error: apiResponse.text || 'Error al cerrar sesión' };
      }
    } catch (error) {
      console.error('Logout API error:', error);
      return { success: false, error: error.response?.data?.text || error.message };
    }
  }
}

// Create singleton instance
const apiService = new ApiService();

export default apiService;