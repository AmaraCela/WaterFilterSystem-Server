module.exports = function(sequelize, DataTypes) {
    const AgentSchedule = sequelize.define("AgentSchedule", {
        schedule_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        dayOfTheWeek: {
            type: DataTypes.STRING,
            allowNull: false
        },
        startTime: {
            type: DataTypes.TIME,
            allowNull: false
        },
        endTime: {
            type: DataTypes.TIME,
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