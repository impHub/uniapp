<template>
	<view class="container">
		<u-form :model="form" ref="userForm" :error-type="['message']" :label-width="120" >
			<view class="form-item-group">
				<u-form-item label="图片上传">
					<u-upload :action="updateAction" :header="updateHeader" :form-data="{type: 'photo'}" :show-progress="false" upload-text="本人正面照" :multiple="false" :max-count="1" width="180"></u-upload>
					<u-upload :action="updateAction" :header="updateHeader" :form-data="{type: 'opposite'}" @on-success="oppositeSuccess" :show-progress="false" upload-text="身份证人像面" :multiple="false" :max-count="1" width="180"></u-upload>
					<u-upload :action="updateAction" :header="updateHeader" :form-data="{type: 'front'}" @on-success="frontSuccess" :show-progress="false" upload-text="身份证国徽面" :multiple="false" :max-count="1" width="180"></u-upload>
				</u-form-item>
			</view>
			<u-cell-group>
				<u-cell-item title="姓名" :value="form.name || '-'" :arrow="false"></u-cell-item>
				<u-cell-item title="性别" :value="form.sex || '-'" :arrow="false"></u-cell-item>
				<u-cell-item title="身份证号" :value="form.id_card || '-'" :arrow="false"></u-cell-item>
				<u-cell-item title="出生日期" :value="form.birth || '-'" :arrow="false"></u-cell-item>
				<u-cell-item title="户籍地址" :value="form.address || '-'" :arrow="false"></u-cell-item>
				<u-cell-item title="民族" :value="form.nation || '-'" :arrow="false"></u-cell-item>
				<u-cell-item title="身份证有效期起止" :value="[form.valid_start,form.valid_end].join(' - ') || '-'" :arrow="false"></u-cell-item>
				<u-cell-item title="签发机关" :value="form.card_org || '-'" :arrow="false"></u-cell-item>
			</u-cell-group>
			
			<u-cell-group title="基本信息-填写">
				<u-cell-item title="手机号码" :arrow="false">
					<view slot="right-icon">
						<u-input v-model="form.phone" type="number" placeholder="请输入手机号码"/>
						<!-- <u-keyboard ref="uKeyboard" mode="number" v-model="phoneKeyboard"></u-keyboard> -->
					</view>
				</u-cell-item>
				<u-cell-item title="与业主关系" :arrow="false">
					<view slot="right-icon">
						<u-input v-model="form.relation_owner_label" type="text" placeholder="请选择业主关系" @click="showRelation" />
						<u-select v-model="relationShow" :list="relationList" @confirm="changeRelation"></u-select>
					</view>
				</u-cell-item>
			</u-cell-group>
		</u-form>
		<u-button type="primary" class="submit" @click="submit">提交</u-button>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				updateAction: this.$u.http.config.baseUrl + '/api/update',
				updateHeader: {token: this.$store.state.vuex_token},
				datePicker: false,
				relationShow: false,
				phoneKeyboard: false,
				relationList: [
					{label: '子女', value: 1},
					{label: '父母', value: 2},
					{label: '亲属', value: 3},
					{label: '朋友', value: 4},
					{label: '其它', value: 5},
				],
				form: {
					name: '',
					sex: '',
					id_card: '',
					birth: '',
					address: '',
					valid_start: '',
					valid_end: '',
					card_org: '',
					relation_owner_label: '',
					relation_owner: '',
					card_front: '',
					card_opposite: '',
					avatar: ''
				},
				rules: {
					name: {
						required: true
					}
				},
			}
		},
		onReady() {
			this.$refs.userForm.setRules(this.rules);
		},
		methods:{
			changeRelation(e){
				if(Array.isArray(e) && e.length > 0){
					const {label, value} = e[0]
					this.form.relation_owner_label = label
					this.form.relation_owner = value
				}
			},
			oppositeSuccess(res, index, lists, name){
				if(res.success){
					const {name, sex, nation,birth, address, id_card} = res.data
					Object.assign(this.form, {name, sex, nation,birth, address, id_card})
				}
			},
			frontSuccess(res, index, lists, name){
				if(res.success){
					const {card_org, valid_start, valid_end} = res.data
					Object.assign(this.form, {card_org, valid_start, valid_end})
				}
			},
			showPhoneKeyboard(){
				document.activeElement.blur()
				this.phoneKeyboard = true
			},
			showRelation(){
				document.activeElement.blur()
				this.relationShow = true
			},
			submit(){
				console.log('submit')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		padding-bottom: 100rpx;
		.form-item-group{
			background: #fff;
			padding: 0 15rpx;
			margin-bottom: 10rpx;
		}
		.u-form-item,
		.u-cell{
			padding: 10rpx 20rpx;
		}
		.submit{
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 100rpx;
			line-height: 100rpx;
			border-radius: 0;
			z-index: 999;
		}
	}
</style>
