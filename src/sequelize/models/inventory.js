module.exports = function(sequelize, DataTypes) {
    const Inventory = sequelize.define("Inventory", {
        inventory_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Inventory.associate = function(models) {
        Inventory.belongsTo(models.User, {
            foreignKey: {
                name: "manager",
                allowNull: false
            }
        });

        Inventory.hasMany(models.InventoryItem, {
            foreignKey: "inventory"
        });
    }

    return Inventory;
}