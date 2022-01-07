<template>
	<v-app>
			<router-view></router-view>
	</v-app> 
	<!--<div id="app">
		<router-view></router-view>
  </div>-->
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  data: () => ({
  }),
};
</script>
<style type="text/css" lang="scss">
.v-application{
	background: #eee !important; 
}
</style>
