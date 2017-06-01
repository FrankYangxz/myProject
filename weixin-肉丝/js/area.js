// 类型
			var oPro=document.getElementById("Project");
			var oProArr=[{'id':'1','name':'超级工作室'},{'id':'2','name':'优选工作室'},{'id':"3",'name':'移动工作站'},{'id':"4",'name':'联合办公区'}];
			var oPtion01="<option>请选择</option>";
			for (var i=0;i<oProArr.length;i++) {
				oPtion01+="<option value="+oProArr[i].id+">"+oProArr[i].name+"</option>";
			}
			oPro.innerHTML=oPtion01;
			//$("#Project").css("color","#FEA120");
		// 市
			var oCity=document.getElementById("City");
			var oCityArr={
				"1":['101#北京'],
				'2':['201#北京','202#上海','203#天津'],
				'3':['301#北京'],
				'4':['401#北京','402#天津']
			}
			oPro.onchange=function(){
				oCity.disabled=false;
				oArea.innerHTML='';
				oArea.value ='';
				
				var val=this.value;
				var city=oCityArr[val];
				var oPtion02='<option>请选择城市</option>';
				for (var i=0;i<city.length;i++) {
					var oCit=city[i].split('#');
					oPtion02+="<option value="+oCit[0]+">"+oCit[1]+"</option>";
				}
				oCity.innerHTML=oPtion02;
			}
		// 区
			var oArea=document.getElementById("area");
			var oAreaArr={
				'101':['CBD区域','北苑区域','东直门区域','上地区域','通州区域','望京区域','中关村区域'],
				'201':['西直门区域','中关村区域','东直门区域','望京区域','五棵松区域','石景山区域','亚奥区域','CBD区域','朝青区域','方庄区域'],
				'202':['大宁商圈','新静安商圈','普陀商圈','徐家汇商圈','五角场商圈','八佰伴商圈'],
				'203':['人民公园','中心公园','河东公园'],
				'301':['CBD区域','中关村区域','望京区域','亚奥区域','方庄区域','五棵松区域'],
				'401':['CBD区域','中关村区域','望京区域','石景山区域','朝阳区域'],
				'402':['河东区']
			}
			oCity.onchange=function(){
				oArea.disabled=false;
				var val=this.value;
				var ar=oAreaArr[val];
				var oPtion03='<option>请选择区域</option>';
				for (var i=0;i<ar.length;i++) {
					oPtion03+='<option>'+ar[i]+'</option>'
				}
				oArea.innerHTML=oPtion03;
			}