
<template>
  <div>
    <!-- 筛选 -->
    <div class="filter">
      <span class="active">综合</span>
      <span>销量</span>
      <span>价格</span>
    </div>
    <!-- 商品列表 -->
    <scroll-view @scrolltolower="pages" class="goods" scroll-y>
      <div v-if="list.length">
        <!-- 渲染商品列表 -->
        <div @click="goods(item.goods_id)" class="item" :key="i" v-for="(item,i) in list">
          <!-- 商品图片 -->
          <image class="pic" :src="item.goods_small_logo"></image>
          <!-- 商品信息 -->
          <div class="meta">
            <p class="name">{{item.goods_name}}</p>
            <p class="price"><span>￥</span>{{item.goods_price}}<span>.00</span></p>
          </div>
        </div>
      </div>
      <div class="item"  style="text-align:center;" v-else>
        <text>没有商品数据</text>
      </div>
    </scroll-view>
  </div>
</template>

<style scoped lang="less">

  .filter {
    display: flex;
    height: 96rpx;
    line-height: 96rpx;
    border-bottom: 1rpx solid #ddd;

    span {
      flex: 1;
      text-align: center;
      font-size: 30rpx;
      color: #333;

      &.active {
        color: #ea4451;
      }
    }
  }
  
  .goods {
    position: absolute;
    width: 100%;
    top: 97rpx;
    bottom: 0;
  }

  .item {
    display: flex;
    padding: 30rpx 20rpx 30rpx 0;
    margin-left: 20rpx;
    border-bottom: 1rpx solid #eee;

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
  }

</style>

<script>
import request from '@/utils/request'
  export default {
    data () {
      return {
        list: [],
        pagenum: 1,
        pagesize: 5,
        query: '',
        total: ''
      }
    },
    methods: {
      goods (id) {
        mpvue.navigateTo({
          url: '/pages/goods/main?query=' + id
        })
      },
      async pages () {
        console.log('触发了')
        if (this.list.length >= this.total) return false
        this.pagenum += 1
        const {message} = await request({url: '/api/public/v1/goods/search',data:{query: this.query,pagenum: this.pagenum,pagesize: this.pagesize}})
        this.list = [...this.list, ...message.goods]
        console.log(message.goods)
      }
    },
    async onLoad(option) {
      this.query = option.query
      const {message} = await request({url: '/api/public/v1/goods/search',data:
      {
        query: option.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      }})
      this.list = message.goods
      this.total = message.total
    },
    onUnload () {
      this.pagenum = 1
    }
  }
</script>