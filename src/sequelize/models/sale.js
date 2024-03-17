module.exports = function(sequelize, DataTypes) {
    const Sale = sequelize.define("Sale", {
        sale_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true
        },
        time: {
            type: DataTypes.DATE,
            allowNull: false
        },
        approved: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        monthlyPayment: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        warrantyExpiration: {
            type: DataTypes.DATE
        },
        renewalDate: {
            type: DataTypes.DATE
        }
    });

    Sale.associate = function(models) {
        Sale.belongsTo(models.Client, {
            foreignKey: {
                name: "client",
                allowNull: false
            }
        });

        Sale.belongsTo(models.SalesAgent, {
            foreignKey: {
                name: "salesAgent",
                allowNull: false
            }
        });

        Sale.belongsTo(models.PhoneOperator, {
            foreignKey: {
                name: "phoneOperator",
                allowNull: false
            }
        });

        Sale.hasMany(models.Client, {
            foreignKey: "referredInSale"
        });

        Sale.hasOne(models.Debt, {
            foreignKey: "sale",
        });
    }

    return Sale;
}