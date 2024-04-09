module.exports = function(sequelize, DataTypes) {
    const Debt = sequelize.define("Debt", {
        sale: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        nextPayment: {
            type: DataTypes.DATE
        },
        amountPaidOff: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        amountToCollect: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    Debt.associate = function(models) {
        Debt.belongsTo(models.Sale, {
            foreignKey: {
                name: "sale",
                allowNull: false
            }
        });
    }

    return Debt;
}