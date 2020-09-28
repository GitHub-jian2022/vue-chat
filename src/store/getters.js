const getters = {
  currentUserProfile: state => state.user.currentUserProfile,
  isLogin: state => state.user.isLogin,
  token: state => state.user.token,
  roles: state => state.user.roles,
}
export default getters
