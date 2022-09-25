import Sequelize from "sequelize";

module.exports = class Comment extends Sequelize.Model{
    static init(sequelize){
        return super.init(
            {
                comment_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                },
                content: {
                    type: Sequelize.TEXT,
                    allowNull: false,
                },
                create_date: {
                    type: Sequelize.DATE,
                    allowNull: false,
                }
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: 'Comment',
                tableName: 'comment',
                paranoid: false,
                charset: 'utf8mb4',
                collate: 'utf8mb4_general_ci',
            }
        );
    }
    static associate(db){
        db.Comment.belongsTo(db.StdInfo, {
            foreignKey: 'std_id',
            sourceKey: 'std_id',
        });
        db.Comment.belongsTo(db.Bulletin, {
            foreignKey: 'bulletin_id',
            sourceKey: 'bulletin_id',
        });
    }
};