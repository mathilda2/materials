<template>
	<transition name="comfortable">
		<div class="modalT" v-show="showModal">
			<div class="mask"></div>
			<div class="modal-dialog">
				<div class="modal-title">
					<span>{{title}}</span>
					<a href="javascript:;" class="icon-close" @click="handClose"></a>
				</div>
				<div class="modal-body">
					<slot name="mes"></slot>
				</div>
				<div class="modal-footer">
					<div class="modal-btn-box">
						<div class="modal-btn cancel" @click="handClose">取消</div>
						<div class="modal-btn" @click="handOk" v-if="type!='view'">确定</div>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
export default{
	name:'modal',
	methods:{
		handClose(){
			this.$emit('close');
		},
		handOk(){
			this.$emit('handMesSubmit');
		}
	},
	props:{
		showModal:Boolean,
		title:String,
		type:String
	}
}
</script>

<style lang="scss">
.modalT{
	position: fixed;
	top: 0;
	left: 0;
	z-index: 999;
	width: 100%;
	height: 100%;
	.mask{
		width: 100%;
		height: 100%;
		position: fixed;
		background: rgb(0,0,0,.5);
		top:0;
		left:0;
	}
	&.comfortable-enter-active{
        top:0;
    }
    &.comfortable-leave-active{
        top:-100%;
    }
    &.comfortable-enter{
        top:-100%;
    }
	.modal-dialog{
		width: 500px;
		background: #fff;
		position: absolute;
		top: 50%;
		left:50%;
		transform: translate(-50%,-50%);
		.modal-title{
			height: 50px;
			line-height: 50px;
			padding-left: 20px;
			position:relative;
			.icon-close{
				position:absolute;
				right: 10px;
				top: 16px;
				background: url(../../public/img/icon-close.png) no-repeat center;
				width: 20px;
				height: 17px; 
				background-size: contain;
				transition: all .3s linear ;
				&:hover{
					transform: rotate(180deg);  
				}
			}
		}
		.modal-body{
			border-top: 1px solid orangered;
			border-bottom: 1px solid orangered;
			padding: 42px 40px 54px;
            font-size: 14px;
		}
		.modal-footer{
			.modal-btn-box{
				display:flex;
				height: 50px;
				align-items:center;
				justify-content:center;
				.modal-btn{
					width: 100px;
					height: 30px;
					text-align: center;
					line-height: 30px;
					color: #fff;
					background: orangered;
					margin-right: 14px;
					cursor:pointer;
					&:last-child{
						margin-right: 0px;
					}
				}
			}
		}
	}
}
</style>