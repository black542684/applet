function getSetting () {
  // 获取用户的当前设置。返回值中只会出现小程序已经向用户请求过的权限。
  return new Promise((resolve, reject) => {
    mpvue.getSetting({
      success: function (res) {
        resolve(res)
      }
    })
  })
}
export default getSetting
