import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import './styles.scss'
import router from './router'
import VueFirestore from 'vue-firestore'
import firebase from 'firebase/app'
import 'firebase/firestore'

Vue.use(ElementUI)
Vue.use(VueFirestore)

const firestore = firebase.initializeApp({
  apiKey: "AIzaSyAsdcYxrPTL2IZ3LcrUApTs7c0Jkd9uN8Y",
  authDomain: "kab-khaw.firebaseapp.com",
  databaseURL: "https://kab-khaw.firebaseio.com",
  projectId: "kab-khaw",
  storageBucket: "kab-khaw.appspot.com",
  messagingSenderId: "584732287994"
}).firestore()

const settings = {timestampsInSnapshots: true};
firestore.settings(settings);


Vue.config.productionTip = false

new Vue({
  router,
  firestore(){
    return {
      foods: firestore.collection('foods')
    }
  },
  render: h => h(App)
}).$mount('#app')
