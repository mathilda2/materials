<template>
	<div class="message-detail">
		<div class="containerT">
			<div class="content">
				<div class="message-content">
					<div class="message-content-title">作者：math 时间：2012-12-12</div>
					<div class="message-content-divide"></div>
					<div class="message-content-detail">
						养狗对社会造成的负担与影响很大，狗屎狗尿增加周边环境负担，加重环卫工人劳动，狗尿具有强烈腐蚀性，对路灯、车轮等极具破坏性，增加社会公共投入，狗能咬人，属于社会不安定因素。养狗都要登记的，增加社会管理成本。因此，养狗应当额外纳税。社会资源税、公共服务税。对于随地大小便的还要罚款。
					</div>
				</div>
				<div class="message-publish">
					<div class="message-publish-content">
						<textarea name="" placeholder="俺来说说" maxlength="150" v-model="content" ></textarea>
						<span>{{content.length}}/150</span>
					</div>
					<div class="message-publish-footer">
						<div class="message-publish-author-name">
							<div class="message-publish-author-image">
								<img src="../assets/logo.png"/>
							</div>
							<span>yzh</span>
						</div>
						<div class="message-publish-button">发布</div>
					</div>
				</div>
				<div class="message-leave" v-for="(i,item) in 10" :key="i">
					<div class="message-total">
						<div class="message-leave-person">
							<div class="message-leave-person-image"> 
								<img src="../assets/logo.png"/>
							</div>
							<div class="message-leave-person-info">
								<div class="message-leave-person-name">math</div>
								<div class="message-leave-person-email">23232322</div>
							</div>
						</div>
						<div class="message-leave-detail">
							{{item}}中国人民银行有关负责人介绍，短期个别介绍，短期个别介绍，短别介绍，短期个别介绍，短期个别介绍，短期个期个别介绍，短期个期个别介绍，短期个期个别介绍，短期个别介绍，短期个别介绍，短期个别介绍，短期个别介绍，短期个别房企出现风险，不会影响中长期市场的正常融资功能。近期，境内房地产销售、购地、融资等行为已逐步回归常态
						</div>
					</div>
					<div class="message-leave-date">2121年12月12日</div>
				</div>
				<div class="message-loadmore" v-if="nodata">
					<span class="loadmore">加载更多...</span>
				</div>
				<no-data v-if="!nodata"></no-data>
			</div>
		</div>
	</div>
</template>

<script>
import NoData from '../components/NoData'
export default{
	name:'messageDetail',
	data(){
		return{
			list:[],
			nodata:true,
			textSize:0,
			content:''
		}
	},
	components:{
		NoData
	},
	methods:{
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
			.message-content{
				background: #fff;
				width: 100%;
				height: 160px;
				margin-bottom:10px;
				.message-content-title{
					text-align: center;
					height: 50px;
					line-height: 50px;
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
				height: 70px;
				justify-content: space-between;
				border-bottom: 1px solid #ccc;
				&:last-child{
					border-bottom: none;
				}
				.message-total{
					display: flex;
					align-items: center;
					.message-leave-person{
						display: flex;
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
						.message-leave-person-info{
							margin-left: 5px;
							font-size: 14px;
							display: flex;
							flex-direction: column;
							justify-content: space-around;
							.message-leave-person-name{
							}
							.message-leave-person-email{
							}
						}
					}
					.message-leave-detail{
						margin-left: 10px;
						font-size: 14px;
						line-height: 20px;
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