function login () {
  return new Promise((resolve, reject) => {
    mpvue.login({
      success: function (res) {
        resolve(res)
      }
    })
  })
}
export default login
