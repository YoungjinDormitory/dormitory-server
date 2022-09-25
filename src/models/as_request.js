import Sequelize from "sequelize";

module.exports = class AsRequest extends Sequelize.Model{
    static init(sequelize) {
        return super.init(
            {
                as_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },
                title: {
                    type: Sequelize.STRING(50),
                    allowNull: false,
                },
                content: {
                    type: Sequelize.TEXT,
                    allowNull: false,
                },
                request_date: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue: new Date(),
                },
                vst_check: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                },
                repair_date: {
                    type: Sequelize.DATE,
                    allowNull: true,
                },
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: 'AsRequest',
                tableName: 'as_request',
                paranoid: false,
                charset: 'utf8md4',
                collate: 'utf8mb4_general_ci',
            }
        );
    }
    static associate(db){
        db.AsRequest.belongsTo(db.StdInfo, {
            foreignKey: 'std_id',
            sourceKey: 'std_id',
        });
    }
};