module.exports = function(sequelize, DataTypes) {
    const Meeting = sequelize.define("Meeting", {
        meeting_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        time: {
            type: DataTypes.DATE,
            allowNull: false
        },
        place: {
            type: DataTypes.STRING,
            allowNull: false
        },
        successful: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        outcomeComment: {
            type: DataTypes.STRING
        }
    });

    Meeting.associate = function(models) {
        Meeting.belongsTo(models.Client, {
            foreignKey: {
                name: "client",
                allowNull: false
            }
        });

        Meeting.belongsTo(models.User, {
            foreignKey: {
                name: "worker",
                allowNull: false
            }
        });

        Meeting.belongsTo(models.PhoneOperator, {
            foreignKey: "phoneOperator"
        });
    }

    return Meeting;
}