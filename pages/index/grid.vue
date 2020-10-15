<template>
  <view class="container">
    <view class="leaf box-list">
      <view
        class="box"
        :class="item.bgcolor"
        v-for="(item, index) in menu"
        :key="index"
        @click="handlerClick(item)"
      >
        <view class="title">{{ item.label }}</view>
        <view class="name">{{ item.dec }}</view>
        <u-icon
          class="icon"
          :name="item.icon"
          custom-prefix="witcom-icon"
        ></u-icon>
      </view>
    </view>
    <view class="grid">
      <u-grid :col="5" :border="true" class="shadow">
        <u-grid-item
          v-for="item in grid"
          :key="item.id"
          :class="{ disabled: item.disabled }"
          @click="handlerClick(item)"
        >
          <u-icon
            class="icon"
            :name="item.icon"
            custom-prefix="witcom-icon"
            size="60"
            :style="{ color: item.color }"
          ></u-icon>
          <view class="label">{{ item.label }}</view>
        </u-grid-item>
      </u-grid>
    </view>
  </view>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import wx from "weixin-js-sdk";
export default {
  data() {
    return {
      menu: [],
      grid: [],
      list: [
        {
          id: 1,
          important: 1,
          label: "报事报修",
          icon: "guest",
          dec: "来访人员登记",
          bgcolor: "bg-cyan",
          url: "/pages/repair/repair",
        },
        // { id: 1, important: 1, label: '居民录入', icon: 'guest', dec: '来访人员登记', bgcolor: 'bg-cyan', url: "/pages/user/add" },
        {
          id: 2,
          important: 1,
          label: "生活缴费",
          icon: "heart",
          dec: "审核居民信息",
          bgcolor: "bg-blue",
          url: "/pages/expenses/expenses",
        },
        // { id: 2, important: 1, label: '居民审核', icon: 'heart', dec: '审核居民信息', bgcolor: 'bg-blue', url: "http://www.baidu.com" },
        {
          id: 3,
          important: 1,
          label: "社区党建",
          icon: "party",
          dec: "最新社区活动",
          bgcolor: "bg-purple",
          url: "/pages/grid/grid",
          disabled: true,
        },
        {
          id: 4,
          important: 1,
          label: "民生服务",
          icon: "service",
          dec: "物业便民服务",
          bgcolor: "bg-mauve",
          url: "/pages/livelihood/livelihood",
          disabled: true,
        },
        {
          id: 5,
          label: "民生服务test",
          icon: "handheart",
          dec: "",
          bgcolor: "bg-pink",
          disabled: false,
          url: "/pages/housesList/housesList",
        },
        {
          id: 6,
          label: "健康管家",
          icon: "health",
          dec: "",
          bgcolor: "bg-brown",
          disabled: true,
        },
        {
          id: 8,
          label: "报事报修",
          icon: "repair",
          dec: "",
          bgcolor: "bg-red",
          disabled: true,
        },
        {
          id: 7,
          label: "生活缴费",
          icon: "tools",
          dec: "",
          bgcolor: "bg-orange",
          url: "https://billcloud.unionpay.com/ccfront/channel/UP0000A",
        },
        {
          id: 9,
          label: "快递查询",
          icon: "gift",
          dec: "",
          bgcolor: "bg-olive",
          url: "https://m.kuaidi100.com/app",
        },
      ],
    };
  },
  computed: {
    ...mapState(["vuex_token"]),
  },
  watch: {
    // vuex_token: function(val){
    // 	this.getData()
    // }
  },
  mounted() {
    // console.log(wx);
    // wx.config({
    //   debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印
    //   appId: "", // 必填，公众号的唯一标识
    //   timestamp: DateTime.Today.ToFileTime(), // 必填，生成签名的时间戳
    //   nonceStr: "", // 必填，生成签名的随机串
    //   signature: "", // 必填，签名
    //   jsApiList: [], // 必填，需要使用的JS接口列表
    //   openTagList: [], // 可选，需要使用的开放标签列表，例如['wx-open-launch-app']
    // });
    //
    this.getData();
  },
  methods: {
    async getData() {
      // this.list = await this.$u.api.getMenu()
      this.calcList();
    },
    calcList() {
      let menu = [];
      let grid = [];
      this.list.map((item) => {
        if (item.important) {
          menu.length < 4 && menu.push(item);
        } else {
          grid.push(item);
        }
      });
      this.menu = menu;
      this.grid = grid;
    },
    handlerClick(item) {
      console.log(item.id, item.url);

      if (item.id === 2) {
        console.log("缴费");
        let userAgent = navigator.userAgent.toLowerCase();
        if (userAgent.match(/Alipay/i) == "alipay") {
          // 支付宝
          this.$u.route("https://m.alipay.com/4rGLYmW");
        } else if (userAgent.match(/MicroMessenger/i) == "micromessenger") {
          // 微信(接入JSSDK)
        } else {
          // H5
          this.$u.route(item.url);
        }
      } else {
        this.$u.route(item.url);
      }
      // if(item.url){
      //   uni.navigateTo({
      //   url: item.url,
      // });
      // }else{
      // 	this.$u.route(item.url)
      // }

      // if(item.id === 1){
      // 	console.log(item.id)
      // 	// this.$u.route(item.url)
      // 	uni.switchTab({
      // 		url: item.url
      // 	});
      // }else{
      // 	if(item.disabled){
      // 	console.log('开始触发item.disabled2')
      // 	// console.log(item);
      // 	// this.$u.toast('功能建设中')
      // 	this.$u.route('pages/system/building')
      // }else{
      // 	console.log('身份上传3',item.url)
      // 	// 跳转到身份上传页 会触发vuex和
      // 	this.$u.route(item.url)
      // }
      // }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;

  .leaf {
    position: relative;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    box-align: center;
    // margin-top: -60px;
    padding: 0;

    .box {
      width: 45%;
      margin: 0 2.5% 40rpx;
    }
  }

  .grid {
    padding: 5px 10px;
    box-sizing: border-box;
    .label {
      color: $u-content-color;
      padding-top: 5px;
    }

    .u-grid-item {
      &:first-child,
      &:last-child {
        border-radius: 5px 0 0 5px;
      }
    }
  }

  .disabled {
    .icon,
    .label,
    .dec {
      color: #c0c4cc !important;
    }
  }
}
</style>
