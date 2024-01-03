


let selectedCountyPath;
// selectedCountyPath = svg.selectAll("path")
//     .filter(d => d.properties.COUNTYNAME === "臺北市")
//     .classed("selected-county", true);

let draggableSliderValue = 112;
let selectedCountyDraggable = 'defaultCounty';
function renderfunctionality() {
    const svgContainer = d3.select("#svg4");
    svgContainer.selectAll("div")
        .remove();
    svgContainer.selectAll("svg")
        .remove();
    svgContainer.selectAll("button")
        .remove();

    // Select and remove the textSelection
    d3.select(".text-above-selection").remove();

    // Select and remove the countySelect
    d3.select("#countySelect").remove();

    // Select and remove the townSelect
    d3.select("#townSelect").remove();



    const width = svgContainer.style("width").slice(0, -2);
    const height = svgContainer.style("height").slice(0, -2);

    let highDetailData;
    const highDetailDataUrl = "https://raw.githubusercontent.com/Yang-Shun-Yu/Data-Visualization-Project/master/FinalProject/T.json";
    d3.json(highDetailDataUrl)
        .then(function (jsonData) {

            highDetailData = topojson.feature(jsonData, jsonData.objects["TOWN_MOI_1120825"]);

            var data = highDetailData.features;
            // const uniqueCounties = [...new Set(data.map(entry => entry.properties.COUNTYNAME))];
            const uniqueCounties = ['臺北市', '新北市', '基隆市', '新竹市', '桃園市', '新竹縣', '宜蘭縣',
                '臺中市', '苗栗縣', '彰化縣', '南投縣', '雲林縣',
                '高雄市', '臺南市', '嘉義市', '嘉義縣', '屏東縣',
                '澎湖縣', '花蓮縣', '臺東縣', '金門縣', '連江縣'];

            const countyTownMap = {};
            data.forEach(entry => {
                const countyName = entry.properties.COUNTYNAME;
                const townName = entry.properties.TOWNNAME;
                if (!countyTownMap[countyName]) {
                    countyTownMap[countyName] = [];
                }
                // countyTownMap[countyName].push("鄉鎮市區");
                countyTownMap[countyName].push(townName);
            });
            console.log(uniqueCounties);

            uniqueCounties.unshift("defaultCounty");

            const textSelection = svgContainer
                .append("div")
                .append("text")
                .attr("class", "text-above-selection")
                .attr("text-anchor", "middle")

                .text("選取縣市 鄉鎮市區");


            // Create two <select> elements and append them to the body
            const countySelect = svgContainer
                .append("select")
                .attr("id", "countySelect")
                .on("change", updateTownOptions);

            const townSelect = svgContainer
                .append("select")
                .attr("id", "townSelect")
                .on("change", updateCityTownOptions);

            // Set default values for the <select> elements
            countySelect.append("option")
                .attr("value", "defaultCounty")
                .text("縣市")
                .attr("selected", true);

            townSelect.append("option")
                .attr("value", "defaultTown")
                .text("鄉鎮市區")
                .attr("selected", true);

            // Populate the first <select> with unique COUNTYNAME values

            countySelect.selectAll("option")
                .data(uniqueCounties)
                .enter().append("option")
                .text(d => d);


            // Function to update the options of the second <select> based on the selected COUNTYNAME
            function updateTownOptions() {



                const selectedCounty = countySelect.property("value");
                selectedCountyDraggable = selectedCounty;
                // Remove the previously selected county path class

                //highlight the selected country
                if (selectedCountyPath) {
                    selectedCountyPath.classed("selected-county", false);
                }

                // Clear existing options
                townSelect.selectAll("option").remove();

                // Check if the default option "縣市" is selected
                if (selectedCounty === "defaultCounty") {
                    renderLivingFacilities();
                    renderLivingFacilitiesDonutChart(draggableSliderValue);
                    townSelect.append("option")
                        .attr("value", "defaultTown")
                        .text("鄉鎮市區")
                        .attr("selected", true);
                } else {
                    // Zoom in to the selected county
                    const selectedCountyData = highDetailData.features.find(entry => entry.properties.COUNTYNAME === selectedCounty);
                    renderLivingFacilitiesCity(selectedCounty);

                    renderLivingFacilitiesDonutChartCity(selectedCounty, draggableSliderValue);
                    // Highlight the selected county area
                    selectedCountyPath = taiwan_map_svg.selectAll("path")
                        .filter(d => d.properties.COUNTYNAME === selectedCounty)
                        .classed("selected-county", true);


                    const townOptions = countyTownMap[selectedCounty];
                    townSelect.selectAll("option")
                        .data(townOptions)
                        .enter().append("option")
                        .text(d => d);
                }
            }

            function updateCityTownOptions() {
                const selectedCounty = countySelect.property("value");
                const selectedTown = townSelect.property("value");
                renderLivingFacilitiesCiytTown(selectedCounty, selectedTown);


            }


            // Draggable slider
            const textDraggableSlider = svgContainer
                .append("div")
                .append("text")
                .attr("class", "text-above-selection")
                .attr("text-anchor", "middle")

                .text("時間軸");



            let draggablewidth = width;
            let dragableheight = height / 5;
            // Initial slider values
            let minValue = 60;
            let maxValue = 112;
            let currentValue = 112;

            var svg = svgContainer.append("svg")
                .attr("width", draggablewidth)
                .attr("height", dragableheight)
                .attr("transform", `translate(0, 10)`)



            // Create the draggable slider
            const slider = svg.append("rect")
                .attr("class", "slider")
                .attr("width", draggablewidth)
                .attr("height", dragableheight / 6)
                .attr("fill", "#ddd")
                .attr("transform", `translate(0, ${dragableheight / 2})`)
                .call(d3.drag()
                    .on("drag", handleDrag));
            // Create the draggable handle
            const handle = svg.append("circle")
                .attr("class", "handle")
                .attr("r", 10)
                .attr("cx", calculateHandlePosition(currentValue))
                .attr("cy", 10)
                .attr("fill", "steelblue")
                .attr("transform", `translate(0, ${dragableheight / 2.6})`)
                .call(d3.drag()
                    .on("drag", handleDrag));
            // Function to update the handle position based on the dragged distance

            function handleDrag(event) {
                svg.select("text").remove();
                // Calculate the new value based on the drag position
                const newValue = Math.max(minValue, Math.min(maxValue, event.x / width * (maxValue - minValue) + minValue));

                // Update the handle position
                handle.attr("cx", calculateHandlePosition(newValue));

                // Update the current value
                currentValue = Math.round(newValue);
                draggableSliderValue = currentValue;
                // Create a text element to display the draggable value
                const valueText = svg.append("text")
                    .attr("x", draggablewidth / 2)
                    // .attr("y", dragableheight / 2)
                    .attr("text-anchor", "middle")
                    .attr("dominant-baseline", "middle")
                    .attr("fill", "black")
                    .attr("transform", `translate(0, ${dragableheight / 3})`)
                    .text(`${currentValue} 年`);
                // You can also perform any other actions based on the new value here
                // console.log("Current Value: " + currentValue);

                if (selectedCountyDraggable == 'defaultCounty') {
                    renderLivingFacilitiesDonutChartDraggableSlider(currentValue);
                } else {
                    renderLivingFacilitiesDonutChartCity(selectedCountyDraggable, draggableSliderValue);
                }



                renderLivingFacilitiesMapDataDraggableSlider(draggableSliderG, draggableSliderProjectMethod, draggableSliderCSV, currentValue);
            }

            // Function to calculate the handle position based on the current value
            function calculateHandlePosition(value) {
                return (value - minValue) / (maxValue - minValue) * width;
            }

        });

}
