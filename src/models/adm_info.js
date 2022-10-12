import Sequelize from "sequelize";

module.exports = class AdmInfo extends Sequelize.Model{
    static init(sequelize){
        return super.init(
            { 
                adm_id: {
                    type: Sequelize.STRING(45),
                    allowNull: false,
                    primaryKey: true,
                },
                password: {
                    type: Sequelize.STRING(45),
                    allowNull: false,
                },
                adm_name: {
                    type: Sequelize.STRING(30),
                    allowNull: false,
                },
                refresh_token: {
                    type: Sequelize.STRING(1000),
                    allowNull: true,
                    defaultValue: null,
                },
                role: {
                    type: Sequelize.STRING(1000),
                    allowNull: true,
                }
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: 'AdmInfo',
                tableName: 'adm_info',
                paranoid: false,
                charset: 'utf8',
                collate: 'utf8_unicode_ci',
            }
        );
    }
    static associate(db) {
        db.AdmInfo.hasMany(db.MenuList, {
            foreignKey: 'adm_id',
            sourceKey: 'adm_id',
        });
        db.AdmInfo.hasMany(db.Holiday, {
            foreignKey: 'adm_id',
            sourceKey: 'adm_id',
        });
        db.AdmInfo.hasMany(db.BusInfo, {
            foreignKey: 'adm_id',
            sourceKey: 'adm_id',
        });
    }
};