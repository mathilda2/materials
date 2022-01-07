<template>
	<div class="home">
		<nav-header></nav-header>
		<router-view></router-view>
		<nav-footer></nav-footer>  
	</div>
</template>

<script>
import NavHeader from './../components/NavHeader'
import NavFooter from './../components/NavFooter'
export default{
	name:'home'	,
	components:{
		NavHeader,
		NavFooter
	}
}
</script>

<style  >
body{
	background: #3c3c3c;
}
</style>