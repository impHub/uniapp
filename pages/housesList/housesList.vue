<template>
  <view class="container">
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
    <view class="actionbox">
      <u-button type="primary" class="prev" @click="prev">返回</u-button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      show: false, // 第一层
      relationShow: false, //第二层
      houseList: [], // 房屋树
      houseTemp: {}, //添加房屋时有两个弹出选择，先选择房屋后选择房屋关系，此处临时存储选择的房屋数据
      houseSelected: [], // 用户房屋数据
      // 固定数据
      relationList: [
        { label: "本人", value: 1 },
        { label: "子女", value: 2 },
        { label: "父母", value: 3 },
        { label: "亲属", value: 4 },
        { label: "朋友", value: 5 },
        { label: "其它", value: 6 },
      ],
      propertyList: [
        { label: "业主", value: 1 },
        { label: "家庭成员", value: 2 },
        { label: "租户", value: 3 },
      ],
    };
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
    // 第二次点确定 添加房屋
    selectRelation(data) {
      // console.log(data);
      // 临时存储的数据再添两个数据
      this.houseTemp.property = data[0].value;
      this.houseTemp.relation = data[1].value;
      console.log(this.houseTemp, '新增房屋数据');
      this.$u.api.addHouse({
        roomId: this.houseTemp.id,
        property: this.houseTemp.property,
        relationOwner: this.houseTemp.relation
      }).then(res =>{
        console.log(res)
      })
      // 把临时数据添加搭配总数据里; 顺便清空
      this.houseSelected.push(this.houseTemp);
      console.log(this.houseSelected, '用户房屋数据')
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
      const { data: houses } = await this.$u.api.getHouse();// 房屋树
      // 用户房屋信息
       this.$u.api.getRooms()
       .then(res => {
         console.log(res)
       })
       .catch(err => {
         console.log(err)
       })
      this.houseList = houses
      // console.log(this.houseList)
    },
    prev() { // 返回
      uni.switchTab({
        url: "/pages/mine/index",
      });
      // this.step > 0 && this.step--
    },
  },
  mounted() {
    this.getData();
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
