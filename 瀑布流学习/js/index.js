window.onload = function(){
	//对页面现有的数据进行排版布局
	showBox('main','List');
	//模拟，接受进来的json数据
	var dateInt={"date":[{"src":"0.jpg"},{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"}]};
	//给窗口添加滚动条添加方法
	window.onscroll=function(){
		if(checkScroll()){//调用方法，判断是否具备数据加载的条件。把数据加载到页面的尾部
			var parenet=document.getElementById("main");
			//遍历数据,且创建元素进行加载
			for(var i=0;i<dateInt.date.length;i++){
				var ListCon=document.createElement("div");//创建div 
				ListCon.className='List';//添加class类名
				parenet.appendChild(ListCon);//加载到父节点

				var oBoxs=document.createElement("div");
				oBoxs.className="box";
				ListCon.appendChild(oBoxs);

				var oImg=document.createElement("img");
				oImg.src="images/"+dateInt.date[i].src;
				oBoxs.appendChild(oImg);

			}
			showBox('main','List');//对新加载的数据进行排位规格化
		}
	}
};

//函数功能，对第一个容器参数下的第二个className容器参数进行排列规划
function showBox (parenet,clsName) {//一个父级元素。一个className，排列主方法执行体
	var oParenet=document.getElementById(parenet);
	var oBoxs=getByClass(oParenet,clsName);//listBox集合数组,调用的getByclass函数。得到返回数组
	//计算屏幕能有几列，屏幕的宽度/每一个List的宽度
	var oBoxW = oBoxs[0].offsetWidth;//list,width
	var clos=Math.floor(document.documentElement.clientWidth/oBoxW);//math.floor取整数，求出列数
	//设置主容器的宽度,和对齐方式
	oParenet.style.cssText='width:'+oBoxW*clos+'px;margin:0 auto';

	//储存第一列所有高度,判断最低的高度，让第二行的第一个元素排列到最低的那一个，
	//然后把最低的一个高度改变成最低高度+它下方的高度，则，最低的一个高度改变，依次遍历
	var AllBox = [];//保存第一行高度的数组
	for(var i=0;i<oBoxs.length;i++){
		if (i<clos) {
			AllBox.push(oBoxs[i].offsetHeight);//传入数据
		}else{
			var minH=Math.min.apply(null,AllBox);//math.min不能直接接受数组，需要用apply方法，把数组转化成字符串

			var index=getMinIndex(AllBox,minH);//调用getMainIndex方法，求出第一行中，高度最小的index值
			//定义第i个box的样式，以及位置
			oBoxs[i].style.position='absolute';
			oBoxs[i].style.top=minH+'px';
			oBoxs[i].style.left=oBoxW*index+'px';
			//改变最低点的大小。从而动态的不断的去获取目前最低点
			AllBox[index]+=oBoxs[i].offsetHeight;
		}
	}			
}

//寻找这个id下的所有的className,返回一个className的数组
function getByClass (parenet,clsName) {//传入一个父元素，一个className。
	var sameClassArr=new Array(),//用来保存class为box的元素
		chiled=parenet.getElementsByTagName('*');//父级元素下的获取所有元素

	for(var i=0;i<chiled.length;i++){//遍历判断哪些元素的className为传入的clsName
		if(chiled[i].className===clsName){
			sameClassArr.push(chiled[i]);//传入函数数组
		}
	}
	return sameClassArr;//返回数组
}
//传入一个数组，和一个最小值，返回这个最小值的角标index
function getMinIndex (arr,min) {
	for(var i=0;i<arr.length;i++){
		if (arr[i]==min) {
			return i;
		}
	}
}

//检查是否具备数据加载的函数，返回布尔值
function checkScroll () {
	var parenet=document.getElementById("main");
	var oBoxs=getByClass(parenet,'List');
	//最后一个单元元素距离页面顶端的高度，再加自身高度的一半
	var lastBoxH=oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
	//滚动条滚动的的高度,混杂模式||标准模式
	var scrollTop=document.body.scrollTop || document.documentElement.scrollTop;
	//页面的高度，可视区域
	var WHeight=document.body.clientHeight || document.documentElement.clientHeight;
	return (lastBoxH<scrollTop+WHeight)?true:false;
}

