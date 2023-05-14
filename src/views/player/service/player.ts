import myRequest from '@/service'

// 定义获取歌曲详细信息的请求
export function getSongDetail(ids: number) {
  return myRequest.get({
    url: '/song/detail',
    params: {
      ids
    }
  })
}

// 定义获取歌词的请求
export function getSongLyric(id: number) {
  return myRequest.get({
    url: '/lyric',
    params: {
      id
    }
  })
}
