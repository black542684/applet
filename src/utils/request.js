const getData = (object) => {
  // 调用提示框
  mpvue.showLoading({title: '正在加载...'})
  let url = object.url || ''
  url = 'https://www.zhengzhicheng.cn' + url
  let data = object.data || {}
  let method = object.method || 'get'
  return new Promise((resolve, reject) => {
    mpvue.request({
      url,
      data,
      method,
      success: (res) => {
        resolve(res.data)
        mpvue.hideLoading()
      },
      fail: (err) => {
        reject(err)
        mpvue.hideLoading()
      }
    })
  })
}
export default getData
