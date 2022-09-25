import Sequelize from "sequelize";

module.exports = class StdInfo extends Sequelize.Model{
    static init(sequelize){
        return super.init(
            {
                std_id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
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
                    allowNull: false,
                },
                e_mail: {
                    type: Sequelize.STRING(45),
                    allowNull: false,
                },
                password: {
                    type: Sequelize.STRING(45),
                    allowNull: false,
                },
                access: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: false,
                },
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: 'StdInfo',
                tableName: 'std_info',
                paranoid: false,
                charset: 'utf8mb4',
                collate: 'utf8mb4_general_ci',
            }
        );
    }
    static associate(db) {
        db.StdInfo.hasMany(db.BusRequest, {
            foreignKey: 'std_id',
            sourceKey: 'std_id',
        });
        db.StdInfo.hasMany(db.Bulletin, {
            foreignKey: 'std_id',
            sourceKey: 'std_id',
        });
        db.StdInfo.hasMany(db.Comment, {
            foreignKey: 'std_id',
            sourceKey: 'std_id',
        });
        db.StdInfo.hasMany(db.HlthRequest, {
            foreignKey: 'std_id',
            sourceKey: 'std_id',
        });
        db.StdInfo.hasMany(db.StayoutRequest, {
            foreignKey: 'std_id',
            sourceKey: 'std_id',
        });
        db.StdInfo.hasMany(db.Like, {
            foreignKey: 'std_id',
            sourceKey: 'std_id',
        });
    }
};