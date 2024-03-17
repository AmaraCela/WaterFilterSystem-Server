module.exports = function(sequelize, DataTypes) {
    const InventoryItem = sequelize.define("InventoryItem", {
        item_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cost: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    });

    InventoryItem.associate = function(models) {
        InventoryItem.belongsTo(models.Inventory, {
            foreignKey: "inventory"
        });
    }
    
    return InventoryItem;
}