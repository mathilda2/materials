<template>
	<div class="register">
		<div class="containerT">
			<div class="content">
					<div class="main-content">
						<div class="main-title">用户注册</div>
						<div class="register-content">
							<ul class="register-form">
								<li>
									<label><em>*</em>用户名：</label>
									<input type="text"   class="inut-default"  v-model="userName" />
								</li>
								<li>
									<label><em>*</em>密码：</label>
									<input :type="passType"   class="inut-default" v-model="passWord" />
									<div class="password-see" @click="seePassWord">
										<img src="../../public/img/see-password.svg"/>
									</div>
								</li>
								<li>
									<label><em>*</em>确认密码：</label>
									<input :type="againPassType"   class="inut-default" value="" />
									<div class="password-see" @click="againSeePassWord">
										<img src="../../public/img/see-password.svg"/>
									</div>
								</li>
								<li>
									<label><em>*</em>学号：</label>
									<input type="number"  class="inut-default" v-model="studentNo" />
								</li>
								<li>
									<label><em>*</em>性别：</label>
									<select name="" class="inut-default" v-model="sex"> 
										<option value="0">男</option>
										<option value="1">女</option>
									</select>
								</li>
								<li>
									<label><em>*</em>生日：</label>
									<input type="date"  class="inut-default" v-model="birthday"  />
								</li>
								<li>
									<label><em>*</em>email：</label>
									<input type="text"  class="inut-default"  v-model="email"  />
								</li>
								<li>
									<label><em>*</em>电话：</label>
									<input type="number"  class="inut-default" v-model="phone" />
								</li>
							</ul>
						</div>
						
					<div class="main-btn">
						<input type="button" id="" class="input-submit" value="注册" @click="register" />
					</div>
				</div>
			</div>
		</div>
		<modal 
			v-bind:showModal="showRegisterModal"
			v-on:close="handRegisterClose"
			v-on:handMesSubmit="handMesSubmit"
		>
			<template v-slot:mes>
				<p>{{mes}}</p>
			</template>
		</modal>
	</div>
</template>

<script>
import Modal  from '../components/Modal'
export default{
	name:'register',
	components:{
		Modal 
	},
	data(){
		return{
			passType:'password',
			againPassType:'password',
			userName:'',
			passWord:'',
			studentNo:'',
			birthday:'',
			email:'',
			phone:'',
			sex:'',
			showRegisterModal:false,
			mes:'',
		}
	},
	methods:{
		handRegisterClose(){
			this.showRegisterModal = !this.showRegisterModal;
			this.$router.push({path:'/index'});
		},
		handMesSubmit(){
			this.showRegisterModal = !this.showRegisterModal;
			this.$router.push({path:'/index'});
		},
		register(){
			this.axios.post('/register',{
				"userName":this.userName,
				"passWord":this.passWord,
				"studentNo":this.studentNo,
				"birthday":this.birthday,
				"email":this.email,
				"phone":this.phone,
				"sex":this.sex,
			}).then((res)=>{
				const{data} = res;
				if(data.success){
					this.mes = data.message;
					this.showRegisterModal=!this.showRegisterModal;
				}else{
					this.mes = data.message;
					this.showRegisterModal=!this.showRegisterModal;
				}
			});
		},
		seePassWord(){
			if(this.passType=='password'){
				this.passType='text';	
			}else{
				this.passType='password';	
			}
		},
		againSeePassWord(){
			if(this.againPassType=='password'){
				this.againPassType='text';	
			}else{
				this.againPassType='password';	
			}
		}
	}
}
</script>

<style lang="scss">
.register{
	.containerT{
		width:1000px;
		margin:0 auto;
		.content{
			.main-content{
				margin-top: 10px;
				margin-bottom: 10px;
				background:#fff;
				display:flex;
				flex-direction:column;
				justify-content:center;
				.main-title{
					border-bottom: 1px solid #ccc;
					height: 60px;
					line-height: 60px;
					padding-left: 30px;
					font-size: 22px;
					font-weight: bold;
				}
				.register-content{
					display: flex;
					justify-content: center;
					.register-form{
						padding: 20px 30px ;
						li{
							position: relative;
							padding: 10px;
							text-align: left;
							.password-see{
								position: absolute;
								top: 50%;
								right: 15px;
								transform: translateY(-50%);
								width:25px;
								height:25px;
								display:inline-block;
								cursor:pointer;
								img{
									width:100%;
									height: 100%;
								}
							}
							label{
								position: relative;
								padding-left: 10px;
								color: #000;
								display: inline-block;
								width: 90px;
								em{
									position: absolute;
									left: 0;
									top: 3px;
									color: red;
								}
							}
						}
					}
				}
				.main-btn{
					text-align: center;
					padding: 10px;
				}
			}
		}
	}
}
</style>