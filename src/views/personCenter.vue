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
								<input type="text"   class="inut-default" value="math" />
							</li>
							<li>
								<label><em>*</em>头像：</label>
								<input type="file" id="file" class="inut-default" value="" />
							</li>
							<li>
								<label><em>*</em>学号：</label>
								<input type="text"  class="inut-default" value="2323232" />
							</li>
							<li>
								<label><em>*</em>性别：</label>
								<select name="" class="inut-default"> 
									<option value="0">男</option>
									<option value="1">女</option>
								</select>
							</li>
							<li>
								<label><em>*</em>生日：</label>
								<input type="text"  class="inut-default" value="2323232" />
							</li>
							<li>
								<label><em>*</em>email：</label>
								<input type="text"  class="inut-default" value="2323232" />
							</li>
							<li>
								<label><em>*</em>电话：</label>
								<input type="number"  class="inut-default" value="18765068623" />
							</li>
						</ul>
						<div class="main-btn">
							<input type="button" id="" class="input-submit" value="保存"  />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

export default{
	name:'personCenter',
	data(){
		return{
		}
	},
	components:{
	},
	methods:{
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
			height: 520px;
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