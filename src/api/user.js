import request from '@/utils/request'
export const getSmsCode = (mobile) => request({
  url: `/sms/codes/${mobile}`
})

/**
 *
 * @param {mobile,code} param0
 * @returns promise
 */
export const login = ({ mobile, code }) => request({
  method: 'POST',
  url: '/authorizations',
  data: { mobile, code }
})

export const getUserInfo = () => request({
  url: '/user'
  // headers: {
  //   Authorization: 'Bearer ' + store.state.user.token
  // }
})
