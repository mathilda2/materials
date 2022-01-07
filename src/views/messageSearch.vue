<template>
	<div class="message-search">
		<div class="containerT">
			<div class="content">
				<div class="search-content">
					<div class="search-content-box">
						<input type="text" name="" id="" value="" />
					</div>
					<div class="search-conent-button">搜索</div>
				</div>
				<div class="search-all-category">
					<span>所有分类：</span>
					<div class="search-all-area">
						<div class="search-all-type">
							<span class="search-all-content"  v-for="(item,i) in myAreaList" :key="i">
								地区 : {{item.areaName}}
								<span class="search-close" @click="closeArea(i)"></span>
							</span>
						</div>
						<div class="search-all-type">
							<span  class="search-all-content"  v-for="(item,i) in myValueList" :key="i">
								属性 : {{item.valueName}}
								<span class="search-close" @click="closeValue(i)"></span>
							</span>
						</div>
						<div class="search-all-type"  v-for="(item,i) in myTypeList" :key="i">
							<span  class="search-all-content">
								类型 : {{item.typeName}}
								<span class="search-close" @click="closeType(i)"></span>
							</span>
						</div>
					</div>
				</div>
				<div class="search-detail">
					<div class="search-detail-area-box" v-if="myAreaList.length==0">
						<span>地区：</span>
						<div class="search-detail-area" v-for="(item,i) in areaList" :key="i">
							<span @click="chooseArea(i)">{{item.areaName}}</span>
						</div>
					</div>
					<div class="search-detail-value-box" v-if="myValueList.length==0">
						<span>属性：</span>
						<div class="search-detail-value" v-for="(item,i) in valueList" :key="i">
							<span @click="chooseValue(i)">{{item.valueName}}</span>
						</div>
					</div>
					<div class="search-detail-type-box" v-if="myTypeList.length==0">
						<span>类型：</span>
						<div class="search-detail-type"  v-for="(item,i) in typeList" :key="i">
							<span @click="chooseType(i)">{{item.typeName}}</span>
						</div>
					</div>
				</div>
				<div class="search-result">
					<div class="search-result-detail" v-for="(item,i) in 10" :key="i">
						<div class="search-result-detail-content">
							qweqweqeqweqweqweqweqweqweqweqweqweqweqweqweqweqwqweqweqwqqwqweqweqwqweqweqwqweqweqw
							qweqweqeqweqweqweqweqweqweqweqweqweqweqweqweqweqw
							qweqweqeqweqweqweqweqweqweqweqweqweqweqweqweqweqw
						</div>
						<div class="search-result-detail-info">
							<div class="search-result-detail-name">math</div>
							<div class="search-result-detail-date">2021-20-34</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

export default{
	name:'messageCenter',
	data(){
		return{
			areaList:[{
				"areaName":"北京",
				"id":"1001"
			},{
				"areaName":"上海",
				"id":"1002"
			},{
				"areaName":"纽约",
				"id":"1003"
			},{
				"areaName":"台湾",
				"id":"1004"
			}],
			valueList:[{
				"valueName":"商学院",
				"id":"1001"
			},{
				"valueName":"医学院",
				"id":"1002"
			},{
				"valueName":"国学院",
				"id":"1003"
			}],
			typeList:[{
				"typeName":"一手",
				"id":"1001"
			},{
				"typeName":"二手",
				"id":"1002"
			},{
				"typeName":"三手",
				"id":"1003"
			},{
				"typeName":"死守",
				"id":"1004"
			}],
			myAreaList:[],
			myValueList:[],
			myTypeList:[],
		}
	},
	components:{
	},
	methods:{
		chooseArea(index){
			this.myAreaList.push(this.areaList[index]);
			this.areaList.splice(index,1);
		},
		chooseValue(index){
			this.myValueList.push(this.valueList[index]);
			this.valueList.splice(index,1);
		},
		chooseType(index){
			this.myTypeList.push(this.typeList[index]);
			this.typeList.splice(index,1);
		},
		closeArea(index){
			this.areaList.push(this.myAreaList[index]);
			this.myAreaList.splice(index,1);
		},
		closeValue(index){
			this.valueList.push(this.myValueList[index]);
			this.myValueList.splice(index,1);
		},
		closeType(index){
			this.typeList.push(this.myTypeList[index]);
			this.myTypeList.splice(index,1);
		},
	},
	mounted(){
	}
}
</script>

<style lang="scss">
.message-search{
	.containerT{
		width:1000px;
		margin:0 auto;
		.content{
			.search-content{
				margin-top: 10px;	
				background: #fff;	
				height: 80px;
				display: flex;
				justify-content: center;
				align-items: center;
				.search-content-box{
					input{
						width: 600px;
						height: 40px;
						border: none;
						outline: none;
						border: 1px solid orange;
						padding-left: 10px;
					}
				}
				.search-conent-button{
					height: 40px;
					line-height: 40px;
					text-align: center;
					width: 100px;
					background: #3686f1;
					color: #fff;
					background-image: linear-gradient(to right,red,orange);
					cursor: pointer;
				}
			}
			.search-all-category{
				background: #fff;	
				display:flex;
				align-items: center;
				padding: 20px 25px;
				.search-all-area{
					display:flex;
					.search-all-type{
						display: flex;
						margin-right: 3px;
						.search-all-content{
							position: relative;
							border:1px solid red;
							width: 130px;
							display: inline-block;
							font-size: 12px;
							color: #666;
							padding: 5px 10px 5px;
							.search-close{
								position: absolute;
								right: 5px;
								top: 50%;
								transform: translateY(-50%);
								background:url(../../public/img/close.svg) no-repeat center;
								width: 10px;
								height: 10px;
								cursor: pointer;
							}
						}
						
					}
				}
			}
			.search-detail{
				background: #fff;			
				margin-bottom: 10px;
				padding: 20px 25px;
				border-top: 1px solid #ccc;
				.search-detail-area-box{
					display:flex;
					margin-bottom:20px;
					span{
						display:flex;
						width: 60px;
						height: 20px;
						display: inline-block;
						text-align: center;
					}
					.search-detail-area{
						display:flex;
						span{
							display:flex;
							width: 60px;
							height: 20px;
							display: inline-block;
							text-align: center;
							cursor: pointer;
							&:hover{
								color: orangered;
							}
						}
					}
				}
				.search-detail-value-box{
					display:flex;
					margin-bottom:20px;
					span{
						display:flex;
						width: 60px;
						display: inline-block;
						text-align: center;
					}
					.search-detail-value{
						display:flex;
						span{
							display:flex;
							width: 60px;
							height: 20px;
							display: inline-block;
							text-align: center;
							cursor: pointer;
							&:hover{
								color: orangered;
							}
						}
					}
				}
				.search-detail-type-box{
					display:flex;
					span{
						display:flex;
						width: 60px;
						display: inline-block;
						text-align: center;
					}
					.search-detail-type{
						display:flex;
						span{
							display:flex;
							width: 60px;
							height: 20px;
							display: inline-block;
							text-align: center;
							cursor: pointer;
							&:hover{
								color: orangered;
							}
						}
					}
				}
			}
			.search-result{
				margin-bottom: 10px;
				background: #fff;
				.search-result-detail{
					border-bottom: 1px solid #ccc;
					padding: 10px 20px;
					height: 50px;
					display: flex;
					justify-content: space-between;
					align-items: center;
					transition:all  .1s linear ;
					.search-result-detail-content{
						cursor: pointer;
						width: 850px;
						white-space:nowrap;
						overflow:hidden;
						text-overflow:ellipsis;
					}
					.search-result-detail-info{
						display: flex;
						flex-direction: column;
						font-size: 14px;
						width: 100px;
						flex-shrink: 0;
						font-weight: 300;
						.search-result-detail-name{
							text-align: center;
							margin-bottom: 5px;
						}
						.search-result-detail-date{
							text-align: center;
						}
					}
					&:last-child{
						border-bottom:0px solid red ;
					}
					&:hover{
						box-shadow: 0 0 5px  #00C5F6; 
					}
				}
			}
		}
	}
}
</style>