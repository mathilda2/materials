<template>
	<div class="send-manage">
		<div class="containerT">
			<div class="content">
				<div class="main">
					<div class="main-title">发布信息</div>
					<div class="main-content">
						<form action="" method="post">
							<table class="main-table">
								<tr>
									<td >信息标题</td>
									<td ><input type="text" name="" id="" placeholder="(30字以内)" value="" maxlength="200" class="input-large"/> </td>
								</tr>
								<tr>
									<td>新旧程度</td>
									<td>
										<select name="" class="input-large">
											<option value="0">1成新</option>
											<option value="1">2成新</option>
											<option value="2">3成新</option>
										</select>
									</td>
								</tr>
								<tr>
									<td>交易类型</td>
									<td>
										<select name="" class="input-large">
											<option value="0">出售</option>
											<option value="1">告罄</option>
										</select>
									</td>
								</tr>
								<tr>
									<td>所属类别</td>
									<td>
										<select name="" class="input-large">
											<option value="0">视听设备</option>
											<option value="1">音频设备</option>
											<option value="2">什么鬼</option>
										</select>
									</td>
								</tr>
								<tr>
									<td>交易地区</td>
									<td>
										<select name="" class="input-large">
											<option value="0">校门口</option>
											<option value="1">校门内</option>
											<option value="2">校门外</option>
										</select>
									</td>
								</tr>
								<tr>
									<td>物品价格</td>
									<td><input type="number" name="" id="" value="" class="input-large"/></td>
								</tr>
								<tr>
									<td>联系人</td>
									<td><input type="text" name="" id="" value="" class="input-large"/></td>
								</tr>
								<tr>
									<td>E-mail</td>
									<td><input type="text" name="" id="" value="" class="input-large"/></td>
								</tr>
								<tr>
									<td>联系方式</td>
									<td><input type="text" name="" id="" value="" class="input-large"/></td>
								</tr>
								<tr>
									<td>物品简介</td>
									<td><textarea name="" rows="" cols="" class="textarea-large"></textarea></td>
								</tr>
							</table>
						</form>
						<div class="btn-group">
							<input type="submit" name="" id="" class="input-submit" value="提交" />
							<input type="reset" name="" id="" class="input-submit default" value="重置" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default{
	name:'sendMessage',
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

<style lang="scss" scoped >
.v-application{
	line-height: 1;/*对vuetify的优化*/
}
.send-manage{
	.containerT{
		width:790px;
		margin:0 auto;
		.content{
			height: 520px;
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
					table,
					table tr th, 
					table tr td {
						outline: none;
						border: none;
						border:1px solid #ccc; 
						padding: 5px;
						text-align: center
					}
					.main-table{
						width: 100%;
					}
					.btn-group{
						text-align: center;
						padding: 10px;
						input:first-child{
							margin-right: 10px;
						}
					}
				}
			}
		}
	}
}
</style>