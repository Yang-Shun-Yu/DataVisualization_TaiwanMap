function renderLivingFacilitiesMapData(g, projectMethod) {
    const url = "https://raw.githubusercontent.com/Yang-Shun-Yu/Data-Visualization-Project/master/FinalProject/%E5%85%A8%E5%9C%8B%E9%81%8B%E5%8B%95%E5%A0%B4%E9%A4%A8%E8%B3%87%E8%A8%8A.csv";
    d3.csv(url)
        .then(function (csvData) {
            g.selectAll("circle")
                .data(csvData)
                .enter()
                .append("circle")
                .attr("cx", function (d) { return projectMethod([+d["經度"], +d["緯度"]])[0]; })
                .attr("cy", function (d) { return projectMethod([+d["經度"], +d["緯度"]])[1]; })
                .attr("r", 0.3)
                .attr("class", "circle")
                .append("title")
                .text(function (d) { return d["場館名稱"]; });
        })
}

function renderLivingFacilities() {
    const url = "https://raw.githubusercontent.com/Yang-Shun-Yu/Data-Visualization-Project/master/FinalProject/%E5%85%A8%E5%9C%8B%E9%81%8B%E5%8B%95%E5%A0%B4%E9%A4%A8%E8%B3%87%E8%A8%8A.csv";
    d3.csv(url)
        .then(function (csvData) {
            renderLivingFacilitiesChart1(csvData);
            renderLivingFacilitiesChart2(csvData);
        });
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
        .attr("id", "living-facilities-svg1-tooltip")
        .attr("class", "living-facilities-tooltip");

    svgContainer.selectAll("svg")
        .remove();
    const svg = svgContainer.append("svg")
        .attr("width", width)
        .attr("height", height);

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
            d3.select("#living-facilities-svg1-tooltip")
                .html(`city: ${d.city}, year: ${d.year}, number: ${d.totalObjects}`)
                .style("left", `${event.layerX + 10}px`)
                .style("top", `${event.layerY + 10}px`)
                .style("position", "absolute")
                .style("padding", "5px")
                .style("font-size", "10px")
                .style("background-color", "#D0D0D0")
                .style("border-radius", "10px")
                .style("opacity", 1);
        }

        function handleMouseOut(event, d) {
            d3.select(this)
                .transition()
                .duration(200)
                .attr("r", 4);
            d3.select("#living-facilities-svg1-tooltip")
                .style("opacity", 0);

        }
    });
}

function renderLivingFacilitiesChart2(csvData) {
    const svgContainer = d3.select("#svg2");
    const width = svgContainer.style("width").slice(0, -2);
    const height = svgContainer.style("height").slice(0, -2);
    const widthMargin = 40;
    const heightMargin = 40;

    svgContainer.selectAll("div")
        .remove();
    const tooltip = svgContainer.append("div")
        .attr("id", "living-facilities-svg2-tooltip")
        .attr("class", "living-facilities-tooltip");

    svgContainer.selectAll("svg")
        .remove();
    const svg = svgContainer.append("svg")
        .attr("width", width)
        .attr("height", height);

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
        let i = 0;
        let n = Object.keys(groupedData[city]).length
        return Object.keys(groupedData[city]).map(function (year) {
            sum += groupedData[city][year].length;
            const totalObjects = sum;
            i++;
            if (i == n) {
                return { city, year, totalObjects };
            }
        }).filter(Boolean);
    }).flat();

    const transformedData = {};
    const domainCity = [];
    totalObjectsData.forEach(function (item) {
        transformedData[item.city] = item.totalObjects;
        domainCity.push(item.city);
    });

    const radius = 100;
    const data = transformedData;
    const dataArray = Object.entries(data);

    dataArray.sort(function (a, b) { return b[1] - a[1]; });
    console.log(dataArray);

    const customColors = [
        "#FF5733", "#3498DB", "#2ECC71", "#F39C12", "#8E44AD", "#E74C3C", "#16A085",
        "#D35400", "#1ABC9C", "#F1C40F", "#34495E", "#FFC300", "#3498DB", "#27AE60",
        "#E74C3C", "#9B59B6", "#E67E22", "#2980B9", "#2C3E50", "#F39C12", "#7F8C8D",
        "#1ABC9C", "#FF5733", "#D35400", "#27AE60", "#3498DB", "#E74C3C", "#9B59B6",
        "#E67E22", "#2980B9", "#2C3E50", "#F39C12", "#3498DB", "#9B59B6", "#E67E22",
        "#2980B9", "#2C3E50"
    ];

    let cityColorMap = {};
    dataArray.forEach(function (d, index) {
        cityColorMap[d[0]] = customColors[index];
    });

    const pie = d3.pie()
        .sort(null)
        .value(d => d[1])
    const data_ready = pie(dataArray)

    const arc = d3.arc()
        .innerRadius(radius * 0.5)
        .outerRadius(radius * 0.8)
    const outerArc = d3.arc()
        .innerRadius(radius * 0.5)
        .outerRadius(radius * 0.9)

    svg.selectAll('allSlices')
        .data(data_ready)
        .join('path')
        .attr('d', arc)
        .attr("transform", `translate(${width / 2}, ${height / 2}) rotate(0)`)
        .attr("fill", d => d3.color(cityColorMap[d.data[0]]))
        .attr("stroke", "white")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut);

    function handleMouseOver(event, d) {
        d3.select("#living-facilities-svg2-tooltip")
            .html(` ${d.data[0]} ${d.data[1]}`)
            .style("left", `${event.layerX + 10}px`)
            .style("top", `${event.layerY + 10}px`)
            .style("position", "absolute")
            .style("padding", "5px")
            .style("font-size", "10px")
            .style("background-color", "#D0D0D0")
            .style("border-radius", "10px")
            .style("opacity", 1);

        d3.select(this)
            .transition()
            .duration(200)
            .attr("d", outerArc);

        d3.select(this)
            .attr("fill", d => d3.color(cityColorMap[d.data[0]]).darker(2));
    }

    function handleMouseOut(event, d) {
        d3.select("#living-facilities-svg2-tooltip")
            .style("opacity", 0);
        d3.select(this)
            .transition()
            .duration(200)
            .attr("d", arc);

        // d3.select(this)
        //     .attr("fill", "#FFCC02");

        d3.select(this)
            .attr("fill", d => d3.color(cityColorMap[d.data[0]]));
    }
}