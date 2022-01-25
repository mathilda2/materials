<template>
	<div class="admin">
	<v-app>
	<v-app-bar app  >
		<v-app-bar-nav-icon @click="show=!show"></v-app-bar-nav-icon>
		<v-spacer></v-spacer> 
		<v-btn icon @click="handleFullScreen()">
        <v-icon>fullscreen</v-icon>
        </v-btn>
		<v-btn icon >
          <v-avatar size="30px">
            <img src="../assets/logo.png" alt="Michael Wang" />
          </v-avatar>
        </v-btn>
   </v-app-bar> 
   
   <v-navigation-drawer app v-model="show">
	<v-toolbar  > 
      <v-toolbar-title   @click="goToIndex">
        <v-img   src="../../public/img/sgs.png"></v-img>
      </v-toolbar-title>
    </v-toolbar>
      <v-list> 
        <v-list-item-group  v-model="selectedItem"  color="primary" >
        <v-subheader >功能列表</v-subheader>
        <v-divider></v-divider>
          <v-list-item  v-for="(item, i) in items" :key="i" :href="item.href" >
            <v-list-item-icon>
              <v-icon  v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"  ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
  </v-navigation-drawer> 

  <v-main>
	<v-container fluid>
		<router-view></router-view>
	</v-container>  
  </v-main>
</v-app> 
	</div>
</template>

<script>
import Util from "@/util"
export default{
	name:'admin',
	components:{
	},
	data(){
		return{
			selectedItem: 0,
			items: [
				{ text: '用户管理', icon: 'mdi-account-multiple' ,href:'/#/user'},
				{ text: '分类管理', icon: 'mdi-star' ,href:'/#/type'},
				{ text: '地区管理', icon: 'mdi-drone' ,href:'/#/area'},
				{ text: '状态管理', icon: 'mdi-history' ,href:'/#/oldValue'},
				{ text: '信息管理', icon: 'mdi-message-bulleted',href:'/#/message' },
				{ text: '属性管理', icon: 'mdi-format-list-bulleted-type' ,href:'/#/salesType'},
				{ text: '评论管理', icon: 'mdi mdi-comment' ,href:'/#/comment'},
				{ text: '文章管理', icon: 'mdi mdi-book-open-variant' ,href:'/#/article'},
			],
			show:true
		}
	},
	methods:{
		goToIndex(){
			this.$router.push({path:'/'});
		},
		handleFullScreen() {
			Util.toggleFullScreen()
		}
	}
}
</script>

<style lang="scss"  >
.about{
	background: blue;
}
</style>