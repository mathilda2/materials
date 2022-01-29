<template>
	<div class="aboutT">
		<div class="containerT">
			<div class="content">
				<div class="about-content-box">
					<div class="about-content-title">关于</div>
					<div class="about-content-detail">
						<div class="about-content-detail-title">山东工商学院简介</div>
						<div class="about-content-detail-content">
							<p>
								<span>山东工商学院原名中国煤炭经济学院，始建于1985年，隶属于原煤炭工业部。1998年9月，因管理体制改革转为中央与山东省共建，以山东省管理为主，2003年2月更为现名。</span>
							</p>
							<p>
								<span> 学校坐落在“最佳中国魅力城市”——烟台，依山傍海，风景秀丽，是省级花园式单位和文明校园，
									是山东省应用型本科高校立项建设单位、山东省应用型人才培养特色名校立项建设单位、省级创业教育示范校、山
									东唯一全国首批团中央“第二课堂成绩单”制度试点单位和全国创业教育示范基地。学校占地90.9万平方米，建筑面积62.6万平方米，图书馆馆藏文献266.24万册。</span>
							</p>
							<p>
								<span>建校36年以来，学校秉承“惟平惟准、近知近仁”校训，已发展成为一所以经济、管理、信息学科见长，经济学、管理学、理学、工学、文学、法学多学科协调发展的财经类高校。
									现有17个二级院（部）、12个研究院、36个研究所（中心），全日制在校本科生、研究生21310人。教职工1309人，其中专任教师931人，教授128人，博士440人。欧洲科学与艺术院院士1人，长江学者2人，国务院特殊津贴专家8人，全国优秀教师2人，教育部新世纪优秀人才2人，教育部高等学校教学指导委员会委员2人，泰山学者青年专家2人，山东省有突出贡献的中青年专家5人，山东省智库高端人才2人，山东省教学名师、山东高校十大优秀教师等40余人。 </span>
							</p>
							<p>
								<span>学校坚持协同创新，全面对接国家战略、区域经济和行业产业需求，服务新旧动能转换重大工程。现有“山东能源经济协同创新中心”“未来智能计算协同创新中心”“金融服务转型升级协同创新中心”3个山东省协同创新中心，1个山东省工程实验室“山东省未来智能金融工程实验室”，“智能信息处理实验室”“系统安全与管理实验室”“公共管理创新及仿真实验室”“感知技术与控制实验室”“煤炭产业发展与创新研究基地”和“山东半岛经济与社会研究中心”6个山东省高等学校科研创新平台，1个山东省示范工程技术研究中心“车联网工程技术研究中心”，烟台市金融大数据分析与处理重点实验室、烟台市智能系统与控制重点实验室2个烟台市重点实验室，1个烟台市技术创新中心“烟台市海洋卫星数据技术创新中心”，新型传感与智能检测、应急技术与管理工程、海洋卫星数据建模3个烟台市工程实验室（工程研究中心），共同富裕研究院、中国第三次分配研究院、烟台经济社会发展研究院、烟台市非公有制经济发展研究院、烟台自贸区研究院、煤炭经济研究院、半岛经济研究院、东亚社会发展研究院、金融研究院、儒商研究院、中国艺术财富管理高等研究院、黄金财富研究院12个研究院，“社会稳定风险研究评估中心”“社情民意调查中心”“地方立法与政府法治研究服务中心”和“中国社会保障管理服务中心”4个新型智库。</span>
							</p>
							<p>
								<span>学校坚持全方位开放合作，立足烟台、服务山东、面向全国，推进校城融合、产教融合，推进教育国际化。设有教育部批准的山东省最早的本科中外合作办学机构——国际商学院，先后与美国、英国、韩国等20多个国家的50多所高校建立了友好关系，加强与北京大学等国内高水平高校和港澳台高校沟通交流，在学生培养、教师互派、学术交流等方面开展合作。 </span>
							</p>
							<p>
								<span> 学校先后获得“全国模范职工之家”“全国大学生心理健康教育工作先进单位”“山东省文明校园”“山东省文明单位”“山东省高校德育工作优秀高校”“烟台发展突出贡献单位”“烟台市文明单位”等荣誉称号。</span>
							</p>
							<p>
								<span>面对新时代高等教育发展的新方位，第三次党代会以来，学校坚持以习近平新时代中国特色社会主义思想为指导，全面贯彻落实党的十九大和十九届二中、三中、四中、五中、六中全会精神，贯彻落实全国全省教育大会精神，围绕“一个中心、两条主线、四个统领”工作布局，攻坚发力、多点突破，加快建设财商教育特色开放式高水平财经类大学。 </span>
							</p>
						</div>
					</div>
					<div class="abount-content-location">
						<baidu-map class="map" :center="markerPoint" :zoom="16"> 
							<bm-marker :position="markerPoint" :dragging="true" @click="infoWindowOpen">
								<bm-info-window :show="show" @close="infoWindowClose" @open="infoWindowOpen" style="font-size:13px">
									山东工商学院 <br> 
									地址：山东省烟台市莱山区滨海中路191号	<br> 
									电话：(0535)6904023
								</bm-info-window>
							</bm-marker> 
						</baidu-map>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default{
	name:'about',
	data(){
		return{
			markerPoint:{lng: 121.457293, lat: 37.493221}, 
			show:true
		}
	},
	methods:{
		infoWindowClose () {
			this.show = false
		},
		infoWindowOpen () {
			this.show = true
		}
	} 
}
</script>

<style lang="scss">
.map {
    width: 100%;
    height: 398px;
}
.aboutT{
	.containerT{
		width:1000px;
		margin:0 auto;
		.content{
			border-top: 1px solid #ccc;
			min-height: 520px;
			margin-bottom: 10px;
			.about-content-box{
				background:#fff;
				margin-top: 10px;
				.about-content-title{
					height: 40px;
					line-height: 40px;
					padding-left: 20px;
					font-size: 16px;
					font-weight: bold;
					border-bottom: 1px solid #ccc;
				}	
				.about-content-detail{
					.about-content-detail-title{
						text-align: center;
						padding: 10px;
						font-size: 26px;
						color: #3C3C3C;
						font-weight: bold;
					}
					.about-content-detail-content{
						padding: 10px 20px;
						p{
							text-indent: 30px;
							font-family: 仿宋;
							span{ 
								line-height: 1.5;
							}
						}
					}
				}
				.abount-content-location{
					padding: 10px 20px; 
				}
			}
		}
	}
}
</style>