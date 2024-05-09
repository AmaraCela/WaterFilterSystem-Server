module.exports = function(sequelize, DataTypes) {
    const Client = sequelize.define("Client", {
        client_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
        },
        surname: {
            type: DataTypes.STRING,
        },
        phoneNo: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        address: {
            type: DataTypes.STRING
        },
        profession: {
            type: DataTypes.STRING
        },
        hasMadePurchase: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        lastCallDate: {
            type: DataTypes.DATE
        },
        nextContactDate: {
            type: DataTypes.DATE
        },
        status: {
            type: DataTypes.ENUM("IN_WAITLIST", "IN_REDLIST"),
            defaultValue: "IN_WAITLIST"
        },
        financiallyQualified: {
            type: DataTypes.BOOLEAN
        }
    });

    Client.associate = function(models) {
        Client.belongsTo(models.PhoneOperator, {
            foreignKey: "assignedOperator"
        });
    
        Client.belongsTo(models.Client, {
            foreignKey: "referredBy",
            as: "ReferredBy"
        });

        Client.belongsTo(models.Sale, {
            foreignKey: "referredInSale"
        });

        Client.hasMany(models.Client, {
            foreignKey: "referredBy",
            as: "Referrals"
        });

        Client.hasMany(models.Call, {
            foreignKey: "client",
            onDelete: "CASCADE"
        });

        Client.hasMany(models.Meeting, {
            foreignKey: "client",
            onDelete: "CASCADE"
        });

        Client.hasOne(models.Sale, {
            foreignKey: "client",
            onDelete: "CASCADE"
        });
    }

    return Client;
}