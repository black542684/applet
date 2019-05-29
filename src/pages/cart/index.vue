<template>
  <div class="wrapper">
    <div v-if="!shop">
      <!-- 收货信息 -->
      <dl class="shipment">
        <dt>收货人: </dt>
        <dd class="meta">
          <span class="name">刘德华</span>
          <span class="phone">13535337057</span>
        </dd>
        <dt>收货地址:</dt>
        <dd>广东省广州市天河区一珠吉</dd>
      </dl>
      <!-- 购物车 -->
      <div class="carts">
        <div class="item">
          <!-- 店铺名称 -->
          <div class="shopname">优购生活馆</div>
          <div :key="index" v-for="(item,index) in goodsList" class="goods">
            <!-- 商品图片 -->
            <image class="pic" :src="item.goods_small_logo"></image>
            <!-- 商品信息 -->
            <div class="meta">
              <p class="name">{{item.goods_name}}</p>
              <p class="price"><span>￥</span>{{item.goods_price}}<span>.00</span></p>
              <!-- 加减 -->
              <div class="amount">
                <span class="reduce" @click="amount(-1, index)">-</span>
                <input type="number" :value="item.goods_num" class="number">
                <span class="plus" @click="amount(1, index)">+</span>
              </div>
            </div>
            <!-- 选框 -->
            <span class="checkbox" @click="Change(index)">
              <icon type="success" size="20" :color="item.checked ? '#ea4451' : '#ccc' "></icon>
            </span>
          </div>
        </div>
      </div>
      <!-- 其它 -->
      <div class="extra">
        <label class="checkall" @click="checkall">
          <icon type="success" :color="allChecked ? '#ea4451' : '#ccc' " size="20"></icon>
          全选
        </label>
        <div class="total">
          合计: <span>￥</span><label>{{total}}</label><span>.00</span>
        </div>
        <div class="pay" @click="pay">结算({{isAmount}})</div>
      </div>
    </div>
    <div class="isShop" v-if="shop">
      <div>
        <img src="/static/images/cartIcon.png" alt="">
        <p>你还没有添加任何商品</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">

  .shipment {
    height: 100rpx;
    line-height: 2;
    padding: 30rpx 30rpx 40rpx 30rpx;
    font-size: 27rpx;
    color: #333;
    background-color: #fff;
    background-image: url(https://ugo2.oss-cn-hangzhou.aliyuncs.com/images/cart_border%402x.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: bottom;

    dt {
      width: 140rpx;
      float: left;
      clear: both;
    }

    dd {
      padding-left: 160rpx;
    }

    .meta {
      padding-right: 50rpx;
    }

    span.phone {
      float: right;
    }
  }

  .carts {
    background-color: #f4f4f4;
    padding-bottom: 110rpx;
    overflow: hidden;

    .item {
      margin-top: 20rpx;
    }
    
    .shopname {
      padding: 30rpx;
      font-size: 30rpx;
      color: #333;
      background-color: #fff;
      border-top: 1rpx solid #eee;
      border-bottom: 1rpx solid #eee;
    }

    .goods {
      display: flex;
      padding: 30rpx 20rpx 30rpx 0;
      margin-left: 100rpx;
      border-bottom: 1rpx solid #eee;
      background-color: #fff;
  
      position: relative;

      span.checkbox {
        display: block;
        width: 101rpx;
        height: 100%;
        background-color: #fff;

        display: flex;
        justify-content: center;
        align-items: center;

        position: absolute;
        left: -100rpx;
        top: 0;
      }

      &:last-child {
        border-bottom: none;
      }

      .pic {
        width: 200rpx;
        height: 200rpx;
        margin-right: 30rpx;
      }

      .meta {
        flex: 1;
        font-size: 27rpx;
        color: #333;
        position: relative;
      }

      .name {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .price {
        position: absolute;
        bottom: 0;

        color: #ea4451;
        font-size: 33rpx;

        span {
          font-size: 22rpx;
        }
      }

      .amount {
        position: absolute;
        bottom: 0;
        right: 20rpx;

        height: 48rpx;
        text-align: center;
        border: 1rpx solid #ddd;
        border-radius: 8rpx;

        display: flex;
        align-items: center;

        span {
          display: block;
          width: 60rpx;
          line-height: 48rpx;
          font-size: 36rpx;
          color: #ddd;
          text-align: center;
        }

        input {
          width: 60rpx;
          height: 48rpx;
          min-height: 48rpx;
          font-size: 27rpx;
          border-left: 1rpx solid #ddd;
          border-right: 1rpx solid #ddd;
        }
      }
    }
  }

  .extra {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 9;

    width: 750rpx;
    height: 96rpx;
    text-align: center;
    line-height: 96rpx;
    font-size: 36rpx;
    border-top: 1rpx solid #eee;
    background-color: #fff;
    color: #333;
    
    display: flex;

    .checkall {
      width: 140rpx;
      line-height: 1;
      margin-left: 25rpx;
      display: flex;
      align-items: center;

      icon {
        margin-right: 20rpx;
      }
    }

    .total {
      display: flex;
      justify-content: center;
      flex: 1;

      label, span {
        color: #ea4451;
        vertical-align: bottom;
        position: relative;
        bottom: -2rpx;
      }

      span {
        position: relative;
        bottom: -3rpx;
        font-size: 24rpx;

        &:first-child {
          margin-left: 10rpx;
        }
      }
    }

    .pay {
      width: 200rpx;
      background-color: #ea4451;
      color: #fff;
    }

  }

  .isShop {
    position: absolute;
    display: flex;
    justify-content: center;
    width: 100%;
    top: 0;
    bottom: 0;
    background-color: #f4f4f4;
    div {
      padding-top: 100rpx;
      text-align: center;
      img{
        width: 180rpx;
        height: 180rpx;
      }
      p {
        padding-top: 50rpx;
      }
    }
  }
</style>

<script>
import getSetting from "@/utils/getSetting"
import login from "@/utils/login"
import getUserInfo from "@/utils/getUserInfo"
  export default {
    data () {
      return {
        goodsList: [],
        allChecked: true,
        total: 0,
        isAmount: 0,
        shop: false
      }
    },
    methods: {
      // 计算总价格
      count () {
        // 总价格
        this.total = 0
        this.isAmount = 0
        if (!this.goodsList.length) return this.total = 0
        const list = this.goodsList.filter(item => item.checked)
        list.forEach(item => {
          this.total += item.goods_price * item.goods_num
          // 总数量
          this.isAmount += item.goods_num
        })
      },
      // 单选
      Change (i) {
        // 改变数据
        this.goodsList[i].checked = !this.goodsList[i].checked
        const value = this.goodsList.find(item => item.checked === false)
        if (value) {
          this.allChecked = false
        } else {
          this.allChecked = true
        }
        // 改变本地数据
        const list = mpvue.getStorageSync('cart')
        list[i].checked = this.goodsList[i].checked
        mpvue.setStorageSync('cart',list)
        // 计算价格
        this.count()
      },
      // 全选
      checkall () {
        this.allChecked = !this.allChecked
        this.goodsList.forEach(item => {
          item.checked = this.allChecked
        })
        // 改变本地数据
        const list = mpvue.getStorageSync('cart')
        list.map(item => {
          item.checked = this.allChecked
        })
        mpvue.setStorageSync('cart',list)
        // 计算价格
        this.count()
      },
      // 修改数量
      amount (step, index) {
        const list = mpvue.getStorageSync('cart')
        if (step == -1 && this.goodsList[index].goods_num > 1) {
          this.goodsList[index].goods_num += -1
          list[index].goods_num += -1
        }
        if (step == 1 && this.goodsList[index].goods_num < 10) {
          this.goodsList[index].goods_num += 1
          list[index].goods_num += 1
        }
        // 改变本地数据
        mpvue.setStorageSync('cart',list)
        // 计算价格
        this.count()
      },
      // 结算
      async pay () {
        // 获取用户的当前设置。返回值中只会出现小程序已经向用户请求过的权限。
        const {authSetting} = await getSetting()
        // console.log(authSetting['scope.userInfo'])
        // 如果用户已经授权过
        if (authSetting['scope.userInfo']) {
          // 调用接口获取登录凭证（code）
          const {code} = await login()
          // console.log(data)
          // 获取用户信息
          const data = await getUserInfo()
          // console.log(data)
        } else {
          console.log('没有授权')
        }
      }
    },
    onShow () {
      // 获取购物车里的信息
      this.goodsList = mpvue.getStorageSync('cart')
      // 计算价格
      this.count()
      // 查看购物车里是否有信息
      if (this.goodsList.length) {
        this.shop = false
      } else {
        this.shop = true
      }
    }
  }
</script>