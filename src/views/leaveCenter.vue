<template>
	<div class="leave-center">
		<div class="containerT">
			<div class="content">
				<div class="sidebar">
					<div class="person-title">
						<div class="person-title-image">
							<img src="../../public/img/leave.png"/>
						</div>
						<span class="person-title-name">
							留言中心
						</span>
					</div>
					<div class="person-content">
						<ul>
							<li>留言管理</li>
						</ul>
					</div>
				</div>
				<div class="main">
					<div class="main-title">留言列表</div>
					<div class="main-content">
						<a-table 
							:columns="columns" 
							:data-source="data" 
							:pagination="pagination"  
							@change="handleTableChange"
							size="small">
							<template slot="content" slot-scope="text,record">
								<a href="javascript:;" @click="viewItem(record)"><span v-html="setName(text)"></span></a>
							</template>
							<template slot="messageTitle" slot-scope="text">
								<span v-html="setName(text)"></span> 
							</template>
							<span slot="action" slot-scope="text,record"> 
								<a @click="edit(record)">修改</a>
								<a-divider type="vertical" />
								<a @click="deleteItem(record)">删除</a>
							</span>
						</a-table>
					</div>
				</div>
			</div>
		</div>
		<modal
			v-bind:showModal="showModal"
			v-on:close="handClose"
			v-on:handMesSubmit="handMesSubmit"
			:title="title"
			:type="type"
		>
			<template v-slot:mes>
				<div class="main-table-box">
					<table class="main-table">
						<tr>
							<td ><label class="must-input">*</label> 留言内容</td>
							<td ><textarea name="" rows="" cols=""  v-model="comment.content"  class="textarea-large"></textarea> </td>
						</tr>
						<tr>
							<td><label class="must-input">*</label> 留言文章</td>
							<td>
								<input type="text" name="" readonly="readonly"  v-model="comment.message.messageTitle"  class="input-large"/>
							</td>
						</tr>
					</table>
				</div>
			</template>
		</modal>
	</div>
</template>

<script>
const columns = [
  {
	title: '留言内容',
    dataIndex: 'content',
    width:'250px',
    align:'center',
    key: 'content',
    scopedSlots: { customRender: 'content' },
  },
  {
    title: '留言文章',
    align:'center',
    width:'250px',
    dataIndex: 'message.messageTitle',
    key: 'messageTitle',
    scopedSlots: { customRender: 'messageTitle' },
  },
  {
    title: '留言时间',
    align:'center',
    width:'100px',
    dataIndex: 'createDate',
    key: 'createDate',
  },
  {
    title: '操作',
     width:'100px',
    align:'center',
    key: 'action',
    scopedSlots: { customRender: 'action' },
  },
];
import {mapState} from 'vuex';
import Modal from '../components/Modal';
export default{
	name:'leaveCenter',
	data(){
		return{
			data:[],
			columns,
			showModal:false,
			title:'',
			comment:{
				content:'',
				user:{},
				message:{},
			},
			pagination:{
				current:1,
				total: 0,
				pageSize: 10,//每页中显示10条数据
				showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
			},
			type:''
		}
	},
	components:{
		Modal
	},
	methods:{
		edit(e){
			const mess = Object.assign({}, e) ;
			this.comment = mess;
			this.type = "";
			this.title="修改";
			this.showModal = !this.showModal;
		},
		viewItem(record){
			this.comment = record;
			this.showModal = !this.showModal;
			this.type = "view";
			this.title="查看";
		},
		handleTableChange(e){
			this.getCommentList({
				pageNum : e.current,
				pageSize : e.pageSize
			});
		},
		handClose(){
			this.showModal = !this.showModal;
			this.comment = {
				user:{},
				message:{},
			}
		},
		handMesSubmit(){
			this.axios.post('/comment/save',this.comment)
			.then((res)=>{
				const {data} = res;
				if(data.success){
					alert(data.message);
					this.showModal = !this.showModal;
					this.getCommentList({
						pageNum:1,
						pageSize:this.pagination.pageSize
					});
					this.comment = {
						user:{},
						message:{},
						content:''
					}
				}else{
					alert(data.message);
				}
				
			});
		},
		setName(e) { //文字超出显示省略号
			return '<span  title="' + e + '" style="display:inline-block;width: 100%;text-align: center;' +
				'        overflow : hidden;' +
				'        text-overflow: ellipsis;' +
				'        white-space: nowrap;">' + e + '</span>'
		},
		deleteItem(e){
			if(confirm("确定要删除吗")){
				this.axios.post('/comment/delete',{"id":e.id}).then((res)=>{
					const{data} = res;
					if(data.success){
						alert(data.message);
						this.getCommentList({
							pageNum:1,
							pageSize:this.pagination.pageSize
						});
					}
				});
			}
		},
		getCommentList(params){
			this.axios.post('/comment/list',{
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
	computed:{
		...mapState(['user'])
	},
	mounted(){
		this.getCommentList({
			pageNum:this.pagination.current,
			pageSize:this.pagination.pageSize
		});
	}
}
</script>

<style lang="scss"  >
.ant-table table{
    table-layout: fixed; 
}
.leave-center{
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
							color: orange;
							transition: all .3s linear ;
							position: relative;
							background: #fce090;
							&:hover{
								background: #fce090;
							}
							&:before{
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
	.main-table-box{
		table,
		table tr th, 
		table tr td{
			outline: none;
			border: none;
			border:1px solid #ccc; 
			padding: 5px;
			text-align: center;
			position: relative;
			.must-input{
				position: absolute;
				color: red;
				left: 15px;
				top: 50%;
				transform: translateY(-50%);
			}
		}
		textarea{
			outline: none;
			border: none;
			border:1px solid #ccc; 
			padding: 5px;
			min-height: 200px;
		}
		.main-table{
			width: 100%;
		}
		.btn-group{
			text-align: center;
			padding: 10px;
			input:first-child{
				margin-right: 10px;
			}
		}
	}
}
</style>