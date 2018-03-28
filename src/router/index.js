import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const Home = resolve => {
  import('@/components/Home').then(module => {
    resolve(module)
  })
}
const DbMissionList = resolve => {
  import('@/components/missiondb/dbmissionlist').then(module => {
    resolve(module)
  })
}
const customers = resolve => {
  import('@/components/customerManagement/customers').then(module => {
    resolve(module)
  })
}
const customerDetail = resolve => {
  import('@/components/customerManagement/clientDetail').then(module => {
    resolve(module)
  })
}
const delivery = resolve => {
  import('@/components/customerManagement/delivery').then(module => {
    resolve(module)
  })
}
const addDelivery = resolve => {
  import('@/components/customerManagement/addDelivery').then(module => {
    resolve(module)
  })
}
const checkin = resolve => {
  import('@/components/checkin/checkin').then(module => {
    resolve(module)
  })
}
const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/customers',
    component: customers,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/customers/:dwbh',
    component: customerDetail
  },
  {
    path: '/customers/delivery/:dwbh',
    component: delivery
  },
  {
    path: '/customers/delivery/:dwbh/addDelivery',
    component: addDelivery
  },
  {
    path: '/checkin',
    component: checkin
  },
  {
    path: '/dbrw',
    component: DbMissionList
  }
]
export default new Router({
  mode: 'history',
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      setTimeout(() => {
        window.scrollTo(savedPosition.x, savedPosition.y)
      }, 200)
    } else {
      return { x: 0, y: 0 }
    }
  }
})
