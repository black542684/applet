<template>
  <div>
    <div class="header">
      <div class="profile">
        <!-- 头像 -->
        <div class="head">
          <div v-show="user.nickName"  class="userImage">
            <image class="myImage" :src="user.avatarUrl"></image>
          </div>
          <image class="lf" src="/static/images/set.png"></image>
          <image class="rf" src="/static/images/tips.png"></image>
        </div>
        <button v-show="!user.nickName" @getuserinfo="getUserInfo" open-type="getUserInfo" class="bottom">登录/注册</button>
        <p class="myUser" v-show="user.nickName">{{user.nickName}}</p>
      </div>
    </div>
    <div class="content">
      <div class="nav">
        <div>
          <p>0</p>
          <p>收藏的店铺</p>
        </div>
        <div>
          <p>0</p>
          <p>收藏的商品</p>
        </div>
        <div>
          <p>0</p>
          <p>关注的商品</p>
        </div>
        <div>
          <p>0</p>
          <p>我的足迹</p>
        </div>
      </div>
      <div class="list">
        <div class="top">我的订单</div>
        <div class="bottom"></div>
      </div>
      <div class="address">收货地址管理
        <image class="arrows" src="/static/images/right.png"></image>
      </div>
      <!-- 客服 -->
      <div class="service">
        <ul>
          <li>联系客服<span class="phone">400-618-4000</span></li>
          <li>意见反馈<image class="arrows" src="/static/images/right.png"></image></li>
          <li>关于我们<image class="arrows" src="/static/images/right.png"></image></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import getSetting from "@/utils/getSetting"
import getUserInfo from "@/utils/getUserInfo"
export default {
  data () {
    return {
      user: {}
    }
  },
  methods: {
    async getUserInfo () {
      // 获取用户信息
      const data = await getUserInfo()
      this.user = data.userInfo
      console.log(111)
    }
  },
  async onShow () {
     // 获取用户的当前设置。返回值中只会出现小程序已经向用户请求过的权限。
    const {authSetting} = await getSetting()
    console.log(authSetting['scope.userInfo'])
    // 如果用户已经授权过
    if (authSetting['scope.userInfo']) {
      // 获取用户信息
      const data = await getUserInfo()
      this.user = data.userInfo
    } else {
      console.log('没有授权')
    }
  }
}
</script>
<style scoped lang="less">
  .header{
    width: 100%;
    height: 410rpx;
    box-sizing: border-box;
    background-color: #ea4451;
    overflow: hidden;
    .profile{
      margin-top: 110rpx;
      width: 750rpx;
      height: 200rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      .head{
        position: relative;
        width: 136rpx;
        height: 136rpx;
        border-radius: 50%;
        background-color: #fff;
        // position: absolute;
        // left: 50%;
        // transform: translateX(-50%);
        .userImage{
            width: 136rpx;
            height: 136rpx;
            overflow: hidden;
            border-radius: 50%;
          .myImage{ 
            width: 136rpx;
            height: 136rpx;
          }
        }
        .lf{
          position: absolute;
          top: 50%;
          left: -68rpx;
          transform: translateY(-50%);
          width: 28rpx;
          height: 28rpx;
        }
        .rf{
          position: absolute;
          top: 50%;
          right: -68rpx;
          transform: translateY(-50%);
          width: 28rpx;
          height: 28rpx;
        }
      }
      .bottom{
        background-color: rgba(255,255,255,0);
        border: 0 none;
        height: 50rpx;
        padding: 0;
        line-height: 50rpx;
        margin-top: 16rpx;
        color: #fff;
      }
      .bottom:after{ border: none; }
      .myUser{
        color: #fff;
        padding-top: 10rpx;
      }
    }
  }
  .content{
    width: 750rpx;
    height: 100%;
    padding: 0 16rpx 100rpx;
    background-color: #f4f4f4;
    box-sizing:border-box;
    border-top:1px solid #f4f4f4;
    .nav{
      width: 100%;
      height: 120rpx;
      margin-top: -26rpx;
      background-color: #fff;
      font-size: 26rpx;
      display: flex;
      justify-content: space-around;
      text-align:center;
      align-items: center;
      p:nth-child(1){
        color: #999999;
      }
      p:nth-child(2){
        color: #666666;
      }
    }
    // 我的订单
    .list{
      width: 100%;
      height: 255rpx;
      margin-top: 20rpx;
      color: #333333;
      background-color: #fff;
      .top{
        padding-left: 30rpx;
        font-size: 30rpx;
        line-height: 88rpx;
        height: 88rpx;
        border-bottom: 1px solid #ddd;
      }
    }
    // 收货地址管理
    .address{
      position: relative;
      width: 100%;
      height: 88rpx;
      line-height: 88rpx;
      padding-left: 32rpx;
      font-size: 30rpx;
      color:#333333;
      background-color: #fff;
      margin-top: 20rpx;
      box-sizing: border-box;
      .arrows{
        width: 14rpx;
        height: 23rpx;
        position: absolute;
        top: 50%;
        right: 30rpx;
        transform: translateY(-50%);
      }
    }
    // 我的客服
    .service{
      margin-top: 20rpx;
      padding: 0 0 20rpx 30rpx;
      widows: 100%;
      background-color: #fff;
      box-sizing: border-box;
      ul{
        li{
          color: #333333;
          position: relative;
          width: 100%;
          height: 86rpx;
          font-size: 30rpx;
          line-height: 86rpx;
          border-bottom: 1rpx solid #ccc;
          .phone{
            display: block;
            position: absolute;
            color: #999999;
            height: 86rpx;
            top: 0;
            right: 32rpx;
          }
          .arrows{
            width: 14rpx;
            height: 23rpx;
            position: absolute;
            top: 50%;
            right: 30rpx;
            transform: translateY(-50%);
          }
        }
      }
    }
  }
</style>