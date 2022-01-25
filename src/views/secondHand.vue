<template>
	<div class="second-detail">
		<div class="containerT">
			<div class="content">
				<div class="second-content-image">
					<img src="../../public/img/school.jpg"/>
				</div>
				<div class="second-detail-box">
					<div class="second-detail" v-for="(item,i) in 10" :key="i">
						<div class="second-detail-image">
							<img src="../../public/img/2.jpg"/>
						</div>
						<div class="second-detail-content">
							<div class="second-detail-content-title">
								选购产品需要注意的东西
							</div>
							<div class="second-detail-content-authdate">
								<img src="../../public/img/user.svg"/>
								<span class="second-detail-name">math</span>
								<img src="../../public/img/clock.svg"/>
								<span class="second-detail-date">2022年1月23日</span>
								<img src="../../public/img/length.svg"/>
								<span class="second-detail-length">233字</span>
							</div>
							<div class="second-detail-real" >
								<a href="/#/secondHandDetail">时发生的房卡收到flash啦睡觉让问问我我额我是非得失是多少 是法律考试卡赛力克埃里克森卡莉法赛力克艾克赛德发甲硫氨酸福利卡打算发是是是
								时发生的房卡收到flash啦睡觉让问问我我额我是非得失是多少 是法律考试卡赛力克埃里克森卡莉法赛力克艾克赛德发甲硫氨酸福利卡打算发是是是
								时发生的房卡收到flash啦睡觉让问问我我额我是非得失是多少 是法律考试卡赛力克埃里克森卡莉法赛力克艾克赛德发甲硫氨酸福利卡打算发是是是
								时发生的房卡收到flash啦睡觉让问问我我额我是非得失是多少 是法律考试卡赛力克埃里克森卡莉法赛力克艾克赛德发甲硫氨酸福利卡打算发是是是
								时发生的房卡收到flash啦睡觉让问问我我额我是非得失是多少 是法律考试卡赛力克埃里克森卡莉法赛力克艾克赛德发甲硫氨酸福利卡打算发是是是
								</a>
							</div> 
						</div>
					</div>
				</div>
				<div class="second-detail-pagination">
					<v-pagination v-model="current" @input="changePage" :length="total"  ></v-pagination>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {mapState} from 'vuex';
export default{
	name:'secondHand',
	data(){
		return{
			list:[],
			textSize:0,
			content:'',
			second:{},
			secondList:[],
			total:8,
			current: 2,
			pagination:{
				pageNum:1,
				size: 10,
				pages:0,
				total:1
			},
			tlength:0,
			isLoad:false
		}
	},
	components:{
	},
	methods:{
		changePage(e){
			console.log(e);
		},
		loadmore(){
			if(this.pagination.pageNum < this.pagination.pages){
				this.pagination.pageNum +=1;
				this.getCommentListByMessageId(this.$route.query.id);
				this.isLoad = true;
			}
		},
		getSecondList(params){
			this.axios.post('/message/list',{
				"user":{"id":this.user.id},
				"pageNum":params.pageNum,
				"size":params.pageSize
			}).then((res)=>{
				const {data} = res;
				this.data = data.content.list;
				this.pagination.total = data.content.total;
				this.pagination.current =params.pageNum;
				for(var i = 0 ; i < this.data.length ; i++){
					this.data[i].createDate = this.formatDate(this.data[i].createDate);
				}
			});
		},
	},
	mounted(){
		this.getSecondList({
			pageNum:this.pagination.current,
			pageSize:this.pagination.pageSize
		});
	},
	computed:{
		...mapState(['user'])
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