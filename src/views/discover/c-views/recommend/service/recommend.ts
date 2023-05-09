import myRequest from '@/service'

// 定义获取轮播数据的请求
export function getBanners() {
  return myRequest.get({
    url: '/banner'
  })
}

// 定义获取热门推荐的请求
export function getHotRecommend(limit = 30) {
  return myRequest.get({
    url: '/personalized',
    params: {
      limit
    }
  })
}

// 定义获取最新唱片的请求
export function getNewAlbum() {
  return myRequest.get({
    url: '/album/newest'
  })
}
