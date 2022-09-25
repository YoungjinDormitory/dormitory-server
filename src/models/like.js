import Sequelize from "sequelize";

module.exports = class Like extends Sequelize.Model{
    static init(sequelize){
        return super.init(
            {
                like_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: 'Like',
                tableName: 'like_table',
                paranoid: false,
                charset: 'utf8mb4',
                collate: 'utf8mb4_general_ci',
            }
        );
    }
    static associate(db) {
        db.Like.belongsTo(db.StdInfo, {
            foreignKey: 'std_id',
            sourceKey: 'std_id',
        });
        db.Like.belongsTo(db.Bulletin, {
            foreignKey: 'bulletin_id',
            sourceKey: 'bulletin_id',
        });
    }
};