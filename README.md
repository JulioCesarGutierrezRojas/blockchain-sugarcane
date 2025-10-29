# 🌿 Tokenización de CO₂ a partir del Cultivo de Caña de Azúcar

**Proyecto desarrollado para un Hackathon Codigo Raiz**  
**Stack:** React + Vite · Node.js · Stellar SDK · Soroban (Rust)  

---

## 🎯 Descripción General

El proyecto **Token CO₂ Caña** busca unir **agrotecnología** y **blockchain sostenible** para **medir, certificar y tokenizar** la captura de dióxido de carbono (CO₂) generada por el **cultivo de caña de azúcar**.  

Cada hectárea de caña absorbe una cantidad medible de CO₂ mediante fotosíntesis. Esa captura se representa digitalmente mediante **tokens en la red Stellar**, lo que permite crear un mercado transparente y trazable de **créditos de carbono**.

---

## 💡 Concepto

> **“Tokenización del CO₂ a partir del cultivo de caña de azúcar”**
>
> Significa convertir en tokens digitales la cantidad de dióxido de carbono capturada por los cultivos, para ser comercializados o usados como certificados de compensación de carbono (*carbon credits*).

Cada token representa:

1 Token = 1 Tonelada de CO₂ capturada

Estos tokens pueden:
- Ser **verificados** mediante contratos inteligentes en Soroban.
- Ser **comprados o vendidos** en plataformas sustentables.
- Ser **usados por empresas** para compensar su huella de carbono.

---

## 🧩 Arquitectura del Proyecto

```plaintext
Frontend (React + Vite)
│
├── Conexión con Freighter Wallet (Stellar)
│   └── Gestión de cuentas y firma de transacciones
│
Backend (Node.js + Express)
│
├── API REST
│   ├── Cálculo de CO₂ capturado por hectárea
│   ├── Emisión y registro de tokens
│   └── Comunicación con Soroban SDK
│
└── Base de datos (MongoDB / MySQL)
     └── Almacenamiento de métricas, usuarios y transacciones

Smart Contracts (Rust - Soroban)
│
└── Lógica de emisión y validación de tokens de carbono
```

## ⚙️ Tecnologías Utilizadas

| Área | Tecnología | Descripción |
|------|-------------|-------------|
| **Frontend** | [React + Vite](https://vitejs.dev/) | Interfaz web rápida, modular y optimizada para desarrollo moderno. |
| **Wallet** | [Freighter](https://www.freighter.app/) | Extensión de navegador para autenticación y firma de transacciones en Stellar. |
| **Backend** | [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/) | API REST que conecta la aplicación con la blockchain y gestiona la lógica del negocio. |
| **Blockchain** | [Stellar SDK](https://github.com/stellar/js-stellar-sdk) | Librería para interactuar con la red Stellar, enviar y recibir transacciones. |
| **Smart Contracts** | [Soroban SDK (Rust)](https://soroban.stellar.org/docs/) | Desarrollo de contratos inteligentes para la emisión y validación de tokens de carbono. |
| **Base de datos** | [MongoDB](https://www.mongodb.com/) / [MySQL](https://www.mysql.com/) | Almacenamiento de métricas, usuarios y registros de tokenización. |
| **Gestión de dependencias** | [npm](https://www.npmjs.com/) | Instalación y manejo de librerías tanto en frontend como en backend. |
| **Control de versiones** | [Git](https://git-scm.com/) + [GitHub](https://github.com/) | Control del código fuente y colaboración en equipo durante el Hackathon. |
| **Lenguaje de contratos** | [Rust](https://www.rust-lang.org/) | Lenguaje seguro y eficiente usado para los contratos en Soroban. |

## 🌱 Flujo de Uso

1. **El agricultor** registra su cultivo de caña de azúcar en la plataforma.  
2. **El sistema calcula** la cantidad de CO₂ capturada (en toneladas) según los datos ingresados.  
3. **El contrato inteligente en Soroban** emite tokens equivalentes a la cantidad de CO₂ capturada.  
4. **Los tokens se registran en la red Stellar**, garantizando transparencia y trazabilidad.  
5. **El usuario o empresa** puede comprar, vender o canjear estos tokens como créditos de carbono.  
6. **Todas las transacciones** quedan registradas de forma pública y verificable en blockchain.  

---

## 🔒 Integración con Freighter Wallet

El frontend del proyecto se conecta con **[Freighter Wallet](https://www.freighter.app/)** para realizar operaciones seguras en la red Stellar.  
A través de esta integración, los usuarios pueden:

- Autenticarse con su cuenta Stellar.  
- Firmar transacciones digitalmente.  
- Consultar balances de tokens CO₂.  
- Enviar y recibir tokens directamente desde el navegador.  

## 🌍 Impacto Ambiental

El proyecto **Token CO₂ Caña** contribuye activamente a la sostenibilidad global al:

✔️ **Incentivar prácticas agrícolas sostenibles**, recompensando a los productores que reducen emisiones.  
✔️ **Digitalizar los créditos de carbono**, aumentando la transparencia y reduciendo el fraude en los mercados ambientales.  
✔️ **Facilitar la compensación de emisiones**, permitiendo a empresas y ciudadanos neutralizar su huella de carbono.  
✔️ **Promover la economía verde**, aprovechando la tecnología blockchain como motor de cambio ecológico.  

> 🌎 “Cada token representa una acción concreta hacia un planeta más limpio y sostenible.”
