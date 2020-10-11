<template>
  <view>
    <u-notice-bar
      :autoplay="false"
      :volume-icon="false"
      mode="horizontal"
      :list="list"
    ></u-notice-bar>
    <u-toast ref="uToast" />
    <view class="wrapper">
      <view class="title">报修类型</view>
      <u-input
        class="u_input"
        v-model="repairType.value"
        :type="type"
        :border="border"
        @click="show = true"
      />
      <u-select
        v-model="show"
        :list="actionSheetList"
        @confirm="actionSheetCallback"
      ></u-select>
      <!-- <u-action-sheet :list="actionSheetList" v-model="show" @click="actionSheetCallback"></u-action-sheet> -->
      <!-- <textarea class="repair_textarea" name="" id="" cols="30" rows="10"></textarea> -->
      <view class="title">问题描述</view>
      <u-input
        class="u_input"
        v-model="repairType.inputValue"
        type="textarea"
        :border="true"
        :height="height"
        :auto-height="autoHeight"
      />
      <u-button @click="submit" class="u_button" type="primary">提交</u-button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      repairType: {
        value: "",
        inputValue: "",
      },
      value: "",
      type: "select",
      show: false,
      list: ["报修进度可以在个人中心`我的工单`查询。"],
      border: true,
      height: 200,
      autoHeight: true,
      actionSheetList: [
        {
          value: 1,
          label: "男",
        },
        {
          value: 2,
          label: "女",
        },
        {
          value: 3,
          label: "保密",
        },
        {
          value: 4,
          label: "男",
        },
        {
          value: 5,
          label: "女",
        },
        {
          value: 6,
          label: "保密",
        },
      ],
    };
  },
  onShow() {
    // 鉴权1 触发vuex
    this.$u.auth(this.$route.fullPath);
  },
  methods: {
    submit() {
      console.log(this.repairType);
      if (this.repairType.value !== "" && this.repairType.inputValue !== "") {
        console.log("提交报修信息", this.repairType);
        this.$refs.uToast.show({
          title: "已成功提交",
          type: "success",
        });
      } else {
        this.$refs.uToast.show({
          title: "请填写完整信息",
          type: "warning",
        });
      }
    },
    // 点击actionSheet回调
    actionSheetCallback(item) {
      // console.log(index,this.actionSheetList)
      // 获取到下拉框的值
      this.repairType.value = item[0].label;
    },
  },
};
</script>

<style lang="scss">
.wrapper {
  background-color: #f7f7f7;
  padding: 30rpx;
  .repair_textarea {
    background-color: rgb(219, 171, 171);
  }
  .u_input {
    // margin-bottom: 20rpx;
    margin: 20rpx;
  }
  .u_button {
    width: 95%;
  }
}

.uni-textarea-textarea {
  border: 1xp solid;
}
</style>
