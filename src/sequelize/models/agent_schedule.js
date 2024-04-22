module.exports = function(sequelize, DataTypes) {
    const AgentSchedule = sequelize.define("AgentSchedule", {
        schedule_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        salesAgent: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        day: {
            type: DataTypes.DATE,
            // allowNull: false
        },
        startTime: {
            type: DataTypes.STRING,
            allowNull: false
        },
        endTime: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    AgentSchedule.associate = function(models) {
        AgentSchedule.belongsTo(models.SalesAgent, {
            foreignKey: "salesAgent"
        });
    }

    return AgentSchedule;
}