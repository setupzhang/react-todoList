import AV from 'leancloud-storage'

var APP_ID = '5zBP7lGNJU7uBdNALqCjqSKz-gzGzoHsz';
var APP_KEY = 'VPs4CKyUGAyXa1wlYqheXQFF';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
})

function getUserFromAVUser(AVUser) {
  return {
    id: AVUser.id,
    ...AVUser.attributes
  }
}

export default AV

export const TodoModel = {// 所有跟 Todo 相关的 LeanCloud 操作都放到这里
  getByUser(user, successFn, errorFn) {
    // 文档见 https://leancloud.cn/docs/leanstorage_guide-js.html#批量操作
    let query = new AV.Query('Todo')
    query.find().then((response) => {
      let array = response.map((t) => {
        return { id: t.id, ...t.attributes }
      })
      successFn(array)
    }, (error) => {
      errorFn && errorFn(error)
    })
  },

  create({ status, title, deleted }, successFn, errorFn) {
    let Todo = AV.Object.extend('Todo') //建立todo数据库
    let todo = new Todo()//新建todo对象
    todo.set('title', title)
    todo.set('status', status)
    todo.set('deleted', deleted)

    // 根据文档 https://leancloud.cn/docs/acl-guide.html#单用户权限设置
    // 这样做就可以让这个 Todo 只被当前用户看到
    let acl = new AV.ACL()
    acl.setPublicReadAccess(false) // 注意这里是 false
    acl.setWriteAccess(AV.User.current(), true)
    acl.setReadAccess(AV.User.current(), true)

    todo.setACL(acl);

    todo.save().then(function (response) {
      successFn.call(null, response.id)
    }, function (error) {
      errorFn && errorFn.call(null, error)
    });

  },
  update({ id, title, status, deleted }, successFn, errorFn) {
    // 文档 https://leancloud.cn/docs/leanstorage_guide-js.html#更新对象
    let todo = AV.Object.createWithoutData('Todo', id)
    title !== undefined && todo.set('title', title)
    status !== undefined && todo.set('status', status)
    deleted !== undefined && todo.set('deleted', deleted)
    todo.save().then((response) => {
      successFn && successFn.call(null)
    }, (error) => errorFn && errorFn.call(null, error))
  },

  destroy(todoId, successFn, errorFn) {
    // 文档 https://leancloud.cn/docs/leanstorage_guide-js.html#删除对象
    let todo = AV.Object.createWithoutData('Todo', todoId)
    //在todo表中删除为todoid的值
    todo.destroy().then(function (response) {
      successFn && successFn.call(null)
    }, function (error) {
      errorFn && errorFn.call(null, error)
    });
  }
}

export function signUp(username, password, email, successFn, errorFn) {//leancloud的用户注册API
  // 新建 AVUser 对象实例
  var user = new AV.User()
  // 设置用户名
  user.setUsername(username)
  // 设置密码
  user.setPassword(password)
  // 设置邮箱
  user.setEmail(email);
  user.signUp().then(function (loginedUser) {//注册
    let user = getUserFromAVUser(loginedUser)
    successFn.call(null, user)//成功回调
  }, function (error) {
    errorFn.call(null, error)//失败回调
  })
}

export function signIn(username, password, successFn, errorFn) {//leancloud的登录注册API
  AV.User.logIn(username, password).then(function (loginedUser) {//注册
    let user = getUserFromAVUser(loginedUser)
    successFn.call(null, user)//成功回调
  }, function (error) {
    errorFn.call(null, error)//失败回调
  })
}

export function getCurrentUser() {//获取当前缓存的用户信息
  let user = AV.User.current()
  if (user) {
    return getUserFromAVUser(user)
  }
}

export function signOut() {//登出操作
  AV.User.logOut()
}