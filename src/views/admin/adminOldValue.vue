<template>
	<div class="admin-area">
		<v-row>
			<v-col cols="3"> <v-text-field v-model="searchItem.oldName" label="名称" ></v-text-field> </v-col>
			<v-col cols="3"> <v-text-field v-model="searchItem.oldValue" label="描述" ></v-text-field> </v-col>
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
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat >
        <v-toolbar-title>状态管理</v-toolbar-title>
        <v-divider class="mx-4" inset  vertical ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn  color="primary" dark class="mb-2"  v-bind="attrs"  v-on="on"  > 
				<v-icon left> mdi-account-plus</v-icon>新增 
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col  cols="12"   >
                    <v-text-field v-model="editedItem.oldName" label="名称" ></v-text-field>
                  </v-col>
                  <v-col cols="12"   >
                    <v-text-field v-model="editedItem.oldValue" label="描述"  ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn  color="blue darken-1"  text @click="close" > 取消 </v-btn>
              <v-btn color="blue darken-1" text @click="save"  > 保存 </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
    <template v-slot:item.actions="{ item }">
      <v-icon  small class="mr-2" @click="editItem(item)" >  mdi-pencil </v-icon>
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
	name:"adminOldValue",
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: '名称', value: 'oldName' },
        { text: '描述', value: 'oldValue' },
        { text: '创建人', value: 'createBy.userName' },
        { text: '创建时间', value: 'createDate' },
        { text: '修改人', value: 'updateBy.userName' },
        { text: '修改时间', value: 'updateDate' },
        { text: '操作', value: 'actions', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {},
      searchItem: {},
      deleteItemObj: {},
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
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
		reset(){
			this.searchItem = {};
			this.search();
		},
		search(){
			this.getOldValueList();
		},
      initialize () {
        this.desserts = []
      },
      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.dialogDelete = true
        this.deleteItemObj = Object.assign({}, item)
      },

      deleteItemConfirm () {
       this.axios.post('/oldValue/delete',this.deleteItemObj).then((res)=>{
			const{data} = res;
			if(data.success){
				this.getOldValueList();
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
        this.axios.post('/oldValue/save',this.editedItem).then((res)=>{
			const{data} = res;
			if(data.success){
				this.getOldValueList();
			}
		})
        this.close()
      },
      getOldValueList(){
		this.axios.post('/oldValue/list',this.searchItem).then((res)=>{
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
		this.getOldValueList();
	}
  }
</script>

<style lang="scss">
</style>