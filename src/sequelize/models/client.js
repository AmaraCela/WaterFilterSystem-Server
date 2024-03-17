module.exports = function(sequelize, DataTypes) {
    const Client = sequelize.define("Client", {
        client_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true
        },
        name: {
            type: DataTypes.STRING,
        },
        surname: {
            type: DataTypes.STRING,
        },
        phoneNo: {
            type: DataTypes.STRING,
            allowNull: false
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
        }
    });

    Client.associate = function(models) {
        Client.belongsTo(models.PhoneOperator, {
            foreignKey: "assignedOperator"
        });

        Client.belongsTo(models.Client, {
            foreignKey: "referredBy"
        });
    }

    return Client;
}