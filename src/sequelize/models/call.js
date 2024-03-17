module.exports = function(sequelize, DataTypes) {
    const Call = sequelize.define("Call", {
        call_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        scheduledTime: {
            type: DataTypes.DATE
        },
        outcomeComment: {
            type: DataTypes.STRING
        }
    });

    Call.associate = function(models) {
        Call.belongsTo(models.Client, {
            foreignKey: {
                name: "client",
                allowNull: false
            }
        });

        Call.belongsTo(models.PhoneOperator, {
            foreignKey: {
                name: "phoneOperator",
                allowNull: false
            }
        });
    }

    return Call;
}