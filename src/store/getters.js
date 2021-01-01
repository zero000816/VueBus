const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  dormName:state => state.user.dormName,
  studentID: state=>state.user.studentID,
  verifyCode: state=>state.user.verifyCode,
  flag: state=>state.user.flag
}
export default getters
