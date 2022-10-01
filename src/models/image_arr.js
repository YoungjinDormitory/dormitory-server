import Sequelize from "sequelize";

module.exports = class ImageArr extends Sequelize.Model{
    static init(sequelize){
        return super.init(
            {
                image_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                },
                path: {
                    type: Sequelize.STRING(300),
                    allowNull: false,
                },
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: 'ImageArr',
                tableName: 'image_arr',
                paranoid: false,
                charset: 'utf8',
                collate: 'utf8_unicode_ci',
            }
        );
    }
    static associate(db) {
        db.ImageArr.belongsTo(db.Bulletin, {
            foreignKey: 'bulletin_id',
            targetKey: 'bulletin_id',
        });
    }
};