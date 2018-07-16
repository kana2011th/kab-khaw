<template>
  <div class="home">
    <div v-for="(food, key) in foodData" v-bind:key="key" class="card">
      {{food.food}}
    </div>
    <shake-screen v-on:shake="shake"></shake-screen>
    <div class="navbar">
      <el-button type="primary" @click="randomize" round>RANDOMIZE</el-button>
    </div>
    <Settings/>
  </div>
</template>

<script>
import ShakeScreen from '@/components/ShakeScreen'
import Settings from '@/views/Settings'

export default {
    components: {ShakeScreen,Settings},
  name: 'home',
  data(){
    return {
      foodData: this.$firebaseRef
    }
  },
  methods: {
    randomize(){

    },
    shake(){

    },
    randomCompleted(){

    }
  }
}
</script>

<style scoped>
.home{
  position: relative;
  height: 100%;
  box-sizing: border-box;
}
.navbar{
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
}
.screen{
  display: block;
  width: 100%;
  height: 100%;
}
</style>

