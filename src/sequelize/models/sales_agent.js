module.exports = function(sequelize, DataTypes) {
    const SalesAgent = sequelize.define("SalesAgent", {
        agent_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        }
    });

    SalesAgent.associate = function(models) {
        SalesAgent.belongsTo(models.User, {
            foreignKey: "agent_id"
        });

        SalesAgent.hasMany(models.AgentSchedule, {
            foreignKey: "salesAgent"
        });

        SalesAgent.hasMany(models.Meeting, {
            foreignKey: "salesAgent"
        });
    }

    return SalesAgent;
}