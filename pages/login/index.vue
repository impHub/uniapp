<template>
  <view class="container">
    <u-navbar
      :custom-back="goBack"
      back-text="个人中心"
      title="登录"
      :background="{ backgroundColor: '#f7f7f7' }"
    >
      <navigator
        class="navbar-right"
        slot="right"
        url="/pages/index/index"
        open-type="switchTab"
        >返回首页</navigator
      >
    </u-navbar>
    <view class="main">
      <view class="title">智慧社区手机物业端登录</view>
      <view v-show="loginType === 'mobile'">
        <u-input
          v-model="mobile"
          type="number"
          :maxlength="11"
          :border="true"
          :height="100"
          :custom-style="{ fontSize: '40rpx' }"
          placeholder="请输入手机号"
        />
        <view class="tips">管理帐号中绑定了手机才可以使用手机号登录</view>
        <u-button type="primary" :disabled="!validMobile()" @click="getCaptcha"
          >获取短信验证码</u-button
        >
      </view>
      <view v-show="loginType === 'account'">
        <u-form :model="form" ref="accountForm">
          <u-form-item prop="username" labelWidth="0" class="item">
            <u-input
              v-model="form.username"
              type="text"
              :border="true"
              :height="100"
              :custom-style="{ fontSize: '40rpx' }"
              class="input"
              placeholder="请输入用户名"
            />
          </u-form-item>
          <u-form-item prop="password" labelWidth="0" class="item">
            <u-input
              v-model="form.password"
              type="password"
              :border="true"
              :height="100"
              :custom-style="{ fontSize: '40rpx' }"
              class="input"
              :password-icon="true"
              placeholder="请输入密码"
            />
          </u-form-item>
          <view class="tips"></view>
          <u-button type="primary" @click="submit">登录</u-button>
        </u-form>
      </view>
      <view class="alternative"></view>
      <view class="loginType">
        <view
          class="item"
          v-if="loginType === 'mobile'"
          @click="loginType = 'account'"
        >
          <u-icon size="70" name="more-circle" color="#8dc63f"></u-icon>
          <text>密码登录</text>
        </view>
        <view
          class="item"
          v-if="loginType === 'account'"
          @click="loginType = 'mobile'"
        >
          <u-icon size="70" name="more-dot-fill" color="#f37b1d"></u-icon>
          <text>验证码登录</text>
        </view>
      </view>
    </view>
    <!--  -->
    <view class="addRegistered" @click="addRegistered"
      >还没账号?<text style="color: #2979ff">去注册</text></view
    >
    <!--  -->
    <!-- <view class="buttom">
      <view class="hint">
        登录代表同意<text class="link">用户协议、隐私政策，</text
        >并授权使用您的账号信息（如昵称、头像）以便您统一管理
      </view>
    </view> -->
    <u-select
      v-model="com.show"
      :list="com.list"
      label-name="name"
      value-name="id"
      :mask-close-able="false"
      @confirm="chooseCom"
    ></u-select>
    <!-- 登录成功时的提示 -->
    <u-toast ref="uToast" />
  </view>
</template>

<script>
import md5Libs from "uview-ui/libs/function/md5";
export default {
  data() {
    return {
      loginType: "account",
      mobile: "",
      com: {
        show: false,
        list: [],
      },
      form: {
        username: "",
        password: "",
        villageId: "",
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: ["change", "blur"],
            min: 4,
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: ["change", "blur"],
            min: 6,
          },
        ],
      },
    };
  },
  computed: {
    inputStyle() {
      let style = {};
      if (this.mobile) {
        style.color = "#fff";
        style.backgroundColor = this.$u.color["warning"];
      }
      return style;
    },
  },
  onReady() {
    this.$refs.accountForm.setRules(this.rules);
  },
  mounted() {
    // this.$u.vuex('vuex_user.name', '张三')
  },
  methods: {
    addRegistered() {
      this.$u.route("/pages/registered/registered");
    },
    goBack() {
      console.log("goback");
      uni.switchTab({
        url: "/pages/mine/index",
      });
    },
    validMobile() {
      return this.$u.test.mobile(this.mobile);
    },
    getCaptcha() {
      if (this.validMobile()) {
        // 跳转路由并传递手机号
        this.$u.route({
          url: "/pages/login/code",
          params: { mobile: this.mobile },
        });
      }
    },
    chooseCom(data) {
      if (Array.isArray(data) && data.length > 0) {
        this.form.villageId = data[0].value;
        this.submit();
      }
    },
    submit() {
      // console.log(formData);
      this.$refs.accountForm.validate((valid) => {
        if (valid) {
          console.log(this.form);
          this.$u.api
            .login({
              mobile: this.form.username,
              // mobile: 18571510092,
              // loginName: this.form.username,
              password: md5Libs.md5(this.form.password),
              type: false,
              // villageId: this.form.villageId,
            })
            .then((data) => {
              if (Array.isArray(data) && data.length > 0) {
                console.log(data, "data失败");
                // 登录失败
                this.com.list = data;
                this.com.show = true;
              } else {
                this.$refs.uToast.show({
                  title: "登录成功",
                  type: "success",
                });
                //登录成功 后台传来用户信息值有id token 权限
                console.log(data, "data登录成功");
                // 触发vuex login方法;存储token
                this.$u.login(data);
              }
            })
            .catch((err) => {
              //
              console.log(err);
            });
        } else {
          console.log("验证失败");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  font-size: 28rpx;
  .addRegistered {
    text-align: center;
    margin-top: 30rpx;
    font-weight: 600;
  }
  .navbar-right {
    margin-right: 24rpx;
    display: flex;
  }
  .main {
    width: 600rpx;
    padding-top: 80rpx;
    margin: 0 auto;

    .title {
      text-align: left;
      font-size: 48rpx;
      font-weight: 500;
      margin-bottom: 100rpx;
    }
    .input {
      text-align: left;
      margin-bottom: 10rpx;
      padding-bottom: 6rpx;
    }
    .tips {
      color: $u-type-info;
      margin-bottom: 60rpx;
      margin-top: 8rpx;
      font-size: 12px;
    }
    .getCaptcha {
      background-color: rgb(253, 243, 208);
      color: $u-tips-color;
      border: none;
      font-size: 30rpx;
      padding: 12rpx 0;

      &::after {
        border: none;
      }
    }
    .alternative {
      color: $u-tips-color;
      display: flex;
      justify-content: space-between;
      margin-top: 30rpx;
    }
    .loginType {
      display: flex;
      padding: 100rpx 150rpx 20rpx 150rpx;
      justify-content: center;

      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: $u-content-color;
        font-size: 28rpx;
      }
    }
  }
  .buttom {
    position: absolute;
    bottom: 0;
    .hint {
      padding: 20rpx 40rpx;
      font-size: 20rpx;
      color: $u-tips-color;

      .link {
        color: $u-type-warning;
      }
    }
  }
}
</style>
