module.exports = function(sequelize, DataTypes) {
    const InventoryManager = sequelize.define("InventoryManager", {
        manager_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        }
    });

    InventoryManager.associate = function(models) {
        InventoryManager.belongsTo(models.User, {
            foreignKey: "manager_id"
        });
    }

    return InventoryManager;
}