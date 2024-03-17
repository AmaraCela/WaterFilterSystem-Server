module.exports = function(sequelize, DataTypes) {
    const Installer = sequelize.define("Installer", {
        installer_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        }
    });

    Installer.associate = function(models) {
        Installer.belongsTo(models.User, {
            foreignKey: "installer_id"
        });
    }

    return Installer;
}