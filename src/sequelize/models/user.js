module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define("User", {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        passwordHash: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM([
                "SALES_AGENT",
                "PHONE_OPERATOR",
                "MARKETING_MANAGER",
                "CHIEF_OF_OPERATIONS",
                "INSTALLER",
                "INVENTORY_MANAGER",
                "ADMINISTRATOR"
            ]),
            allowNull: false
        }
    });

    User.associate = function(models) {
        User.hasMany(models.PhoneOperator, {
            foreignKey: "operator_id"
        });
       
        User.hasMany(models.SalesAgent, {
            foreignKey: "agent_id"
        });

        User.hasMany(models.MarketingManager, {
            foreignKey: "manager_id"
        });
        
        User.hasMany(models.ChiefOfOperations, {
            foreignKey: "chief_id"
        });

        User.hasMany(models.Installer, {
            foreignKey: "installer_id"
        });

        User.hasMany(models.Meeting, {
            foreignKey: "worker"
        });

        User.hasMany(models.Commission, {
            foreignKey: "userPaidTo"
        });

        User.hasOne(models.Inventory, {
            foreignKey: "manager"
        })
    }

    return User;
}