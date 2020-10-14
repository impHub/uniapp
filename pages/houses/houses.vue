<template>
  <view class="container">
    <!-- <button @click="moke">moke</button> -->
    <!-- <u-steps :list="steps" :current="step" active-color="#1cbbb4" mode="number" class="steps"></u-steps> -->
    <view class="container_grid">
      <u-grid :col="3" class="houselist">
        <!-- 用户房屋数据 -->
        <u-grid-item
          class="item houseSelected_list"
          v-for="(item, index) in houseSelected"
          :key="item.id"
        >
          <u-icon
            class="close"
            name="close"
            @click="removeHouse(index)"
          ></u-icon>
          <view class="label">{{ item.name }}</view>
          <view class="text">{{ item.buildName + item.unitName }}</view>
          <view class="tags">
            <u-tag
              class="tag"
              :text="getLabel(propertyList, item.property)"
              type="success"
              mode="plain"
              size="mini"
            />
            <u-tag
              class="tag"
              :text="getLabel(relationList, item.relation)"
              type="primary"
              mode="plain"
              size="mini"
            />
          </view>
        </u-grid-item>
        <!-- 点击添加弹出选择框 -->
        <u-grid-item class="item" @click="houseShow = true">
          <u-icon class="icon" name="plus-circle"></u-icon>
          <view class="text">添加</view>
        </u-grid-item>
      </u-grid>
    </view>
    <view class="actionbox">
      <u-button type="primary" class="prev" @click="prev">返回</u-button>
      <!-- <u-button type="warning" v-if="step>0" class="prev" @click="prev">上一步</u-button> 
			<u-button type="success" :disabled="disabledNext" v-if="step<steps.length-1" class="next" @click="next">下一步</u-button> 
			<u-button type="primary" :disabled="disabledNext" v-if="step===steps.length-1" class="submit" @click="submit">提交</u-button> -->
    </view>

    <u-select
      v-model="relationShow"
      :list="[propertyList, relationList]"
      mode="mutil-column"
      @confirm="selectRelation"
    ></u-select>
    <!-- 房屋树控件 -->
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
    //   console.log('onShowHouses')
    // 鉴权1 触发vuex
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
      houseShow: false, // 房屋数据选择
      relationShow: false,
      quickSelect: {
        front: true,
        unit: false,
        own: true,
      },
      // 固定数据
      relationList: [
        { label: "本人", value: 0 },
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
      houseSelected: [], // 用户房屋数据
      houseTemp: {}, //添加房屋时有两个弹出选择，先选择房屋后选择房屋关系，此处临时存储选择的房屋数据
    };
  },
  watch: {
    houseSelected: {
      // 每次用户房屋信息改变执行这个函数
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
      // 房屋信息
      this.houseList = await this.$u.api.getHouse();
      console.log(this.houseList, '房屋树');
      const frontlist = await this.$u.api.getFront();
      const unitlist = await this.$u.api.getUnit();
      // console.log(frontlist, unitlist, "数据请求", this.houseList);
      this.guardList = frontlist
        .map((d) => Object.assign(d, { checked: false, type: "front" }))
        .concat(
          unitlist.map((d) =>
            Object.assign(d, { checked: false, type: "unit" })
          )
        );
      console.log(this.guardList,'==', this.houseList);
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
    // 添加是点击第一个确认触发,会判断这个房屋是否添加
    selectHouse(data) {
      const [build, unit, floot, house] = data;
	  // const label = data.slice(0,2).reduce((a,b) => a.label+b.label).split('第').join('')
	//   house会把每种情况计算成ID
		console.log(data, house)
      let n = this.houseSelected.findIndex((item) => item.id === house.value)
    //   console.log(n, "添加", this.houseSelected, house.value);
      // 如果不在已选择列表中
      if (this.houseSelected.findIndex((item) => item.id === house.value) < 0) {
		  console.log('不重复')
        // 不存在就添加
        this.houseTemp = {
          id: house.value,
          name: house.label,
          buildId: build.value,
          buildName: build.label,
          unitId: unit.value,
          unitName: unit.label,
        };
        // 弹出子选项
        this.relationShow = true;
      } else {
        // 存在就不添加顺便提示
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
      uni.switchTab({
        url: "/pages/mine/index",
      });
      // this.step > 0 && this.step--
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
    background: #fff;
    padding: 0 15rpx;
    margin-bottom: 10rpx;
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
