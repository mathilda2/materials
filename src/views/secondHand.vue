<template>
	<div class="second-detail">
		<div class="containerT">
			<div class="content">
				<div class="second-content-image">
					<img src="../../public/img/school.jpg"/>
				</div>
				<div class="second-detail-box">
					<div class="second-detail" v-for="(item,i) in list" :key="i">
						<div class="second-detail-image">
							<img src="../../public/img/2.jpg"/>
						</div>
						<div class="second-detail-content">
							<div class="second-detail-content-title">
								{{item.title}}
							</div>
							<div class="second-detail-content-authdate">
								<img src="../../public/img/user.svg"/>
								<span class="second-detail-name">{{item.createBy.userName}}</span>
								<img src="../../public/img/clock.svg"/>
								<span class="second-detail-date">{{item.createDate}}</span>
								<img src="../../public/img/length.svg"/>
								<span class="second-detail-length">{{item.content.length}}字</span>
							</div>
							<div class="second-detail-real" >
								<router-link :to="{path:'/secondHandDetail',query:{id:item.id}}">{{item.content}}</router-link> 
							</div> 
						</div>
					</div>
				</div>
				<div class="second-detail-pagination">
					<v-pagination v-model="pagination.current" @input="changePage" :length="pagination.pages"  ></v-pagination>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default{
	name:'secondHand',
	data(){
		return{
			list:[],
			pagination:{
				current: 1,
				pageNum:1,
				pageSize: 4,
				pages:1
			},
		}
	},
	components:{
	},
	methods:{
		changePage(e){
			this.getArticleList({
				"pageNum":e,
				"pageSize":this.pagination.pageSize
			});
		},
		getArticleList(params){
			this.axios.post('/article/list',{
				"pageNum":params.pageNum,
				"size":params.pageSize
			}).then((res)=>{
				const {data} = res;
				this.list = data.content.list;
				this.pagination.pages = data.content.pages;
				this.pagination.current =params.pageNum;
				for(var i = 0 ; i < this.list.length ; i++){
					this.list[i].createDate = this.formatDate(this.list[i].createDate);
				}
			});
		},
	},
	mounted(){
		this.getArticleList({
			pageNum:this.pagination.current,
			pageSize:this.pagination.pageSize
		});
	} 
}
</script>

<style lang="scss">
.second-detail{
	.containerT{
		width:1000px;
		margin:0 auto;
		.content{
			border-top: 1px solid #ccc;
			min-height: 520px;
			margin-bottom: 10px;
			.second-content-image{
				img{
					width:100%;	
				}
				margin-bottom:10px;
			}
			.second-detail-box{
				.second-detail{
					display: flex;
					height: 180px;
					background: #fff;
					margin-bottom:10px;
					.second-detail-image{
						width: 270px;
						flex-shrink:0;
						img{
							width: 100%;
							height: 100%;
						}
					}
					.second-detail-content{
						.second-detail-content-title{
							font-size: 24px;
							padding: 5px 20px;
						}
						.second-detail-content-authdate{
							padding: 5px 20px;
							font-size: 14px;
							.second-detail-name{
								margin: 5px;
								color: orange;
							}
							.second-detail-date{
								margin: 5px;
								color: dodgerblue;
							}
							.second-detail-length{
								margin: 5px;
								color: #bbb;
							}
						}
						.second-detail-real{
							padding: 5px 20px;
							display:-webkit-box;
							text-overflow:ellipsis;
							overflow:hidden;
							-webkit-line-clamp: 3;
							-webkit-box-orient:vertical;
							font-size:16px;
							width: 730px;
							a{
								color: #656565;
							}
						}
					}
				}
			}
			.second-loadmore{
				margin: 10px;
				text-align: center;
				.loadmore{ 
					display: inline-block;
					width: 80px;
					height: 30px;
					line-height: 30px;
					background: #00C5F6;
					border-radius: 5px;
					background:rgba(0,0,0,.7);
					color:#fff;
					font-size: 14px;
					cursor: pointer;
				}
			}
		}
	}
}
</style>