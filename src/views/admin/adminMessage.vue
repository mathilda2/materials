<template>
	<div class="admin-area">
		<v-row>
			<v-col cols="3"> <v-text-field v-model="searchItem.messageTitle" label="标题" ></v-text-field> </v-col>
			<v-col cols="3"> <v-text-field v-model="searchItem.messageDesc" label="内容" ></v-text-field> </v-col>
			<v-col  cols="1"> 
				<v-btn color="primary"  @click="search" > 
					<v-icon left> mdi-pencil </v-icon>搜索
				</v-btn> 
			</v-col> 
			<v-col cols="1">
				<v-btn color="default"  @click="reset">
					<v-icon left>mdi-lock-reset</v-icon>重置
				</v-btn>
			</v-col> 
		</v-row>
  <v-data-table
    :headers="headers"
    :items="desserts"
    sort-by="calories"
    class="elevation-1  "
  >
    <template v-slot:top>
      <v-toolbar flat >
        <v-toolbar-title>信息管理</v-toolbar-title>
        <v-divider class="mx-4" inset  vertical ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">确定删除?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">取消</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">确定</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.messageDesc="{ item }" >
		<span v-html="setName(item.messageDesc)"></span>
	</template>
    <template v-slot:item.messageTitle="{ item }" >
		<span v-html="setName(item.messageTitle)"></span>
	</template>
    <template v-slot:item.actions="{ item }">
      <v-icon  small  @click="deleteItem(item)"  > mdi-delete  </v-icon>
    </template>
    <template v-slot:no-data>
		没有数据
    </template>
  </v-data-table>
  </div>
</template>

<script>
  export default {
	name:"adminArea",
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: '标题', value: 'messageTitle' },
        { text: '描述', value: 'messageDesc' },
        { text: '类型', value: 'type.typeDesc' },
        { text: '区域', value: 'area.areaDesc' },
        { text: '价格', value: 'price' },
        { text: '联系方式', value: 'user.phone' },
        { text: '发布时间', value: 'createDate' },
        { text: '创建人', value: 'createBy.userName',width:'70px' },
        { text: '创建时间', value: 'createDate' },
        { text: '修改人', value: 'updateBy.userName' ,width:'70px'},
        { text: '修改时间', value: 'updateDate' },
        { text: '操作', value: 'actions', sortable: false, width:'70px' },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {},
      searchItem: {},
      deleteItemObj: {},
      defaultItem: {},
    }),
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? '新增' : '修改'
      },
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },
    created () {
      this.initialize()
    },
    methods: {
		setName(e) { //文字超出显示省略号
			return '<span  title="' + e + '" style="display:inline-block;width: 100%;text-align: center;' +
				'        overflow : hidden;' +
				'        text-overflow: ellipsis;' +
				'        white-space: nowrap;">' + e + '</span>'
		},
		reset(){
			this.searchItem = {};
			this.search();
		},
		search(){
			this.getMessageList();
		},
      initialize () {
        this.desserts = []
      },
      deleteItem (item) {
        this.dialogDelete = true
        this.deleteItemObj = Object.assign({}, item)
      },

      deleteItemConfirm () {
       this.axios.post('/message/delete',this.deleteItemObj).then((res)=>{
			const{data} = res;
			if(data.success){
				this.getMessageList();
			}
        });
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        this.axios.post('/message/save',this.editedItem).then((res)=>{
			const{data} = res;
			if(data.success){
				this.getMessageList();
			}
		})
        this.close()
      },
      getMessageList(){
		this.axios.post('/message/list',this.searchItem).then((res)=>{
			const{data} = res;
			if(data.success){
				this.desserts = data.content.list;
				for(var i = 0 ; i < this.desserts.length ; i++){
					this.desserts[i].createDate = this.formatDate(this.desserts[i].createDate);
					this.desserts[i].updateDate = this.formatDate(this.desserts[i].updateDate);
				}
			}
		})
      }
    },
      mounted(){
		this.getMessageList();
	}
  }
</script>

<style lang="scss">
.v-data-table table{
    table-layout: fixed; 
}
</style>