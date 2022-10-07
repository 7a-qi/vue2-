import Mock from 'mockjs'
import home from './home'
import user from './user'
import permission from './permission'
Mock.mock('/home', home.getStatisticalData)
Mock.mock('/user/add','post', user.createUser)
Mock.mock('/user/edit', 'post', user.updateUser)
Mock.mock('/user/getUser','get', user.getUserList)
Mock.mock(/user\/del/, 'get', user.deleteUser)
Mock.mock('/permission/getMenu', 'post', permission.getMenu)