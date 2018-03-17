import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import DbMissionList from '@/components/missiondb/dbmissionlist'
import test from '@/test'

Vue.use(Router)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/dbrw',
		name: 'dbrw',
		component: DbMissionList
	}
]
export default new Router({
	mode: 'history',
	routes
})
