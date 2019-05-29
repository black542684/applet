function getUserInfo () {
  return new Promise((resolve, reject) => {
    // 调用前需要 用户授权 scope.userInfo。
    mpvue.getUserInfo({
      success: function (res) { resolve(res) }
    })
  })
}
export default getUserInfo
