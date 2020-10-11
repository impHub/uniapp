// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const APIMAP = {
	getHouse: ['get', '/infoVillage/tree'],
	getFront: ['get', '/resDeviceAddress/front/select'],
	getUnit: ['get', '/resDeviceAddress/unit/select'],
	// false无需token可访问
	sendCaptcha: ['post', '/sendCaptcha', false],
	login: ['post', '/login', false],
	logout: ['get', '/logout'],
	addUser: ['post', '/infoResident/create'],
	getAuthDoor: ['get', '/getAuthDoor'],
	openDoor: ['post', '/openDoor']
}
export {APIMAP}	// 提供给拦截器判断验证是否需要token
export default {
	install: (Vue, vm) => {
		let API = {}
		Object.keys(APIMAP).map(key => {
			let [method='get', path='/nopath', auth=true] = APIMAP[key]
			// 接口赋值function               get/post 地址  传值
			API[key] = (params = {}) => vm.$u[method](path, params)
		})
		// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
		vm.$u.api = {...API};
	}
}