import Sequelize from "sequelize";

module.exports = class StayoutRequest extends Sequelize.Model{
    static init(sequelize){
        return super.init(
            {
                stayout_id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true,
                },
                start_date: {
                    type: Sequelize.DATE,
                    allowNull: false,
                },
                end_date: {
                    type: Sequelize.DATE,
                    allowNull: false,
                }
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: 'StayoutRequest',
                tableName: 'stayout_request',
                paranoid: false,
                charset: 'utf8mb4',
                collate: 'utf8mb4_general_ci',
            }
        );
    }
    static associate(db) {
        db.StayoutRequest.belongsTo(db.StdInfo,{
            foreignKey: 'std_id',
            sourceKey: 'std_id',
        });
    }
};