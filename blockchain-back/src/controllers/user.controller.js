const User = require('../models/user.model');
const bcrypt = require('../kernel/bcrypt'); // usa tu helper

// Crear un nuevo usuario
const createUserController = async (req, res) => {
    try {
        const { stellar_address, email, password, first_name, last_name, phone } = req.body;

        // Validar campos obligatorios: email, password, first_name, last_name
        if (!email || !password || !first_name || !last_name) {
            return res.status(400).json({ message: 'Faltan campos obligatorios: email, password, first_name o last_name' });
        }

        // Validar que el email no exista
        const existingEmail = await User.findOne({ where: { email } });
        if (existingEmail) {
            return res.status(400).json({ message: 'El email ya está registrado' });
        }

        // Validar que la dirección Stellar no exista (si se proporciona)
        if (stellar_address) {
            const existingUser = await User.findOne({ where: { stellar_address } });
            if (existingUser) {
                return res.status(400).json({ message: 'El usuario con esta dirección Stellar ya existe' });
            }
        }

        const hashedPassword = await bcrypt.hashPassword(password);

        const newUser = await User.create({
            stellar_address: stellar_address || null,
            email,
            password: hashedPassword,
            first_name,
            last_name,
            phone: phone || null
        });

        return res.status(201).json({
            message: 'Usuario creado exitosamente',
            data: newUser
        });
    } catch (error) {
        console.error('Error en createUserController:', error);
        return res.status(500).json({ message: error.message });
    }
};

const getAllUsersController = async (req, res) => {
    try {
        const users = await User.findAll();
        
        return res.status(200).json({
            message: 'Usuarios obtenidos exitosamente',
            data: users
        });
    } catch (error) {
        console.error('Error en getAllUsersController:', error.message);
        return res.status(500).json({ message: error.message });
    }
};

// Obtener un usuario por ID
const getUserByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        
        const user = await User.findByPk(id);
        
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        
        return res.status(200).json({
            message: 'Usuario obtenido exitosamente',
            data: user
        });
    } catch (error) {
        console.error('Error en getUserByIdController:', error.message);
        return res.status(500).json({ message: error.message });
    }
};

// Obtener un usuario por dirección Stellar
const getUserByStellarAddressController = async (req, res) => {
    try {
        const { stellarAddress } = req.params;
        
        const user = await User.findOne({ where: { stellar_address: stellarAddress } });
        
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        
        return res.status(200).json({
            message: 'Usuario obtenido exitosamente',
            data: user
        });
    } catch (error) {
        console.error('Error en getUserByStellarAddressController:', error.message);
        return res.status(500).json({ message: error.message });
    }
};

// Obtener un usuario por email
const getUserByEmailController = async (req, res) => {
    try {
        const { email } = req.params;
        
        const user = await User.findOne({ where: { email } });
        
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        
        return res.status(200).json({
            message: 'Usuario obtenido exitosamente',
            data: user
        });
    } catch (error) {
        console.error('Error en getUserByEmailController:', error.message);
        return res.status(500).json({ message: error.message });
    }
};

// Actualizar un usuario
const updateUserController = async (req, res) => {
    try {
        const { id } = req.params;
        const userData = req.body;
        
        const user = await User.findByPk(id);
        
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        
        // Si se intenta actualizar el email, verificar que no exista
        if (userData.email && userData.email !== user.email) {
            const existingEmail = await User.findOne({ where: { email: userData.email } });
            if (existingEmail) {
                return res.status(400).json({ message: 'El email ya está registrado' });
            }
        }
        
        // Si se intenta actualizar la dirección Stellar, verificar que no exista
        if (userData.stellar_address && userData.stellar_address !== user.stellar_address) {
            const existingStellar = await User.findOne({ where: { stellar_address: userData.stellar_address } });
            if (existingStellar) {
                return res.status(400).json({ message: 'La dirección Stellar ya está registrada' });
            }
        }
        
        await user.update(userData);
        
        return res.status(200).json({
            message: 'Usuario actualizado exitosamente',
            data: user
        });
    } catch (error) {
        console.error('Error en updateUserController:', error.message);
        return res.status(500).json({ message: error.message });
    }
};

// Eliminar un usuario
const deleteUserController = async (req, res) => {
    try {
        const { id } = req.params;
        
        const user = await User.findByPk(id);
        
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        
        await user.destroy();
        
        return res.status(200).json({
            message: 'Usuario eliminado exitosamente'
        });
    } catch (error) {
        console.error('Error en deleteUserController:', error.message);
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createUserController,
    getAllUsersController,
    getUserByIdController,
    getUserByStellarAddressController,
    getUserByEmailController,
    updateUserController,
    deleteUserController
};
