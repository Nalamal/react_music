import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getBanners, getHotRecommend, getNewAlbum } from '../service/recommend'

export const fetchRecommendDataAction = createAsyncThunk(
  'fetchdata',
  (_, { dispatch }) => {
    // 1. 获取轮播图数据
    getBanners().then((res) => {
      dispatch(changeBannersAction(res.banners))
    })
    // 2. 获取热门推荐数据
    getHotRecommend(8).then((res) => {
      dispatch(changeHotRecommendsAction(res.result))
    })
    // 3. 获取最新唱片数据
    getNewAlbum().then((res) => {
      dispatch(changeNewAlbumsAction(res.albums))
    })
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
