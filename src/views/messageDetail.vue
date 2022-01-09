<template>
	<div class="message-detail">
		<div class="containerT">
			<div class="content">
				<div class="message-content">
					<div class="message-content-title">{{message.messageTitle}}</div>
					<div class="message-content-info">作者：{{message.user.userName}} 时间：{{message.createDate}}</div>
					<div class="message-content-divide"></div>
					<div class="message-content-detail">
						{{message.messageDesc}}
					</div>
				</div>
				<div class="message-publish">
					<div class="message-publish-content">
						<textarea name="" placeholder="俺来说说" maxlength="500" v-model="content" ></textarea>
						<span>{{content.length}}/500</span>
					</div>
					<div class="message-publish-footer">
						<div class="message-publish-author-name">
							<div class="message-publish-author-image">
								<img src="../assets/logo.png"/>
							</div>
							<span>{{user.userName}}</span>
						</div>
						<div class="message-publish-button" @click="submit">发布</div>
					</div>
				</div> 
				<div class="message-leave" v-for="(item,i) in commentList" :key="i">
					<div class="message-total">
						<div class="message-leave-person">
							<div class="message-leave-person-image"> 
								<img src="../assets/logo.png"/>
							</div>
						</div>
						<div class="message-leave-detailbox">
							<div class="message-leave-person-info">
								<div class="message-leave-person-name">{{item.user.userName}} <span class="message-date">{{item.createDate}}</span></div>
							</div>
							<div class="message-leave-detail">
								{{item.content}}
							</div>
						</div>
					</div>
					<!--<div class="message-leave-date">2121年12月12日</div>-->
				</div>
				<div class="message-loadmore" v-if="this.commentList.length<this.pagination.total">
					<span class="loadmore" @click="loadmore">加载更多...</span>
				</div>
				<no-data v-if="this.commentList.length==this.pagination.total&&this.commentList.length!=0"></no-data>
			</div>
		</div>
	</div>
</template>

<script>
import NoData from '../components/NoData';
import {mapState} from 'vuex';
export default{
	name:'messageDetail',
	data(){
		return{
			list:[],
			textSize:0,
			content:'',
			message:{
				user:{}
			},
			commentList:[],
			pagination:{
				pageNum:1,
				size: 10,
				pages:0,
				total:0
			}
		}
	},
	components:{
		NoData
	},
	methods:{
		submit(){
			let params = {
				user:this.user,
				messageId:this.$route.query.id,
				content:this.content
			}
			this.axios.post('/comment/save',params).then((res)=>{
				const{data} = res;
				if(data.success){
					alert(data.message);
					this.content = '';
					this.commentList = [];
					this.getCommentListByMessageId(this.$route.query.id);
				}
			})
		},
		loadmore(){
			if(this.pagination.pageNum < this.pagination.pages){
				this.pagination.pageNum +=1;
				this.getCommentListByMessageId(this.$route.query.id);
			}
		},
		getCommentListByMessageId(id){
			let that = this;
			let param = {
				messageId:id
			};
			let params = Object.assign(this.pagination,param);
			this.axios.post('/comment/list',params).then((res)=>{
				const{data} = res;
				if(data.success){
					that.commentList = that.commentList.concat(data.content.list);
					for(var i = 0 ; i < this.commentList.length ; i++){
						this.commentList[i].createDate = this.formatDate(this.commentList[i].createDate);
					}
					that.pagination.pages = data.content.pages;
					that.pagination.total = data.content.total;
				}
			})
		},
		getMessageDetail(id){
			let that = this;
			this.axios.post('/message/getMessageDetail',{id:id}).then((res)=>{
				const{data} = res;
				if(data.success){
					that.message = data.content;
					that.message.createDate = this.formatDate(that.message.createDate);
				}
			});
		}
	},
	mounted(){
		this.getCommentListByMessageId(this.$route.query.id);
		this.getMessageDetail(this.$route.query.id);
	},
	computed:{
		...mapState(['user'])
	}
}
</script>

<style lang="scss">
.message-detail{
	.containerT{
		width:1000px;
		margin:0 auto;
		.content{
			border-top: 1px solid #ccc;
			min-height: 520px;
			margin-bottom: 10px;
			.message-content{
				background: #fff;
				width: 100%;
				/*height: 160px;*/
				margin-bottom:10px;
				.message-content-title{
					text-align: center;
					padding-top: 10px;
					height: 100px;
					line-height: 100px;
					font-size: 28px;
					font-weight: bold;
				}
				.message-content-info{
					text-align: center;
					height: 50px;
					line-height: 50px;
					font-size: 14px;
				}
				.message-content-divide{
					width: 300px;
					border-top: 1px solid #ccc;
					margin: 0 auto;
				}
				.message-content-detail{
					padding: 20px 30px;
					min-height: 100px;
					line-height: 20px;
				}
			}
			.message-publish{
				border-bottom: 1px solid #ccc;
				padding: 20px;
				background: #fff;
				.message-publish-content{
					border: 1px solid #ccc;
					border-radius:10px;
					margin-bottom:10px;
					position:relative;
					textarea{
						width:100%;
						min-height: 100px;
						padding: 10px 20px 0px;
						border: none;
						outline: none;
						font-size: 15px;
					}
					span{
						display: inline-block;
						position: absolute;
						bottom: 8px;
						right: 8px;
						font-size: 13px;
						color: #aaa;
					}
				}
				.message-publish-footer{
					display: flex;
					justify-content: flex-end;
					.message-publish-author-name{
						height: 36px;
						line-height: 36px;
						display:flex;
						margin-right:10px;
						.message-publish-author-image{
							width: 36px;
							height: 36px;
							border-radius: 50%;
							overflow: hidden;
							margin-right: 5px;
							img{
								width: 100%;
								height: 100%;
							}
						}
					}
					.message-publish-button{
						width: 60px;
						text-align: center;
						height: 36px;
						line-height: 36px;
						background: #1866f5;
						color: #fff;
						border-radius:8px;
						margin-left: 10px;
						cursor: pointer;
					}
				}
			}
			.message-leave{
				background: #fff;
				display: flex;
				padding: 10px;
				align-items: center;
				justify-content: space-between;
				border-bottom: 1px solid #ccc;
				&:last-child{
					border-bottom: none;
				}
				.message-total{
					display: flex;
					justify-content: space-between;
					.message-leave-person{
						.message-leave-person-image{
							width: 50px;
							height: 50px;
							border-radius: 50%;
							overflow: hidden;
							transition: all .3s linear ;
							img{
								width: 100%;
								height: 100%;
							}
							&:hover{
								transform: rotate(360deg);
							}
						}
					}
					.message-leave-detailbox{
						flex-grow: 1;
						.message-leave-person-info{
							margin-left: 10px;
							margin-bottom: 5px;
							font-size: 14px;
							display: flex;
							flex-direction: column;
							justify-content: space-between;
							.message-leave-person-name{
								color: #3C3C3C;
								.message-date{
									color: #aaa;
								}
							}
							.message-leave-person-email{
							}
						}
						.message-leave-detail{
							margin-left: 10px;
							font-size: 14px;
							line-height: 20px;
						}
					}
					
				}
				.message-leave-date{
					flex-shrink: 0;
					margin-left: 10px;
					font-size: 12px;
					width: 100px;
					text-align: center;
					background: #bbb;
					padding: 3px;
					color: #fff;
					border-radius: 5px;
				}
			}
			.message-loadmore{
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