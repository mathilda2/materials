<template>
	<div class="message-manage">
		<div class="containerT">
			<div class="content">
				<div class="main">
					<div class="main-title-box">
						<div class="main-title">
							信息列表
						</div>
						<div class="add-button" @click="addMessage">
							新增
						</div>						
					</div>
					<div class="main-content">
						<a-table 
							:columns="columns" 
							:data-source="data" 
							:pagination="pagination"  
							@change="handleTableChange"
							size="small">
							<template slot="oldValue" slot-scope="text">
								{{text}}成新
							</template>
							<template slot="price" slot-scope="text">
								{{text}} 
							</template>
							<template slot="messageDesc" slot-scope="text">
								<span v-html="setName(text)"></span>
							</template>
							<template slot="messageTitle" slot-scope="text,record">
								<a href="javascript:;" @click="viewItem(record)"><span v-html="setName(text)"></span></a>
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
							<td ><label class="must-input">*</label> 信息标题</td>
							<td ><input type="text" name=""  v-model="message.messageTitle"   placeholder="(30字以内)" value="" maxlength="200" class="input-large"/> </td>
						</tr>
						<tr>
							<td><label class="must-input">*</label> 新旧程度</td>
							<td>
								<select name="" class="input-large"  v-model="message.oldValue">
									<option :value="item.id" v-for="(item,i) in oldValueList" :key="i">{{item.oldName}}</option>
								</select>
							</td>
						</tr>
						<tr>
							<td><label class="must-input">*</label> 交易类型</td>
							<td>
								<select name="" class="input-large"  v-model="message.flag">
									<option :value="item.id" v-for="(item,i) in salesTypeList" :key="i">{{item.salesTypeDesc}}</option>
								</select>
							</td>
						</tr>
						<tr>
							<td><label class="must-input">*</label> 所属类别</td>
							<td>
								<select name="" class="input-large"  v-model="message.type.id">
									<option :value="item.id" v-for="(item,i) in typeList" :key="i">{{item.typeDesc}}</option>
								</select>
							</td>
						</tr>
						<tr>
							<td><label class="must-input">*</label> 交易地区</td>
							<td>
								<select name="" class="input-large"  v-model="message.area.id">
									<option :value="item.id" v-for="(item,i) in areaList" :key="i">{{item.areaDesc}}</option>
								</select>
							</td>
						</tr>
						<tr>
							<td><label class="must-input">*</label> 物品价格</td>
							<td><input type="number" name=""  v-model="message.price" class="input-large"/></td>
						</tr>
						<tr>
							<td><label class="must-input">*</label> 联系人</td>
							<td><input type="text" name=""  v-model="message.user.userName"  class="input-large"/></td>
						</tr>
						<tr>
							<td><label class="must-input">*</label> 联系方式</td>
							<td><input type="text" name=""  v-model="message.user.phone"  class="input-large"/></td>
						</tr>
						<tr>
							<td>E-mail</td>
							<td><input type="text" name=""  v-model="message.user.email"  class="input-large"/></td>
						</tr>
						<tr>
							<td><label class="must-input">*</label> 物品简介</td>
							<td><textarea name="" rows="" cols=""  v-model="message.messageDesc"  class="textarea-large"></textarea></td>
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
	title: '标题',
    dataIndex: 'messageTitle',
    align:'center',
    key: 'messageTitle',
    scopedSlots: {customRender: 'messageTitle'},
  },
  {
    title: '类型',
    width:'90px',
    align:'center',
    dataIndex: 'type.typeDesc',
    key: 'typeDesc',
  },
  {
    title: '新旧程度',
    dataIndex: 'oldValue',
    width:'80px',
    align:'center',
    key: 'oldValue',
    scopedSlots: {customRender: 'oldValue'},
  },
  {
    title: '区域',
    width:'80px',
    align:'center',
    dataIndex: 'area.areaDesc',
    key: 'areaName',
  },
  {
    title: '价格(元)',
    width:'70px',
    align:'center',
    dataIndex: 'price',
    key: 'price',
    scopedSlots: {customRender: 'price'},
  },
  {
    title: '描述',
    width: '60px', //限制宽度
    align:'center',
    dataIndex: 'messageDesc',
    key: 'messageDesc',
    scopedSlots: {customRender: 'messageDesc'},
  },
  {
    title: '联系方式',
    align:'center',
    dataIndex: 'user.phone',
    key: 'phone',
  },
  {
    title: '发布时间',
    align:'center',
    dataIndex: 'createDate',
    key: 'createDate',
  },
  {
    title: '操作',
    key: 'action',
    align:'center',
    width:'90px',
    scopedSlots: { customRender: 'action' },
    fixed: 'right',
  },
];
import {mapState} from 'vuex';
import Modal from '../../components/Modal';
export default{
	name:'messageManage',
	data(){
		return{
			data:[],
			columns,
			showModal:false,
			title:'',
			message:{
				user:{},
				type:{},
				area:{}
			},
			pagination:{
				current:1,
				total: 0,
				pageSize: 10,//每页中显示10条数据
				showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
			},
			oldValueList:[],
			flagList:[],
			typeList:[],
			areaList:[],
			salesTypeList:[],
			type:''
		}
	},
	components:{
		Modal
	},
	methods:{
		deleteItem(e){
			if(confirm("确定要删除吗")){
				this.axios.post('/message/delete',{"id":e.id}).then((res)=>{
					const{data} = res;
					if(data.success){
						alert(data.message);
						this.getMessageList({
							pageNum:1,
							pageSize:this.pagination.pageSize
						});
					}
				});
			}
		},
		edit(e){
			const mess = Object.assign({}, e) ;
			this.message = mess;
			this.type = "";
			this.showModal = !this.showModal;
		},
		viewItem(record){
			this.message = record;
			this.showModal = !this.showModal;
			this.type = "view";
		},
		handMesSubmit(){
			const {
				user,
				type,
				area,
				messageTitle,
				price,
				oldValue,
				flag,
				messageDesc
			} = this.message;
			if(messageTitle==undefined){
				alert("信息标题不能为空！");
				return ;
			}
			if(oldValue==undefined){
				alert("新旧程度不能为空！");
				return ;
			}
			if(flag==undefined){
				alert("交易类型不能为空！");
				return ;
			}
			if(type.id==undefined){
				alert("所属类别不能为空！");
				return ;
			}
			if(area.id==undefined){
				alert("交易地区不能为空！");
				return ;
			}
			if(price==undefined){
				alert("物品价格不能为空！");
				return ;
			}
			if(user.userName==undefined){
				alert("联系人不能为空！");
				return ;
			}
			if(user.phone==undefined){
				alert("联系方式不能为空！");
				return ;
			}
			if(messageDesc==undefined){
				alert("物品简介不能为空！");
				return ;
			}
			
			this.axios.post('/message/save',this.message)
			.then((res)=>{
				const {data} = res;
				if(data.success){
					alert(data.message);
					this.showModal = !this.showModal;
					this.getMessageList({
						pageNum:1,
						pageSize:this.pagination.pageSize
					});
					this.message = {
						user:{},
						type:{},
						area:{}
					}
				}else{
					alert(data.message);
				}
				
			});
		},
		addMessage(){
			this.showModal = !this.showModal;
			this.title="新增";
			this.type = "";
		},
		handClose(){
			this.showModal = !this.showModal;
			this.message = {
				user:{},
				type:{},
				area:{}
			}
		},
		setName(e) { //文字超出显示省略号
			return '<span  title="' + e + '" style="display:inline-block;width: 100%;text-align: center;' +
				'        overflow : hidden;' +
				'        text-overflow: ellipsis;' +
				'        white-space: nowrap;">' + e + '</span>'
		},
		handleTableChange(e){
			this.getMessageList({
				pageNum : e.current,
				pageSize : e.pageSize
			});
		},
		getMessageList(params){
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
		isAddMessage(){
			const isAdd = Object.keys(this.$route.query);
			if(isAdd.length){
				this.showModal = !this.showModal;
				this.title="新增";
			}
		},
		getOldValueList(){
			this.axios.post('/oldValue/list',{}).then((res)=>{
				const{data} = res;
				if(data.success){
					this.oldValueList = data.content.list;
				}
			});
		},
		getAreaList(){
			this.axios.post('/area/list',{}).then((res)=>{
				const{data} = res;
				if(data.success){
					this.areaList = data.content.list;
				}
			});
		},
		getTypeList(){
			this.axios.post('/type/list',{}).then((res)=>{
				const{data} = res;
				if(data.success){
					this.typeList = data.content.list;
				}
			});
		},
		getSalesTypeList(){
			this.axios.post('/salesType/list',{}).then((res)=>{
				const{data} = res;
				if(data.success){
					this.salesTypeList = data.content.list;
				}
			});
		}
	},
	mounted(){
		this.getMessageList({
			pageNum:this.pagination.current,
			pageSize:this.pagination.pageSize
		});
		this.isAddMessage();
		this.getOldValueList();
		this.getAreaList();
		this.getTypeList();
		this.getSalesTypeList();
	},
	computed:{
		...mapState(['user'])
	}
}
</script>

<style lang="scss" >
.ant-table table{
    table-layout: fixed; 
}
.message-manage{
	.containerT{
		width:790px;
		margin:0 auto;
		.content{
			.main{
				background: #fff;
				margin: 10px 0px;
				width: 100%;
				.main-title-box{
					display:flex;
					justify-content:space-between;
					align-items:center;
					padding-right:5px;
					.main-title{
						height: 40px;
						line-height: 40px;
						padding-left: 20px;
						font-size: 16px;
						font-weight: bold;
						border-bottom: 1px solid #ccc; 
					}
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
			min-height: 40px;
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