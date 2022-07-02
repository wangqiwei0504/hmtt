import request from '@/utils/request'
export const getSuggestList = q => request({
  url: '/suggestion',
  params: {
    q
  }
})

// eslint-disable-next-line camelcase
export const getSearchResult = ({ page = 1, per_page, q }) => request({
  url: '/search',
  params: {
    page, per_page, q
  }
})
