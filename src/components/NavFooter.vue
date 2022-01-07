<template>
	<div class="footer">
		<div class="footer-logo">
			<img src="../../public/img/footer-logo.png"/>
		</div>
	</div>
</template>

<script>
export default{
	name:'nav-footer'
}
</script>

<style lang="scss" scoped>
.footer{
	height: 150px;
	border-top: 4px solid #313b81;
	text-align: center;
	background: #2a3783;
	color: #fff;
	font-size: 16px;
	.footer-logo{
		margin-top: 46px;
		margin-bottom: 31px;
	}
	.copyright{
		margin-top: 13px;
	}
}
</style>