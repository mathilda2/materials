<template>
	<div class="message-more">
		<div class="containerT">
			<div class="content">
				<div class="more-content">
					<div class="more-result-detail" v-for="(item,i) in list" :key="i" @click="goToDetail(item.id)">
						<div class="more-result-detail-content">
							<div class="more-result-detail-title">{{item.messageTitle}}</div>
							<div class="more-result-detail-realcontent">
								离开就离开离开就离开离开就离开离开就离开开离开就离开离开就离开开离开就离开离开就离开离开就离开离开就离开离开就离开离开就离开
							</div>
						</div>
						<div class="more-result-detail-info">
							<div class="more-result-detail-name">math</div>
							<div class="more-result-detail-date">2022年1月27日</div>
						</div>
					</div>
				</div>
				<div class="more-detail-pagination">
					<v-pagination v-model="pagination.current" @input="changePage" :length="pagination.pages"  ></v-pagination>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default{
	name:'messageMore',
	data(){
		return{
			list:[],
			pagination:{
				current: 1,
				pageNum:1,
				pageSize: 10,
				pages:1
			},
		}
	},
	methods:{
		changePage(e){
			this.getMessageListByTypeId({
				"type":{"id":this.$route.query.id},
				"pageNum":e,
				"size":this.pagination.pageSize
			});
		},
		goToDetail(id){
			this.$router.push({
				path:'messageDetail',
				query:{
					id:id,
				}
			});
		},
		getMessageListByTypeId(params){
			let that = this;
			this.axios.post('/message/list',params).then((res)=>{
				const{data} = res;
				if(data.success){
					that.list = data.content.list;
					that.pagination.pages = data.content.pages;
					for(var i = 0 ; i < this.list.length ; i++){
						this.list[i].createDate = this.formatDate(this.list[i].createDate);
					}
				}
			});
		}
	},
	mounted(){
		this.getMessageListByTypeId({
			"type":{"id":this.$route.query.id},
			"pageNum":this.pagination.pageNum,
			"size":this.pagination.pageSize
		});
	}
}
</script>

<style lang="scss">
.message-more{
	.containerT{
		width:1000px;
		margin:0 auto;
		.content{
			border-top: 1px solid #ccc;
			min-height: 520px;
			margin-bottom: 10px;
			.more-content{
				margin-top: 10px;	
				background: #fff;	
				min-height: 520px;
				margin-bottom: 10px;
				.more-result-detail{
					border-bottom: 1px solid #ccc;
					padding: 10px 20px;
					height: 60px;
					display: flex;
					justify-content: space-between;
					align-items: center;
					transition:all  .1s linear ;
					.more-result-detail-content{
						cursor: pointer;
						width: 850px;
						.more-result-detail-title{
							margin-bottom: 5px;
							font-size: 20px;
						}
						.more-result-detail-realcontent{
							white-space:nowrap;
							overflow:hidden;
							text-overflow:ellipsis;
							font-size: 14px;
							color: #333333;
						}
					}
					.more-result-detail-info{
						display: flex;
						flex-direction: column;
						font-size: 14px;
						width: 100px;
						flex-shrink: 0;
						font-weight: 300;
						.more-result-detail-name{
							text-align: center;
							margin-bottom: 5px;
						}
						.more-result-detail-date{
							text-align: center;
						}
					}
				}
			}
			.more-detail-pagination{
				
			}
		}
	}
}
</style>