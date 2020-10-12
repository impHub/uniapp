import {APIMAP} from './http.api.js'
import store from '@/store'
// import iVue from 'vue'
// 这里的vm，就是我们在vue文件里面的this，所以我们能在这里获取vuex的变量，比如存放在里面的token
// 同时，我们也可以在此使用getApp().globalData，如果你把token放在getApp().globalData的话，也是可以使用的
const loginPath = '/pages/login/index'
const install = (Vue, vm) => {
	Vue.prototype.$u.http.setConfig({
		baseUrl: 'http://121.40.201.51:9999',
		// baseUrl: 'http://192.168.1.15:9099',
		// baseUrl: 'http://192.168.50.192:3000/app/manage',
		// baseUrl: 'http://172.20.10.3:3000',
		// baseUrl: 'http://localhost:3000/app/manage',
		method: 'POST',
		dataType: 'json',	// 设置为json，返回后会对数据进行一次JSON.parse()
		showLoading: true, // 是否显示请求中的loading
		loadingText: '请求中...', // 请求loading中的文字提示
		loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
		originalData: false, // 是否在拦截器中返回服务端的原始数据
		loadingMask: true, // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
		// 如果将此值设置为true，拦截回调中将会返回服务端返回的所有数据response，而不是response.data
		// 设置为true后，就需要在this.$u.http.interceptor.response进行多一次的判断，请打印查看具体值
		originalData: true, 
		header: {
			'content-type': 'application/json;charset=UTF-8',
		}
	});
	// 请求拦截，配置Token等参数
	Vue.prototype.$u.http.interceptor.request = (config) => {
		console.log('Vue.prototype.$u.http.interceptor.request');
		// store.commit('carriedLogout', 996)
		let apiinfo = Object.values(APIMAP).filter(api => api[1] === config.url)
		if(apiinfo.length <= 0){
			console.log('API不存在，取消请求')
			config = false
		}else{
			apiinfo = apiinfo[0]
			// 不存在token或者请求配置不需要token时继续执行，否则跳转到登录页
			if(vm.vuex_token || apiinfo[2] === false){
				// 请求时带入token   config.header.token
				config.header.Authorization = vm.vuex_token;
			}else{
				vm.$u.route(loginPath) //第三次触发route
				config = false
			}
		}
		return config; 
	}
	// 响应拦截，判断状态码是否通过
	Vue.prototype.$u.http.interceptor.response = res => {
		// 请求后台接口成功
		if(res.statusCode == 200) {
			// 并且后台返回登录成功码 code===0
			if(res.data.code === 0){
				// console.log(res)
				// 抛出后台数据
				return res.data.data;
			}else{
				// 账号密码错误时
				vm.$u.toast(`${res.data.msg||''}`);
				if([100002,100001].indexOf(res.data.code) >= 0){
					// token过期触发 
					setTimeout(_ => vm.$u.route(loginPath), 1500)
					// 并且退出登录
					store.commit('carriedLogout', 996)
					// Vue.$u.auth(Vue.$route.fullPath);
					// console.log(iVue)
					// const iVue = new Vue();
					// iVue.$u.auth();
				}
				return false
			}
		} else if(res.statusCode == 201) {
			vm.$u.toast('验证失败，请重新登录');
			setTimeout(_ => vm.$u.route(loginPath), 1500)
			return false;
		} else {
			vm.$u.toast('请求失败，请重试！');
			return false;
		}
	}
	
	// Vue.prototype.$u.http.interceptor.response = (res) => {
	// 		console.log('data', res)
	// 		/// 工作到些,NODE SERVER 返回值不适合
	// 	if(res.code == 200) {
	// 		// res为服务端返回值，可能有code，result等字段
	// 		// 这里对res.result进行返回，将会在this.$u.post(url).then(res => {})的then回调中的res的到
	// 		// 如果把originalData设置为了true，这里得到将会是服务器返回的所有的原始数据
	// 		return res.result;
	// 	} else if(res.code == 201) {
	// 		// 假设201为token失效，这里跳转登录
	// 		vm.$u.toast('验证失败，请重新登录');
	// 		setTimeout(() => {
	// 			// 此为uView的方法，详见路由相关文档
	// 			vm.$u.route(loginPath)
	// 		}, 1500)
	// 		return false;
	// 	} else {
	// 		// 如果返回false，则会调用Promise的reject回调，
	// 		// 并将进入this.$u.post(url).then().catch(res=>{})的catch回调中，res为服务端的返回值
	// 		return false;
	// 	}
	// }
}

export default {
	install
}