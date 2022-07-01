import request from '@/utils/request'

export const getMyChannels = () => request({
  url: '/user/channels'
})

// eslint-disable-next-line camelcase
export const getArticleList = ({ channel_id, timestamp }) => request({
  url: '/articles',
  params: {
    channel_id,
    timestamp
  }
})

export const getAllArticleList = () => request({
  url: '/channels'
})

export const saveChannels = (channels) => request({
  url: '/user/channels',
  method: 'PUT',
  data: {
    channels
  }
})
