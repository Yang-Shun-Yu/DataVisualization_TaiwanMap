
var filename
//data相關
var rowData, year, rankedYear
// 畫布相關
var maxRows = 25;  // 最多可顯示12個rows
var divContainer = document.getElementById('svg1');
const chartHeight = divContainer.offsetHeight-40;
const chartWidth =divContainer.offsetWidth;
const chartMargin = {top: 30, right: 90, bottom: 0, left: 5};
const barSize = Math.round(chartHeight / maxRows);  // bar的高度
const tickDuration = 1250;  // 變化時間(毫秒)
var chartSvg;
var chartX, chartY, xAxis, yearText;
var playButton; // 播放按鈕
// 預處理
var rank = 0;
function housingAnimate(){
  housingInit()
filename = 'https://raw.githubusercontent.com/Yang-Shun-Yu/DataVisualization_TaiwanMap/main/dataset/0years_median_house_price.json';
if(urlParams.get("filename")){
  filename = urlParams.get("filename");
}
////// main //////

if(urlParams.get('maxrow')){
  maxRows = parseInt(urlParams.get('maxrow'));
}
d3.json(filename).then(function(d) {
  // 用全域變數紀錄資料
  rowData = d;
  // 建立畫布
  if(!svg1.innerHTML.includes('svg')){
    chartSvg = d3.select('#svg1')
    .append('svg')
      .attr('width', chartWidth)
      .attr('height', chartHeight)
  }
  
  // 設置按鈕
  change();

  //var data = preProcess(); 
  throwCity('initial');
  year = 103;
  rankedYear = renderData
    .filter(d => d.year == year)
  	.sort(function(a, b) {
      return b.value - a.value;
    })
    .slice(0, maxRows);
  rankedYear.forEach(function(d){
    d.rank = rank;
    rank += 1;
  });
  // 拿到X，Y軸資訊
  chartX = d3.scaleLinear()
    .domain([0, d3.max(rankedYear, d => d.value)])
    .range([chartMargin.left, chartWidth - chartMargin.right]);
  chartY = d3.scaleBand()
    .domain(d3.range(maxRows + 1))
    .range([chartMargin.top, barSize * (maxRows + 1) - chartMargin.bottom])
  	.padding(0.1);
  xAxis = d3.axisTop()
    .scale(chartX)
    .ticks(chartWidth > 500 ? 5 : 2)
    .tickSize(-chartHeight)
    .tickFormat(d => d3.format(',')(d));
  // 畫X軸
  chartSvg.append('g')
    .attr('class', 'axis xAxis')
    .attr('transform', `translate(0, ${chartMargin.top})`)
    .call(xAxis)
    .selectAll('.tick line')
    .classed('origin', d => d == 0);
  // 畫bar
  chartSvg.selectAll('rect.bar')
    .data(rankedYear, d => d.name)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', chartX(0))
    .attr('width', d => chartX(d.value) - chartX(0))
    .attr('y', d => chartY(d.rank))
    .attr('height', chartY.bandwidth())
    .style('fill', d => d.color);
  // 畫區域名字
  chartSvg.selectAll('text.Label')
    .data(rankedYear, d => d.name)
    .enter()
    .append('text')
    .attr('class', 'housingTextLabel')
    .attr('x', d => chartX(d.value) - 15)
    .attr('y', d => chartY(d.rank) + chartY.bandwidth() / 2 + 5)
    .style('text-anchor', 'end')
    .style('font-weight', 'bold')
    .html(d => d.name);
	// 畫價格
  chartSvg.selectAll('text.valueLabel')
    .data(rankedYear, d => d.name)
    .enter()
    .append('text')
    .attr('class', 'housingTextValueLabel')
    .attr('x', d => chartX(d.value) + 15)
    .attr('y', d => chartY(d.rank) + chartY.bandwidth() / 2 + 5)
    .text(d => d3.format(',.0f')(d.value));
  // 年的字變換
	const changeYear = function(text, strokeWidth) {
    text.select(function() { return this.parentNode.insertBefore(this.cloneNode(true), this); })
      .style('fill', '#ffffff')
      .style( 'stroke','#ffffff')
      .style('stroke-width', strokeWidth)
      .style('stroke-linejoin', 'round')
      .style('opacity', 1);
  };
  // 畫右下角的年
  yearText = chartSvg.append('text')
    .attr('class', 'housingTextYearText')
    .attr('x', chartWidth-5)
    .attr('y', chartHeight - 25)
    .style('text-anchor', 'end')
    .html(~~year)
    .call(changeYear, 10);
  if(urlParams.get("country")){
    var country = urlParams.get("country").split(",");
    throwCity('update');
    for(var i=0;i<country.length;i++){
      throwCity('update', country[i], cityColor[country[i]]);
    }
  }
})
};
// 動畫函式
function update(type='update') {
  // 更新rank
  var rank = 0;
  rankedYear = renderData
    .filter(d => d.year == year)
  	.sort(function(a, b) {
      return b.value - a.value;
    })
    .slice(0, maxRows);
  rankedYear.forEach(function(d) {
    d.rank = rank;
    rank += 1;
  });
  // 更新X的範圍
  if(rankedYear.length > 0)
    chartX.domain([0, rankedYear[0].value]);
  else
    chartX.domain([0, 0]);
  // 重新畫X軸
  chartSvg.select('.xAxis')
      .transition()
      .duration(tickDuration)
      .ease(d3.easeLinear)
      .call(xAxis);
  // 更新bar
  var bars = chartSvg.selectAll('.bar')
  	.data(rankedYear, d => d.name);
  
  bars
    .enter()
    .append('rect')
    .attr('class', d => `bar ${d.name.replace(/\s/g,'_')}`)
    .attr('x', chartX(0))
    .attr('width', d => chartX(d.value) - chartX(0))
    .attr('y', d => chartY(maxRows))
    .attr('height', chartY.bandwidth())
    .style('fill', d => d.color)
    .transition()
    .duration(tickDuration)
    .ease(d3.easeLinear)
    .attr('y', d => chartY(d.rank));
   bars
    .transition()
    .duration(tickDuration)
    .ease(d3.easeLinear)
    .attr('width', d => chartX(d.value) - chartX(0))
    .attr('y', d => chartY(d.rank)).style('fill', d => d.color);
   bars
    .exit()
    .transition()
    .duration(tickDuration)
    .ease(d3.easeLinear)
    .attr('width', d => chartX(d.value) - chartX(0))
    .attr('y', d => chartY(maxRows))
    .remove();
  
  // 更新區域文字
  var labels = chartSvg.selectAll('.housingTextLabel')
      .data(rankedYear, d => d.name);
  
  labels
    .enter()
    .append('text')
    .attr('class', 'housingTextLabel')
    .attr('x', d => chartX(d.value) - 15)
    .attr('y', d => chartY(maxRows) + chartY.bandwidth() / 2 + 5)
    .style('text-anchor', 'end')
    .html(d => d.name)    
    .transition()
      .duration(tickDuration)
      .ease(d3.easeLinear)
      .attr('y', d => chartY(d.rank) + chartY.bandwidth() / 2 + 5);
  labels
    .transition()
    .duration(tickDuration)
      .ease(d3.easeLinear)
      .attr('x', d => chartX(d.value) - 15)
      .attr('y', d => chartY(d.rank) + chartY.bandwidth() / 2 + 5);
  labels
    .exit()
    .transition()
      .duration(tickDuration)
      .ease(d3.easeLinear)
      .attr('x', d => chartX(d.value) - 15)
      .attr('y', d => chartY(maxRows) + chartY.bandwidth() / 2 + 5)
      .remove();
  
  // 更新價格文字
  var valueLabels = chartSvg.selectAll('.housingTextValueLabel')
  	.data(rankedYear, d => d.name);
  
  valueLabels
    .enter()
    .append('text')
    .attr('class', 'housingTextValueLabel')
    .attr('x', d => chartX(d.value) + 15)
    .attr('y', d => chartY(maxRows) + chartY.bandwidth() / 2 + 5)
    .text(d => d3.format(',.0f')(d.value))
    .transition()
      .duration(tickDuration)
      .ease(d3.easeLinear)
      .attr('y', d => chartY(d.rank) + chartY.bandwidth() / 2 + 5);
  valueLabels
    .transition()
    .duration(tickDuration)
    .ease(d3.easeLinear)
    .attr('x', d => chartX(d.value) + 15)
    .attr('y', d => chartY(d.rank) + chartY.bandwidth() / 2 + 5)
    .text(d => d3.format(',.0f')(d.value))
  valueLabels
    .exit()
    .transition()
    .duration(tickDuration)
    .ease(d3.easeLinear)
    .attr('x', d => chartX(d.value) + 15)
    .attr('y', d => chartY(maxRows) + chartY.bandwidth() / 2 + 5)
    .remove();
  // 更新右下角年的文字
  yearText.html(~~year);
  year += 1;
  // 停止條件
  if(year == 113)
    type = 'reset';
  if(type == 'reset') {
    // 初始化
    clearInterval(interval);
    document.getElementById('playpause').checked = false; 
    year = 103;
  }
}

/////// update function ///////
// 加要看的city data
function addData(city, color) {
  var data = preProcess(city);
  data.forEach(function(d) {
    d.color = color;
    renderData.push(d);
  });
};
// 刪除不要看的資料
function removeData(city) {
  var start = null;
  var count = 0;
  for(var i = 0; i < renderData.length; i++) {
    if(start == null && renderData[i].city == city)
      start = i;
    if(renderData[i].city == city)
      count += 1;
  }
  renderData.splice(start, count);
};
// 從地圖收到點擊資料
var cityRecord = [];
function throwCity(type, city='新竹市', color='#C11432'){
  var recordCheck = false;
  
  for(var i = 0; i < cityRecord.length; i++) {
    if(city == cityRecord[i]) {
      removeData(city);
      recordCheck = true;
      cityRecord.splice(i, 1);
      break;
    }
  }
  if(recordCheck == false) {
  	addData(city, color);
    cityRecord.push(city);
  }
  if(type == 'update')
  	update('reset');
};
////// 資料處理 //////
// 資料預處理
function preProcess(city='新竹市') {
  var years = Object.keys(rowData);
  var ret = [];
  var lastValue = {};
  years.forEach(function(year){
    var names = Object.keys(rowData[year][city]);
    names.sort(function(a, b) { return rowData[year][city][b] - rowData[year][city][a] });
    var rank = 0;
    names.forEach(function(name) {
      if(name != city || names.length == 1){
        var item = {};
        item.year = +year;
        item.city = city;
        item.name = name;
        item.value = +rowData[year][city][name];
        if(item.value == -999) {
          if(lastValue[name] == undefined)
            lastValue[name] = item.value = 0;
          else
            item.value = lastValue[name];
        }
        else
          lastValue[name] = item.value;
        item.color = '#aaa';
        ret.push(item);
        rank += 1;
      }
    });
  });
  return ret;
};
////// 按鈕 //////
// 畫按鈕
var renderData = []; // 存要看的city data
var interval = null;  // 設置一個變數來跑動畫
function change() {
  var svg5 = document.getElementById('svg4');
  if(!svg5.innerHTML.includes('playpause')){
    svg5.innerHTML += `  
    <div class="playpause" style="height:0.01">
    <input type="checkbox" value="None" id="playpause" name="check" />
    <label for="playpause" tabindex=1></label>
    </div>`;
  }



  
  // 播放按鈕
  var checkBox = document.getElementById('playpause');
  //console.log(checkBox.checked);
  checkBox.addEventListener('click', function() {
    console.log('click')
    if(checkBox.checked == true && renderData.length > 0) {
      console.log('animation start');
        // 跑動畫
        interval = setInterval(function() {
          update();
        }, tickDuration);
      }
      else {
        // 動畫暫停，清除interval
        if (interval)
          clearInterval(interval);
      }
  });
};