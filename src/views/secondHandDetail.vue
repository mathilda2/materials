<template>
	<div class="second-detail-real">
		<div class="containerT">
			<div class="content">
				<div class="second-detail-article">
					<div class="second-detail-article-title">时发生的房卡收到顺丰ss发顺丰 </div>
					<div class="second-detail-article-authdate">作者：math 时间：2022年1月24日 字数：121</div>
					<div class="second-detail-article-content">
						sfs中国疫情可能暴增5倍到10倍中国疫情可能暴增5倍到10倍中国疫情可能暴增5倍到10倍中国疫情可能暴增5倍到10倍
						中国疫情可能暴增5倍到10倍中国疫情可能暴增5倍到10倍中国疫情可能暴增5倍到10倍中国疫情可能暴增5倍到10倍中国疫情可能暴增5倍到10倍
						中国疫情可能暴增5倍到10倍中国疫情可能暴增5倍到10倍中国疫情可能暴增5倍到10倍中国疫情可能暴增5倍到10倍中国疫情可能暴增5倍到10倍
						fsd林克件了靳连看看中国疫情可能暴增5倍到10倍中国疫情可能暴增5倍到10倍中国疫情可能暴增5倍到10倍中国疫情可能暴增5倍到10倍中国疫情可能暴增5倍到10倍
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
			list:[],
			content:'',
			second:{},
		}
	},
	components:{
	},
	methods:{
		changePage(e){
			console.log(e);
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
				.second-detail-article-title{
					border: 1px solid red;
					text-align: center;
					font-size: 45px;
					font-weight: bold;
					color: #333;
					padding-top: 50px;
					padding-bottom: 30px;
				}
				.second-detail-article-authdate{
					border: 1px solid red;
					text-align: center;
				}
				.second-detail-article-content{
					border: 1px solid red;
				}
			}
		}
	}
}
</style>