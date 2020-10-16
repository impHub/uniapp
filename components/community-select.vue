<template>
  <view>
    <view class="wrap" @click="show = true">
      <u-icon name="map" size="24"></u-icon>
      <text class="text">{{ communityName.name }}</text>
      <u-icon name="arrow-down" size="22"></u-icon>
    </view>
    <u-select
      value-name="villageId"
      label-name="name"
      v-model="show"
      :list="list"
      @confirm="changeCommunity"
    ></u-select>
    <!--  -->
    <!-- <u-action-sheet v-model="show" :list="list" @click="changeCommunity"></u-action-sheet> -->
  </view>
</template>

<script>
export default {
  name: "seek-community-select",
  data() {
    return {
      show: false,
      list: [],
    };
  },
  computed: {
    communityName() {
      console.log("计算");
      return this.$store.state.vuex_community;
    },
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$u.api.infoVillage().then((res) => {
        console.log(res.data);
        this.list = res.data;
        const id = res.data[0];
        // 切换小区
        uni.request({
          url: `http://192.168.1.155:9099/infoVillage/change/${id.villageId}`,
          header: {
            Authorization: this.vuex_token,
          },
          success: (res) => {
            console.log(res.data);
          },
        });
      });
    },
    // getData() {
    //   let ;
    //   this.list = data.map((d) => {
    //     d.text = d.name;
    //     return d;
    //   });
    //   this.changeCommunity(0);
    // },
    // 切换小区
    changeCommunity(item) {
      console.log(item[0]);
      const data = item[0];
      uni.request({
        url: `http://192.168.1.155:9099/infoVillage/change/${data.value}`,
        header: {
          Authorization: this.vuex_token,
        },
        success: (res) => {
          console.log(res.data);
        },
      });
      this.$store.commit("community", data);
      // 	console.log(index)
      //   this.$u.vuex("vuex_community", this.list[index]);
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  position: absolute;
  left: 5px;
  top: 10px;
  display: flex;
  align-items: center;
  padding: 4px 6px;
  background-color: rgba(240, 240, 240, 0.5);
  font-size: 22rpx;
  border-radius: 100rpx;
  margin-left: 30rpx;
  z-index: 1000;

  .text {
    padding: 0 6rpx;
  }
}
</style>
