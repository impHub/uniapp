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
    <!-- 添加房屋 -->
    <button @click="show = true">添加房屋</button>
    <!--  -->
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
        <u-grid-item class="item" @click="show = true">
          <u-icon class="icon" name="plus-circle"></u-icon>
          <view class="text">添加</view>
        </u-grid-item>
      </u-grid>
    </view>
    <!-- select -->
    <u-select
      v-model="show"
      :list="houseList"
      mode="mutil-column-auto"
      label-name="name"
      value-name="id"
      @confirm="selectHouse"
    ></u-select>
    <!-- 第二个select -->
    <u-select
      v-model="relationShow"
      :list="[propertyList, relationList]"
      mode="mutil-column"
      @confirm="selectRelation"
    ></u-select>
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
      houseShow: false,
      show: false,
      relationShow: false,
      houseList: [], // 房屋树
      houseTemp: {}, //添加房屋时有两个弹出选择，先选择房屋后选择房屋关系，此处临时存储选择的房屋数据
      houseSelected: [], // 用户房屋数据
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
    };
  },
  onReady() {
    // 注意这里不能将一个组件赋值给data的一个变量，否则在微信小程序会
    // 造成循环引用而报错，如果你想这样做，请在非data中定义refCode变量
    // this.refCode = this.$refs.uCode;
  },
  methods: {
    getLabel(list, value) {
      const data = list.find((item) => item.value === value) || {};
      return data.label;
    },
    //
    removeHouse(index) {
      console.log(index, "删除数据");
    },
    // 第二次点确定
    selectRelation(data) {
      console.log(data);
      // 临时存储的数据再添两个数据
      this.houseTemp.property = data[0].value;
      this.houseTemp.relation = data[1].value;
      // 把临时数据添加搭配总数据里; 顺便清空
      this.houseSelected.push(this.houseTemp);
      this.houseTemp = {};
    },
    // 添加是点击第一个确认触发,会判断这个房屋是否添加
    selectHouse(data) {
      const [build, unit, floot, house] = data;
      // const label = data.slice(0,2).reduce((a,b) => a.label+b.label).split('第').join('')
      //   house会把每种情况计算成ID
      console.log(data, house);
      let n = this.houseSelected.findIndex((item) => item.id === house.value);
      //   console.log(n, "添加", this.houseSelected, house.value);
      // 如果不在已选择列表中
      if (this.houseSelected.findIndex((item) => item.id === house.value) < 0) {
        console.log("不重复");
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
    async getData() {
      this.houseList = await this.$u.api.getHouse();
    },
    // selectHouse(item) {
    //   console.log(item, "选择");
    // },
    // 倒计时
    codeChange(text) {
      this.tips = text;
    },
    getCode() {
      console.log(this.$refs.uCode.canGetCode);
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
    this.getData();
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
