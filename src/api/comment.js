import request from '@/utils/request'
export const getCommentList = ({ type, source, offset, limit }) => request({
  url: '/comments',
  params: {
    type,
    source,
    offset,
    limit
  }
})

export const addLike = (target) => request({
  method: 'POST',
  url: '/comment/likings',
  data: {
    target
  }
})

export const delLike = (target) => request({
  method: 'DELETE',
  url: `/comment/likings/${target}`
})

export const addComment = (data) => request({
  method: 'POST',
  url: '/comments',
  data
})
