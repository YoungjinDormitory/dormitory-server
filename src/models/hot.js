import Sequelize from "sequelize";

module.exports = class Hot extends Sequelize.Model {
    static init(sequelize){
        return super.init(
            {
                hot_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                },
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: 'Hot',
                tableName: 'hot',
                paranoid: false,
                charset: 'utf8',
                collate: 'utf8_unicode_ci',
            }
        );
    }
    static associate(db) {
        db.Hot.belongsTo(db.Bulletin, {
            foreignKey: 'bulletin_id',
            targetKey: 'bulletin_id',
        });
    }
};