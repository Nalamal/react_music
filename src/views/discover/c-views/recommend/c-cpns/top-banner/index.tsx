import React, { memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { useAppSelector } from '@/store'
import { BannerControl, BannerLeft, BannerRight, BannerWrapper } from './style'
import { shallowEqual } from 'react-redux'
import classNames from 'classnames'
import { SwitchTransition, CSSTransition } from 'react-transition-group'

interface IProps {
  children?: ReactNode
}

const TopBanner: FC<IProps> = () => {
  /** 定义组件内部的数据 */
  const [currentIndex, setCurrentIndex] = useState(0)
  const [dotIndex, setDotIndex] = useState(0)
  const [bgImage, setBgImage] = useState<string>()
  const indexRef = useRef(currentIndex)
  const timerRef = useRef<ReturnType<typeof setInterval>>()

  /** redux中获取数据 */
  const { banners } = useAppSelector(
    (state) => ({
      banners: state.recommend.banners
    }),
    shallowEqual
  )
  useEffect(() => {
    if (!banners.length) return
    setBgImage(banners[currentIndex].imageUrl + '?imageView&blur=40x20')
  }, [banners])

  /** 事件监听的方法 */
  function handleChangeClick(isNext: boolean) {
    let newIndex = isNext ? currentIndex + 1 : currentIndex - 1
    if (newIndex > banners.length - 1) newIndex = 0
    if (newIndex < 0) newIndex = banners.length - 1
    setCurrentIndex(newIndex)
    indexRef.current = newIndex
    setDotIndex(-1)
  }

  // function handleBeforeChange() {}
  function handleAfterChange() {
    setBgImage(banners[indexRef.current].imageUrl + '?imageView&blur=40x20')
    setDotIndex(indexRef.current)
  }

  let imageUrl = ''
  if (banners.length) {
    imageUrl = banners[currentIndex].imageUrl
  }

  /** 定时器 */
  if (timerRef.current) clearInterval(timerRef.current)
  timerRef.current = setInterval(() => {
    handleChangeClick(true)
  }, 5000)

  return (
    <BannerWrapper bgImage={bgImage}>
      <div className="banner wrap-v2">
        <BannerLeft>
          <div className="banner-list">
            <SwitchTransition mode="out-in">
              <CSSTransition
                classNames="fade"
                timeout={1000}
                key={currentIndex}
                onExited={() => handleAfterChange()}
              >
                <div className="banner-item">
                  <img className="image" src={imageUrl} />
                </div>
              </CSSTransition>
            </SwitchTransition>
          </div>
          <ul className="dots">
            {banners.map((item, index) => {
              return (
                <li key={item.imageUrl}>
                  <span
                    className={classNames('item', {
                      active: dotIndex === index
                    })}
                  ></span>
                </li>
              )
            })}
          </ul>
        </BannerLeft>
        <BannerRight></BannerRight>
        <BannerControl>
          <button
            className="btn left"
            onClick={() => handleChangeClick(false)}
          ></button>
          <button
            className="btn right"
            onClick={() => handleChangeClick(true)}
          ></button>
        </BannerControl>
      </div>
    </BannerWrapper>
  )
}

export default memo(TopBanner)
