<template>
	<div class="second-detail-real">
		<div class="containerT">
			<div class="content">
				<div class="second-detail-article">
					<div class="second-detail-article-title">{{article.title}} </div>
					<div class="second-detail-article-authdate">作者：{{article.createBy.userName}} 时间：{{article.createDate}} 字数：{{article.content.length}}</div>
					<div class="second-detail-article-content">
						{{article.content}}
					</div>
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
			content:'',
			article:{},
		}
	},
	components:{
	},
	methods:{
		getArticleDetail(id){
			let that = this;
			this.axios.post('/article/getArticleDetail',{id:id}).then((res)=>{
				const{data} = res;
				if(data.success){
					that.article = data.content;
					that.article.createDate = this.formatDate(that.article.createDate);
				}
			});
		}
	},
	mounted(){
		this.getArticleDetail(this.$route.query.id);
	} 
}
</script>

<style lang="scss">
.second-detail-real{
	.containerT{
		width:1000px;
		margin:0 auto;
		.content{
			border-top: 1px solid #ccc;
			min-height: 520px;
			margin-bottom: 10px;
			.second-detail-article{
				margin-top: 10px;
				background:#fff; 
				min-height: 520px;
				.second-detail-article-title{
					text-align: center;
					font-size: 45px;
					font-weight: bold;
					color: #333;
					padding-top: 50px;
					padding-bottom: 30px;
				}
				.second-detail-article-authdate{
					text-align: center;
					margin-bottom: 50px;
				}
				.second-detail-article-content{
					font-size: 20px;
					line-height: 2;
					text-indent:2em;
					padding:  0px 30px ;
				}
			}
		}
	}
}
</style>