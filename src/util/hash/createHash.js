// 1. userObj 로 해쉬를 만든다.
import crypto from 'crypto';
import StdInfo from '../../models/std_info';
import AdmInfo from '../../models/adm_info';

async function createHash(userObj){
    const result = crypto.createHash('sha256').update(JSON.stringify(userObj)).digest('hex');
    try {
        if (userObj.role === "admin") {
          await AdmInfo.update(
            {
              refresh_token: result,
            },
            {
              where: {
                adm_id: userObj.adm_id,
              },
            }
          );
          return result;
        } else {
          await StdInfo.update(
            {
              refresh_token: result,
            },
            {
              where: {
                std_id: userObj.std_id,
              },
            }
          );
          return result;
        }
      } catch (err) {
        console.log(err);
      }
}

export default createHash;

// 2. 만든 해쉬로 데이터베이스 안에 id = hash 나머지

// 3.그 만든 해쉬를 리턴해준다.

// ==========================

// 4. 만든 해쉬로 jwt를 만든다

// 5. 그거를 쿠키에 httpOnly 속성을 담아서 던져준다.

// =======================

// 6 . req.header.cookies 안에 refreshtoken 이 있는데
// 이걸로 vertify를 한다.

// 7. 나온 hash로 데이터베이스에서 값을 추출한다.

// 8. 나온 정보로 accessToken을 다시 만들어 보내준다.