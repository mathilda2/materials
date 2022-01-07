<template>
	<div class="message-center">
		<div class="containerT">
			<div class="content">
				<div class="sidebar">
					<div class="person-title">
						<div class="person-title-image">
							<img src="../../public/img/leave.png"/>
						</div>
						<span class="person-title-name">
							信息中心
						</span>
					</div>
					<div class="person-content">
						<ul>
							<li @click="chooseStatus(1)" :class="isActive==1?'choose-active':''">
								<router-link to="/manage" :class="isActive==1?'person-mes':''">信息管理</router-link>
							</li>
							<!--<li @click="chooseStatus(1)" :class="isActive==1?'choose-active':''">
								<router-link to="/manage" :class="isActive==1?'person-mes':''">信息管理</router-link>
							</li>
							<li @click="chooseStatus(2)" :class="isActive===2?'choose-active':''">
								<router-link to="/send"  :class="isActive===2?'person-mes':''">发布信息</router-link>
							</li>-->
						</ul>
					</div>
				</div>
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script>
const columns = [
  {
    dataIndex: 'name',
    key: 'name',
    slots: { title: 'customTitle' },
    scopedSlots: { customRender: 'name' },
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Action',
    key: 'action',
    scopedSlots: { customRender: 'action' },
  },
];

const data = [
  {
    key: '1',
    name: 'John  ',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '11',
    name: 'John  ',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '31',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },{
    key: '311',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },{
    key: '31121',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },{
    key: '34111',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },{
    key: '3111',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '32',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '33',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '345',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  
];
export default{
	name:'messageCenter',
	data(){
		return{
			data,
			columns,
			isActive:1
		}
	},
	components:{
	},
	methods:{
		chooseStatus(e){
			this.isActive = e;
		}
	} 
}
</script>

<style lang="scss">
.message-center{
	.containerT{
		width:1000px;
		margin:0 auto;
		.content{
			display: flex;
			height: 580px;
			.sidebar{
				background: #fff;
				margin: 10px 10px 10px 0px;
				width: 200px;
				flex-shrink: 0;
				.person-title{
					border-bottom: 1px solid #ccc;
					height: 60px;
					display: flex;
					justify-content: center;
					align-items: center;
					margin-bottom: 10px;
					.person-title-image{
						width:20px;
						height:20px;
						img{
							width:100%;
							height: 100%;
						}
					}
					.person-title-name{
						margin-left: 5px;
						font-size: 16px;
						color: #3C3C3C;
						font-weight: bold;
					}
				}
				.person-content{
					ul{
						padding-left: 0px;/*对vuetify的优化*/
						li{
							text-align: center;
							height: 40px;
							line-height: 40px;
							cursor: pointer;
							font-size: 15px;
							color: #666;
							transition: all .3s linear ;
							position: relative;
							&:hover{
								background: #fce090;
								a{
									color: orange;
								}
							}
							&:hover:before{
								content: ' ';
								width: 5px;
								height: 30px;
								border-radius: 3px;
								background: orange;
								display: inline-block;
								position: absolute;
								left: 1px;
								top: 50%;
								transform: translate(-50%, -50%);  
							}
							a{
								color:#666;
								display: inline-block;
								width: 100%;
								height: 100%;
							}
						}
					}
				}
			}
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
					
				}
			}
		}
	}
}
</style>