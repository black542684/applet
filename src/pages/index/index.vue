<template>
  <div class="container">
    <div class="input">
      <input placeholder="搜索" auto-focus />
    </div>
    <swiper 
    indicator-dots indicator-color="rgba(0, 0, 0, .6)" 
    indicator-active-color="#fff"
    autoplay
    circular
    >
      <swiper-item>
        <image src="/static/uploads/banner1.png"></image>
      </swiper-item>
      <swiper-item>
        <image src="/static/uploads/banner2.png"></image>
      </swiper-item>
      <swiper-item>
        <image src="/static/uploads/banner3.png"></image>
      </swiper-item>
    </swiper>
    <view class="image_content">
      <image mode="aspectFit" src="/static/uploads/icon_index_nav_4@2x.png"></image>
      <image mode="aspectFit" src="/static/uploads/icon_index_nav_3@2x.png"></image>
      <image mode="aspectFit" src="/static/uploads/icon_index_nav_2@2x.png"></image>
      <image mode="aspectFit" src="/static/uploads/icon_index_nav_1@2x.png"></image>
    </view>
    <image class="title" mode="aspectFit" src="/static/uploads/pic_floor01_title.png"></image>
    <div class="content">
      <image src="/static/uploads/pic_floor01_1@2x.png"> </image> 
      <image src="/static/uploads/pic_floor01_2@2x.png"> </image>
      <image src="/static/uploads/pic_floor01_3@2x.png"> </image>
      <image src="/static/uploads/pic_floor01_4@2x.png"> </image>
      <image src="/static/uploads/pic_floor01_5@2x.png"> </image>
    </div>
    <image class="title" mode="aspectFit" src="/static/uploads/pic_floor02_title.png"></image>
    <div class="content">
      <image src="/static/uploads/pic_floor02_1@2x.png"> </image> 
      <image src="/static/uploads/pic_floor02_2@2x.png"> </image>
      <image src="/static/uploads/pic_floor02_3@2x.png"> </image>
      <image src="/static/uploads/pic_floor02_4@2x.png"> </image>
      <image src="/static/uploads/pic_floor02_5@2x.png"> </image>
    </div>
    <image class="title" mode="aspectFit" src="/static/uploads/pic_floor03_title.png"></image>
    <div class="content">
      <image src="/static/uploads/pic_floor03_1@2x.png"> </image> 
      <image src="/static/uploads/pic_floor03_2@2x.png"> </image>
      <image src="/static/uploads/pic_floor03_3@2x.png"> </image>
      <image src="/static/uploads/pic_floor03_4@2x.png"> </image>
      <image src="/static/uploads/pic_floor03_5@2x.png"> </image>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.container{
  height: 100%;
  margin: 0;
  padding: 0;
}
.input{
  padding: 20rpx 16rpx;
  background-color: #ea4451;
  border: none;
}
.input input{
  height: 60rpx;
  background-color: #fff;
  border-radius: 5rpx;
}
swiper{
  width: 750rpx;
}
swiper image{
  width: 750rpx;
  height: 340rpx;
}
.image_content{
  width: 750rpx;
  height: 192rpx;
  padding: 24rpx 0 29rpx 0;
  box-sizing: border-box;
  display: flex;
}
.image_content image{
  height: 130rpx;
  flex: 1;
}
.title{
  width: 750rpx;
  height: 88rpx;
}
.content{
  padding: 20rpx 16rpx;
}
.content::after{
  content: "";
  display: block;
  clear: both;
}
.content image{
  display: block;
  float: left;
}
.content image:nth-child(1){
  width: 230rpx;
  height: 382rpx;
}
.content image:nth-child(n+2){
  width: 230rpx;
  height: 188rpx;
  margin-left: 10rpx;
}
.content image:nth-child(2){
  margin-bottom: 10rpx;
}
.content image:nth-child(3){
  margin-bottom: 10rpx;
}
</style>
