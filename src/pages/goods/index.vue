<template>
  <div class="wrapper">
    <!-- 商品图片 -->
    <swiper class="pics" indicator-dots indicator-color="rgba(255, 255, 255, 0.6)" indicator-active-color="#fff">
      <swiper-item v-for="(item, i) in data.pics" :key="i">
        <image :src="item.pics_big"></image>
      </swiper-item>
    </swiper>
    <!-- 基本信息 -->
    <div class="meta">
      <p class="price">￥{{data.goods_price}}</p>
      <p class="name">{{data.goods_name}}</p>
      <p class="shipment">快递: 免运费</p>
      <span class="collect">收藏</span>
    </div>
    <!-- 商品详情 -->
    <div class="detail">
      <rich-text v-html="data.goods_introduce"></rich-text>
    </div>
    <!-- 操作 -->
    <div class="action">
      <button open-type="contact">联系客服</button>
      <span @click="toCart" class="cart">购物车</span>
      <span @click="addCart" class="add">加入购物车</span>
      <span class="buy">立即购买</span>
    </div>
  </div>
</template>

<style scoped lang="less">

  .wrapper {
    margin-bottom: 100rpx;
    background-color: #f4f4f4;
  }

  .pics {
    height: 750rpx;
    image{
      width: 750rpx;
      height: 750rpx;
    }
  }
  
  .meta {
    height: 270rpx;
    line-height: 1;
    padding: 30rpx 180rpx 30rpx 20rpx;
    box-sizing: border-box;
    background-color: #fff;
    position: relative;

    .price {
      font-size: 36rpx;
      color: #ea4451;
      margin-bottom: 30rpx;
    }

    .name {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      box-orient: vertical;
      height: 88rpx;
      color: #333;
      line-height: 1.4;
      font-size: 33rpx;
    }

    .shipment {
      font-size: 27rpx;
      color: #999;
      position: absolute;
      bottom: 30rpx;
    }

    .collect {
      width: 140rpx;
      height: 88rpx;
      text-align: center;
      padding-top: 50rpx;
      box-sizing: border-box;
      border-left: 1rpx solid #ddd;
      font-size: 22rpx;
      color: #999;

      position: absolute;
      right: 20rpx;
      top: 91rpx;
    }
  }

  .detail image {
    width: 100%;
    height: 480rpx;
    margin-top: 20rpx;
  }

  .action {
    width: 100%;
    height: 98rpx;
    background-color: #fff;

    position: fixed;
    left: 0;
    bottom: 0;

    display: flex;

    span {
      display: block;
    }

    .add, .buy {
      width: 210rpx;
      text-align: center;
      line-height: 98rpx;
      font-size: 27rpx;
      color: #fff;
    }

    .add {
      background-color: #f4b73f;
    }

    .buy {
      background-color: #ea4451;
    }

    button {
      padding: 0;
      border-radius: 0;
      background-color: #fff;

      &::after {
        border: none;
      }
    }

    button, .cart {
      flex: 1;
      line-height: 1;
      color: #989898;
      font-size: 24rpx;
      box-sizing: border-box;
      padding-top: 56rpx;                         
    }
  }

</style>

<script>
import request from '@/utils/request'
import sleep from '@/utils/sleep'
export default {
  data () {
    return {
      data: {}
    }
  },
  methods: {
    // 去购物车
    toCart () {},
    // 加入购物车
    async addCart () {
      const list = mpvue.getStorageSync('cart') || []
      let index = list.findIndex(item => item.goods_id === this.data.goods_id)
      if (index === -1){
        list.push({
          goods_id: this.data.goods_id,
          goods_name: this.data.goods_name,
          goods_price: this.data.goods_price,
          goods_small_logo: this.data.goods_small_logo,
          goods_num: 1,
          checked: true
        })
      } else {
        list[index].goods_num += 1
      }
      mpvue.setStorageSync('cart', list)
      // 提示
      mpvue.showToast({title: '添加成功！'})
      // 延迟执行
      await sleep(2000)
      // 跳转至购物车
      mpvue.switchTab({url: '/pages/cart/main'})
    }
  },
  async onLoad(option) {
    const {message} = await request({
      url: '/api/public/v1/goods/detail',
      data: {goods_id: option.query}
    })
    this.data = message
  }
}
</script>