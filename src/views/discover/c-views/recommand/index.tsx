import myRequest from '@/service'
import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}

interface IBannerData {
  adDispatchJson: any
  adLocation: any
  adSource: any
  adid: any
  bannerBizType: string
  encodeId: string
  event: any
  exclusive: boolean
  extMonitor: boolean
  extMonitorInfo: any
  imageUrl: string
  monitorBlackList: any
  monitorClick: any
  monitorClickList: any
  monitorImpress: any
  monitorImpressList: any
  monitorType: any
  program: any
  scm: string
  song: any
  targetId: number
  targetType: number
  titleColor: string
  typeTitle: string
  url: any
  video: any
}

const Recommand: FC<IProps> = () => {
  const [banners, setBanners] = useState<IBannerData[]>([])

  // 测试网络请求
  useEffect(() => {
    myRequest
      .get({
        url: '/banner'
      })
      .then((res) => {
        setBanners(res.banners)
      })
  })

  return (
    <div>
      {banners.map((item, index) => {
        return <div key={index}>{item.imageUrl}</div>
      })}
    </div>
  )
}

export default memo(Recommand)
