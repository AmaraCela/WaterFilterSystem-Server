module.exports = function(sequelize, DataTypes) {
    const MarketingManager = sequelize.define("MarketingManager", {
        manager_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        }
    });

    MarketingManager.associate = function(models) {
        MarketingManager.belongsTo(models.User, {
            foreignKey: "manager_id"
        });
    }

    return MarketingManager;
}