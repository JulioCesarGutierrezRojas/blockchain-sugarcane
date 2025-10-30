# Implementación de Conexión Frontend-Backend con Freighter

## ✅ Cambios Realizados

### Backend
1. **Modelo de Usuario Actualizado** (`/src/models/user.model.js`)
   - `stellar_address` ahora es **nullable** (opcional)
   - `email` ahora es **requerido** y único
   - Mantiene autenticación por email/password

2. **Servicio de Autenticación Corregido** (`/src/services/Auth.service.js`)
   - Corregidos los campos del modelo de usuario
   - Login funciona con email/password
   - Token JWT incluye información correcta del usuario

### Frontend

#### Servicios Creados
1. **WalletService** (`/src/services/walletService.js`)
   - Integración completa con Freighter API
   - Conexión, desconexión y firma de transacciones
   - Gestión del estado de la wallet

2. **ApiService** (`/src/services/apiService.js`)
   - Cliente HTTP para comunicación con backend
   - Endpoints para usuarios, farms, cálculos CO2 y tokens
   - Manejo de errores centralizado

#### Contextos
1. **AuthContext** (`/src/contexts/AuthContext.jsx`)
   - Gestión de estado de autenticación
   - Login/logout con persistencia en localStorage
   - Integración con tokens JWT

2. **WalletContext** (`/src/contexts/WalletContext.jsx`)
   - Gestión de estado de Freighter wallet
   - Conecta stellar_address con usuario autenticado
   - Operaciones de tokens CO2

#### Componentes
1. **WalletButton** (`/src/components/WalletButton.jsx`)
   - Botón para conectar/desconectar wallet
   - Muestra balance y dirección Stellar
   - Estados de carga y error

2. **ProtectedRoute** (`/src/components/ProtectedRoute.jsx`)
   - Protección de rutas autenticadas
   - Redirección automática a login

#### Módulos Actualizados
1. **LoginForm** (`/src/modules/LoginForm.jsx`)
   - **Cambiado:** Usa email en lugar de Stellar Address
   - Integración con AuthContext
   - Validación y manejo de errores

2. **UserRegisterForm** (`/src/modules/UserRegisterForm.jsx`)
   - **Stellar Address es opcional**
   - Email es requerido
   - Integración con backend API

3. **Dashboard** (`/src/modules/Dashboard.jsx`)
   - Datos reales del usuario autenticado
   - Integración con wallet para balance CO2
   - Botón para emitir tokens CO2

4. **Marketplace** (`/src/modules/Marketplace.jsx`)
   - Muestra cálculos CO2 verificados
   - Compra de tokens (simulada)
   - Integración con wallet

5. **Navbar** (`/src/components/navbar.jsx`)
   - Muestra información del usuario logueado
   - Botón de logout funcional
   - WalletButton integrado

## 🔗 Flujo de Conexión

### 1. Registro/Login
```
Usuario se registra con email/password → 
Stellar Address es opcional → 
Login con email/password →
Usuario autenticado
```

### 2. Conexión de Wallet
```
Usuario autenticado →
Conecta Freighter wallet →
Sistema actualiza stellar_address del usuario →
Balance CO2 disponible
```

### 3. Operaciones CO2
```
Usuario con wallet conectada →
Puede emitir tokens CO2 →
Tokens aparecen en balance →
Puede comprar/vender en marketplace
```

## 🛠️ Configuración

### Variables de Entorno (.env)
```
VITE_API_URL=http://localhost:3000/api
VITE_STELLAR_NETWORK=testnet
VITE_APP_NAME="Token CO₂ Caña"
```

### Backend
- Puerto: 3000 (configurado en server.js)
- Base de datos: MySQL con Sequelize
- CORS habilitado para frontend

### Frontend  
- Vite + React
- Freighter API integrada
- SweetAlert2 para notificaciones
- Tailwind CSS para estilos

## 🔐 Seguridad
- JWT tokens para autenticación
- localStorage para persistencia de sesión
- Protección de rutas sensibles
- Validación de datos en backend y frontend

## 📱 Funcionalidades Implementadas
- ✅ Registro de usuarios con email
- ✅ Login con email/password  
- ✅ Conexión opcional de wallet Freighter
- ✅ Actualización automática de stellar_address
- ✅ Dashboard con datos reales
- ✅ Balance de tokens CO2
- ✅ Emisión de tokens CO2
- ✅ Marketplace con datos reales
- ✅ Logout funcional
- ✅ Rutas protegidas

## 🚀 Próximos Pasos
1. Implementar transacciones reales en Stellar
2. Agregar validaciones adicionales
3. Mejorar manejo de errores de red
4. Implementar refresh de tokens JWT
5. Agregar tests unitarios