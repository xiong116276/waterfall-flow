window.onload = function(){
  //对页面现有的数据进行排版布局
  $.each($('.level0'),function (index, item) {
    showBox(item,'.level1');
  })
};

//函数功能，对第一个容器参数下的第二个className容器参数进行排列规划
function showBox (parenet,clsName) {//一个父级元素。一个className，排列主方法执行体
  var oBoxs=$(parenet).children(clsName);//listBox集合数组,调用的getByclass函数。得到返回数组
  //计算屏幕能有几列，屏幕的宽度/每一个List的宽度
  var oBoxW = oBoxs[0].offsetWidth;//list,width
  var clos=Math.floor($(parenet)[0].clientWidth/oBoxW);//math.floor取整数，求出列数

  var AllBox = [];//保存第一行高度的数组
  var h = []; //保存高度值
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
  for(var i = 0;i<oBoxs.length;i++){
    h.push(oBoxs[i].offsetHeight+oBoxs[i].offsetTop);
  }
  $(parenet)[0].style.height = Math.max.apply(null,h)+'px';
}
//传入一个数组，和一个最小值，返回这个最小值的角标index
function getMinIndex (arr,min) {
  for(var i=0;i<arr.length;i++){
    if (arr[i]==min) {
      return i;
    }
  }
}