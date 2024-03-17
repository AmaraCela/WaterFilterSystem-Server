module.exports = function(sequelize, DataTypes) {
    const ChiefOfOperations = sequelize.define("ChiefOfOperations", {
        chief_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        }
    });

    ChiefOfOperations.associate = function(models) {
        ChiefOfOperations.belongsTo(models.User, {
            foreignKey: "chief_id"
        });
    }

    return ChiefOfOperations;
}