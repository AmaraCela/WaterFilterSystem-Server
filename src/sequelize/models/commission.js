module.exports = function(sequelize, DataTypes) {
    const Commission = sequelize.define("Commission", {
        commission_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true
        },
        approved: {
            type: DataTypes.BOOLEAN,
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