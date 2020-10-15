<template>
  <view class="container">
    <!-- 和默认header不能共存 -->
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
      <view class="title">智慧社区手机物业端注册</view>
      <view v-show="loginType === 'account'">
        <u-form :model="form" ref="accountForm">
          <u-form-item prop="phoneNumber" labelWidth="0" class="item">
            <u-input
              v-model="form.phoneNumber"
              type="text"
              :border="true"
              :height="100"
              :custom-style="{ fontSize: '40rpx' }"
              class="input"
              placeholder="请输入手机号"
            />
          </u-form-item>
          <u-form-item prop="verificationCode" labelWidth="0" class="item">
            <view slot="right" class="container_verificationCode">
              <u-toast ref="uToast"></u-toast>
              <u-verification-code
                :seconds="seconds"
                ref="uCode"
                @change="codeChange"
              ></u-verification-code>
              <u-button @tap="getCode">{{ tips }}</u-button>
            </view>
            <u-input
              v-model="form.verificationCode"
              type="number"
              :border="false"
              :height="100"
              :custom-style="{ fontSize: '40rpx' }"
              class="input"
              placeholder="请输入验证码"
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
              placeholder="请设置密码不少于六位"
            />
          </u-form-item>
          <view class="tips"></view>
          <u-button type="primary" @click="registered">注册</u-button>
        </u-form>
      </view>
      <view class="alternative"></view>
    </view>
    <view class="buttom">
      <view class="hint">
        登录代表同意<text class="link">用户协议、隐私政策，</text
        >并授权使用您的账号信息（如昵称、头像）以便您统一管理
      </view>
    </view>
    <!-- 登录成功时的提示 -->
    <u-toast ref="uToast" />
  </view>
</template>

<script>
import md5Libs from "uview-ui/libs/function/md5";
export default {
  data() {
    return {
      tips: "",
      seconds: 60,
      loginType: "account",
      mobile: "",
      com: {
        show: false,
        list: [],
      },
      form: {
        phoneNumber: "", // 手机号
        verificationCode: "", //验证码
        password: "", // 密码
      },
      rules: {
        phoneNumber: [
          {
            required: true,
            message: "请输入手机号",
            trigger: ["change", "blur"],
          },
          {
            // 自定义验证函数，见上说明
            validator: (rule, value, callback) => {
              // 上面有说，返回true表示校验通过，返回false表示不通过
              // this.$u.test.mobile()就是返回true或者false的
              return this.$u.test.mobile(value);
            },
            message: "手机号码不正确",
            // 触发器可以同时用blur和change
            // 失去焦点触发
            trigger: ["blur"],
          },
        ],
        verificationCode: [
          {
            required: true,
            message: "验证码不能位空",
            trigger: ["blur"],
          },
        ],
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
            min: 6,
            message: "密码至少设置6位数",
            trigger: "change",
          },
          {
            required: true,
            message: "请设置密码",
            trigger: ["blur"],
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
    // 倒计时
    codeChange(text) {
      this.tips = text;
    },
    async getCode() {
      let phone = 1761273590;
      console.log(/^1[3456789]\d{9}$/.test(this.form.phoneNumber));

      console.log(this.$refs.uCode.canGetCode);
      // 获取验证码
      if (
        this.$refs.uCode.canGetCode &&
        /^1[3456789]\d{9}$/.test(this.form.phoneNumber)
      ) {
        console.log("开始倒计时");
        // 开始倒计时
        this.$refs.uCode.start();
        uni.request({
          url: `http://192.168.1.155:9099/message/${this.form.phoneNumber}`, //仅为示例，并非真实接口地址。
          success: (res) => {
            // 模拟向后端请求验证码
            uni.showLoading({
              title: "正在获取验证码",
            });
            setTimeout(() => {
              uni.hideLoading();
              // 这里此提示会被this.start()方法中的提示覆盖
              this.$u.toast("验证码已发送");
              // 通知验证码组件内部开始倒计时
            }, 1000);
            console.log(res.data.code, "验证码");
            // this.form.verificationCode = res.data.code;
          },
        });
        // console.log(res, '验证码')
      } else {
        // this.$u.toast("倒计时结束后再发送");
      }
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
    // 注册
    registered() {
      console.log(this.form);
      this.$refs.accountForm.validate((valid) => {
        // 全部通过校验
        if (valid) {
          // 请求后台接口1.完成注册(跳转登录);2.失败(1.已注册(跳转重置密码)2.其他)
          this.$u.api
            .register({
              mobile: this.form.phoneNumber,
              password: md5Libs.md5(this.form.password),
              verCode: this.form.verificationCode,
            })
            .then((res) => {
              console.log("注册成功");
              uni.showLoading({
                title: "请稍后",
              });
              setTimeout(() => {
                uni.hideLoading();
                // 这里此提示会被this.start()方法中的提示覆盖
                this.$u.toast("注册成功");
                this.$u.route("/pages/login/index");
              }, 1000);
            });
        }
      });
    },
    submit() {
      this.$refs.accountForm.validate((valid) => {
        if (valid) {
          this.$u.api
            .login({
              loginName: this.form.username,
              password: md5Libs.md5(this.form.password),
              villageId: this.form.villageId,
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
                console.log(data, "data成功");
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
  /deep/.uni-input-input {
    background-color: white;
  }
  /deep/ .u-btn {
    font-size: 26rpx;
  }
  .container_verificationCode {
    width: 160rpx;
    font-size: 12rpx;
  }
  .navbar-right {
    margin-right: 24rpx;
    display: flex;
  }
  .main {
    width: 600rpx;
    // padding-top: 80rpx;
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
