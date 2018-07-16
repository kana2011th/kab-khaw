<template>
    <div class="home">
        <div class="screen">
            <transition name="fade-overlay">
                <div class="sub-screen center" v-if="!showSettings && !isRolling">
                    <img src="../assets/shake.png" width="50%" class="shake"/>
                </div>
            </transition>
            <div class="sub-screen center" v-if="!showSettings && isRolling">
                <span>{{waitMessage}}</span>
            </div>
            <div class="sub-screen" v-show="!showSettings">
                <div id="random-card" v-if="false">
                    <div v-for="(food, key) in foods" :key="key" class="card">
                        <h3>{{food.foodName}}</h3>
                        <h4>{{food.foodLocation !== undefined? food.foodLocation : ""}}</h4>
                    </div>
                </div>
                <div id="selected-card" class="card centered" v-if="pickedCard.foodName !== undefined">
                    <h2>คุณจะไปกิน</h2>
                    <h3>{{pickedCard.foodName}}</h3>
                    <h2 v-if="pickedCard.foodLocation !== undefined && pickedCard.foodLocation !== ''">ที่</h2>
                    <h4>{{pickedCard.foodLocation !== undefined? pickedCard.foodLocation : ""}}</h4>
                </div>
            </div>
            <div class="sub-screen scroll with-bg" v-if="showSettings">
                <h2 style="margin-left: 10px; ">รายการอาหาร</h2>
                <food-listing></food-listing>
            </div>
            <div class="navbar right">
                <el-button v-if="!showSettings" @click="showSettings = true" round :disabled="isRolling">SETTINGS
                </el-button>
                <el-button v-if="showSettings" @click="showSettings = false" round>CARD</el-button>
            </div>

            <div class="navbar bottom center">
                <el-button type="primary" @click="randomize" round :disabled="isRolling">RANDOMIZE</el-button>
            </div>
        </div>
        <shake-screen v-on:shake="shake"></shake-screen>
    </div>
</template>

<script>
    /* eslint-disable no-console */

    import ShakeScreen from '@/components/ShakeScreen'
    import {db, rollText} from "../main";
    import FoodListing from "../components/FoodListing";
    // import { TweenMax } from 'gsap'

    export default {
        components: {FoodListing, ShakeScreen},
        name: 'home',
        data() {
            return {
                foods: {},
                showSettings: false,
                randomFinished: true,
                cardStyles: [],
                pickedCard: {},
                isRolling: false,
                isReadyToRoll: false,
                waitMessage: "",
                numberInterval: 0,
                interval: {}
            }
        },
        firestore() {
            return {
                foods: db.collection('foods')
            }
        },
        mounted() {
        },
        methods: {
            randomize() {
                if (this.isRolling) return
                this.pickedCard = {}
                this.showSettings = false
                this.isRolling = true
                this.randomFinished = false
                this.numberInterval = 0
                this.waitMessage = ""
                clearInterval(this.interval)

                this.interval = setInterval(() => {
                    console.log(this.numberInterval)
                    switch (this.numberInterval){
                        case 0:
                            // startFailed = true
                            startFailed = Math.random() > 0.5
                            this.waitMessage = rollText[this.numberInterval]
                            break;
                        case 1:
                            if(startFailed){
                                this.numberInterval = 0
                                this.waitMessage = rollText[1][1][failInterval]
                                console.log(failInterval > 2, this.numberInterval, failInterval,"fails", rollText[1][1])
                                if(failInterval == 1){
                                    startFailed = false
                                    this.numberInterval = 0
                                }
                                failInterval++
                            }else{
                                this.waitMessage = rollText[this.numberInterval+1]
                            }
                            break;
                        case 2:
                        case 3:
                        case 4:
                        case 5:
                        case 6:
                        case 9:
                        case 7:
                            this.waitMessage = rollText[this.numberInterval]
                            // startFailed = true
                            startFailed = Math.random() > 0.5
                            if(startFailed){
                                failInterval = 0
                            }
                            break;
                        case 8:
                            if(startFailed){
                                this.numberInterval = 7
                                this.waitMessage = rollText[8]
                                if(failInterval == 1){
                                    startFailed = false
                                    this.waitMessage = rollText[1][1][1]
                                    this.numberInterval = 0
                                }
                                failInterval++
                            }else{
                                this.waitMessage = rollText[7]
                            }
                            break;

                    }
                    if(this.numberInterval > 9){
                        this.isReadyToRoll = true
                        this.numberInterval = 0
                        this.rollTheRice()
                    }else{
                        this.numberInterval++
                    }
                }, 1000)
                let startFailed;
                let failInterval = 0;
            },
            rollTheRice(){
                let count = Math.ceil(Math.random() * this.foods.length)
                this.pickedCard = this.foods[count]

                setTimeout(() => {
                    // var width = document.querySelectorAll('#selected-card')[0].offsetWidth
                    // TweenMax.fromTo(document.querySelectorAll('#selected-card')[0],2,
                    //     {y:window.height, x:(window.width/2) + (width/2)},
                    //     {x:0,y:0}
                    // )
                    this.isRolling = false
                    this.randomFinished = true
                }, 1000)
                clearInterval(this.interval)
                this.isReadyToRoll = false
            },
            shake() {
                this.randomize()
            }
        }
    }
</script>

<style scoped>
    .home {
        position: relative;
        height: 100%;
        box-sizing: border-box;
    }

    .navbar {
        display: flex;
        position: absolute;
        top: 0;
        width: 100%;
        padding: 1rem;
        box-sizing: border-box;
    }

    .navbar.bottom {
        top: unset;
        bottom: 0;
    }

    .navbar.center {
        justify-content: center;
    }

    .navbar.right {
        justify-content: flex-end;
    }

    .screen {
        display: block;
        width: 100%;
        height: 100%;
        position: relative;
    }

    .sub-screen {
        width: 100%;
        height: 100%;
        position: absolute;
        box-sizing: border-box;
    }

    .sub-screen.with-bg{
        background-color: #FFF;
    }

    .sub-screen.scroll {
        overflow-y: scroll;
    }

    .sub-screen.center {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .shake {
        opacity: 0.5;
        transition: opacity ease-out 0.5s;
        animation: shake ease-in-out 1s alternate-reverse infinite;
    }

    .fade-overlay-enter,
    .fade-overlay-leave-to {
        opacity: 0;
    }

    .fade-overlay-enter-active,
    .fade-overlay-leave-active {
        transition: opacity 2s;
    }

    @keyframes shake {
        0% {
            transform: rotate(0) translate(0, 0);
        }
        100% {
            transform: rotate(30deg) translate(1em, 2em);
        }
    }

    .card {
        position: absolute;
        width: 10rem;
        height: 16em;
        padding: 1em;
        box-shadow: rgba(0, 0, 0, 0.2) 0 2px 4px 2px;
        background: #fff;
    }

    .card:after {
        content: "";
        display: block;
        padding-bottom: 100%;
    }

    .card.centered {
        position: absolute;
        margin: auto;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    .card h2, .card h3, .card h4{
        text-align: center;
    }
</style>

