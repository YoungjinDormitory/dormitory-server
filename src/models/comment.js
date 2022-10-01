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
                },
                level: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                deps: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                group_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                ip: {
                    type: Sequelize.STRING(10),
                    allowNull: false,
                },
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: 'Comment',
                tableName: 'comment',
                paranoid: false,
                charset: 'utf8',
                collate: 'utf8_unicode_ci',
            }
        );
    }
    static associate(db){
        db.Comment.belongsTo(db.StdInfo, {
            foreignKey: 'std_id',
            targetKey: 'std_id',
        });
        db.Comment.belongsTo(db.Bulletin, {
            foreignKey: 'bulletin_id',
            targetKey: 'bulletin_id',
        });
    }
};