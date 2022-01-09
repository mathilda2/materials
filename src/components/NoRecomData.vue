<template>
	<div class="no-recommend-data">
		<div class="img-box">
			<img  src="../../public/img/nodata.svg"/>
		</div>
		<span class="no-data-detail">没有数据啦</span>
	</div>
</template>

<script>
</script>

<style lang="scss">
.no-recommend-data{
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
	border: 1px solid #ccc;
	border-radius: 10px;
	margin: 5px;
	padding: 10px;
	height: 220px;
	.no-data-detail{ 
		display: inline-block;
		width: 100%;
		height: 30px;
		line-height: 30px;
		border-radius: 5px;
		font-size: 16px;
		cursor: pointer;
		color: #aaa;
	}
	.img-box{
		img{
			width: 100px;
		}
	}
}
</style>