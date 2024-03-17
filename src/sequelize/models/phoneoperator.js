module.exports = function(sequelize, DataTypes) {
    const PhoneOperator = sequelize.define("PhoneOperator", {
        operator_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        }
    });

    PhoneOperator.associate = function(models) {
        PhoneOperator.hasMany(models.Client, {
            foreignKey: "assignedOperator"
        });
        
        PhoneOperator.belongsTo(models.User, {
            foreignKey: "operator_id"
        });
    }

    return PhoneOperator;
}