<template>
  <div class="container" :style="{height:height, overflow:'hidden'}">
    <!-- 搜索框 -->
    <div class="input">
      <search @search="setHeight"></search>
    </div>
    <!-- 轮播图 -->
    <swiper 
    indicator-dots indicator-color="rgba(0, 0, 0, .6)" 
    indicator-active-color="#fff"
    autoplay
    circular
    >
      <swiper-item v-for="item in dataList" :key="item.goods_id">
        <a :href="'/pages/goods/main?query=' + item.goods_id"><image :src="item.image_src"></image></a>
      </swiper-item>
    </swiper>
    <!-- nav导航栏 -->
    <view class="nav">
      <navigator open-type="switchTab" :url="item.navigator_url" :key="index" v-for="(item, index) in navList">
        <image mode="aspectFit" :src="item.image_src"></image>
      </navigator>
    </view>
    <!-- 商品列表 -->
    <div class="goods" :key="index" v-for="(item, index) in goodList">
      <div class="title">
        <image mode="aspectFit" :src="item.floor_title.image_src"></image>
      </div>
      <div class="content">
        <a :href="'/pages/list/main?query='+ value.navigator_url" :key="key" v-for="(value, key) in item.product_list">
          <image :src="value.image_src"></image>
        </a> 
      </div>
    </div>
    <div class="goTop" v-show="!scrollTop" @click="goToTop">></div>
  </div>
</template>

<script>
import search from '@/components/search'
import request from '@/utils/request.js'
export default {
  data () {
    return {
      dataList: [],
      navList: [],
      goodList: [],
      scrollTop: true,
      height: 'auto',
      test: []
    }
  },
  components:{
    search
  },
  created () {
    // 轮播图
    this.getBannerList()
    // 导航栏
    this.getNavList()
    // 商品列表
    this.getGoodList()
  },
  methods: {
    // 轮播图
    async getBannerList () {
      const {message} = await request({
        url: "/api/public/v1/home/swiperdata"
      })
      this.dataList = message
    },
    // 导航栏
    async getNavList () {
      const {message} = await request({url: '/api/public/v1/home/catitems'})
      this.navList = message
    },
    // 商品列表
    async getGoodList () {
      const {message} = await request({url: '/api/public/v1/home/floordata'})
      // 处理数据
      message.forEach(item => {
        item['product_list'].forEach(value => {
          value['navigator_url'] =value['navigator_url'].split('=')[1]
        })
      })
      this.goodList = message
    },
    // 点击回到顶部
    goToTop () {
      mpvue.pageScrollTo({
        scrollTop: 0
      })
    },
    // 设置高度
    setHeight (event) {
      this.height = event
    }
  },
  // 下拉刷新事件
  onPullDownRefresh() {
    // 轮播图
    this.getBannerList()
    // 导航栏
    this.getNavList()
    // 商品列表
    this.getGoodList()
    // 获取数据完成之后停止刷新
    mpvue.stopPullDownRefresh()
  },
  // 滚动条事件
  onPageScroll(scrollTop) {
    this.scrollTop = scrollTop.scrollTop < 200
  }
}
</script>

<style scoped lang="less">
.container{
  height: 100%;
  margin: 0;
  padding: 0;
  // 搜索框
  .input{
    width: 100%;
    height: 100rpx;
    //padding: 20rpx 16rpx;
    background-color: #ea4451;
    box-sizing: border-box;
    input{
      height: 60rpx;
      background-color: #fff;
      border-radius: 5rpx;
    }
  }

  // 轮播图
swiper{
  width: 750rpx;
  height: 340rpx;
  image{
    width: 750rpx;
    height: 340rpx;
  }
}
}

//nav 导航栏
.nav{
  width: 750rpx;
  padding: 24rpx 30rpx 29rpx 30rpx;
  box-sizing: border-box;
  display: flex;
  justify-content:space-between;
  navigator{
    display: block;
    width: 128rpx;
    height: 140rpx;
    image{
      width: 100%;
      height: 100%;
    }
  }
}

// 商品列表
.goods{
  .title{
    width: 750rpx;
    height: 88rpx;
    background-color: #f4f4f4;
    image{
      width: 100%;
      height: 100%;
    }
  }
  .content{
    padding: 20rpx 16rpx;
    overflow: hidden;
    image{
      width: 100%;
      height: 100%;
    }
    a{
      display: block;
      float: left;
    }
    a:nth-child(1){
      width: 230rpx;
      height: 382rpx;
    }
    a:nth-child(n+2){
      width: 230rpx;
      height: 188rpx;
      margin-left: 10rpx;
    }
    a:nth-child(2){
      margin-bottom: 10rpx;
    }
    a:nth-child(3){
      margin-bottom: 10rpx;
    }
  }
}

// 回到顶部
.goTop{
  position: fixed;
  width: 88rpx;
  height: 88rpx;
  border-radius: 50%;
  text-align: center;
  line-height: 88rpx;
  background-color:rgba(255,255,255,0.9);
  bottom: 50rpx;
  right: 50rpx;
}
</style>
