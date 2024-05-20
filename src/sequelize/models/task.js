module.exports = function (sequelize, DataTypes) {
    const Task = sequelize.define("Task", {
        task_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        installer: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM("DEBT", "INSTALLATION", "REPAIR"),
            allowNull: false,
        },
        client: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        clientAddress: {
            type: DataTypes.STRING,
        },
        notes: {
            type: DataTypes.STRING,
        }
    });

    Task.associate = function (models) {
        Task.belongsTo(models.Client, {
            foreignKey: {
                name: "client",
                allowNull: false
            }
        })

        Task.belongsTo(models.Installer, {
            foreignKey: {
                name: "installer",
                allowNull: false
            }
        })
    }
    return Task;
}