<template>
  <view> 当前端:{{ test }} </view>
</template>

<script>
export default {
  data() {
    return {
      test: "",
    };
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
