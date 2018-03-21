<template>
	<div class="amap-page-container">
		<div class="el-amap-wrapper">
			<el-amap 
				vid="amap" 
				:plugin="plugin" 
				:center="center"
				:zoom='zoom'
				:events='events'>
				<el-amap-marker v-for="(marker, index) in markers" :position="marker.position"  :visible="marker.visible" :vid="index" :key="index"></el-amap-marker>
			</el-amap>
		</div>
	</div>
</template>

<script>
	import { AMapManager } from 'vue-amap'
	let amapManager = new AMapManager()

	export default {
		data() {
			let self = this
			return {
				amapManager,
				resizeEnable:true,
				zoom: 16,
				center: [121.59996, 31.197646],
				lng: 0,
				lat: 0,
				loaded: false,
				address:'',
				markers: [
					{
						position: [121.5273285, 31.21515044],					
						visible: true
					}
				],
				events: {
					'moveend': () => {
						this.center = [this.lng,this.lat]
					},
					'zoomchange': () => {
						this.zoom = 18
					},
					'complete': ()=>{
						self.$emit('map-loaded')
					},
					'click': (e) => {
						// let { lng, lat } = e.lnglat;
						// self.lng = lng;
						// self.lat = lat;
						// self.geoCoder(lng,lat)
					}
				},
				plugin: [{
					pName: "Geolocation",
					enableHighAccuracy: true, // 是否使用高精度定位，默认:true
					timeout: 10000, // 超过10秒后停止定位，默认：无穷大
					maximumAge: 0, // 定位结果缓存0毫秒，默认：0
					convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
					showButton: false, // 显示定位按钮，默认：true
					buttonPosition: "LB", // 定位按钮停靠位置，默认：'LB'，左下角
					showMarker: false, // 定位成功后在定位到的位置显示点标记，默认：true
					showCircle: false, // 定位成功后用圆圈表示定位精度范围，默认：true
					panToLocation: true, // 定位成功后将定位到的位置作为地图中心点，默认：true
					zoomToAccuracy: true, // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
					extensions: "all",
					events: {
						init(o) {
							// o 是高德地图定位插件实例
							o.getCurrentPosition((status, result) => {
								if (result && result.position) {
									self.lng = result.position.lng
									self.lat = result.position.lat
									self.center = [self.lng, self.lat]
									self.loaded = true
									self.addMarker(self.lng,self.lat)
									self.$nextTick(()=>{
										self.geoCoder(self.lng, self.lat)
									})
								}
							})
						}
					}
				}]
			}
		},
		methods: {
			addMarker(lng,lat) {
				let marker = Object.assign({},{position:[lng,lat],visible:true})
				this.markers = []
				this.markers.push(marker)
			},
			geoCoder(lng,lat) {
				let self = this
				var geocoder = new AMap.Geocoder({
					radius: 1000,
					extensions: "all"
				});        
				geocoder.getAddress([lng ,lat], function(status, result) {
					if (status === 'complete' && result.info === 'OK') {
						if (result && result.regeocode) {
							self.address = result.regeocode.formattedAddress
							let payload = Object.assign({},{lng:lng,lat:lat,address:self.address})
							self.$nextTick(()=>{
								self.$emit('geo-complete',payload)
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.amap-page-container
		.el-amap-wrapper
			height 250px 
			width 100%
			
</style>

<style>
/* 不显示高德地图logo及版权信息 */
.amap-logo{
	display: none !important
}
.amap-copyright {
	display: none !important
}
</style>



