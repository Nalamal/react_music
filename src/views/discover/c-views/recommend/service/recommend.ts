import myRequest from '@/service'

// 定义获取轮播数据的请求
export function getBanners() {
  return myRequest.get({
    url: '/banner'
  })
}
