module.exports = function(sequelize, DataTypes) {
    const PhoneOperator = sequelize.define("PhoneOperator", {
        operator_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        }
    });

    PhoneOperator.associate = function(models) {
        PhoneOperator.belongsTo(models.User, {
            foreignKey: "operator_id"
        });

        PhoneOperator.hasMany(models.Call, {
            foreignKey: "phoneOperator"
        });
        
        PhoneOperator.hasMany(models.Client, {
            foreignKey: "assignedOperator"
        });

        PhoneOperator.hasMany(models.Meeting, {
            foreignKey: "phoneOperator"
        });
    }

    return PhoneOperator;
}