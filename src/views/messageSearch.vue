<template>
	<div class="message-search">
		<div class="containerT">
			<div class="content">
				<div class="search-content">
					<div class="search-content-box">
						<input type="text" name=""  v-model="messageTitle" />
						<span class="search-close" v-if="messageTitle" @click="searchClose"></span>
					</div>
					<div class="search-conent-button" @click="search">搜索</div>
				</div>
				<div class="search-all-category">
					<span>所有分类：</span>
					<div class="search-all-area">
						<div class="search-all-type">
							<span class="search-all-content"  v-for="(item,i) in myAreaList" :key="i">
								地区 : {{item.areaDesc}}
								<span class="search-close" @click="closeArea(i)"></span>
							</span>
						</div>
						<div class="search-all-type">
							<span  class="search-all-content"  v-for="(item,i) in myValueList" :key="i">
								属性 : {{item.salesTypeDesc}}
								<span class="search-close" @click="closeValue(i)"></span>
							</span>
						</div>
						<div class="search-all-type"  v-for="(item,i) in myTypeList" :key="i">
							<span  class="search-all-content">
								类型 : {{item.typeDesc}}
								<span class="search-close" @click="closeType(i)"></span>
							</span>
						</div>
					</div>
				</div>
				<div class="search-detail">
					<div class="search-detail-area-box" v-if="myAreaList.length==0">
						<span>地区：</span>
						<div class="search-detail-area" v-for="(item,i) in areaList" :key="i">
							<span @click="chooseArea(i)">{{item.areaDesc}}</span>
						</div>
					</div>
					<div class="search-detail-value-box" v-if="myValueList.length==0">
						<span>属性：</span>
						<div class="search-detail-value" v-for="(item,i) in valueList" :key="i">
							<span @click="chooseValue(i)">{{item.salesTypeDesc}}</span>
						</div>
					</div>
					<div class="search-detail-type-box" v-if="myTypeList.length==0">
						<span>类型：</span>
						<div class="search-detail-type"  v-for="(item,i) in typeList" :key="i">
							<span @click="chooseType(i)">{{item.typeDesc}}</span>
						</div>
					</div>
				</div>
				<div class="search-result">
					<div class="search-result-detail" v-for="(item,i) in messageList" :key="i" @click="goToDetail(item.id)">
						<div class="search-result-detail-content">
							<a href="javascript:;">{{item.messageTitle}} </a>
						</div>
						<div class="search-result-detail-info">
							<div class="search-result-detail-name">{{item.user.userName}}</div>
							<div class="search-result-detail-date">{{item.createDate}}</div>
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
			areaList:[],
			valueList:[],
			typeList:[],
			myAreaList:[],
			myValueList:[],
			myTypeList:[],
			messageList:[],
			messageTitle:'',
			
		}
	},
	components:{
	},
	methods:{
		goToDetail(obj){
			this.$router.push({
				path:'messageDetail',
				query:{
					id:obj,
				}
			});
		},
		searchClose(){
			this.messageTitle = '';
			this.search();
		},
		search(){
			let params  = {
				area:this.myAreaList[0],
				type:this.myTypeList[0],
				salesType:this.myValueList[0],
				messageTitle:this.messageTitle
			};
			let that = this;
			this.axios.post('/message/list',params).then((res)=>{
				const{data} = res;
				this.data = data.content.list;
				if(data.success){
					that.messageList = data.content.list;
					for(var i = 0 ; i < this.data.length ; i++){
						this.data[i].createDate = this.formatDate(this.data[i].createDate);
					}
				}
			});
		},
		chooseArea(index){
			this.myAreaList.push(this.areaList[index]);
			this.areaList.splice(index,1);
			this.search();
		},
		chooseValue(index){
			this.myValueList.push(this.valueList[index]);
			this.valueList.splice(index,1);
			this.search();
		},
		chooseType(index){
			this.myTypeList.push(this.typeList[index]);
			this.typeList.splice(index,1);
			this.search();
		},
		closeArea(index){
			this.areaList.push(this.myAreaList[index]);
			this.myAreaList.splice(index,1);
			this.search();
		},
		closeValue(index){
			this.valueList.push(this.myValueList[index]);
			this.myValueList.splice(index,1);
			this.search();
		},
		closeType(index){
			this.typeList.push(this.myTypeList[index]);
			this.myTypeList.splice(index,1);
			this.search();
		},
		getTypeList(){
			this.axios.post('/type/list',{}).then((res)=>{
				const{data} = res;
				if(data.success){
					this.typeList = data.content.list;
					for(let i = 0 ; i < this.typeList.length ; i++){
						if(this.typeList[i].id==  this.$route.query.typeSearch){
							this.chooseType(i);
						}
					}
				}
			});
		},
		getSalesTypeList(){
			this.axios.post('/salesType/list',{}).then((res)=>{
				const{data} = res;
				if(data.success){
					this.valueList = data.content.list;
					for(let i = 0 ; i < this.valueList.length ; i++){
						if(this.valueList[i].id==  this.$route.query.salesTypeSearch){
							this.chooseValue(i);
						}
					}
				}
			});
		},
		getAreaList(){
			this.axios.post('/area/list',{}).then((res)=>{
				const{data} = res;
				if(data.success){
					this.areaList = data.content.list;
					for(let i = 0 ; i < this.areaList.length ; i++){
						if(this.areaList[i].id==  this.$route.query.areaSearch){
							this.chooseArea(i);
						}
					}
				}
			});
		}
	},
	mounted(){
		this.getAreaList();
		this.getTypeList();
		this.getSalesTypeList();
		this.messageTitle = this.$route.query.nameSearch;
		this.search();
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
					position:relative;
					input{
						width: 600px;
						height: 40px;
						border: none;
						outline: none;
						border: 1px solid orange;
						padding-left: 10px;
					}
					.search-close{
						background: url(../../public/img/search-close.svg) no-repeat center;
						position: absolute;
						cursor: pointer;
						right: 5px;
						top: 50%;
						transform: translateY(-50%);
						width: 25px;
						height: 25px;
						background-size: 25px;
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
							width: 80px;
							height: 20px;
							display: inline-block;
							text-align: left;
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
							text-align: left;
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
							width: 90px;
							height: 20px;
							display: inline-block;
							text-align: left;
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