import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getBanners, getHotRecommend, getNewAlbum } from '../service/recommend'

// 发送获取轮播数据的请求
export const fetchBannerDataAction = createAsyncThunk(
  'banners',
  async (arg, { dispatch }) => {
    const res = await getBanners()
    dispatch(changeBannersAction(res.banners))
  }
)

// 发送获取热门推荐的请求
export const fetchHotRecommendAction = createAsyncThunk(
  'hotRecommend',
  async (arg, { dispatch }) => {
    const res = await getHotRecommend(8)
    dispatch(changeHotRecommendsAction(res.result))
  }
)

// 发送获取最新唱片的请求
export const fetchNewAlbumAction = createAsyncThunk(
  'newAlbum',
  async (arg, { dispatch }) => {
    const res = await getNewAlbum()
    dispatch(changeNewAlbumsAction(res.albums))
  }
)

// 定义inititalState的类型
interface IRecommendState {
  banners: any[]
  hotRecommends: any[]
  newAlbums: any[]
}

// 定义轮播数据
const initialState: IRecommendState = {
  banners: [],
  hotRecommends: [],
  newAlbums: []
}

// 储存轮播数据的仓库
const recommendSlice = createSlice({
  name: 'recommend',
  initialState,
  reducers: {
    changeBannersAction(state, { payload }) {
      state.banners = payload
    },
    changeHotRecommendsAction(state, { payload }) {
      state.hotRecommends = payload
    },
    changeNewAlbumsAction(state, { payload }) {
      state.newAlbums = payload
    }
  }
  /** 
   extraReducers: (builder) => {
    builder
      // pending状态
      .addCase(fetchBannerDataAction.pending, () => {
        console.log('pending')
      })
      // fufilled状态
      .addCase(fetchBannerDataAction.fulfilled, (state, { payload }) => {
        state.banners = payload
      })
      // rejected状态
      .addCase(fetchBannerDataAction.rejected, () => {
        console.log('rejected')
      })
  }
  */
})

export const {
  changeBannersAction,
  changeHotRecommendsAction,
  changeNewAlbumsAction
} = recommendSlice.actions

export default recommendSlice.reducer
