<template>
	<div class="header">
		<div class="containerT">
			<a class="header-logo" href="/#/">
				<img src="../../public/img/sgs.png"/>
			</a>
			<div class="header-menu">
				<ul class="header-menu-wrapper">
					<li class="header-menu-warpper-item"><router-link to="/#/">市场首页</router-link></li>
					<li class="divider">|</li><li class="header-menu-warpper-item"><router-link to="/#/">二手指南</router-link></li>
					<li class="divider">|</li><li class="header-menu-warpper-item"><router-link :to="{path:'/manage',query:{flag:1}}">发布信息</router-link></li>
					<li class="divider">|</li><li class="header-menu-warpper-item"><router-link to="/#/">联系我们</router-link></li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
export default{
	name:'nav-header',
	data(){
		return{
		}
	},
	methods:{
		
	}
}
</script>

<style lang="scss">
.header{
	height: 80px;
	.containerT{
		width:1000px;
		margin:0 auto;
		background:#fff;
		display:flex;
		align-items: center;
		height: 100%;
		.header-logo{
		}
		.header-menu{
			margin-left: 50px; 
			.header-menu-wrapper{
				position: relative;
				display:flex; 
				padding-left: 0px;/*对vuetify的优化*/
				.divider{
					align-items: center;
					transform: translateY(25%);
				}
				.header-menu-warpper-item{
					display:flex;
					align-items: center;
					justify-content: center;
					padding: 12px 30px;		
					font-weight: bold;
					cursor: pointer;
					a:hover{
						color: #3686f1;
					}
					a{
						color: #000;
					}
				}
				
			}
		}
	}
}
</style>