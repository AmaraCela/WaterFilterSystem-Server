module.exports = function(sequelize, DataTypes) {
    const Commission = sequelize.define("Commission", {
        commission_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        approved: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM("REFERRAL", "SPIF", "TIERED"),
            allowNull: false
        }
    });

    Commission.associate = function(models) {
        Commission.belongsTo(models.User, {
            foreignKey: "userPaidTo"
        });
    }

    return Commission;
}