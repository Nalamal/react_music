import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  getArtistList,
  getBanners,
  getHotRecommend,
  getNewAlbum,
  getPlaylistDetail
} from '../service/recommend'

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
    // 4. 获取歌手列表数据
    getArtistList(5).then((res) => {
      dispatch(changeSettleSingersAction(res.artists))
    })
  }
)

// 获取榜单数据
const rankingIds = [19723756, 3779629, 2884035]
export const fetchRankingDataAction = createAsyncThunk(
  'rankingData',
  (_, { dispatch }) => {
    // 1. 每一个请求单独处理
    // for (const id of rankingIds) {
    //   getPlaylistDetail(id).then((res) => {
    //     switch (id) {
    //       case 19723756:
    //         console.log('飙升榜的数据', res)
    //         break
    //       case 3779629:
    //         console.log('新歌榜的数据', res)
    //         break
    //       case 2884035:
    //         console.log('原创榜的数据', res)
    //         break
    //     }
    //   })
    // }

    // 2. 将三个结果都拿到，统一放到一个数组中管理
    // 保障一：获取到所有的结果后，进行dispatch操作
    // 保障二：获取到的结果一定是有正确的顺序
    const promises: Promise<any>[] = []
    for (const id of rankingIds) {
      promises.push(getPlaylistDetail(id))
    }

    Promise.all(promises).then((res) => {
      const playlists = res
        .filter((item) => item.playlist)
        .map((item) => item.playlist)
      dispatch(changeRankingsAction(playlists))
    })
  }
)

// 定义inititalState的类型
interface IRecommendState {
  banners: any[]
  hotRecommends: any[]
  newAlbums: any[]
  rankings: any[]
  settleSingers: any[]
}

// 定义轮播数据
const initialState: IRecommendState = {
  banners: [],
  hotRecommends: [],
  newAlbums: [],
  rankings: [],
  settleSingers: []
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
    },
    changeRankingsAction(state, { payload }) {
      state.rankings = payload
    },
    changeSettleSingersAction(state, { payload }) {
      state.settleSingers = payload
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
  changeNewAlbumsAction,
  changeRankingsAction,
  changeSettleSingersAction
} = recommendSlice.actions

export default recommendSlice.reducer
