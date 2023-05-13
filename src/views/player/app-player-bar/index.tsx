import React, { memo, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import {
  BarControl,
  BarOperator,
  BarPlayerInfo,
  PlayerBarWrapper
} from './style'
import { Link } from 'react-router-dom'
import { Slider } from 'antd'
import { shallowEqualApp, useAppSelector } from '@/store'
import { getImageSize } from '@/utils/format'

interface IProps {
  children?: ReactNode
}

const AppPlayerBar: FC<IProps> = () => {
  // 组件内部定义的数据
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  // 从redux中获取数据
  const { currentSong } = useAppSelector(
    (state) => ({
      currentSong: state.player.currentSong
    }),
    shallowEqualApp
  )

  // 组件内部的事件处理
  function handlePlayBtnClick() {
    // 1. 控制播放器的播放/暂停
    isPlaying
      ? audioRef.current?.pause()
      : audioRef.current?.play().catch(() => setIsPlaying(false))

    // 2. 改变isPlaying的状态
    setIsPlaying(!isPlaying)
  }

  return (
    <PlayerBarWrapper className="sprite_playbar">
      <div className="content wrap-v2">
        <BarControl isPlaying={isPlaying}>
          <button className="btn sprite_playbar prev"></button>
          <button
            className="btn sprite_playbar play"
            onClick={handlePlayBtnClick}
          ></button>
          <button className="btn sprite_playbar next"></button>
        </BarControl>
        <BarPlayerInfo>
          <Link to="./player">
            <img
              className="image"
              src={getImageSize(currentSong?.al?.picUrl, 50)}
              alt=""
            />
          </Link>
          <div className="info">
            <div className="song">
              <span className="song-name">{currentSong?.name}</span>
              <span className="singer-name">{currentSong?.ar[0]?.name}</span>
            </div>
            <div className="progress">
              {/* Slider组件 */}
              <Slider value={progress} />
              <div className="time">
                <span className="current">00:52</span>
                <span className="divider">/</span>
                <span className="duration">04:35</span>
              </div>
            </div>
          </div>
        </BarPlayerInfo>
        <BarOperator>
          <div className="left">
            <div className="btn pip"></div>
            <div className="btn sprite_playbar favor"></div>
            <div className="btn sprite_playbar share"></div>
          </div>
          <div className="right sprite_playbar">
            <div className="btn sprite_playbar volume"></div>
            <div className="btn sprite_playbar loop"></div>
            <div className="btn sprite_playbar playlist"></div>
          </div>
        </BarOperator>
      </div>
    </PlayerBarWrapper>
  )
}

export default memo(AppPlayerBar)
