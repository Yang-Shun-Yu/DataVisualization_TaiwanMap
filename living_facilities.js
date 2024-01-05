var draggableSliderCSV;
var donutCSV;
function renderLivingFacilitiesMapData(g, projectMethod) {
    const url = "https://raw.githubusercontent.com/Yang-Shun-Yu/DataVisualization_TaiwanMap/main/dataset/%E5%85%A8%E5%9C%8B%E9%81%8B%E5%8B%95%E5%A0%B4%E9%A4%A8%E8%B3%87%E8%A8%8A.csv";
    d3.csv(url)
        .then(function (csvData) {
            draggableSliderCSV = csvData;
            const filteredData = csvData.filter(function (d) {
                return +d["場館啟用年"] <= 112;
            });

            g.selectAll("circle")
                .data(filteredData)
                .enter()
                .append("circle")
                .attr("cx", function (d) { return projectMethod([+d["經度"], +d["緯度"]])[0]; })
                .attr("cy", function (d) { return projectMethod([+d["經度"], +d["緯度"]])[1]; })
                .attr("r", 0.25)
                .attr("class", "circle")
                .append("title")
                .text(function (d) { return d["場館名稱"]; });
        })
}

function renderLivingFacilitiesMapDataDraggableSlider(g, projectMethod, csvData, inputyear) {

    const filteredData = csvData.filter(function (d) {
        return +d["場館啟用年"] <= inputyear;
    });
    g.selectAll("circle").remove();

    g.selectAll("circle")
        .data(filteredData)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return projectMethod([+d["經度"], +d["緯度"]])[0]; })
        .attr("cy", function (d) { return projectMethod([+d["經度"], +d["緯度"]])[1]; })
        .attr("r", 0.25)
        .attr("class", "circle")
        .append("title")
        .text(function (d) { return d["場館名稱"]; });

}




function renderLivingFacilities() {
    const url = "https://raw.githubusercontent.com/Yang-Shun-Yu/DataVisualization_TaiwanMap/main/dataset/%E5%85%A8%E5%9C%8B%E9%81%8B%E5%8B%95%E5%A0%B4%E9%A4%A8%E8%B3%87%E8%A8%8A.csv";
    d3.csv(url)
        .then(function (csvData) {
            renderLivingFacilitiesChart1(csvData);
        });
}

function renderLivingFacilitiesCity(inputcityc) {
    const url = "https://raw.githubusercontent.com/Yang-Shun-Yu/DataVisualization_TaiwanMap/main/dataset/%E5%85%A8%E5%9C%8B%E9%81%8B%E5%8B%95%E5%A0%B4%E9%A4%A8%E8%B3%87%E8%A8%8A.csv";
    d3.csv(url)
        .then(function (csvData) {
            renderLivingFacilitiesChart1City(csvData, inputcityc);
        });
}

function renderLivingFacilitiesCiytTown(inputcityc, inputtown) {
    const url = "https://raw.githubusercontent.com/Yang-Shun-Yu/DataVisualization_TaiwanMap/main/dataset/%E5%85%A8%E5%9C%8B%E9%81%8B%E5%8B%95%E5%A0%B4%E9%A4%A8%E8%B3%87%E8%A8%8A.csv";
    d3.csv(url)
        .then(function (csvData) {
            renderLivingFacilitiesChart1CityTown(csvData, inputcityc, inputtown);
        });
}

function renderLivingFacilitiesDonutChart(inputyear) {
    const url = "https://raw.githubusercontent.com/Yang-Shun-Yu/DataVisualization_TaiwanMap/main/dataset/%E5%85%A8%E5%9C%8B%E9%81%8B%E5%8B%95%E5%A0%B4%E9%A4%A8%E8%B3%87%E8%A8%8A.csv";
    d3.csv(url)
        .then(function (csvData) {
            donutCSV = csvData;
            renderDonutChart(csvData, inputyear);
        });
}

function renderLivingFacilitiesDonutChartCity(inputcity, inputyear) {

    renderDonutChartCity(donutCSV, inputcity, inputyear);

}

function renderLivingFacilitiesDonutChartDraggableSlider(inputyear) {

    renderDonutChartDraggableSlider(donutCSV, inputyear);

}


function renderLivingFacilitiesChart1(csvData) {
    const svgContainer = d3.select("#svg1");
    const width = svgContainer.style("width").slice(0, -2);
    const height = svgContainer.style("height").slice(0, -2);
    const widthMarginLeft = 55;
    const widthMarginRight = 40;
    const heightMargin = 40;



    svgContainer.selectAll("div")
        .remove();
    const tooltip = svgContainer.append("div")
        .attr("class", "living-facilities-svg1-tooltip");

    svgContainer.selectAll("svg")
        .remove();
    const svg = svgContainer.append("svg")
        .attr("width", width)
        .attr("height", height);

    // Add a title to the graph
    svg.append("text")
        .attr("class", "graph-title")
        .attr("x", width / 2)
        .attr("y", 20) // Adjust the y-coordinate to position the title
        .attr("text-anchor", "middle")
        .style("font-size", "24px")
        .style("font-weight", "bold")
        .text("台灣縣市 體育館");

    const groupedData = csvData.reduce(function (acc, current) {
        const city = current.縣市;
        const year = current.場館啟用年;
        if (!acc[city]) {
            acc[city] = {};
        }
        if (!acc[city][year]) {
            acc[city][year] = [];
        }
        acc[city][year].push(current);
        return acc;
    }, {});

    const totalObjectsData = Object.keys(groupedData).map(function (city) {
        let sum = 0;
        return Object.keys(groupedData[city]).map(function (year) {
            sum += groupedData[city][year].length;
            if (year >= 60 && year % 5 == 0) {
                const totalObjects = sum;
                return { city, year, totalObjects };
            }
        });
    }).flat();

    const plotData = totalObjectsData
        .filter(function (d) { return d !== undefined; })
        .map(function (d) {
            return {
                city: d.city,
                year: +d.year,
                totalObjects: d.totalObjects
            }
        });

    const xScale = d3.scaleLinear()
        .domain(d3.extent(plotData, function (d) { return d.year; }))
        .range([0, width - widthMarginLeft - widthMarginRight]);
    svg.append("g")
        .attr("transform", `translate(${widthMarginLeft}, ${height - heightMargin})`)
        .call(d3.axisBottom(xScale));

    const yScale = d3.scaleLinear()
        .domain(d3.extent(plotData, function (d) { return d.totalObjects; }))
        .range([height - heightMargin * 2, 0]);
    svg.append("g")
        .attr("transform", `translate(${widthMarginLeft}, ${heightMargin})`)
        .call(d3.axisLeft(yScale));

    svg.append("text")
        .attr("class", "svg1-axis-title")
        .attr("transform", `translate(${width / 2 + (widthMarginLeft - widthMarginRight) / 2}, ${height - heightMargin + 30}) rotate(0)`)
        .text("year");

    svg.append("text")
        .attr("class", "svg1-axis-title")
        .attr("transform", `translate(15, ${height / 2}) rotate(270)`)
        .text("number of sports stadiums");

    const cities = Array.from(new Set(plotData.map(function (d) { return d.city; })));

    const colors = [
        "#FF5733", "#3498DB", "#2ECC71", "#F39C12", "#8E44AD", "#E74C3C", "#16A085",
        "#D35400", "#1ABC9C", "#F1C40F", "#34495E", "#FFC300", "#3498DB", "#27AE60",
        "#E74C3C", "#9B59B6", "#E67E22", "#2980B9", "#2C3E50", "#F39C12", "#7F8C8D",
        "#1ABC9C", "#FF5733", "#D35400", "#27AE60", "#3498DB", "#E74C3C", "#9B59B6",
        "#E67E22", "#2980B9", "#2C3E50", "#F39C12", "#3498DB", "#9B59B6", "#E67E22",
        "#2980B9", "#2C3E50"
    ];

    let cityColorMap = {};
    cities.forEach(function (city, index) {
        cityColorMap[city] = colors[index];
    });

    cities.forEach(function (city) {
        const cityData = plotData.filter(function (d) { return d.city == city; });
        svg.append("path")
            .datum(cityData)
            .attr("fill", "none")
            .attr("stroke", cityColorMap[city])
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
                .x(function (d) { return xScale(d.year) + widthMarginLeft; })
                .y(function (d) { return yScale(d.totalObjects) + heightMargin; })
            );

        svg.append("g")
            .selectAll("dot")
            .data(cityData)
            .join("circle")
            .attr("cx", function (d) { return xScale(d.year) + widthMarginLeft; })
            .attr("cy", function (d) { return yScale(d.totalObjects) + heightMargin; })
            .attr("r", 4)
            .attr("fill", cityColorMap[city])
            .on("mouseover", handleMouseOver)
            .on("mouseout", handleMouseOut);

        function handleMouseOver(event, d) {
            d3.select(this)
                .transition()
                .attr("r", 8);
            d3.select(".living-facilities-svg1-tooltip")
                .html(`city: ${d.city}<br>year: ${d.year}<br>number: ${d.totalObjects}`)
                .style("left", `${event.layerX + 10}px`)
                .style("top", `${event.layerY + 10}px`)
                .style("position", "absolute")
                .style("padding", "5px")
                .style("font-size", "20px")
                .style("background-color", "#D0D0D0")
                .style("border-radius", "10px")
                .style("opacity", 1);
        }

        function handleMouseOut(event, d) {
            d3.select(this)
                .transition()
                .duration(200)
                .attr("r", 4);
            d3.select(".living-facilities-svg1-tooltip")
                .style("opacity", 0);

        }
    });
}

//***********************************************************************/
function renderLivingFacilitiesChart1City(csvData, inputcity) {
    const svgContainer = d3.select("#svg1");
    const width = svgContainer.style("width").slice(0, -2);
    const height = svgContainer.style("height").slice(0, -2);
    const widthMarginLeft = 55;
    const widthMarginRight = 40;
    const heightMargin = 40;



    svgContainer.selectAll("div")
        .remove();
    const tooltip = svgContainer.append("div")
        .attr("class", "living-facilities-svg1-tooltip");

    svgContainer.selectAll("svg")
        .remove();
    const svg = svgContainer.append("svg")
        .attr("width", width)
        .attr("height", height);

    // Add a title to the graph
    svg.append("text")
        .attr("class", "graph-title")
        .attr("x", width / 2)
        .attr("y", 20) // Adjust the y-coordinate to position the title
        .attr("text-anchor", "middle")
        .style("font-size", "24px")
        .style("font-weight", "bold")
        .text(`${inputcity} 體育館`);

    const groupedData = csvData.reduce(function (acc, current) {
        const city = current.縣市;
        if (city === inputcity) {
            const town = current.行政區;
            const year = current.場館啟用年;
            // If the city key doesn't exist in the accumulator, create an empty object
            if (!acc[town]) {
                acc[town] = {};
            }

            // If the year key doesn't exist in the city object, create an empty array
            if (!acc[town][year]) {
                acc[town][year] = [];
            }
            // Push the current data object to the corresponding year array
            acc[town][year].push(current);
        }
        return acc;
    }, {});



    const totalObjectsData = Object.keys(groupedData).map(town => {
        // console.log(city);
        let sum = 0;
        return Object.keys(groupedData[town]).map(year => {
            sum += groupedData[town][year].length;
            // console.log(sum);
            const totalObjects = sum;
            if (year >= 60 && year % 2 == 0) {
                return { town, year, totalObjects };
            }


        });
    }).flat();
    console.log(totalObjectsData);


    const plotData = totalObjectsData
        .filter(function (d) { return d !== undefined; })
        .map(function (d) {
            return {
                town: d.town,
                year: +d.year,
                totalObjects: d.totalObjects
            }
        });

    const xScale = d3.scaleLinear()
        .domain(d3.extent(plotData, function (d) { return d.year; }))
        .range([0, width - widthMarginLeft - widthMarginRight]);
    svg.append("g")
        .attr("transform", `translate(${widthMarginLeft}, ${height - heightMargin})`)
        .call(d3.axisBottom(xScale));

    const yScale = d3.scaleLinear()
        .domain(d3.extent(plotData, function (d) { return d.totalObjects; }))
        .range([height - heightMargin * 2, 0]);
    svg.append("g")
        .attr("transform", `translate(${widthMarginLeft}, ${heightMargin})`)
        .call(d3.axisLeft(yScale));

    svg.append("text")
        .attr("class", "svg1-axis-title")
        .attr("transform", `translate(${width / 2 + (widthMarginLeft - widthMarginRight) / 2}, ${height - heightMargin + 30}) rotate(0)`)
        .text("year");

    svg.append("text")
        .attr("class", "svg1-axis-title")
        .attr("transform", `translate(15, ${height / 2}) rotate(270)`)
        .text("number of sports stadiums");

    const towns = Array.from(new Set(plotData.map(function (d) { return d.town; })));

    const colors = [
        "#FF5733", "#3498DB", "#2ECC71", "#F39C12", "#8E44AD", "#E74C3C", "#16A085",
        "#D35400", "#1ABC9C", "#F1C40F", "#34495E", "#FFC300", "#3498DB", "#27AE60",
        "#E74C3C", "#9B59B6", "#E67E22", "#2980B9", "#2C3E50", "#F39C12", "#7F8C8D",
        "#1ABC9C", "#FF5733", "#D35400", "#27AE60", "#3498DB", "#E74C3C", "#9B59B6",
        "#E67E22", "#2980B9", "#2C3E50", "#F39C12", "#3498DB", "#9B59B6", "#E67E22",
        "#2980B9", "#2C3E50"
    ];

    let townColorMap = {};
    towns.forEach(function (town, index) {
        townColorMap[town] = colors[index];
    });

    towns.forEach(function (town) {
        const townData = plotData.filter(function (d) { return d.town == town; });
        svg.append("path")
            .datum(townData)
            .attr("fill", "none")
            .attr("stroke", townColorMap[town])
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
                .x(function (d) { return xScale(d.year) + widthMarginLeft; })
                .y(function (d) { return yScale(d.totalObjects) + heightMargin; })
            );

        svg.append("g")
            .selectAll("dot")
            .data(townData)
            .join("circle")
            .attr("cx", function (d) { return xScale(d.year) + widthMarginLeft; })
            .attr("cy", function (d) { return yScale(d.totalObjects) + heightMargin; })
            .attr("r", 4)
            .attr("fill", townColorMap[town])
            .on("mouseover", handleMouseOver)
            .on("mouseout", handleMouseOut);

        function handleMouseOver(event, d) {
            d3.select(this)
                .transition()
                .attr("r", 8);
            d3.select(".living-facilities-svg1-tooltip")
                .html(`town: ${d.town}<br>year: ${d.year}<br>number: ${d.totalObjects}`)
                .style("left", `${event.layerX + 10}px`)
                .style("top", `${event.layerY + 10}px`)
                .style("position", "absolute")
                .style("padding", "5px")
                .style("font-size", "20px")
                .style("background-color", "#D0D0D0")
                .style("border-radius", "10px")
                .style("opacity", 1);
        }

        function handleMouseOut(event, d) {
            d3.select(this)
                .transition()
                .duration(200)
                .attr("r", 4);
            d3.select(".living-facilities-svg1-tooltip")
                .style("opacity", 0);

        }
    });
}

//***********************************************************************/
function renderLivingFacilitiesChart1CityTown(csvData, inputcity, inputtown) {
    const svgContainer = d3.select("#svg1");
    const width = svgContainer.style("width").slice(0, -2);
    const height = svgContainer.style("height").slice(0, -2);
    const widthMarginLeft = 55;
    const widthMarginRight = 40;
    const heightMargin = 40;



    svgContainer.selectAll("div")
        .remove();
    const tooltip = svgContainer.append("div")
        .attr("class", "living-facilities-svg1-tooltip");

    svgContainer.selectAll("svg")
        .remove();
    const svg = svgContainer.append("svg")
        .attr("width", width)
        .attr("height", height);

    // Add a title to the graph
    svg.append("text")
        .attr("class", "graph-title")
        .attr("x", width / 2)
        .attr("y", 20) // Adjust the y-coordinate to position the title
        .attr("text-anchor", "middle")
        .style("font-size", "24px")
        .style("font-weight", "bold")
        .text(`${inputcity}  ${inputtown} 體育館` );

    const groupedData = csvData.reduce(function (acc, current) {
        const city = current.縣市;
        if (city === inputcity) {
            const town = current.行政區;
            const year = current.場館啟用年;
            // If the city key doesn't exist in the accumulator, create an empty object
            if (!acc[town]) {
                acc[town] = {};
            }

            // If the year key doesn't exist in the city object, create an empty array
            if (!acc[town][year]) {
                acc[town][year] = [];
            }
            // Push the current data object to the corresponding year array
            acc[town][year].push(current);
        }
        return acc;
    }, {});



    const totalObjectsData = Object.keys(groupedData).map(town => {
        // console.log(city);
        let sum = 0;
        return Object.keys(groupedData[town]).map(year => {
            sum += groupedData[town][year].length;
            // console.log(sum);
            const totalObjects = sum;
            if (year >= 60 && year % 1 == 0) {
                return { town, year, totalObjects };
            }


        });
    }).flat();
    console.log(totalObjectsData);


    const plotData = totalObjectsData
        .filter(function (d) { return d !== undefined; })
        .map(function (d) {
            return {
                town: d.town,
                year: +d.year,
                totalObjects: d.totalObjects
            }
        });

    const xScale = d3.scaleLinear()
        .domain(d3.extent(plotData, function (d) { return d.year; }))
        .range([0, width - widthMarginLeft - widthMarginRight]);
    svg.append("g")
        .attr("transform", `translate(${widthMarginLeft}, ${height - heightMargin})`)
        .call(d3.axisBottom(xScale));

    const yScale = d3.scaleLinear()
        .domain(d3.extent(plotData, function (d) { return d.totalObjects; }))
        .range([height - heightMargin * 2, 0]);
    svg.append("g")
        .attr("transform", `translate(${widthMarginLeft}, ${heightMargin})`)
        .call(d3.axisLeft(yScale));

    svg.append("text")
        .attr("class", "svg1-axis-title")
        .attr("transform", `translate(${width / 2 + (widthMarginLeft - widthMarginRight) / 2}, ${height - heightMargin + 30}) rotate(0)`)
        .text("year");

    svg.append("text")
        .attr("class", "svg1-axis-title")
        .attr("transform", `translate(15, ${height / 2}) rotate(270)`)
        .text("number of sports stadiums");

    const towns = Array.from(new Set(plotData.map(function (d) { return d.town; })));

    const colors = [
        "#FF5733", "#3498DB", "#2ECC71", "#F39C12", "#8E44AD", "#E74C3C", "#16A085",
        "#D35400", "#1ABC9C", "#F1C40F", "#34495E", "#FFC300", "#3498DB", "#27AE60",
        "#E74C3C", "#9B59B6", "#E67E22", "#2980B9", "#2C3E50", "#F39C12", "#7F8C8D",
        "#1ABC9C", "#FF5733", "#D35400", "#27AE60", "#3498DB", "#E74C3C", "#9B59B6",
        "#E67E22", "#2980B9", "#2C3E50", "#F39C12", "#3498DB", "#9B59B6", "#E67E22",
        "#2980B9", "#2C3E50"
    ];

    let townColorMap = {};
    towns.forEach(function (town, index) {
        townColorMap[town] = colors[index];
    });

    towns.forEach(function (town) {
        if (town == inputtown) {
            const townData = plotData.filter(function (d) { return d.town == town; });
            svg.append("path")
                .datum(townData)
                .attr("fill", "none")
                .attr("stroke", townColorMap[town])
                .attr("stroke-width", 1.5)
                .attr("d", d3.line()
                    .x(function (d) { return xScale(d.year) + widthMarginLeft; })
                    .y(function (d) { return yScale(d.totalObjects) + heightMargin; })
                );

            svg.append("g")
                .selectAll("dot")
                .data(townData)
                .join("circle")
                .attr("cx", function (d) { return xScale(d.year) + widthMarginLeft; })
                .attr("cy", function (d) { return yScale(d.totalObjects) + heightMargin; })
                .attr("r", 4)
                .attr("fill", townColorMap[town])
                .on("mouseover", handleMouseOver)
                .on("mouseout", handleMouseOut);

            function handleMouseOver(event, d) {
                d3.select(this)
                    .transition()
                    .attr("r", 8);
                d3.select(".living-facilities-svg1-tooltip")
                    .html(`town: ${d.town}<br>year: ${d.year}<br>number: ${d.totalObjects}`)
                    .style("left", `${event.layerX + 10}px`)
                    .style("top", `${event.layerY + 10}px`)
                    .style("position", "absolute")
                    .style("padding", "5px")
                    .style("font-size", "20px")
                    .style("background-color", "#D0D0D0")
                    .style("border-radius", "10px")
                    .style("opacity", 1);
            }

            function handleMouseOut(event, d) {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr("r", 4);
                d3.select(".living-facilities-svg1-tooltip")
                    .style("opacity", 0);

            }
        }

    });
}

function renderDonutChart(csvData, inputyear) {

    const svgContainer = d3.select("#svg5");
    const width = svgContainer.style("width").slice(0, -2);
    const height = svgContainer.style("height").slice(0, -2);
    const widthMarginLeft = 290;
    const widthMarginRight = 20;
    const heightMargin = 120;

    svgContainer.selectAll("div")
        .remove();

    svgContainer.selectAll("svg")
        .remove();

    svgContainer.selectAll("text")
        .remove();
    // Add a title to the graph
    svgContainer.append("text")
        .attr("class", "graph-title")
        .attr("x", width / 2)
        .attr("y", 20) // Adjust the y-coordinate to position the title
        // .attr("text-anchor", "middle")
        .style("font-size", "24px")
        .style("font-weight", "bold")
        .text(`臺灣縣市  民國 : ${inputyear}年`)
    // .attr("transform", `translate(${width / 2},0)`);
    const svg = svgContainer.append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);



    const tooltip = svgContainer.append("div")
        .attr("class", "living-facilities-svg5-tooltip");
    // Step 1: Group data by "縣市" and "場館啟用年"
    const groupedData = csvData.reduce((acc, current) => {
        const city = current.縣市;
        const year = current.場館啟用年;

        // If the city key doesn't exist in the accumulator, create an empty object
        if (!acc[city]) {
            acc[city] = {};
        }

        // If the year key doesn't exist in the city object, create an empty array
        if (!acc[city][year]) {
            acc[city][year] = [];
        }

        // Push the current data object to the corresponding year array
        acc[city][year].push(current);

        return acc;
    }, {});







    // Step 2: Calculate the total number of objects for each combination of "縣市" and "場館啟用年"
    const totalObjectsData = Object.keys(groupedData).map(city => {
        // console.log(city);
        let sum = 0;
        let i = 0;
        let n = Object.keys(groupedData[city]).length

        return Object.keys(groupedData[city]).map(year => {
            if (year <= inputyear) {
                sum += groupedData[city][year].length;
                // console.log(sum);

            }
            const totalObjects = sum;
            i++;

            if (i == n) {
                return { city, year, totalObjects };
            }



        }).filter(Boolean);;
    }).flat();

    const plotData = totalObjectsData
        .filter(function (d) { return d !== undefined; })
        .map(function (d) {
            return {
                city: d.city,
                year: +d.year,
                totalObjects: d.totalObjects
            }
        });

    const transformedData = {};
    const domainCity = [];

    totalObjectsData.forEach(item => {
        transformedData[item.city] = item.totalObjects;
        domainCity.push(item.city);
    });

    const radius = Math.min(width * 0.9, height * 0.9) / 2;
    // Create dummy data
    const data = transformedData;
    // Convert data object to an array of objects
    const dataArray = Object.entries(data);

    // Sort the data array based on values in descending order
    dataArray.sort((a, b) => b[1] - a[1]);

    const cities = Array.from(new Set(plotData.map(function (d) { return d.city; })));

    const colors = [
        "#FF5733", "#3498DB", "#2ECC71", "#F39C12", "#8E44AD", "#E74C3C", "#16A085",
        "#D35400", "#1ABC9C", "#F1C40F", "#34495E", "#FFC300", "#3498DB", "#27AE60",
        "#E74C3C", "#9B59B6", "#E67E22", "#2980B9", "#2C3E50", "#F39C12", "#7F8C8D",
        "#1ABC9C", "#FF5733", "#D35400", "#27AE60", "#3498DB", "#E74C3C", "#9B59B6",
        "#E67E22", "#2980B9", "#2C3E50", "#F39C12", "#3498DB", "#9B59B6", "#E67E22",
        "#2980B9", "#2C3E50"
    ];

    let cityColorMap = {};
    cities.forEach(function (city, index) {
        cityColorMap[city] = colors[index];
    });

    // Compute the position of each group on the pie:
    const pie = d3.pie()
        .sort(null) // Do not sort group by size
        .value(d => d[1])
    const data_ready = pie(dataArray)
    console.log(data_ready);

    // The arc generator
    const arc = d3.arc()
        .innerRadius(radius * 0.5)         // This is the size of the donut hole
        .outerRadius(radius * 0.8)

    // Another arc that won't be drawn. Just for labels positioning
    const outerArc = d3.arc()
        .innerRadius(radius * 0.9)
        .outerRadius(radius * 0.9)

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
        .selectAll('allSlices')
        .data(data_ready)
        .join('path')
        .attr('d', arc)
        .attr('fill', d => cityColorMap[d.data[0]])
        .attr("stroke", "white")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut);

    function handleMouseOver(event, d) {

        // Display the value on hover
        d3.select(".living-facilities-svg5-tooltip")
            .html(` ${d.data[0]} ${d.data[1]}`)

            .style("left", `${event.layerX + 10}px`)
            .style("top", `${event.layerY + 10}px`)
            .style("position", "absolute")
            .style("padding", "5px")
            .style("font-size", "20px")
            .style("background-color", "#D0D0D0")
            .style("border-radius", "10px")
            .style("opacity", 1);

        // Highlight the pie slice
        d3.select(this)
            .transition()
            .duration(200)
            // Increase outer radius for highlighting
            .attr("d", d3.arc().innerRadius(radius * 0.5).outerRadius(radius * 0.9));

        // Darken the pie slice color
        d3.select(this)
            .attr("fill", d => d3.color(cityColorMap[d.data[0]]).darker(2));
    }

    function handleMouseOut(event, d) {
        // Remove the value on mouseout
        d3.select(".living-facilities-svg5-tooltip").style("opacity", 0);
        // tooltip.transition().duration(500).style("opacity", 0);
        // Remove highlight from the pie slice
        d3.select(this)
            .transition()
            .duration(200)
            .attr("d", arc); // Reset to original arc

        // Reset the pie slice color
        d3.select(this)
            .attr("fill", d => cityColorMap[d.data[0]]);
    }
}


function renderDonutChartCity(csvData, inputcity, inputyear) {

    const svgContainer = d3.select("#svg5");
    const width = svgContainer.style("width").slice(0, -2);
    const height = svgContainer.style("height").slice(0, -2);
    const widthMarginLeft = 290;
    const widthMarginRight = 20;
    const heightMargin = 120;

    svgContainer.selectAll("div")
        .remove();

    svgContainer.selectAll("svg")
        .remove();

    svgContainer.selectAll("text")
        .remove();
    // Add a title to the graph
    svgContainer.append("text")
        .attr("class", "graph-title")
        .attr("x", width / 2)
        .attr("y", 20) // Adjust the y-coordinate to position the title
        // .attr("text-anchor", "middle")
        .style("font-size", "24px")
        .style("font-weight", "bold")
        .text(`縣市 : ${inputcity}  民國 : ${inputyear}年`)
    const svg = svgContainer.append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

    const tooltip = svgContainer.append("div")
        .attr("class", "living-facilities-svg5-tooltip");
    // Step 1: Group data by "縣市" and "場館啟用年"
    const groupedData = csvData.reduce((acc, current) => {
        const city = current.縣市;
        if (city === inputcity) {
            const town = current.行政區;
            const year = current.場館啟用年;
            // If the city key doesn't exist in the accumulator, create an empty object
            if (!acc[town]) {
                acc[town] = {};
            }

            // If the year key doesn't exist in the city object, create an empty array
            if (!acc[town][year]) {
                acc[town][year] = [];
            }
            // Push the current data object to the corresponding year array
            acc[town][year].push(current);
        }

        return acc;
    }, {});



    // Step 2: Calculate the total number of objects for each combination of "縣市" and "場館啟用年"
    const totalObjectsData = Object.keys(groupedData).map(town => {
        // console.log(city);
        let sum = 0;
        let i = 0;
        let n = Object.keys(groupedData[town]).length

        return Object.keys(groupedData[town]).map(year => {

            if (+year <= inputyear) {
                sum += groupedData[town][year].length;
                // console.log(sum);

            }
            const totalObjects = sum;
            i++;

            if (i == n) {
                return { town, year, totalObjects };
            }



        }).filter(Boolean);;
    }).flat();

    const plotData = totalObjectsData
        .filter(function (d) { return d !== undefined; })
        .map(function (d) {
            return {
                town: d.town,
                year: +d.year,
                totalObjects: d.totalObjects
            }
        });

    const transformedData = {};
    const domainCity = [];

    totalObjectsData.forEach(item => {
        transformedData[item.town] = item.totalObjects;
        domainCity.push(item.town);
    });

    const radius = Math.min(width * 0.9, height * 0.9) / 2;
    // Create dummy data
    const data = transformedData;
    // Convert data object to an array of objects
    const dataArray = Object.entries(data);

    // Sort the data array based on values in descending order
    dataArray.sort((a, b) => b[1] - a[1]);

    const towns = Array.from(new Set(plotData.map(function (d) { return d.town; })));

    const colors = [
        "#FF5733", "#3498DB", "#2ECC71", "#F39C12", "#8E44AD", "#E74C3C", "#16A085",
        "#D35400", "#1ABC9C", "#F1C40F", "#34495E", "#FFC300", "#3498DB", "#27AE60",
        "#E74C3C", "#9B59B6", "#E67E22", "#2980B9", "#2C3E50", "#F39C12", "#7F8C8D",
        "#1ABC9C", "#FF5733", "#D35400", "#27AE60", "#3498DB", "#E74C3C", "#9B59B6",
        "#E67E22", "#2980B9", "#2C3E50", "#F39C12", "#3498DB", "#9B59B6", "#E67E22",
        "#2980B9", "#2C3E50"
    ];

    let townColorMap = {};
    towns.forEach(function (town, index) {
        townColorMap[town] = colors[index];
    });

    // Compute the position of each group on the pie:
    const pie = d3.pie()
        .sort(null) // Do not sort group by size
        .value(d => d[1])
    const data_ready = pie(dataArray)


    // The arc generator
    const arc = d3.arc()
        .innerRadius(radius * 0.5)         // This is the size of the donut hole
        .outerRadius(radius * 0.8)



    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
        .selectAll('allSlices')
        .data(data_ready)
        .join('path')
        .attr('d', arc)
        .attr('fill', d => townColorMap[d.data[0]])
        .attr("stroke", "white")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut);

    function handleMouseOver(event, d) {

        // Display the value on hover
        d3.select(".living-facilities-svg5-tooltip")
            .html(` ${d.data[0]} ${d.data[1]}`)

            .style("left", `${event.layerX + 10}px`)
            .style("top", `${event.layerY + 10}px`)
            .style("position", "absolute")
            .style("padding", "5px")
            .style("font-size", "20px")
            .style("background-color", "#D0D0D0")
            .style("border-radius", "10px")
            .style("opacity", 1);

        // Highlight the pie slice
        d3.select(this)
            .transition()
            .duration(200)
            // Increase outer radius for highlighting
            .attr("d", d3.arc().innerRadius(radius * 0.5).outerRadius(radius * 0.9));

        // Darken the pie slice color
        d3.select(this)
            .attr("fill", d => d3.color(townColorMap[d.data[0]]).darker(2));
    }

    function handleMouseOut(event, d) {
        // Remove the value on mouseout
        d3.select(".living-facilities-svg5-tooltip").style("opacity", 0);
        // tooltip.transition().duration(500).style("opacity", 0);
        // Remove highlight from the pie slice
        d3.select(this)
            .transition()
            .duration(200)
            .attr("d", arc); // Reset to original arc

        // Reset the pie slice color
        d3.select(this)
            .attr("fill", d => townColorMap[d.data[0]]);
    }
}

function renderDonutChartDraggableSlider(csvData, inputyear) {

    const svgContainer = d3.select("#svg5");
    const width = svgContainer.style("width").slice(0, -2);
    const height = svgContainer.style("height").slice(0, -2);
    const widthMarginLeft = 290;
    const widthMarginRight = 20;
    const heightMargin = 120;

    svgContainer.selectAll("div")
        .remove();

    svgContainer.selectAll("svg")
        .remove();

    svgContainer.selectAll("text")
        .remove();
    // Add a title to the graph
    svgContainer.append("text")
        .attr("class", "graph-title")
        .attr("x", width / 2)
        .attr("y", 20) // Adjust the y-coordinate to position the title
        // .attr("text-anchor", "middle")
        .style("font-size", "24px")
        .style("font-weight", "bold")
        .text(`臺灣縣市  民國 : ${inputyear}年`)

    const svg = svgContainer.append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

    const tooltip = svgContainer.append("div")
        .attr("class", "living-facilities-svg5-tooltip");
    // Step 1: Group data by "縣市" and "場館啟用年"
    const groupedData = csvData.reduce((acc, current) => {
        const city = current.縣市;
        const year = current.場館啟用年;

        // If the city key doesn't exist in the accumulator, create an empty object
        if (!acc[city]) {
            acc[city] = {};
        }

        // If the year key doesn't exist in the city object, create an empty array
        if (!acc[city][year]) {
            acc[city][year] = [];
        }

        // Push the current data object to the corresponding year array
        acc[city][year].push(current);

        return acc;
    }, {});







    // Step 2: Calculate the total number of objects for each combination of "縣市" and "場館啟用年"
    const totalObjectsData = Object.keys(groupedData).map(city => {
        // console.log(city);
        let sum = 0;
        let i = 0;
        let n = Object.keys(groupedData[city]).length

        return Object.keys(groupedData[city]).map(year => {
            if (year <= inputyear) {
                sum += groupedData[city][year].length;
                // console.log(sum);

            }
            const totalObjects = sum;
            i++;

            if (i == n) {
                return { city, year, totalObjects };
            }



        }).filter(Boolean);;
    }).flat();

    const plotData = totalObjectsData
        .filter(function (d) { return d !== undefined; })
        .map(function (d) {
            return {
                city: d.city,
                year: +d.year,
                totalObjects: d.totalObjects
            }
        });

    const transformedData = {};
    const domainCity = [];

    totalObjectsData.forEach(item => {
        transformedData[item.city] = item.totalObjects;
        domainCity.push(item.city);
    });

    const radius = Math.min(width * 0.9, height * 0.9) / 2;
    // Create dummy data
    const data = transformedData;
    // Convert data object to an array of objects
    const dataArray = Object.entries(data);

    // Sort the data array based on values in descending order
    dataArray.sort((a, b) => b[1] - a[1]);

    const cities = Array.from(new Set(plotData.map(function (d) { return d.city; })));

    const colors = [
        "#FF5733", "#3498DB", "#2ECC71", "#F39C12", "#8E44AD", "#E74C3C", "#16A085",
        "#D35400", "#1ABC9C", "#F1C40F", "#34495E", "#FFC300", "#3498DB", "#27AE60",
        "#E74C3C", "#9B59B6", "#E67E22", "#2980B9", "#2C3E50", "#F39C12", "#7F8C8D",
        "#1ABC9C", "#FF5733", "#D35400", "#27AE60", "#3498DB", "#E74C3C", "#9B59B6",
        "#E67E22", "#2980B9", "#2C3E50", "#F39C12", "#3498DB", "#9B59B6", "#E67E22",
        "#2980B9", "#2C3E50"
    ];

    let cityColorMap = {};
    cities.forEach(function (city, index) {
        cityColorMap[city] = colors[index];
    });

    // Compute the position of each group on the pie:
    const pie = d3.pie()
        .sort(null) // Do not sort group by size
        .value(d => d[1])
    const data_ready = pie(dataArray)


    // The arc generator
    const arc = d3.arc()
        .innerRadius(radius * 0.5)         // This is the size of the donut hole
        .outerRadius(radius * 0.8)

    // Another arc that won't be drawn. Just for labels positioning
    const outerArc = d3.arc()
        .innerRadius(radius * 0.9)
        .outerRadius(radius * 0.9)

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
        .selectAll('allSlices')
        .data(data_ready)
        .join('path')
        .attr('d', arc)
        .attr('fill', d => cityColorMap[d.data[0]])
        .attr("stroke", "white")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut);

    function handleMouseOver(event, d) {

        // Display the value on hover
        d3.select(".living-facilities-svg5-tooltip")
            .html(` ${d.data[0]} ${d.data[1]}`)

            .style("left", `${event.layerX + 10}px`)
            .style("top", `${event.layerY + 10}px`)
            .style("position", "absolute")
            .style("padding", "5px")
            .style("font-size", "20px")
            .style("background-color", "#D0D0D0")
            .style("border-radius", "10px")
            .style("opacity", 1);

        // Highlight the pie slice
        d3.select(this)
            .transition()
            .duration(200)
            // Increase outer radius for highlighting
            .attr("d", d3.arc().innerRadius(radius * 0.5).outerRadius(radius * 0.9));

        // Darken the pie slice color
        d3.select(this)
            .attr("fill", d => d3.color(cityColorMap[d.data[0]]).darker(2));
    }

    function handleMouseOut(event, d) {
        // Remove the value on mouseout
        d3.select(".living-facilities-svg5-tooltip").style("opacity", 0);
        // tooltip.transition().duration(500).style("opacity", 0);
        // Remove highlight from the pie slice
        d3.select(this)
            .transition()
            .duration(200)
            .attr("d", arc); // Reset to original arc

        // Reset the pie slice color
        d3.select(this)
            .attr("fill", d => cityColorMap[d.data[0]]);
    }
}
