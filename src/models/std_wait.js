import Sequelize from "sequelize";

module.exports = class StdWait extends Sequelize.Model{
    static init(sequelize){
        return super.init(
            {
                std_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                std_name: {
                    type: Sequelize.STRING(30),
                    allowNull: false,
                },
                ph_num: {
                    type: Sequelize.STRING(30),
                    allowNull: false,
                },
                room_num: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                e_mail: {
                    type: Sequelize.STRING(45),
                    allowNull: false,
                },
                password: {
                    type: Sequelize.STRING(45),
                    allowNull: false,
                },
                hash: {
                    type: Sequelize.STRING(30),
                    allowNull: false,
                    primaryKey: true,
                }
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: 'StdWait',
                tableName: 'std_wait',
                paranoid: false,
                charset: 'utf8',
                collate: 'utf8_unicode_ci',
            }
        );
    }
    static associate(db) {}
}