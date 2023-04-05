import request from '@/utils/request'
const api = '/admin/system/sysMenu'
export default {
  findAll() {
    return request({
      url: `${api}/findNodes`,
      method: `get`
    })
  },
  save(data) {
    return request({
      url: `${api}/save`,
      method: `post`,
      params: data
    })
  },
  deleteById(id) {
    return request({
      url: `${api}/delete/${id}`,
      method: `delete`
    })
  },
  update(data) {
    return request({
      url: `${api}/update`,
      method: `put`,
      params: data
    })
  },
  // 查看某个角色的权限列表
  toAssign(roleId) {
    return request({
      url: `${api}/toAssign/${roleId}`,
      method: 'get'
    })
  },

  // 给某个角色授权
  doAssign(assignMenuVo) {
    return request({
      url: `${api}/doAssign`,
      method: 'post',
      data: assignMenuVo
    })
  }
}
