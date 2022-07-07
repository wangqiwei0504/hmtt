import request from '@/utils/request'
export const getArticle = (article_id) => request({
  url: `/articles/${article_id}`
})

export const addUser = (target) => request({
  method: 'POST',
  url: '/user/followings',
  data: {
    target
  }
})

export const delUser = (target) => request({
  method: 'DELETE',
  url: `/user/followings/${target}`
})

export const addCollect = (target) => request({
  method: 'POST',
  url: '/article/collections',
  data: {
    target
  }
})

export const delCollect = (target) => request({
  method: 'DELETE',
  url: `/article/collections/${target}`
})
