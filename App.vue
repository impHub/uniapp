<script>
import Vue from 'vue'
export default {
  onLaunch: function () {
    // 小区缓存
    // console.log(this)
    this.$store.commit("communityStorage");
    // color-ui
    uni.getSystemInfo({
      success: function (e) {
        // #ifndef MP
        Vue.prototype.StatusBar = e.statusBarHeight;
        if (e.platform == "android") {
          Vue.prototype.CustomBar = e.statusBarHeight + 50;
        } else {
          Vue.prototype.CustomBar = e.statusBarHeight + 45;
        }
        // #endif
        // #ifdef MP-WEIXIN
        Vue.prototype.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        Vue.prototype.Custom = custom;
        Vue.prototype.CustomBar =
          custom.bottom + custom.top - e.statusBarHeight;
        // #endif
        // #ifdef MP-ALIPAY
        Vue.prototype.StatusBar = e.statusBarHeight;
        Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
        // #endif
      },
    });
    //
    //#ifdef APP-PLUS
    var info = plus.push.getClientInfo();
    console.log(JSON.stringify(info));
    /* 5+  push 消息推送 ps:使用:H5+的方式监听，实现推送*/
    plus.push.addEventListener(
      "click",
      function (msg) {
        console.log("click:" + JSON.stringify(msg));
        console.log(msg.payload);
        console.log(JSON.stringify(msg));
        //这里可以写跳转业务代码
      },
      false
    );
    // 监听在线消息事件
    plus.push.addEventListener(
      "receive",
      function (msg) {
        // plus.ui.alert(2);
        //这里可以写跳转业务代码
        console.log("recevice:" + JSON.stringify(msg));
      },
      false
    );
    //
    var pinf = plus.push.getClientInfo();
    var cid = pinf.clientid; //客户端标识
    console.log("cid==" + cid);

    plus.push.addEventListener(
      "receive",
      function (msg) {
        if (msg.aps) {
          // Apple APNS message
          //APNS下发的消息，应用在前台
          plus.push.createMessage(msg.content, msg.payload, {
            title: msg.title,
          });
        } else if (msg.type != "receive") {
          // 特殊payload标识本地创建的消息
          //本地创建的消息，通常不需要处理
          //注意：不要在这种情况下再此调用plus.push.createMessage，从而引起循环创建本地消息
        } else {
          //接收到在线透传消息
          plus.push.createMessage(msg.content, msg.payload, {
            title: msg.title,
          });
        }
      },
      false
    );

    plus.push.addEventListener(
      "click",
      function (msg) {
        //todo
      },
      false
    );

    //

    //#endif
  },
  onShow: function () {
    // console.log('token',this.$store.state.vuex_token)
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style lang="scss">
// colorui
@import "colorui/main.css";
@import "colorui/icon.css";
// 
@import "uview-ui/index.scss";
@import "@/static/icon/witcom.css";
// @import "@/static/css/default.scss";
@import "./static/css/default.scss";
</style>
