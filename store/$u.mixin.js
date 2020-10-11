import { mapState } from 'vuex'
import store from "@/store"

// 尝试将用户在根目录中的store/index.js的vuex的state变量，全部加载到全局变量中
let $uStoreKey = [];
try{
	$uStoreKey = store.state ? Object.keys(store.state) : [];
}catch(e){
	
}

module.exports = {
	created() {
		// 每次路由跳转都会触发n多次
		// console.log('vuex created')
		// 将vuex方法挂在到$u中
		// 使用方法为：如果要修改vuex的state中的user.name变量为"史诗" => this.$u.vuex('user.name', '史诗')
		// 如果要修改vuex的state的version变量为1.0.1 => this.$u.vuex('version', '1.0.1')
		this.$u.vuex = (name, value) => {
			this.$store.commit('$uStore', {
				name,value
			})
		}
		// 登录成功时触发
		this.$u.login = data => {
			// 1.存入token 2.id name 权限等 3.并且跳转到首页
			this.$u.vuex('vuex_token', data.token)
			this.$u.vuex('vuex_user', {id: data.userId, name: data.userName, mobile: data.mobile})
			// redirectTo关闭当前页并跳转
			this.vuex_fullPath?this.$u.route({url: this.vuex_fullPath, type:'redirectTo'}):this.$u.route({url:'/pages/mine/index', type:'switchTab'})
		}
		this.$u.logout = data => {
			this.$u.vuex('vuex_token', '')
			this.$u.vuex('vuex_user', {})
			// this.$u.route({url: '/pages/login/index'})
		}
		// token鉴权
		this.$u.auth = params => {
			// 没token就跳转到登录页
			// console.log(params,10.8);
			this.$u.vuex('vuex_fullPath',params)
			// console.log(this.vuex_fullPath,10.9);
			if(!store.state.vuex_token){
				console.log('vuex auth')
				// 直接去地址栏输入可以拦截
				this.$u.route({url: '/pages/login/index', type:'redirectTo'}) //2
			}
		}
	},
	computed: {
		// 将vuex的state中的所有变量，解构到全局混入的mixin中
		...mapState($uStoreKey)
	}
}