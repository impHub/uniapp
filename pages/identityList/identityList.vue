<template>
  <view class="container">
    <!-- <u-steps :list="steps" :current="step" active-color="#1cbbb4" mode="number" class="steps"></u-steps> -->
    <view>
      <view class="form-item-group">
        <u-form-item label="图片上传" label-position="top">
          <view class="form_tag">
            <u-tag
              v-if="certification === '未认证'"
              type="info"
              mode="dark"
              text="未认证test"
              shape="square"
              @click="verified"
            />
            <u-tag
              v-else-if="certification === '审核中'"
              type="warning"
              mode="dark"
              text="审核中"
              shape="square"
            />
            <u-tag
              v-else-if="certification === '已认证'"
              type="success"
              mode="dark"
              text="已认证"
              shape="square"
            />
            <u-tag
              v-else-if="certification === '认证失败'"
              type="error"
              mode="dark"
              text="认证失败请重新上传图片"
              shape="square"
            />
          </view>
          <u-upload
            ref="uploadAvatar"
            :action="updateActionImg"
            :before-upload="beforeUpload"
            :size-type="updateSizeType"
            :header="updateHeader"
            :form-data="{ group: 'resident', type: 'avatar' }"
            @on-success="avatarSuccess"
            @on-remove="uploadRemove(1)"
            :show-progress="false"
            upload-text="本人正面照"
            :multiple="false"
            :max-count="1"
            width="210"
          ></u-upload>
          <u-upload
            ref="uploadOpposite"
            :action="updateActionOcr"
            :before-upload="beforeUpload"
            :size-type="updateSizeType"
            :header="updateHeader"
            :form-data="{ group: 'resident', type: 'opposite' }"
            @on-success="oppositeSuccess"
            @on-remove="uploadRemove(2)"
            :show-progress="false"
            upload-text="身份证人像面"
            :multiple="false"
            :max-count="1"
            width="210"
          ></u-upload>
          <u-upload
            ref="uploadFront"
            :action="updateActionOcr"
            :before-upload="beforeUpload"
            :size-type="updateSizeType"
            :header="updateHeader"
            :form-data="{ group: 'resident', type: 'front' }"
            @on-success="frontSuccess"
            @on-remove="uploadRemove(3)"
            :show-progress="false"
            upload-text="身份证国徽面"
            :multiple="false"
            :max-count="1"
            width="210"
          ></u-upload>
        </u-form-item>
      </view>
      <u-cell-group title="基本信息 - 上传图片后自动识别">
        <u-cell-item
          title="姓名"
          :value="form.name || '-'"
          :arrow="false"
        ></u-cell-item>
        <u-cell-item
          title="性别"
          :value="form.sex || '-'"
          :arrow="false"
        ></u-cell-item>
        <u-cell-item
          title="身份证号"
          :value="form.idCard || '-'"
          :arrow="false"
        ></u-cell-item>
        <u-cell-item
          title="出生日期"
          :value="form.birth || '-'"
          :arrow="false"
        ></u-cell-item>
        <u-cell-item
          title="户籍地址"
          :value="form.address || '-'"
          :arrow="false"
        ></u-cell-item>
        <u-cell-item
          title="民族"
          :value="form.nation || '-'"
          :arrow="false"
        ></u-cell-item>
        <u-cell-item
          title="身份证有效期起止"
          :value="[form.validStart, form.validEnd].join(' - ') || '-'"
          :arrow="false"
        ></u-cell-item>
        <u-cell-item
          title="签发机关"
          :value="form.cardOrg || '-'"
          :arrow="false"
        ></u-cell-item>
      </u-cell-group>
    </view>

    <view class="actionbox">
      <u-button type="warning" class="prev" @click="dropOut">返回</u-button>
      <u-button
        type="success"
        :disabled="disabledNext"
        class="submit"
        @click="submit"
        >提交</u-button
      >
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      certification: "未认证", //审核认证状态
      // 上传图片服务器地址
      updateActionImg: this.$u.http.config.baseUrl + "/upload/img",
      // 身份证图上传地址
      updateActionOcr: this.$u.http.config.baseUrl + "/upload/ocr",
      //   original 原图，compressed 压缩图，默认二者都有，H5无效
      updateSizeType: ["compressed"],
      //   上传携带的头信息，对象形式
      updateHeader: { Authorization: this.$store.state.vuex_token },
      disabledNext: false,
    };
  },
  methods: {
    dropOut() {
      uni.switchTab({
        url: "/pages/mine/index",
      });
    },
    // 删除图片是触发
    uploadRemove(index) {
      if (index === 2) {
        const { name, sex, nation, birth, address, idCard, imgUrl } = {};
        Object.assign(this.form, {
          name,
          sex,
          nation,
          birth,
          address,
          idCard,
          cardOpposite: imgUrl,
        });
      } else if (index === 3) {
        const { cardOrg, validStart, validEnd, imgUrl } = {};
        Object.assign(this.form, {
          cardOrg,
          validStart,
          validEnd,
          cardFront: imgUrl,
        });
      }
    },
    // 每个文件上传前触发的钩子回调函数
    beforeUpload(index) {
      uni.showLoading({ title: "正在上传……", mask: true });
      return true;
    },
    // 本人照片上传成功触发
    avatarSuccess(res) {
      console.log(res, "本人照片");
      if (res.code === 0) {
        this.form.avatar = res.data;
      }
    },
    // 身份证人像面上传成功时触发
    oppositeSuccess(res) {
      console.log(res, "身份证正面");
      uni.hideLoading();
      if (res.code !== 0) {
        const { name, sex, nation, birth, address, idCard, imgUrl } = res.data;
        if (!name || !idCard) {
          // OCR识别失败
          this.$u.toast("信息识别错误，请上传正确的图片");
          this.$refs.uploadOpposite.remove(0);
        }
      } else {
        const { name, sex, nation, birth, address, idCard, imgUrl } = res.data;
        this.$nextTick((res) => {
          Object.assign(this.form, {
            name,
            sex,
            nation,
            birth,
            address,
            idCard,
            cardOpposite: imgUrl,
          });
          console.log(this.form, "身份证正面true");
        });
      }
    },
    // 身份证国徽面成功触发
    frontSuccess(res) {
      console.log(res, "身份证背面");
      if (res.code === 0) {
        const { cardOrg, validStart, validEnd, imgUrl } = res.data;
        if (!cardOrg || !validStart || !validEnd) {
          // OCR识别失败
          this.$u.toast("信息识别错误，请上传正确的图片");
          this.$refs.uploadFront.remove(0);
        } else {
          Object.assign(this.form, {
            cardOrg,
            validStart,
            validEnd,
            cardFront: imgUrl,
          });
        }
      }
    },
  },
  computed: {
    // 提交按钮是否能被点击
    // disabledNext() {
    //   return !this.checkStep(this.step);
    // },
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding-bottom: 100rpx;
  .form-item-group {
    position: relative;
    background: #fff;
    padding: 0 15rpx;
    margin-bottom: 10rpx;
    .form_tag {
      position: absolute;
      top: 20rpx;
      right: 20rpx;
    }
  }
  .u-form-item,
  .u-cell {
    padding: 20rpx;
  }

  .title {
    padding: 30rpx 35rpx 10rpx 35rpx;
    font-size: 20rpx;
    text-align: left;
    color: #909399;
  }
  .steps {
    margin: 0 0 10rpx 0;
    padding: 40rpx 0;
    background: #fff;
  }
  .actionbox {
    position: fixed;
    width: 100%;
    height: 100rpx;
    line-height: 100rpx;
    bottom: 0;
    z-index: 99;
    display: flex;
    .u-btn {
      flex: 1;
      width: 100%;
      height: 100%;
      border-radius: 0;
    }
  }
  .houselist {
    position: relative;
    .item {
      height: 220rpx;
      .close {
        position: absolute;
        top: 5rpx;
        right: 5rpx;
      }
      .tags {
        padding-top: 5rpx;
        .tag {
          margin-left: 5rpx;
        }
      }
      .label {
        font-size: 48rpx;
      }
      .icon {
        font-size: 60rpx;
      }
      .text {
        font-size: 28rpx;
        margin-top: 5rpx;
        color: $u-type-info;
      }
    }
  }
  .quickSelect {
    margin-bottom: 10rpx;
    .checkbox {
      padding: 20rpx 0;
    }
  }
  .guardlist {
    width: 100%;
    .item {
      .checkbox {
        width: 100%;
        padding: 10rpx 20rpx;
        white-space: nowrap;
        pointer-events: none; //给外层VIEW做了click，这里相当于禁用checkbox本身的事件
      }
    }
  }
}
</style>
