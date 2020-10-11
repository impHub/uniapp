<template>
  <view class="container">
    <view class="main">
      <view class="u-flex user-box u-p-20">
        <view class="u-m-r-20">
          <u-avatar :src="photo" size="140" mode="square"></u-avatar>
        </view>
        <view class="u-flex-1">
          <template v-if="vuex_token">
            <!-- 直接获取vuex_里的值 -->
            <view class="u-font-18 u-p-b-20">{{ vuex_user.name }}</view>
            <view class="u-font-14 u-tips-color"
              >手机号:{{ vuex_user.mobile }}</view
            >
          </template>
          <template v-else>
            <navigator url="/pages/login/index">点此登录</navigator>
          </template>
        </view>
        <view class="u-m-l-10 u-p-10">
          <u-icon name="scan" color="#969799" size="28"></u-icon>
        </view>
      </view>

      <view class="u-m-t-20 disabled">
        <u-cell-group>
          <u-cell-item
            icon="setting"
            title="设置"
            @click="handlerClick"
          ></u-cell-item>
        </u-cell-group>
      </view>

      <view class="u-m-t-20">
        <u-cell-group>
                <u-cell-item
                v-for="(item, index) in list" :key="index"
            :value="item.certification"
            :icon="item.icon"
            :title="item.title"
            @click="addHandler(item.url)"
          >
          </u-cell-item>
          <!-- <u-cell-item
            
            icon="star"
            title="实名认证"
            @click="handlerClick(1)"
          >
          </u-cell-item>
          <u-cell-item
            icon="photo"
            title="我的房屋"
            @click="handlerClick(2)"
          ></u-cell-item>
          <u-cell-item
            icon="coupon"
            title="我的车辆"
            @click="handlerClick"
          ></u-cell-item>
          <u-cell-item
            icon="order"
            title="我的工单"
            @click="handlerClick"
          ></u-cell-item> -->
          <!-- <u-cell-item icon="heart" title="支付"  @click="handlerClick(3)"></u-cell-item> -->
        </u-cell-group>
      </view>

      <view class="u-m-t-20">
        <u-cell-group>
          <u-cell-item
            class="logout"
            v-if="vuex_token"
            icon="account"
            title="退出登录"
            @click="showModal = true"
          ></u-cell-item>
        </u-cell-group>
      </view>
    </view>
    <seek-tabbar />
    <!-- 退出登录时的提示 -->
    <u-modal
      v-model="showModal"
      @confirm="confirm"
      :show-title="false"
      :content="content"
      :show-cancel-button="true"
      :mask-close-able="true"
    ></u-modal>
  </view>
</template>

<script>
import seekTabbar from "@/components/tabbar.vue";
export default {
  components: {
    seekTabbar,
  },
  data() {
    return {
      photo: "",
      show: true,
      showModal: false,
      content: "确定退出吗?",
      certification: "未实名认证",
      list: [
        {
          title: "实名认证",
          icon: "star",
          url: "/pages/identity/identity",
          certification: "未认证",
        },
        {
          title: "我的房屋",
          icon: "photo",
          url: "/pages/houses/houses",
          certification: "",
        },
        {
          title: "我的车辆",
          icon: "coupon",
          url: "/pages/myVehicle/myVehicle",
          certification: "",
        },
        {
          title: "我的工单",
          icon: "order",
          url: "/pages/myTicket/myTicket",
          certification: "",
        },
      ],
    };
  },
  onLoad() {
    uni.getStorage({
      key: "lifeData",
      success: function (res) {
        console.log(res.data, "缓存数据");
      },
    });
  },
  methods: {
    addHandler(url){
      this.$u.route(url)
    },
    // handlerClick(n) {
    //   if (n === 1) {
    //     this.$u.route("/pages/identity/identity");
    //   } else if (n === 2) {
    //     this.$u.route("pages/houses/houses");
    //   } else if (n === 3) {
    //     this.$u.route("pages/defray/defray");
    //   } else {
    //     this.$u.toast("功能建设中");
    //   }
    // },
    // 退出登录
    confirm() {
      // // 接口请求
      this.$u.api.logout();
      // // 触发vuex方法
      this.$u.logout();
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  .camera {
    width: 54px;
    height: 44px;

    &:active {
      background-color: #ededed;
    }
  }
  .user-box {
    background-color: #fff;
  }
  .logout {
    color: #ffffff;
    background-color: #dd6161 !important;
  }
  .u-cell__value {
    color: red;
  }
}
</style>
