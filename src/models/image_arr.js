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
                    type: Sequelize.BLOB,
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
                charset: 'utf8mb4',
                collate: 'utf8mb4_general_ci',
            }
        );
    }
    static associate(db) {
        db.ImageArr.belongsTo(db.Bulletin, {
            foreignKey: 'bulletin_id',
            sourceKey: 'bulletin_id',
        });
    }
};