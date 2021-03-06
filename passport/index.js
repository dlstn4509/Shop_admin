/* 
1. 로그인 -> serialize : browser의 cookie에 idx 남기기
2. 재접속 할때마다 -> deserialize -> req.user

3. strategy 로직
	가. 로그인 라우터의 미들웨어 passport.authenticate(['local', 'kakao', 'naver'])를 거친다.
	나. 각 Strategy로 가서 
	다. local은 done() 실행
	라. kakao/naver는 passport-kakao(naver)가 done을 내장하고 있으므로 미들웨어로만 넣어준다.
*/

const local = require('./local-strategy');
const { User } = require('../models');

// 로그인 하면 user에 id를 보내줌,
const serialize = (user, done) => {
  done(null, user.id);
};

// 요청이 일어날때마다 db에 가져옴
const deserialize = async (id, done) => {
  try {
    const user = await User.findOne({ where: { id } });
    // findOne 에서 못 찾으면 return null
    if (user) done(null, user);
    else done(null, false, '사용자 정보가 없습니다.');
  } catch (err) {
    done(err);
  }
};

module.exports = (passport) => {
  passport.serializeUser(serialize); // req.user -> idx (cookie -> session)
  passport.deserializeUser(deserialize); // req.user <- DB user 정보 (session)
  local(passport);
};
