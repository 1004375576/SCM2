<template>
  <div id="app" >
  	<div v-if="$route.meta.keepAlive">
  	<left-menu></left-menu>
  	<Header></Header>
  	<router-view></router-view>
  	</div>
  	<router-view v-if="!$route.meta.keepAlive"></router-view>
  <!--	<my-footer></my-footer> -->
  </div>
</template>

<script>

import LeftMenu from '@/components/LeftMenu';
import Header from '@/components/Header';
//import Footer from '@/components/Footer';
export default {
  name: 'App',
  data () {
    return {
    }
  },
  components:{
      LeftMenu,
      Header
  }
 }
  </script>
<style>
    @import './assets/css/viewsc.css';
</style>
