const User = require('./user.model');
const Farm = require('./farm.model');
const Co2Calculation = require('./co2calculation.model');

// Relación uno a muchos entre User y Farm
User.hasMany(Farm, { as: 'Farms', foreignKey: 'user_id' });
Farm.belongsTo(User, { as: 'Owner', foreignKey: 'user_id' });

// Relación uno a muchos entre Farm y Co2Calculation
Farm.hasMany(Co2Calculation, { as: 'Co2Calculations', foreignKey: 'farm_id' });
Co2Calculation.belongsTo(Farm, { as: 'Farm', foreignKey: 'farm_id' });

module.exports = {
    User,
    Farm,
    Co2Calculation
};