import Sequelize from "sequelize";

module.exports = class FoodList extends Sequelize.Model{
    static init(sequelize) {
        return super.init(
            {
                menu_id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true,
                },
                date: {
                    type: Sequelize.DATE,
                    allowNull: false,
                },
                breakfast: {
                    type: Sequelize.STRING(70),
                    allowNull: false,
                },
                lunch: {
                    type: Sequelize.STRING(70),
                    allowNull: false,
                },
                dinner: {
                    type: Sequelize.STRING(70),
                    allowNull: false,
                },
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: 'MenuList',
                tableName: 'menu_list',
                charset: 'utf8mb4',
                collate: 'utf8mb4_general_ci',
            }
        );
    }
    static associate(db){
        db.MenuList.belongsTo(db.AdmInfo, {
            foreignKey: 'adm_id',
            sourceKey: 'adm_id',
        });
    }
};