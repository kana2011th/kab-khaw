import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import './styles.scss'
import router from './router'
import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'

Vue.use(ElementUI)
Vue.use(VueFire)

firebase.initializeApp({
    apiKey: "AIzaSyAsdcYxrPTL2IZ3LcrUApTs7c0Jkd9uN8Y",
    databaseURL: "https://kab-khaw.firebaseio.com",
    projectId: "kab-khaw",
})

export const db = firebase.firestore()
export const rollText = {
    0: "เตรียมบัตรแปป",
    1: ["กรรม ทำบัตรตก ._. รออีกหน่อยนะ", {0:"เก็บแปปนะ", 1:"เคร เริ่มใหม่"}],
    2: "เอ้า รอบนี้ไม่ทำบัตรไม่ตกเว้ย",
    3: "เตียมตัวยัง??",
    4: "เอ้า วัน",
    5: "เดือน",
    6: "ปี",
    7: "พ.ศ.",
    8: "แปปนะ ระบบล่ม...",
    9: "คุณ จะ ได้ กิน...."
}

const settings = {timestampsInSnapshots: true};
db.settings(settings);


Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
