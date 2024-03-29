const parseExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/

export interface ILyricInfo {
  time: number
  content: string
}

// 处理歌词数据
export function parseLyric(lyricString: string) {
  const lineStrings = lyricString.split('\n')

  const lyrics: ILyricInfo[] = []
  for (const line of lineStrings) {
    if (line) {
      const result = parseExp.exec(line)
      if (!result) continue
      const time1 = Number(result[1]) * 60 * 1000
      const time2 = Number(result[2]) * 1000
      const time3 =
        result[3].length === 3 ? Number(result[3]) : Number(result[3]) * 10
      const time = time1 + time2 + time3
      const content = line.replace(parseExp, '').trim()
      const lineObj = { time, content }
      lyrics.push(lineObj)
    }
  }
  return lyrics
}
