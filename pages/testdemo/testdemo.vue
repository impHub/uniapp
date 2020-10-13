<template>
  <view>
    <view> 当前端:{{ test }} </view>
    <view class="wrap">
      <u-toast ref="uToast"></u-toast>
      <u-verification-code
        :seconds="seconds"
        ref="uCode"
        @change="codeChange"
      ></u-verification-code>
      <u-button @tap="getCode">{{ tips }}</u-button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      test: "",
      tips: "",
      // refCode: null,
      seconds: 10,
    };
  },
  onReady() {
    // 注意这里不能将一个组件赋值给data的一个变量，否则在微信小程序会
    // 造成循环引用而报错，如果你想这样做，请在非data中定义refCode变量
    // this.refCode = this.$refs.uCode;
  },
  methods: {
    // 倒计时
    codeChange(text) {
      this.tips = text;
    },
    getCode() {
      console.log(this.$refs.uCode.canGetCode)
      // 获取验证码
      if (this.$refs.uCode.canGetCode) {
        // 开始倒计时
         this.$refs.uCode.start();
        // 模拟向后端请求验证码
        // uni.showLoading({
        //   title: "正在获取验证码",
        // });
        // setTimeout(() => {
        //   uni.hideLoading();
        //   // 这里此提示会被this.start()方法中的提示覆盖
        //   this.$u.toast("验证码已发送");
        //   // 通知验证码组件内部开始倒计时
         
        // }, 2000);
      } else {
        this.$u.toast("倒计时结束后再发送");
      }
    },
  },
  mounted() {
    console.log(navigator.userAgent.toLowerCase());
    let userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.match(/Alipay/i) == "alipay") {
      this.test = "支付宝";
    } else if (userAgent.match(/MicroMessenger/i) == "micromessenger") {
      this.test = "微信";
    } else {
      this.test = "H5";
    }
  },
};
</script>

<style lang="scss"></style>
