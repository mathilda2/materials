<template>
	<div class="person-center">
		<div class="containerT">
			<div class="content">
				<div class="sidebar">
					<div class="person-title">
						<div class="person-title-image">
							<img src="../../public/img/person.png"/>
						</div>
						<span class="person-title-name">
							个人中心
						</span>
					</div>
					<div class="person-content">
						<ul>
							<li>个人资料</li>
						</ul>
					</div>
				</div>
				<div class="main">
					<div class="main-title">个人资料</div>
					<div class="main-content">
						<ul class="main-form">
							<li>
								<label><em>*</em>账号：</label>
								<input type="text"   class="inut-default" v-model="user.userName"   />
							</li>
							<li>
								<label>头像：</label>
								<div class="avatar-box">
									<img class="avatar" id="preview" :src="user.image?PICTURE_HOST+user.image:'/img/defaultImg.svg'">
									<span v-if="user.image" class="avatar-close" @click="deleteImg"></span>
								</div>
								<input type="file" id="file" class="inut-default input-file" @change="upload"  />   
							</li>
							<li>
								<label><em>*</em>学号：</label>
								<input type="text"  class="inut-default"  v-model="user.studentNo" />
							</li>
							<li>
								<label><em>*</em>性别：</label>
								<select name=""  v-model="user.sex" class="inut-default"> 
									<option value="男">男</option>
									<option value="女">女</option>
								</select>
							</li>
							<li>
								<label><em>*</em>生日：</label>
								<input type="date"  class="inut-default"  v-model="user.birthday"/>
							</li>
							<li>
								<label><em>*</em>email：</label>
								<input type="text"  class="inut-default"  v-model="user.email" />
							</li>
							<li>
								<label><em>*</em>电话：</label>
								<input type="number"  class="inut-default"  v-model="user.phone"/>
							</li>
						</ul>
						<div class="main-btn">
							<input type="button"   class="input-submit" value="保存" @click="fileSave" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {mapState} from 'vuex';
export default{
	name:'personCenter',
	data(){
		return{
			fileArr:[],
			deleteFileArr:[],
		}
	},
	components:{
	},
	methods:{
		deleteImg(){
			document.querySelector('#preview').src='/img/defaultImg.svg';
			this.deleteFileArr.push(this.user.image);
			this.user.image = '';
			/**/
		},
		deleteReal(obj){
			this.axios.post('/user/deleteImg',obj).then((res)=>{
				const {data} = res;
				if(data.success){
					alert(data.message);
				}else{
					alert(data.message);
				}
			})
		},
		save(){
			this.axios.post('/user/save',this.user).then((res)=>{
				const {data} = res;
				if(data.success){
					this.$store.dispatch('saveUser',data.content);
					alert(data.message);
				}else{
					alert(data.message);
				}
			});
		},
		upload(e){
			let photoFile = e.target;
			var reader = new FileReader();
            reader.readAsDataURL(photoFile.files[0]);
            reader.onload =function(){
              document.querySelector('#preview').src=reader.result;
            }
            this.fileArr.push(photoFile.files[0]);
		},
		fileSave(){
			if(this.deleteFileArr.length>0){
				let obj = {
					image:this.deleteFileArr[0]
				};
				this.save();
				this.deleteReal(obj);
			}else{
				this.fileAdd(this.fileArr[0]);
			}
		},
		async fileAdd(file){
			let param = new FormData();
			param.append('file', file);  
			let name = file.name;
			let size = file.size;
			let types = '.jpg,.jpeg,.png,.gif'  //文件格式
			let fileExt = name.substring(name.lastIndexOf('.')).toLowerCase()
			let result = types.indexOf(fileExt)
			if (result < 0) {       //验证图片格式
				alert('图片格式不正确');
				return false
			}
			if (size > 50 * 1024 * 1024) {
				alert('图片大小不能大于10M');
				return false
			}
			let that = this;
			this.axios.post('/user/upload',param)
				.then((res) => {
					const {data} = res;
					if(data.success){
						that.user.image = data.content;
						that.save();
					}else{
						alert(data.message);
					}
				}) 
		}
	},
	computed:{
		...mapState(['user'])
	}
}
</script>

<style lang="scss">
.person-center{
	.containerT{
		width:1000px;
		margin:0 auto;
		.content{
			display: flex;
			height: 580px;
			.sidebar{
				background: #fff;
				margin: 10px 10px 10px 0px;
				width: 200px;
				flex-shrink: 0;
				.person-title{
					border-bottom: 1px solid #ccc;
					height: 60px;
					display: flex;
					justify-content: center;
					align-items: center;
					margin-bottom: 10px;
					.person-title-image{
						width:20px;
						height:20px;
						img{
							width:100%;
							height: 100%;
						}
					}
					.person-title-name{
						margin-left: 5px;
						font-size: 16px;
						color: #3C3C3C;
						font-weight: bold;
					}
				}
				.person-content{
					ul{
						padding-left: 0px;/*对vuetify的优化*/
						li{
							text-align: center;
							height: 40px;
							line-height: 40px;
							cursor: pointer;
							font-size: 15px;
							color: orange;
							transition: all .3s linear ;
							position: relative;
							background: #fce090;
							&:hover{
								background: #fce090;
							}
							&:before{
								content: ' ';
								width: 5px;
								height: 30px;
								border-radius: 3px;
								background: orange;
								display: inline-block;
								position: absolute;
								left: 1px;
								top: 50%;
								transform: translate(-50%, -50%);  
							}
						}
					}
				}
			}
			.main{
				background: #fff;
				margin: 10px 0px;
				width: 100%;
				.main-title{
					height: 40px;
					line-height: 40px;
					padding-left: 20px;
					font-size: 16px;
					font-weight: bold;
					border-bottom: 1px solid #ccc;
				}
				.main-content{
					.main-form{
						padding: 20px 30px ;
						li{
							padding: 10px;
							label{
								position: relative;
								padding-left: 10px;
								color: #000;
								display: inline-block;
								width: 60px;
								em{
									position: absolute;
									left: 0;
									top: 3px;
									color: red;
								}
							}
							.avatar-box{
								width: 80px;
								height: 80px;
								display: inline-block;
								position: relative;
								.avatar{
									width: 100%;
									height: 100%;
								}
								.avatar-close{
									cursor: pointer;
									position: absolute;
									width: 20px;
									height: 20px;
									display: inline-block;
									background: url(../../public/img/icon-close.svg) no-repeat center;
									background-size: 30px;
									right: -10px;
									top: -10px;
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
}
</style>