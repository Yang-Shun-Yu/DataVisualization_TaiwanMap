//housingAnimate()
var urlParams, filename, globalData, margin, x, y, xaxis, cityColor, cityFlag, country, countrydata, minHousePrice, maxHousePrice, svg,
    vm, tagname, points, tooltip, focus, timeScales, lastAxisNum, NFlag, MFlag, SFlag, EFlag, OFlag, TFlag;
function housingInit(){
NFlag = false;
MFlag = false;
SFlag = false;
EFlag = false;
OFlag = false;
TFlag = false;
cityFlag = {};

var divs = document.querySelectorAll('.svg.small-svg');
divs.forEach(function(div) {
    div.innerHTML = '';
});
var bigDiv = document.getElementById('svg1');
bigDiv.innerHTML = '';


urlParams = new URLSearchParams(window.location.search);
filename = 'https://raw.githubusercontent.com/Yang-Shun-Yu/DataVisualization_TaiwanMap/main/dataset/0years_median_house_price.json';
globalData = null;

if(urlParams.get("filename")){
  filename = urlParams.get("filename");
}
//housingAnimate();
// set the dimensions and margins of the graph
margin = {top: 20, right: 50, bottom: 30, left: 80},
    width = 450 - margin.left - margin.right,
    height = 238.2 - margin.top - margin.bottom;

// set the ranges
x = d3.scaleLinear().range([0, width]);
y = d3.scaleLinear().range([height, 0]);

xaxis = [103, 104, 105, 106, 107, 108, 109, 110, 111, 112];
cityColor = {
  '臺北市': '#8CABD9',
  '新北市': '#F6A7B8',
  '基隆市': '#1D4D9F',
  '新竹市': '#C11432',
  '桃園市': '#F08838',
  '新竹縣': '#009ADA', 
  '宜蘭縣': '#66A64F',
  '臺中市': '#8785B2',
  '苗栗縣': '#3A488A',
  '彰化縣': '#DABD61',
  '南投縣': '#BD748F',
  '雲林縣': '#D95F30',
  '高雄市': '#64894D',
  '臺南市': '#D88C49',
  '嘉義市': '#D9AE2C',
  '嘉義縣': '#2C6AA5',
  '屏東縣': '#59A55D',
  '花蓮縣': '#6E6352',
  '臺東縣': '#145CBF',
  '金門縣': '#AABBCC', 
  '連江縣': 'DDEEFF'
};
Object.keys(cityColor).forEach(function(key) {
  if (key != '新竹市'){
    cityFlag[key] = false;
  }
  else{
    cityFlag[key] = true;
  }
})

country = ['新竹市'];
if(urlParams.get("country")){
  country = urlParams.get("country").split(",");
}
countrydata = [];
minHousePrice = 100000000;
maxHousePrice = 0;
for (i = 0; i < xaxis.length; i++) {
  countrydata.push(i);
}

svg = d3.select("#svg5").append("svg").attr("class", "line-chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

d3.json(filename).then(function(data) { 
  globalData = data;
  // if (error) break;
  //console.log(data["102"]);
  //console.log(data["102"]["新竹市"]["新竹市"]);
  minHousePrice = data["103"]["新竹市"]["新竹市"];
  maxHousePrice = data["112"]["新竹市"]["新竹市"];
  vm = new Vue({
    el: "#app",
    data: {
      filter: "",
      data: data
    },
    computed:{
      now_area: function(){
        var vobj=this;
        // console.log(vobj.filter)
        // var result=Object.keys(data).filter(function(obj){
        //   console.log(obj, data[obj])
        //   return obj==vobj.filter;
        // });
        result = {"country": vobj.filter};
        //console.log(result);
        return result;
      }
    }
  });
  
  $("path").mouseup(function(e){
    
    tagname=$(this).attr("data-name");
    console.log(`${tagname} clicked`)
    vm.filter=tagname;
    if(country.find(element => element === tagname) === undefined){

      xaxis.forEach(function(element){ 
        if(data[element][tagname][tagname] > maxHousePrice){
          maxHousePrice = data[element][tagname][tagname];
        }
        if(data[element][tagname][tagname] < minHousePrice){
          minHousePrice = data[element][tagname][tagname];
        }})
      
      country.push(tagname);
      d3.select(this).style('fill', cityColor[tagname]);

    }else{
      const index = country.indexOf(tagname);
      if (index > -1) {
          country.splice(index, 1);
          d3.select(this).style('fill', 'white');
      }
    }
      d3.selectAll('.line').remove();
      d3.selectAll('.line-text').remove();
      minHousePrice = 1000000000;
      maxHousePrice = 0;
      for(var i=0; i<country.length;i++){
        if(country[i] === 0){
          continue;
        }
        var tmp = country[i];
        xaxis.forEach(function(element){ 
          if(data[element][tmp][tmp] > maxHousePrice){
            maxHousePrice = data[element][tmp][tmp];
          }
          if(data[element][tmp][tmp] < minHousePrice){
            minHousePrice = data[element][tmp][tmp];
          }})
      }
      rescale();
      var valueline = [];
      for(var i=0; i<country.length;i++){
        if(country[i] === 0){
          valueline.push(0);
          continue;
        }
        var tmp = country[i];
        valueline.push(d3.line()
        .x(function(d) { return x(xaxis[d]);  })
        .y(function(d) { return y(data[xaxis[d]][tmp][tmp]); }))
     
      svg.append("path")
        .data([countrydata])
        .attr("class", "line " + tmp)
        .attr("id", 'housingPath')
        .style("stroke", cityColor[tmp])
        .attr("d", valueline[i])
        .call(hover)
        .call(transition)
        .lower();
      svg.append("text")
        .attr("class", "line-text " + tmp)
        .attr("transform", "translate(" + (width+2) + "," + y(data[112][tmp][tmp]) + ")")
        .attr("dy", ".35em")
        .attr("text-anchor", "start")
        .style("fill", cityColor[tmp])
        .text(tmp)
        .call(hover);
      };
      
      throwCity('update', tagname, cityColor[tmp]);
  });
  

  // Scale the range of the data
  
  x.domain(d3.extent(xaxis, function(d) { return d; }));
  y.domain([data["103"]["新竹市"]["新竹市"], data["112"]["新竹市"]["新竹市"]]);
  minHousePrice = 1000000000;
  maxHousePrice = 0;
  for(var i=0; i<country.length;i++){
    if(country[i] == 0){
      continue;
    }
    var tmp = country[i];
    xaxis.forEach(function(element){ 
      if(data[element][tmp][tmp] > maxHousePrice){
        maxHousePrice = data[element][tmp][tmp];
      }
      if(data[element][tmp][tmp] < minHousePrice){
        minHousePrice = data[element][tmp][tmp];
      }})
  }
  rescale();
  // y.domain([102, 109]);
  vm.filter="新竹市";
  var valueline = [];
  for (i = 0; i < country.length; i++) {
    var tmp = country[i];
    valueline.push(d3.line()
    .x(function(d) { return x(xaxis[d]);  })
    .y(function(d) { return y(data[xaxis[d]][country[i]][country[i]]); }));
    svg.append("path")
      .data([countrydata])
      .attr("class", "line " + tmp)
      .attr("id", 'housingPath')
      .style("stroke", cityColor[country[i]])
      .attr("d", valueline[i])
    	.call(hover)
      .call(transition)
      .lower();
    
    svg.append("text")
      .attr("class", "line-text " + tmp)
      .attr("transform", "translate(" + (width+2) + "," + y(data[112][country[i]][country[i]]) + ")")
      .attr("dy", ".35em")
      .attr("text-anchor", "start")
      .style("fill", cityColor[country[i]])
      .text(country[i])
    	.call(hover);
      d3.select('#'+tmp).style('fill', cityColor[country[i]]);
  }
  points = svg.selectAll('.points')
    .data([countrydata])
    .enter()
    .append('g')
    .attr('class', 'points')
    .append('text');
  // Add the X Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).ticks(8));

  // Add the Y Axis
  svg.append("g")
      .attr("class", "yaxis")
      .call(d3.axisLeft(y));
  if(urlParams.get("filename")){
    var temp = urlParams.get("filename")[0];
    var mySelect = document.getElementById('sel');

    for(var i, j = 0; i = mySelect.options[j]; j++) {
        if(i.value == temp) {
            mySelect.selectedIndex = j;
            break;
        }
    }
    if(urlParams.get("filename").includes('_with_ratio')){
      d3.select('#checkBox').attr("checked", true);
    }
  }
  if(urlParams.get("maxrow")){
    var temp = urlParams.get("maxrow");
    var mySelect = document.getElementById('selRow');
    for(var i, j = 0; i = mySelect.options[j]; j++) {
        if(i.value == temp) {
            mySelect.selectedIndex = j;
            break;
        }
    }
  }
// Get the SVG container element
var svgContainer = document.getElementById('svg5');

// Create a new <div> element
var newDiv = document.createElement("div");

// Set its id attribute
newDiv.setAttribute("id", "housingTooltip");

// Set its style attribute
newDiv.setAttribute("style", "position:absolute;background-color:lightgray;padding:5px;");

// Append the new div to the SVG container
svgContainer.appendChild(newDiv);

  var svg4 = document.getElementById('svg4');
  if(!svg4.innerHTML.includes('onclick')){
    svg4.innerHTML+=
    `<button onclick="buttonOnClick('total')">全台</button>
    <button onclick="buttonOnClick('N')">北部</button>
    <button onclick="buttonOnClick('M')">中部</button>
    <button onclick="buttonOnClick('S')">南部</button>
    <button onclick="buttonOnClick('E')">東部</button>
    <button onclick="buttonOnClick('O')">離島</button>`
  }

  tooltip = d3.select('#housingTooltip');
  console.log(tooltip)

  focus = svg.append('g')
    .attr('class', 'focus')
    .style('display', 'none');

  focus.append('line')
    .attr('class', 'x-hover-line hover-line')
    .attr('y1' , 0)
    .attr('y2', height);

  svg.append('rect')
    // .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .attr("class", "overlay")
    .attr("width", width)
    .attr("height", height)
    .on("mouseover", mouseover)
    .on("mouseout", mouseout)
    .on("mousemove", mousemove);
  
  // var timeScales = d3.extent(xaxis, function(d) { return d; });
  timeScales = [];
  lastAxisNum;
  xaxis.forEach(function(d) {
    if(d != 103) {
    	timeScales.push((x(lastAxisNum) + x(d)) / 2);
    }
    lastAxisNum = d;
  });
  
  function mouseover() {
    focus.style("display", null);
    //d3.selectAll('.points text').style("display", null);
  }
  function mouseout() {
    focus.style("display", "none");
    //d3.selectAll('.points text').style("display", "none");
    if (tooltip) tooltip.style('display', 'none');
  }
  
  function mousemove() {
    var i = d3.bisect(timeScales, d3.pointer(event)[0]);
    var di = data[xaxis[i]];
    var countrytotal = [];
    for (j = 0; j < country.length; j++) {
        countrytotal.push({name: country[j], money: data[xaxis[i]][country[j]][country[j]]});     
    }
    countrytotal.sort(function(a,b){ return b.money-a.money});
    // console.log(x(xaxis[i-1]))
    // focus
    //   .data(countrytotal)
    // 	.append("circle")
    //   .attr("r", 5)
    //   .attr("fill", color[i-1])
    //   .attr("cx", function(d) {console.log(x(xaxis[i-1])); return (x(xaxis[i-1]));})
    //   .attr("cy", function(d) {console.log(d); return y(d.money);})
    //   .attr("opacity", 1);
    focus.attr("transform", "translate(" + x(xaxis[i]) + ",0)");
    var unitOfPrice = "元/坪";
    if(urlParams.get("filename") && urlParams.get("filename").includes('_with_ratio')){
      unitOfPrice = '%';
    }
    var offsetX;
    if(i >= 6)
      offsetX = -260;
    else
      offsetX = 50;
    
    const pointer = d3.pointer(event);
    const mouseXIndex = Math.round(x.invert(pointer[0]));
    const mouseYIndex = y.invert(pointer[1]);
    // find min index
    var index = null;
    var min = null;
    var circleIndex = null;
    countrytotal.forEach(function(d, i){
      diff = Math.abs(d.money - mouseYIndex)
      if(index == null) {
        index = d.name;
        min = diff;
        circleIndex = i;
      }
      else {
        if(diff < min) {
          index = d.name;
        	min = diff;
          circleIndex = i;
        }
      }
    })
    tooltip.html("民國： " + xaxis[i] + "年")
      .style('display', 'block')
      .style('font-weight', 'bold')
      .style('font-size','20px')
      .style('left', event.pageX + offsetX + "px")
      .style('top', event.pageY - 22*circleIndex + "px")
      .selectAll()
      .data(countrytotal).enter()
      .append('div')
    	.attr("class", d => "housingTooltip " + d.name)
      .style('color', d => d.name == index ? cityColor[d.name] : "#000")
      .html(d => d.name + '：' + Math.round(d.money) + unitOfPrice);
      tooltip.style('left', 914 + "px")
    console.log(event.pageX + offsetX, event.pageY - 22*circleIndex)
    console.log(window.getComputedStyle(document.getElementById('housingTooltip')).left, 
    window.getComputedStyle(document.getElementById('housingTooltip')).top,
    tooltip.text())


		 var circles = focus.selectAll(".hoverCircle")
			.data(countrytotal)
      circles
        .enter()
        .append("circle")
        .attr("class", "hoverCircle")
        .attr("r", d => d.name == index ? 7 : 0)
    		.attr("cy", d => y(d.money))
				.attr("cx", d => 0);
    	circles
    		.attr("r", d => d.name == index ? 7 : 0)
				.attr("cy", d => y(d.money))
				.attr("cx", d => 0);
    	circles
      	.exit()
    		.attr("r", 0)
    		.remove();
    }
})

//housingAnimate();

}
function selectOnChange(){
    var ob = document.getElementById("sel");
    var name = ob.options[ob.selectedIndex].value;
  if(document.getElementById('checkBox').checked){
    urlParams.set('filename', name + 'years_median_house_price_with_ratio.json');
  }else{
    urlParams.set('filename', name + 'years_median_house_price.json');
  }
  urlParams.set('country', country);
  window.location.search = urlParams;
}
function selRowOnchange(){
    var ob = document.getElementById("selRow");
    var name = ob.options[ob.selectedIndex].value;
  urlParams.set('maxrow', name);
  urlParams.set('country', country);
  window.location.search = urlParams;
}
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
function buttonOnClick(position, clickedCity){
  console.log(position, clickedCity);
      for(var i=0;i<country.length;i++){
        var tmp = country[i];
        throwCity('update', tmp, cityColor[tmp]);
      }
      if(position == 'N'){
        if(NFlag == false){
          country = country.concat(Object.keys(cityColor).slice(0, 7));
        }
        else{
          country = country.filter(function(value, index, arr){ return value < 7; });
        }
        NFlag = !NFlag;
        
      }else if(position == 'M'){
        if(MFlag == false){
          country = country.concat(Object.keys(cityColor).slice(7, 12));
        }
        else{
          country = country.filter(function(value, index, arr){ return value < 12 && value >= 7; });
        }
        MFlag = !MFlag;
      }else if(position == 'S'){
        if(SFlag == false){
          country = country.concat(Object.keys(cityColor).slice(12, 17));
        }
        else{
          country = country.filter(function(value, index, arr){ return value < 17 && value >= 12; });
        }
        SFlag = !SFlag;
      }else if(position == 'E'){
        if(EFlag == false){
          country = country.concat(Object.keys(cityColor).slice(17, 19));
        }
        else{
          country = country.filter(function(value, index, arr){ return value < 19 && value >= 17; });
        }
        EFlag = !EFlag;
      }else if(position == 'O'){
        if(OFlag == false){
          country = country.concat(Object.keys(cityColor).slice(19, 21));
        }
        else{
          country = country.filter(function(value, index, arr){ return value < 21 && value >= 19; });
        }
        OFlag = !OFlag;
      }
      else if(position == 'total'){
        if(TFlag == false){
          country = Object.keys(cityColor);
        }
        else{
          country = [];
        }
        TFlag = !TFlag;
      }
      if (clickedCity != undefined && position == 'NA'){
        if(country.includes(clickedCity)){
          country = country.filter(function(value, index, arr){ return value != clickedCity; });
        }
        else{
          country = country.concat(clickedCity);
        }
      }
      country = country.filter(onlyUnique);
      d3.selectAll('.line').remove();
      d3.selectAll('.line-text').remove();
      minHousePrice = 1000000000;
      maxHousePrice = 0;
      for(var i=0; i<country.length;i++){
        if(country[i] === 0){
          continue;
        }
        var tmp = country[i];
        xaxis.forEach(function(element){ 
          if(globalData[element][tmp][tmp] > maxHousePrice){
            maxHousePrice = globalData[element][tmp][tmp];
          }
          if(globalData[element][tmp][tmp] < minHousePrice){
            minHousePrice = globalData[element][tmp][tmp];
          }})
      }
      rescale();
      var valueline = [];
      for(var i=0; i<country.length;i++){
        if(country[i] === 0){
          valueline.push(0);
          continue;
        }
        var tmp = country[i];
        console.log(`turn on ${tmp}`)
        valueline.push(d3.line()
        .x(function(d) { return x(xaxis[d]);  })
        .y(function(d) { return y(globalData[xaxis[d]][tmp][tmp]); }))
      
      svg.append("path")
        .data([countrydata])
        .attr("class", "line " + tmp)
        .attr('id', 'housingPath')
        .style("stroke", cityColor[tmp])
        .attr("d", valueline[i])
        .call(hover)
        .call(transition)
        .lower();
      
      svg.append("text")
        .attr("class", "line-text " + tmp)
        .attr("transform", "translate(" + (width+2) + "," + y(globalData[112][tmp][tmp]) + ")")
        .attr("dy", ".35em")
        .attr("text-anchor", "start")
        .style("fill", cityColor[tmp])
        .text(tmp)
        .call(hover);
      throwCity('update', tmp, cityColor[tmp]);
      };
      if(clickedCity != undefined){
        if (cityFlag[clickedCity] == false){
          console.log(`turn on ${clickedCity}`)
          d3.select('#'+clickedCity).style('fill', cityColor[clickedCity]);
        }
        else{
          console.log(`turn off ${clickedCity}`)
          d3.select('#'+clickedCity).style('fill', '#01814A');
        }
        cityFlag[clickedCity] = !cityFlag[clickedCity];
        console.log(cityFlag);
      }
      if(position == 'N'){
      if(NFlag==false){
        console.log('turn off N')
        for(var i=0;i<7;i++){
          d3.select('#'+Object.keys(cityColor)[i]).style('fill', '#01814A');
          cityFlag[Object.keys(cityColor)[i]] = false;
        }
      }
      else{
        console.log('turn on N')
        for(var i=0;i<7;i++){
          d3.select('#'+Object.keys(cityColor)[i]).style('fill', cityColor[Object.keys(cityColor)[i]]);
          cityFlag[Object.keys(cityColor)[i]] = true;
        }
      }}
      if(position == 'M'){
      if(MFlag==false){
        console.log(`turn off M`)
        for(var i=7;i<12;i++){
          d3.select('#'+Object.keys(cityColor)[i]).style('fill', '#01814A');
          cityFlag[Object.keys(cityColor)[i]] = false;
        }
      }
      else{
        console.log(`turn on M`)
        for(var i=7;i<12;i++){
          d3.select('#'+Object.keys(cityColor)[i]).style('fill', cityColor[Object.keys(cityColor)[i]]);
          cityFlag[Object.keys(cityColor)[i]] = true;
        }
      }}
      if(position == 'S'){
      if(SFlag==false){
        console.log(`turn off S`)
        for(var i=12;i<17;i++){
          d3.select('#'+Object.keys(cityColor)[i]).style('fill', '#01814A');
          cityFlag[Object.keys(cityColor)[i]] = false;
        }
      }
      else{
        console.log(`turn on S`)
        for(var i=12;i<17;i++){
          d3.select('#'+Object.keys(cityColor)[i]).style('fill', cityColor[Object.keys(cityColor)[i]]);
          cityFlag[Object.keys(cityColor)[i]] = true;
        }
      }}
      if(position == 'E'){
      if(EFlag==false){
        console.log(`turn off E`)
        for(var i=17;i<19;i++){
          d3.select('#'+Object.keys(cityColor)[i]).style('fill', '#01814A');
          cityFlag[Object.keys(cityColor)[i]] = false;
        }
      }
      else{
        console.log(`turn on E`)
        for(var i=17;i<19;i++){
          d3.select('#'+Object.keys(cityColor)[i]).style('fill', cityColor[Object.keys(cityColor)[i]]);
          cityFlag[Object.keys(cityColor)[i]] = true;
        }
      }
      }
      if(position == 'O'){
      if(OFlag==false){
        console.log(`turn off O`)
        for(var i=19;i<21;i++){
          d3.select('#'+Object.keys(cityColor)[i]).style('fill', '#01814A');
          cityFlag[Object.keys(cityColor)[i]] = false;
        }
      }
      else{
        console.log(`turn on O`)
        for(var i=19;i<21;i++){
          d3.select('#'+Object.keys(cityColor)[i]).style('fill', cityColor[Object.keys(cityColor)[i]]);
          cityFlag[Object.keys(cityColor)[i]] = true;
        }
      }}
      if(position == 'total'){
      if(TFlag==false){
        console.log(`turn off T`)
        for(var i=0;i<21;i++){
          d3.select('#'+Object.keys(cityColor)[i]).style('fill', '#01814A');
          cityFlag[Object.keys(cityColor)[i]] = false;
        }
      }
      else{
        console.log(`turn on T`)
        for(var i=0;i<21;i++){
          d3.select('#'+Object.keys(cityColor)[i]).style('fill', cityColor[Object.keys(cityColor)[i]]);
          cityFlag[Object.keys(cityColor)[i]] = true;
        }
      }}


}



function rescale() {
    y.domain([minHousePrice*0.99, maxHousePrice*1.01])  // change scale to 0, to between 10 and 100
    svg.select(".yaxis")
            //.transition().duration(1500).ease("sin-in-out")  // https://github.com/mbostock/d3/wiki/Transitions#wiki-d3_ease
            .call(d3.axisLeft(y));  
}
function transition(path) {
    path.transition()
        .duration(750)
        .attrTween("stroke-dasharray", tweenDash);
}
function tweenDash() {
    var l = this.getTotalLength(),
        i = d3.interpolateString("0," + l, l + "," + l);
    return function (t) { return i(t); };
}
function hover() {
  if ("ontouchstart" in document) svg
      .style("-webkit-tap-highlight-color", "transparent")
      .on("touchmove", moved)
      .on("touchend", left)
  else svg
      .on("mousemove", moved)
      .on("mouseleave", left);
  const lines = d3.selectAll(".line");
  const texts = d3.selectAll(".line-text");
  //console.log(lines.filter(".新竹市"));
  // 滑鼠在畫布中移動
  function moved() {
    //d3.event.preventDefault();
    const pointer = d3.pointer(event);
    const mouseXIndex = Math.max(Math.min(Math.round(x.invert(pointer[0])), 112), 103);
    const mouseYIndex = y.invert(pointer[1]);
    // find min index
    var index = null;
    var min = null;
    country.forEach(function(d){
      diff = Math.abs(globalData[mouseXIndex][d][d] - mouseYIndex)
      if(index == null) {
        index = d;
        min = diff;
      }
      else {
        if(diff < min) {
          index = d;
        	min = diff;
        }
      }
    })
    country.forEach(function(d){
      //console.log(cityColor[d]);
      if(d != index) {
        lines.filter("." + d)
        	.style("stroke", "#ddd")
            .lower();
        texts.filter("." + d)
        	.style("fill", "#ddd")
        	.style("font-weight", "normal")
            .lower();
      }
      else{
        lines.filter("." + d)
        	.style("stroke", cityColor[d])
            .raise();
        texts.filter("." + d)
        	.style("fill", cityColor[d])
        	.style("font-weight", "bold")
        	.raise();
      }
    });
  }
  // 滑鼠離開畫布
  function left() {
    country.forEach(function(d){
    	lines.filter("." + d)
      	    .style("stroke", cityColor[d])
            .lower();
      texts.filter("." + d)
        .style("fill", cityColor[d])
      	.style("font-weight", "normal")
        .lower();
    });
  }
}


