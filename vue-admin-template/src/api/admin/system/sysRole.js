import request from '@/utils/request'
const api = '/admin/system/sysRole'
export default {
  findAll() {
    return request({
      url: `${api}/findAll`,
      method: `get`
    })
  },
  findOnPage(page, limit, sysRoleVo) {
    return request({
      url: `${api}/get/${page}/${limit}`,
      method: `get`,
      params: sysRoleVo
    })
  },
  save(data) {
    return request({
      url: `${api}/save`,
      method: `post`,
      params: data
    })
  },
  queryById(id) {
    return request({
      url: `${api}/get/${id}`,
      method: `get`
    })
  },
  deleteById(id) {
    return request({
      url: `${api}/delete/${id}`,
      method: `delete`
    })
  },
  batchDeleteById(ids) {
    return request({
      url: `${api}/delete`,
      method: `delete`,
      data: ids
    })
  },
  update(data) {
    return request({
      url: `${api}/update`,
      method: `put`,
      params: data
    })
  },
  getUserRole(id) {
    return request({
      url: `${api}/getUserRole/${id}`,
      method: `get`
    })
  },
  assignUser(data) {
    return request({
      url: `${api}/assignUser`,
      method: `post`,
      data: data
    })
  }
}
