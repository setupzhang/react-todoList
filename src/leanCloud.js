var AV = require('leancloud-storage');
var { Query, User } = AV;
AV.init({
  appId: "5zBP7lGNJU7uBdNALqCjqSKz-gzGzoHsz",
  appKey: "VPs4CKyUGAyXa1wlYqheXQFF",
});

export default AV

export function signUp(username, password, successFn, errorFn) {
  // 新建 AVUser 对象实例
  var user = new AV.User()
  // 设置用户名
  user.setUsername(username)
  // 设置密码
  user.setPassword(password)

  user.signUp().then(function (loginedUser) {
    let user = getUserFromAVUser(loginedUser)
    successFn.call(null, user)
  }, function (error) {
    errorFn.call(null, error)
  })

  return undefined

}

function getUserFromAVUser(AVUser) {
  return {
    id: AVUser.id,
    ...AVUser.attributes
  }
}