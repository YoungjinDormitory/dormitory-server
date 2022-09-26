import {Sequelize} from "sequelize";

import AsRequest from './as_request';
import HlthRequest from './hlth_request';
import BusRequest from './bus_request';
import StayoutRequest from './stayout_request';

import AdmInfo from './adm_info';
import BusInfo from './bus_info';
import StdInfo from './std_info';
import StdWait from './std_wait';

import Bulletin from './bulletin';
import Comment from './comment';
import Hot from './hot';
import Like from './like';
import ImageArr from './image_arr';
import Holiday from './holiday';
import MenuList from './menu_list';

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.AsRequest = AsRequest;
db.AdmInfo = AdmInfo;
db.BusInfo = BusInfo;
db.BusRequest = BusRequest;
db.Bulletin = Bulletin;
db.Comment = Comment
db.MenuList = MenuList;
db.Hot = Hot;
db.HlthRequest = HlthRequest;
db.Holiday = Holiday;
db.StayoutRequest = StayoutRequest;
db.StdInfo = StdInfo;
db.StdWait = StdWait;
db.Like = Like;
db.ImageArr = ImageArr;

AsRequest.init(sequelize);
AdmInfo.init(sequelize);
BusInfo.init(sequelize);
BusRequest.init(sequelize);
Bulletin.init(sequelize);
Comment.init(sequelize);
MenuList.init(sequelize);
Holiday.init(sequelize);
Hot.init(sequelize);
HlthRequest.init(sequelize);
StayoutRequest.init(sequelize);
StdInfo.init(sequelize);
StdWait.init(sequelize);
Like.init(sequelize);
ImageArr.init(sequelize);

AsRequest.associate(db);
AdmInfo.associate(db);
BusInfo.associate(db);
BusRequest.associate(db);

// Bulletin.associate(db);

Comment.associate(db);
MenuList.associate(db);
Holiday.associate(db);
Hot.associate(db);
HlthRequest.associate(db);
StayoutRequest.associate(db);
StdInfo.associate(db);
StdWait.associate(db);
Like.associate(db);
ImageArr.associate(db);

export default db;