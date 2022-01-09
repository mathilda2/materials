<template>
	<div class="index">
		<div class="containerT">
			<div class="main">
				<div class="sidebar">
					<div class="user-login" v-if="!user.id">
						<div class="user-login-title">用户登录</div>
						<div class="sidebar-content">
							<div class="input-field">
								<label for="userName">用户名：</label>
								<input class="input-item" placeholder="请输入用户名" type="text" name="userName"  v-model="user.userName" value="" />
							</div>
							<div class="input-field">
								<label for="passWord">密码：</label>
								<input class="input-item" placeholder="请输入密码" type="password" name="passWord" v-model="user.passWord" value="" />
							</div>
							<div class="btn-box">
								<a href="javascript:;" class="btn" @click="login" >登录</a>
								<a href="javascript:;" class="btn" @click="register">注册</a>
							</div>
						</div>
					</div>
					<div class="user-info" v-if="user.id">
						<div class="user-info-detail">
							<div class="user-image">
								<img src="../assets/logo.png"/>
							</div>
							<div class="user-info-own">
								<div class="user-info-name">欢迎 : {{user.userName}}</div>
								<div class="user-info-num">学号 : {{user.studentNo}}</div>
							</div>
							<div class="user-backend" v-if="user.userName=='admin'" @click="goToBackend">
								后台  |
							</div>
							<div class="user-logout" @click="logout">
								退出  
							</div>
						</div>
						<div class="user-info-release">
							<router-link :to="{path:'/manage',query:{flag:1}}">发布信息</router-link>
						</div>
						<div class="user-info-operate">
							<a class="user-info-person" href="/#/personCenter">
								<div class="user-info-image">
									<img src="../../public/img/person.png"/>
								</div>
								<p>
									个人中心
								</p>
							</a>
							<a class="user-info-word"  href="/#/leaveCenter">
								<div class="user-info-image">
									<img src="../../public/img/leave.png"/>
								</div>
								<p>
									留言中心
								</p>
							</a>
							<a class="user-info-center"  href="/#/messageCenter">
								<div class="user-info-image">
									<img src="../../public/img/info.png"/>
								</div>
								<p>
									信息中心
								</p>
							</a>
						</div>
					</div>
					<div class="info-search">
						<div class="info-search-title">信息搜索</div>
						<div class="sidebar-content">
							<div class="input-field">
								<label for="userName">关键字：</label>
								<input class="input-item" placeholder="请输入产品名" type="text" name="userName" value="" />
							</div>
							<div class="input-field">
								<label for="category">分类：</label>
								<select name="type" class="input-item">
									<option value="">所有物品类别</option>
									<option :value="item.id" v-for="(item,i) in typeList" :key="i">{{item.typeDesc}}</option>
								</select>
							</div>
							<div class="input-field">
								<label for="value">属性：</label>
								<select name="type" class="input-item">
									<option value="">所有买卖</option>
									<option :value="item.id" v-for="(item,i) in salesTypeList" :key="i">{{item.salesTypeDesc}}</option>
								</select>
							</div>
							<div class="input-field">
								<label for="area">地区：</label>
								<select name="type" class="input-item">
									<option value="">所有地区</option>
									<option :value="item.id" v-for="(item,i) in areaList" :key="i">{{item.areaDesc}}</option>
								</select>
							</div>
							<div class="btn-box">
								<a href="javascript:;" class="btn search" @click="search" >搜索</a>
								<a href="javascript:;" class="btn reset" >重置</a>
							</div>
						</div>
					</div>
					<div class="top-list">
						<div class="top-search-title">top排行</div>
						<div class="sidebar-content">
							<ul class="top-content">
								<li class="top-item"><span class="top-item-num active">1</span><a href="javascript:;">中南大学主校区与南校区之间中南大学中南大学</a></li>
								<li class="top-item"><span class="top-item-num active">2</span><a href="javascript:;">求购电动车一辆，看车满意马上就22</a></li>
								<li class="top-item"><span class="top-item-num active">3</span><a href="javascript:;">中南大学主校区wwwwwssss与南校区之间</a></li>
								<li class="top-item"><span class="top-item-num">4</span><a href="javascript:;">全新抗震折叠自行车</a> </li>
								<li class="top-item"><span class="top-item-num">5</span><a href="javascript:;">全新抗震折叠自行车</a> </li>
								<li class="top-item"><span class="top-item-num">6</span><a href="javascript:;">中南大学主校区与南校区之间</a></li>
								<li class="top-item"><span class="top-item-num">7</span><a href="javascript:;">求购二手电动车一台</a></li>
								<li class="top-item"><span class="top-item-num">8</span><a href="javascript:;">求购长沙到泰安（或济南）卧铺票 </a> </li>
								<li class="top-item"><span class="top-item-num">9</span><a href="javascript:;">转让东塘附近家教一份 </a> </li>
								<li class="top-item"><span class="top-item-num">10</span><a href="javascript:;">低价出售全新原装诺基亚N95</a></li>
							</ul>
						</div>
					</div>
				</div>
				<div class="content">
					<div class="month-recommend">本月推荐</div>
					<div class="list-box">
						<div class="list" v-for="(item,i) in recommendList" :key="i">
							<div class="list-title">
								<div class="list-title-name">{{item.typeDesc}}</div>
								<div class="list-title-more"><a href="javascript:;">更多</a></div>
							</div>
							<ul class="list-item" v-if="item.childList.length>0">
								<li class="list-item-content"  v-for="(childItem,j) in item.childList" :key="j">
									<router-link :to="{path:'/messageDetail',query:{id:childItem.id}}">{{childItem.messageTitle}}</router-link> 
								</li>
							</ul>
							<no-recom-data v-else></no-recom-data>
						</div>
					</div>
				</div>
			</div>
		</div>
		<modal
			v-bind:showModal="showModal"
			v-on:close="handClose"
		>
			<template v-slot:mes>
				<p>退出成功！</p>
			</template>
		</modal>
		<modal
			v-bind:showModal="showMesModal"
			v-on:close="handMesClose"
			v-on:handMesSubmit="handMesSubmit"
			>
			<template v-slot:mes>
				<p>{{mes}}</p>
			</template>			
		</modal>
	</div>
</template>

<script>
import Modal from '../components/Modal'
import sessionStorage from '../storage'
import {mapState} from 'vuex';
import NoRecomData from '../components/NoRecomData'
export default{
	name:'index',
	components:{
		Modal,
		NoRecomData
	},
	data(){
		return{
			isLogin:true,
			showModal: false,  
			showMesModal: false, 
			mes:'',
			loginUser:{},
			typeList:[],
			areaList:[],
			salesTypeList:[],
			recommendList:[],
		}
	},
	methods:{
		goToBackend(){
			this.$router.push({path:'/admin'})
		},
		search(){
			this.$router.push({
				path:'messageSearch',
				query:{
					name:'yzh',
					email:'1@qq.com'
				}
			});
		},
		register(){
			this.$router.push({path:'/register'})
		},
		login(){
			if(!this.user){
				alert("清填写用户名和密码！");
				return;
			}
			let that = this;
			this.axios.post('/login',this.user).then((res)=>{
				const{data} = res;
				if(data.success){
					that.mes = data.message;
					that.showMesModal=!that.showMesModal;
					that.loginUser = data.content;
					that.$store.dispatch('saveUser',data.content);
				}else{
					that.mes = data.message;
					that.showMesModal=!that.showMesModal;
				}
			});
		},
		logout(){
			let that = this;
			this.axios.post('/logout',{
				"id":that.loginUser.id,
			}).then((res)=>{
				const{data} = res;
				if(data.success){
					that.mes = data.message;
					that.loginUser = data.content;
					that.$store.dispatch('saveUser','');
					sessionStorage.removeItem("currentUser"+that.loginUser.id)
				}  
			});
		},
		handClose(){
			this.showModal = !this.showModal;
		},
		handMesClose(){
			this.showMesModal = !this.showMesModal;
		},
		handMesSubmit(){
			this.showMesModal = !this.showMesModal;
		},
		getAreaList(){
			this.axios.post('/area/list',{}).then((res)=>{
				const{data} = res;
				if(data.success){
					this.areaList = data.content.list;
				}
			});
		},
		getTypeList(){
			this.axios.post('/type/list',{}).then((res)=>{
				const{data} = res;
				if(data.success){
					this.typeList = data.content.list;
				}
			});
		},
		getSalesTypeList(){
			this.axios.post('/salesType/list',{}).then((res)=>{
				const{data} = res;
				if(data.success){
					this.salesTypeList = data.content.list;
				}
			});
		},
		getRecommendList(){
			this.axios.post('/type/getRecommendList',{}).then((res)=>{
				const{data} = res;
				if(data.success){
					this.recommendList = data.content;
				}
			});
		}
	},
	mounted(){
		this.getAreaList();
		this.getTypeList();
		this.getSalesTypeList();
		this.getRecommendList();
	},
	computed:{
		...mapState(['user'])
	}
}
</script>

<style lang="scss" >
.v-application{
	line-height: 1;
}

.sidebar-content{
	background: #fff;
	display: flex;
	flex-direction: column;
	padding: 20px 10px;
	.input-field{
		margin-bottom: 5px;
		display:flex;
		justify-content:space-between;
		align-items: center;
		label{
			width: 70px;
			display: flex;
			justify-content: center;
			font-size: 17px;
		}
		.input-item{
			border: none;
			outline: none;
			height: 30px;
			width: 220px;
			border: 1px solid #00c5f6;
			appearance: auto ; /*对vuetify的优化*/
		}
	}
}
.index{
	margin: 10px 0px;
	.containerT{
		width:1000px;
		margin:0 auto;
		.main{
			display: flex;
			.sidebar{
				margin-right: 10px;
				width:320px;
				.user-login{
					background:#fff;
					margin-bottom: 10px;
					.user-login-title{
						display: flex;
						justify-content: center;
						align-items: center;						
						height: 60px;
						color: #fff;
						font-weight: bold;
						font-size: 18px;
						background-image: linear-gradient(#00c9fe,#e4f2f5);
					}
				}
				.user-info{
					margin-bottom: 10px;
					padding: 10px;
					background: #fff;
					.user-info-detail{
						display:flex;
						margin-bottom: 15px;
						position:relative;
						.user-image{
							width: 60px;
							height: 60px;
							flex-shrink: 0;
							border-radius: 50%;
							overflow: hidden;
							img{
								height: 100%;
								width: 100%;
							}
						}
						.user-info-own{
							width: 100%;
							margin-left: 10px;
							display: flex;
							flex-direction: column;
							justify-content: space-around;
							.user-info-name{
							}
							.user-info-num{
							}
						}	
						.user-logout{
							position: absolute;
							top: 0;
							right: 0;
							cursor: pointer;
						}	 
						.user-backend{
							position: absolute;
							top: 0;
							right: 38px;
							cursor: pointer;
						}
					}
					.user-info-release{
						height: 40px;
						line-height: 40px;
						text-align: center;
						background-image: linear-gradient(to right,red,orange);
						color: #fff;
						font-size: 18px;
						font-weight: bold;
						border-radius: 5px;
						margin-bottom: 15px; 
						transition: background-position 1s  ;
						&:hover{
							background-position: 100% 0;     
						}
						a{
							color: #fff;
							display: block;
						}
					}
					.user-info-operate{
						display: flex;
						justify-content: space-around;
						.user-info-image{
							width: 40px;
							height: 40px;
							margin-bottom:5px;
							img{
								width: 100%;
								height: 100%;
							}
						}
						p{
						}
						.user-info-person{
							display: flex;
							flex-direction: column;
							align-items: center;
							&:hover{
								color: red;
							}
						}
						.user-info-word{
							display: flex;
							flex-direction: column;
							align-items: center;
							&:hover{
								color: red;
							}
						}
						.user-info-center{
							display: flex;
							flex-direction: column;
							align-items: center;
							&:hover{
								color: red;
							}
						}
					}
				}
				.info-search{
					background: #fff;
					margin-bottom: 10px;
					.info-search-title{
						display: flex;
						justify-content: center;
						align-items: center;						
						height: 60px;
						color: #fff;
						font-weight: bold;
						font-size: 18px;
						background-image: linear-gradient(#04d011,#d2f6d3);
					}
				}
				.top-list{
					background: #fff;
					.top-search-title{
						display: flex;
						justify-content: center;
						align-items: center;						
						height: 60px;
						color: #fff;
						font-weight: bold;
						font-size: 18px;
						background-image: linear-gradient(#fd97c9,#fee1f1);
					}
					.top-content{
						padding-left: 0px;/*对vuetify的优化*/
						.top-item{
							position:relative;
							padding:5px 15px 5px 20px;
							white-space:nowrap;
							overflow:hidden;
							text-overflow:ellipsis;
							font-size:14px;
							.top-item-num{
								position: absolute;
								top: 5px;
								left: 0;
								display: inline-block;
								width: 15px;
								height: 15px;
								text-align: center;
								line-height: 15px;
								background-color: #e6e6e6;
								color: #666;
								font-size: 12px;
							}
						}
					}
				}
			}
			.content{
				display: flex;
				flex-direction: column;
				background:#fff;
				width: 100%;
				.month-recommend{
					height: 50px;
					line-height: 50px;
					font-size: 18px;
					font-weight: bold;
					padding-left: 20px;
					background: #3686f1;
					color: #fff;
				}
				.list-box{
					display: flex;
					flex-wrap: wrap;
					.list{
						width: 50%;
						.list-title{
							display: flex;
							justify-content: space-between;
							height: 40px;
							align-items: center;
							&::before{
								position: absolute;
								display: inline-block;
								content:'';
								width: 3px;
								height:20px;
								margin-left: 10px;
								background: orange;
							}
							.list-title-name{
								font-weight: bold;
								margin-left: 20px;
								height: 30px;
								line-height: 30px;
							}
							.list-title-more{
								margin-right: 10px;
							}
						}
						.list-item{
							border: 1px solid #ccc;
							border-radius: 10px;
							margin: 5px;
							padding: 10px;
							height: 220px;
							.list-item-content{
								padding: 3px 3px;
								white-space:nowrap;
								overflow:hidden;
								text-overflow:ellipsis;
								font-size:14px;
								&::before{
									display: inline-block;
									content:'';
									width: 3px;
									height:3px;
									background: orange;
									margin-right: 5px;
									margin-left: 5px;
								}
							}
						}
					}
				}
			}
		}
	}
}
</style>