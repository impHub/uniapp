<template>
  <view class="container">
    <!-- <u-steps :list="steps" :current="step" active-color="#1cbbb4" mode="number" class="steps"></u-steps> -->
    <view v-show="step === 0">
      <view class="form-item-group">
        <u-form-item label="图片上传" label-position="top">
          <view class="form_tag">
			  <u-tag v-if="certification==='未认证'" type='info' mode="dark" text="未认证" shape="square" />
			  <u-tag v-else-if="certification==='审核中'" type='warning' mode="dark" text="审核中" shape="square" />
			  <u-tag v-else-if="certification==='已认证'" type='success' mode="dark" text="已认证" shape="square" />
			  <u-tag v-else-if="certification==='认证失败'" type='error' mode="dark" text="认证失败请重新上传图片" shape="square" />
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
      <u-button type="warning" v-if="step > 0" class="prev" @click="prev"
        >上一步</u-button
      >
      <u-button
        type="success"
        :disabled="disabledNext"
        v-if="step < steps.length - 1"
        class="next"
        @click="next"
        >下一步</u-button
      >
      <u-button
        type="primary"
        :disabled="disabledNext"
        v-if="step === steps.length - 1"
        class="submit"
        @click="submit"
        >提交</u-button
      >
    </view>

    <u-select
      v-model="relationShow"
      :list="[propertyList, relationList]"
      mode="mutil-column"
      @confirm="selectRelation"
    ></u-select>
    <u-select
      v-model="houseShow"
      :list="houseList"
      mode="mutil-column-auto"
      label-name="name"
      value-name="id"
      @confirm="selectHouse"
    ></u-select>
  </view>
</template>

<script>
export default {
  onShow() {
    // 鉴权1 触发vuex
    console.log(this.$route.fullPath, "hahhahah");
    this.$u.auth(this.$route.fullPath);
  },
  data() {
    const params = {
      name: "",
      sex: "",
      idCard: "",
      birth: "",
      address: "",
      nation: "",
      validStart: "",
      validEnd: "",
      cardOrg: "",
      cardFront: "",
      cardOpposite: "",
      avatar: "",

      mobile: "",

      residentRooms: [],
      deviceAddressIds: [],
    };
    return {
	  certification: '未认证',
      steps: [
        { name: "基本信息" },
        { name: "上传图片" },
        { name: "选择房屋" },
        { name: "门禁授权" },
      ],
      step: 0,

      updateActionImg: this.$u.http.config.baseUrl + "/upload/img",
      updateActionOcr: this.$u.http.config.baseUrl + "/upload/ocr",
      updateHeader: { Authorization: this.$store.state.vuex_token },
      updateSizeType: ["compressed"],
      datePicker: false,
      houseShow: false,
      relationShow: false,
      quickSelect: {
        front: true,
        unit: false,
        own: true,
      },
      relationList: [
        { label: "子女", value: 1 },
        { label: "父母", value: 2 },
        { label: "亲属", value: 3 },
        { label: "朋友", value: 4 },
        { label: "其它", value: 5 },
      ],
      propertyList: [
        { label: "业主", value: 1 },
        { label: "家庭成员", value: 2 },
        { label: "租户", value: 3 },
      ],
      guardList: [],
      houseList: [],
      form: Object.assign({}, params),
      defForm: Object.assign({}, params),
      houseSelected: [], // {id: '101012501', name: '2501', buildId: 1, buildName: '第1栋', unitId: 1, unitName: '第1单元', property: 1, relation: 1}
      houseTemp: {}, //添加房屋时有两个弹出选择，先选择房屋后选择房屋关系，此处临时存储选择的房屋数据
    };
  },
  watch: {
    houseSelected: {
      handler: "changeHouse",
    },
    quickSelect: {
      deep: true,
      immediate: true,
      handler: "changeQuick",
    },
    guardList: {
      deep: true,
      immediate: true,
      handler: "changeGuard",
    },
  },
  computed: {
    disabledNext() {
      return !this.checkStep(this.step);
    },
  },
  mounted() {
    //鉴权2 数据请求触发api拦截器
    this.getData();
  },
  methods: {
    async getData() {
      this.houseList = await this.$u.api.getHouse();
      const frontlist = await this.$u.api.getFront();
      const unitlist = await this.$u.api.getUnit();
      this.guardList = frontlist
        .map((d) => Object.assign(d, { checked: false, type: "front" }))
        .concat(
          unitlist.map((d) =>
            Object.assign(d, { checked: false, type: "unit" })
          )
        );
    },
    checkStep(step) {
      const f = this.form;
      if (step === 0) {
        // return true
        return this.$u.test.mobile(f.mobile);
      } else if (step === 1) {
        // return true
        return [
          f.name,
          f.sex,
          f.idCard,
          f.birth,
          f.nation,
          f.address,
          f.validStart,
          f.validEnd,
          f.cardOrg,
          f.avatar,
          f.cardFront,
          f.cardOpposite,
        ].reduce((x, y) => x && y && y.length > 0, true);
      } else if (step === 2) {
        // return true
        return !!this.houseSelected.length;
      } else if (step === 3) {
        //提交
        return (
          this.checkStep(0) &&
          this.checkStep(1) &&
          this.checkStep(2) &&
          !!f.deviceAddressIds.length
        );
      }
      return false;
    },
    beforeUpload(index) {
      uni.showLoading({ title: "正在上传……", mask: true });
      return true;
    },
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
    avatarSuccess(res) {
      if (res.code === 0) {
        this.form.avatar = res.data;
      }
    },
    oppositeSuccess(res) {
      uni.hideLoading();
      if (res.code === 0) {
        const { name, sex, nation, birth, address, idCard, imgUrl } = res.data;
        if (!name || !idCard) {
          // OCR识别失败
          this.$u.toast("信息识别错误，请上传正确的图片");
          this.$refs.uploadOpposite.remove(0);
        } else {
          Object.assign(this.form, {
            name,
            sex,
            nation,
            birth,
            address,
            idCard,
            cardOpposite: imgUrl,
          });
        }
      }
    },
    frontSuccess(res) {
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
    changeHouse() {
      this.form.residentRooms = this.houseSelected.map((d) => {
        return {
          roomId: d.id,
          property: d.property,
          relationOwner: d.relation,
        };
      });
      // 选择的房屋变化时，授权单元也要变化
      this.changeQuick();
    },
    changeQuick() {
      const val = this.quickSelect;
      this.guardList.map((item) => {
        if (item.type === "front") {
          item.checked = val.front;
        } else if (item.type === "unit") {
          // 如果是已选择房屋对应的单元门禁
          if (
            this.houseSelected.findIndex(
              (h) => h.buildId === item.buildId && h.unitId === item.unitId
            ) > -1
          ) {
            item.checked = val.unit || val.own;
          } else {
            item.checked = val.unit;
          }
        }
      });
    },
    changeGuard() {
      this.form.deviceAddressIds = this.guardList
        .filter((g) => g.checked === true)
        .map((g) => g.id);
    },
    selectHouse(data) {
      const [build, unit, floot, house] = data;
      // const label = data.slice(0,2).reduce((a,b) => a.label+b.label).split('第').join('')
      // 如果不在已选择列表中
      if (this.houseSelected.findIndex((item) => item.id === house.value) < 0) {
        this.houseTemp = {
          id: house.value,
          name: house.label,
          buildId: build.value,
          buildName: build.label,
          unitId: unit.value,
          unitName: unit.label,
        };
        this.relationShow = true;
      } else {
        this.$u.toast("该房屋已经添加");
      }
    },
    selectRelation(data) {
      this.houseTemp.property = data[0].value;
      this.houseTemp.relation = data[1].value;
      this.houseSelected.push(this.houseTemp);
      this.houseTemp = {};
    },
    removeHouse(index) {
      uni.showModal({
        title: "提示",
        content: "您确定要删除此项吗？",
        success: (res) => {
          if (res.confirm) {
            this.houseSelected.splice(index, 1);
          }
        },
      });
    },
    showRelation() {
      document.activeElement.blur();
      this.relationShow = true;
    },
    next() {
      this.step < this.steps.length - 1 && this.step++;
    },
    prev() {
      this.step > 0 && this.step--;
    },
    submit() {
      uni.showModal({
        title: "提示",
        content: "确认提交？",
        success: (res) => {
          if (res.confirm) {
            uni.showLoading({ title: "正在提交……", mask: true });
            let params = Object.assign({}, this.form);
            params.sex = params.sex === "男" ? 1 : 2;
            this.$u.api.addUser(params).then((res) => {
              uni.showModal({
                title: "提示",
                content: "提交成功，是否继续添加？",
                success: (resd) => {
                  if (resd.confirm) {
                    this.step = 0;
                    this.form = Object.assign({}, this.defForm);
                  } else {
                    this.$u.route({
                      url: "/pages/index/index",
                      type: "switchTab",
                    });
                  }
                },
              });
            });
          }
        },
      });
    },
    getLabel(list, value) {
      const data = list.find((item) => item.value === value) || {};
      return data.label;
    },
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
