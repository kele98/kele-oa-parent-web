import request from '@/utils/request'
const api = '/admin/system/sysUser'
export default {
  findOnPage(page, limit, sysUserQueryVo) {
    return request({
      url: `${api}/get/${page}/${limit}`,
      method: `get`,
      params: sysUserQueryVo
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
  update(data) {
    return request({
      url: `${api}/update`,
      method: `put`,
      params: data
    })
  },
  updateStatus(id, status) {
    return request({
      url: `${api}/updateStatus/${id}/${status}/`,
      method: `put`
    })
  }
}
