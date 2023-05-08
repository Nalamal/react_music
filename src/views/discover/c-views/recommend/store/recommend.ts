import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getBanners } from '../service/recommend'

// 发送获取轮播数据的请求
export const fetchBannerDataAction = createAsyncThunk(
  'banners',
  async (arg, { dispatch }) => {
    const res = await getBanners()
    dispatch(changeBannersAction(res.banners))
  }
)

// 定义inititalState的类型
interface IRecommendState {
  banners: any[]
}

// 定义轮播数据
const initialState: IRecommendState = {
  banners: []
}

// 储存轮播数据的仓库
const recommendSlice = createSlice({
  name: 'recommend',
  initialState,
  reducers: {
    changeBannersAction(state, { payload }) {
      state.banners = payload
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

export const { changeBannersAction } = recommendSlice.actions
export default recommendSlice.reducer
