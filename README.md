# Dormitory App Server Reloaded

## Router Set

### - Moblie App

rootRouter
/ -> Home 
/signup -> 회원가입
/login -> 로그인

boardRouter
/board -> 게시글조회
/board/image -> 이미지추가
/board/create -> 작성
/board/update -> 수정
/board/search -> 검색
/board/clickHot -> 추천버튼
/board/watch -> 조회수
/board/delete -> 삭제

hotRouter
/hot -> 추천

commentRouter
/comment -> 댓글조회
/comment/create -> 작성
/comment/delete -> 삭제

busRouter
/bus -> 버스조회
/bus/search -> ?
/bus/create -> 신청
/bus/update -> 수정
/bus/delete -> 삭제

busInfoRouter ?
/busInfo ->
/busInfo/availableBusStop ->
/busInfo/availableTime -> 

asRouter
/as -> AS조회
/as/search ->
/as/create -> 신청
/as/update -> 수정
/as/delete -> 삭제

gymRouter
/gym -> 헬스조회
/gym/search ->
/gym/create -> 신청
/gym/update -> 수정
/gym/delete -> 삭제

stayoutRouter
/stayout -> 외박조회
/stayout/search ->
/stayout/create -> 신청
/stayout/update -> 수정
/stayout/delete -> 삭제


<br>

### - Manager Web

rootRouter
/admin/login

busRouter
/admin/bus -> 예약자조회
/admin/bus/pagenum -> 조회페이지
/admin/bus/inquire -> 문의

busInfoRouter
/admin/businfo -> 버스조회, 수정, 삭제
/admin/businfo/create -> 버스등록

gymRouter
/admin/gym -> 예약자조회
/admin/gym/pagenum -> 조회페이지

stayoutRouter
/admin/stayout -> 예약자조회
/admin/stayout/pagenum -> 조회페이지
/admin/stayout/people -> ?

asRouter
/admin/as -> A/S신청조회
/admin/as/checked -> A/S처리확인
/admin/as/pagenum -> 조회페이지

menuRouter
/admin/menu -> 식단표조회,수정,삭제
/admin/menu/pagenum ->조회페이지
/admin/menu/app -> 메뉴표시 ?
/admin/menu/exist -> ?
/admin/menu/create -> 식단표등록

holidayRouter
/admin/holiday -> 휴일조회,삭제
/admin/holiday/create -> 휴일추가

/admin/agree -> 권한없는학생 조회 , 학생에게 권한 부여, 학생에게 로그인권한삭제(DB에서 정보삭제)