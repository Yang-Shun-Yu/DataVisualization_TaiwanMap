let Population = {
    url: "https://raw.githubusercontent.com/Yang-Shun-Yu/DataVisualization_TaiwanMap/main/dataset/population.json",
    renderMapData: function (g, projectMethod) {
        let year = 2020;
        let temp = {
            "臺北市": 271.79,
            "嘉義市": 60.02,
            "新竹市": 104.15,
            "基隆市": 132.75,
            "新北市": 2052.56,
            "桃園市": 1220.95,
            "臺中市": 2214.89,
            "彰化縣": 1074.39,
            "金門縣": 151.65,
            "高雄市": 2951.85,
            "澎湖縣": 126.86,
            "臺南市": 2191.65,
            "雲林縣": 1290.83,
            "連江縣": 28.80,
            "新竹縣": 1427.53,
            "苗栗縣": 1820.31,
            "屏東縣": 2775.60,
            "嘉義縣": 1903.63,
            "宜蘭縣": 2143.62,
            "南投縣": 4106.43,
            "花蓮縣": 4628.57,
            "臺東縣": 3515.25
        };
        let temp2 = [100, 200, 500, 1000, 2000, 5000, 8000, 10000];
        let colors = [
            "#FF8040",
            "#FF5809",
            "#F75000",
            "#D94600",
            "#BB3D00",
            "#A23400",
            "#842B00",
            "#642100"
        ];
        d3.json(Population.url)
            .then(function (jsonData) {
                for (let i in temp) {
                    const countyName = i;
                    const population = jsonData[year][countyName]["grand-total"]["total"];
                    const area = temp[countyName];
                    const density = population / area;
                    console.log(countyName, population / area);

                    for (let j = 0; j < temp2.length; j++) {
                        if (density < temp2[j]) {
                            g.select(`#${countyName}`)
                                .attr("fill", colors[j]);
                            break;
                        }
                    }

                }
            });


        // for (let i = yearDomain[0]; i < yearDomain[1]; i++) {


        //     lines[0].data.push({ year: i, title: "0~14 years old", value: sums[0] / total * 100 });
        //     lines[1].data.push({ year: i, title: "15~64 years old", value: sums[1] / total * 100 });
        //     lines[2].data.push({ year: i, title: "64~ years old", value: sums[2] / total * 100 });
        //     lines[3].data.push({ year: i, title: "dependency ratio", value:  });
        // }

    },
    render: function () {
        d3.json(Population.url)
            .then(function (jsonData) {
                Population.renderChart1(jsonData, "臺北市");
                Population.renderChart2(jsonData, "臺北市", 2001);
                Population.renderSelection(jsonData);
            });
    },
    renderSelection: function (jsonData) {
        const svgContainer = d3.select("#svg4");

        svgContainer.selectAll("rect")
            .remove();
        svgContainer.selectAll("svg")
            .remove();
        svgContainer.selectAll("div")
            .remove();
        svgContainer.selectAll("select")
            .remove();
        svgContainer.selectAll("button")
            .remove();
        const textSelection = d3.select("#svg4")
            .append("div")
            .append("text")
            .attr("class", "text-above-selection")
            .attr("text-anchor", "middle")
            .text("Select a County");
        console.log("aaaaaaaaaaaaa");

        let temp = {
            "臺北市": 271.79,
            "嘉義市": 60.02,
            "新竹市": 104.15,
            "基隆市": 132.75,
            "新北市": 2052.56,
            "桃園市": 1220.95,
            "臺中市": 2214.89,
            "彰化縣": 1074.39,
            "金門縣": 151.65,
            "高雄市": 2951.85,
            "澎湖縣": 126.86,
            "臺南市": 2191.65,
            "雲林縣": 1290.83,
            "連江縣": 28.80,
            "新竹縣": 1427.53,
            "苗栗縣": 1820.31,
            "屏東縣": 2775.60,
            "嘉義縣": 1903.63,
            "宜蘭縣": 2143.62,
            "南投縣": 4106.43,
            "花蓮縣": 4628.57,
            "臺東縣": 3515.25
        };

        // Create two <select> elements and append them to the body
        const countySelect = d3.select("#svg4")
            .append("select")
            .attr("id", "countySelect")
            .on("change", function () {
                const county = d3.select(this)
                    .property("value");
                Population.renderChart1(jsonData, county);
                Population.renderChart2(jsonData, county, 2001);
            });

        // countySelect.append("option")
        //     .attr("value", `縣市`)
        //     .text(`縣市`)
        //     .attr("selected", true);

        for (let c in temp) {
            countySelect.append("option")
                .attr("value", `${c}`)
                .text(`${c}`);
            // .attr("selected", true);
        }
        // Set default values for the <select> elements

    },
    renderChart1: function (jsonData, county) {
        const svgContainer = d3.select("#svg1");
        const width = svgContainer.style("width").slice(0, -2);
        const height = svgContainer.style("height").slice(0, -2);
        const widthMargin = 40;
        const heightMargin = 40;

        svgContainer.selectAll("div")
            .remove();
        const tooltip = svgContainer.append("div")
            .style("opacity", 0.0)
            .style("left", "0px")
            .style("top", "0px");

        svgContainer.selectAll("svg")
            .remove();
        const svg = svgContainer.append("svg")
            .attr("width", width)
            .attr("height", height);

        const yearDomain = [2000, 2020];
        const percentageDomain = [0, 80];

        const xScale = d3.scaleLinear()
            .domain(yearDomain)
            .range([0, width - widthMargin * 2]);
        svg.append("g")
            .attr("transform", `translate(${widthMargin}, ${height - heightMargin})`)
            .call(d3.axisBottom(xScale));

        const yScale = d3.scaleLinear()
            .domain(percentageDomain)
            .range([height - heightMargin * 2, 0]);
        svg.append("g")
            .attr("transform", `translate(${widthMargin}, ${heightMargin})`)
            .call(d3.axisLeft(yScale));

        const yScale2 = d3.scaleLinear()
            .domain([0, 10])
            .range([height - heightMargin * 2, 0]);
        svg.append("g")
            .attr("transform", `translate(${width - widthMargin}, ${heightMargin})`)
            .call(d3.axisRight(yScale2));

        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("transform", `translate(${width / 2}, ${height - heightMargin + 30}) rotate(0)`)
            .text("year");

        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("transform", `translate(${15}, ${height / 2}) rotate(270)`)
            .text("population(%) / dependency ratio(%)");

        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("transform", `translate(${width - 15}, ${height / 2}) rotate(270)`)
            .text("population density(1000person/km2)");

        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("font-size", "14px")
            .attr("transform", `translate(${width / 2}, ${heightMargin - 10}) rotate(0)`)
            .text("Population / Dependency Ratio");

        let temp = {
            "臺北市": 271.79,
            "嘉義市": 60.02,
            "新竹市": 104.15,
            "基隆市": 132.75,
            "新北市": 2052.56,
            "桃園市": 1220.95,
            "臺中市": 2214.89,
            "彰化縣": 1074.39,
            "金門縣": 151.65,
            "高雄市": 2951.85,
            "澎湖縣": 126.86,
            "臺南市": 2191.65,
            "雲林縣": 1290.83,
            "連江縣": 28.80,
            "新竹縣": 1427.53,
            "苗栗縣": 1820.31,
            "屏東縣": 2775.60,
            "嘉義縣": 1903.63,
            "宜蘭縣": 2143.62,
            "南投縣": 4106.43,
            "花蓮縣": 4628.57,
            "臺東縣": 3515.25
        };

        let lines = [
            {
                title: "0~14 years old",
                data: [],
                color: "#AE8F00"
            },
            {
                title: "15~64 years old",
                data: [],
                color: "#004B97"
            },
            {
                title: ">65 years old",
                data: [],
                color: "#019858"
            },
            {
                title: "dependency ratio",
                data: [],
                color: "#CE0000"
            },
            {
                title: "population density",
                data: [],
                color: "#AE00AE"
            }
        ];

        for (let i = yearDomain[0]; i < yearDomain[1]; i++) {
            let sums = [0, 0, 0];
            let total = jsonData[i][county]["grand-total"]["total"];
            for (let j = 0; j < 3; j++) {
                sums[0] += jsonData[i][county]["total"]["total"][j];
            }
            for (let j = 4; j < 13; j++) {
                sums[1] += jsonData[i][county]["total"]["total"][j];
            }
            for (let j = 13; j < jsonData[i][county]["total"]["total"].length; j++) {
                sums[2] += jsonData[i][county]["total"]["total"][j];
            }

            lines[0].data.push({ year: i, title: "0~14 years old", value: sums[0] / total * 100 });
            lines[1].data.push({ year: i, title: "15~64 years old", value: sums[1] / total * 100 });
            lines[2].data.push({ year: i, title: "64~ years old", value: sums[2] / total * 100 });
            lines[3].data.push({ year: i, title: "dependency ratio", value: (sums[0] + sums[2]) / sums[1] * 100 });
            lines[4].data.push({ year: i, title: "population density", value: total / temp[county] / 1000 });
        }

        for (let i = 0; i < lines.length; i++) {
            svg.append("path")
                .datum(lines[i].data)
                .attr("d", d3.line()
                    .x(function (d) { return xScale(d.year) + widthMargin; })
                    .y(function (d) { return ((i < 4) ? yScale(d.value) : yScale2(d.value)) + heightMargin; })
                )
                .attr("fill", "none")
                .attr("stroke", lines[i].color)
                .attr("stroke-width", 2.0)
                .attr("opacity", 0.0)
                .transition()
                .duration(2000)
                .delay(i * 500)
                .attr("opacity", 1.0);

            svg.append("g")
                .selectAll("dot")
                .data(lines[i].data)
                .join("circle")
                .attr("cx", function (d) { return xScale(d.year) + widthMargin; })
                .attr("cy", function (d) { return ((i < 4) ? yScale(d.value) : yScale2(d.value)) + heightMargin; })
                .attr("r", 4.0)
                .attr("fill", lines[i].color)
                .attr("opacity", 0.0)
                .on("mouseover", function (event, d) {
                    d3.select(this)
                        .transition()
                        .duration(500)
                        .attr("r", 8.0);
                    tooltip
                        .html(`year: ${d.year}, title: ${d.title}, value: ${Math.round(d.value * 100) / 100}${(i < 4) ? "(%)" : "(1000 person/km2)"}`)
                        .style("left", `${event.layerX + 10}px`)
                        .style("top", `${event.layerY + 10}px`)
                        .style("position", "absolute")
                        .style("padding", "5px")
                        .style("font-size", "10px")
                        .style("background-color", "#D0D0D0")
                        .style("border-radius", "10px");
                    tooltip
                        .transition()
                        .duration(500)
                        .style("opacity", 1.0);
                })
                .on("mouseout", function (event, d) {
                    d3.select(this)
                        .transition()
                        .duration(500)
                        .attr("r", 4.0);
                    tooltip
                        .transition()
                        .duration(500)
                        .style("opacity", 0.0);
                    tooltip
                        .transition()
                        .duration(0)
                        .delay(500)
                        .style("left", "0px")
                        .style("top", "0px");
                })
                .transition()
                .duration(2000)
                .delay(i * 500)
                .attr("opacity", 1.0);
        }
    },
    renderChart2: function (jsonData, county, year) {
        const svgContainer = d3.select("#svg5");
        const width = svgContainer.style("width").slice(0, -2);
        const height = svgContainer.style("height").slice(0, -2);
        const widthMargin = 40;
        const heightMargin = 40;

        svgContainer.selectAll("rect")
            .remove();
        const tooltip = svgContainer.append("div")
            .style("opacity", 0.0)
            .style("left", "0px")
            .style("top", "0px");

        svgContainer.selectAll("svg")
            .remove();
        const svg = svgContainer.append("svg")
            .attr("width", width)
            .attr("height", height);

        const ageDomain1 = ["00 -", "05 -", "10 -", "15 -", "20 -", "25 -", "30 -", "35 - ", "40 - ", "45 - ", "50 - ", "55 - ", "60 - ", "65 - ", "70 - ", "75 - ", "> 80 "];
        const ageDomain2 = ["04", "09", "14", "19", "24", "29", "34", "39", "44", "49", "54", "59", "64", "69", "74", "79", " "];
        const yearDomain = [2000, 2020];
        const percentageDomain1 = [12, 0];
        const percentageDomain2 = [0, 12];
        const offset = 25;

        for (let i = yearDomain[0]; i < yearDomain[1]; i++) {
            svg.append("text")
                .attr("stroke", (i == year) ? "#AE8F00" : "none")
                .attr("text-anchor", "left")
                .attr("font-size", "8px")
                .attr("transform", `translate(${width / 20 * (i - 2000)}, ${heightMargin - 25}) rotate(0)`)
                .text(`${i}`)
                .on("mouseover", function (event, d) {
                    if (d3.select(this).style("stroke") == "none") {
                        Population.renderChart2(jsonData, county, i);
                    }
                });
        }

        const xScale1 = d3.scaleLinear()
            .domain(percentageDomain1)
            .range([0, (width - (widthMargin + offset) * 2) / 2]);
        svg.append("g")
            .attr("transform", `translate(${widthMargin}, ${height - heightMargin})`)
            .call(d3.axisBottom(xScale1));
        const xScale2 = d3.scaleLinear()
            .domain(percentageDomain2)
            .range([0, (width - (widthMargin + offset) * 2) / 2]);
        svg.append("g")
            .attr("transform", `translate(${width / 2 + offset}, ${height - heightMargin})`)
            .call(d3.axisBottom(xScale2));

        const yScale1 = d3.scaleBand()
            .domain(ageDomain1)
            .range([height - heightMargin * 2, 0]);
        const yScale2 = d3.scaleBand()
            .domain(ageDomain2)
            .range([height - heightMargin * 2, 0]);
        svg.append("g")
            .attr("transform", `translate(${width / 2 - offset}, ${heightMargin})`)
            .call(d3.axisRight(yScale1));
        svg.append("g")
            .attr("transform", `translate(${width / 2 + offset}, ${heightMargin})`)
            .call(d3.axisLeft(yScale2));

        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("transform", `translate(${width / 2}, ${height - 10}) rotate(0)`)
            .text("population(%)");

        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("transform", `translate(${width / 2}, ${heightMargin - 10}) rotate(0)`)
            .text("age");



        const maleTotal = jsonData[year][county]["grand-total"]["male"];
        const femaleTotal = jsonData[year][county]["grand-total"]["female"];
        for (let i = 0; i < 17; i++) {
            const male = jsonData[year][county]["total"]["male"][i];
            const female = jsonData[year][county]["total"]["female"][i];
            svg.append("rect")
                .attr("fill", "#004B97")
                .attr("x", width / 2 - offset)
                .attr("y", yScale1(ageDomain1[i]))
                .attr("width", 0)
                .attr("height", yScale1.bandwidth() - 2)
                .attr("transform", `translate(${0}, ${heightMargin})`)
                .on("mouseover", function (event, d) {
                    d3.select(this)
                        .transition()
                        .style("fill", "#66B3FF");
                    tooltip
                        .html(`year: ${year}, range: ${i * 5}-${i * 5 + 4} years old, value: ${Math.round(female / femaleTotal * 10000) / 100}%`)
                        .style("left", `${event.layerX + 10}px`)
                        .style("top", `${event.layerY + 10}px`)
                        .style("position", "absolute")
                        .style("padding", "5px")
                        .style("font-size", "10px")
                        .style("background-color", "#D0D0D0")
                        .style("border-radius", "10px");
                    tooltip
                        .transition()
                        .duration(500)
                        .style("opacity", 1.0);
                })
                .on("mouseout", function (event, d) {
                    d3.select(this)
                        .transition()
                        .style("fill", "#004B97");
                    tooltip
                        .transition()
                        .duration(500)
                        .style("opacity", 0.0);
                    tooltip
                        .transition()
                        .duration(0)
                        .delay(500)
                        .style("left", "0px")
                        .style("top", "0px");
                })
                .transition()
                .duration(4000 - i * 200)
                .attr("x", width / 2 - offset - (xScale1(0) - xScale1(male / maleTotal * 100)))
                .attr("y", yScale1(ageDomain1[i]))
                .attr("width", xScale1(0) - xScale1(male / maleTotal * 100))
                .attr("height", yScale1.bandwidth() - 2);

            svg.append("rect")
                .attr("fill", "#BF0060")
                .attr("x", xScale2(0))
                .attr("y", yScale2(ageDomain2[i]))
                .attr("width", 0)
                .attr("height", yScale2.bandwidth() - 2)
                .attr("transform", `translate(${width / 2 + offset}, ${heightMargin})`)
                .on("mouseover", function (event, d) {
                    d3.select(this)
                        .transition()
                        .style("fill", "#FF79BC");
                    tooltip
                        .html(`year: ${year}, range: ${i * 5}-${i * 5 + 4} years old, value: ${Math.round(female / femaleTotal * 10000) / 100}%`)
                        .style("left", `${event.layerX + 10}px`)
                        .style("top", `${event.layerY + 10}px`)
                        .style("position", "absolute")
                        .style("padding", "5px")
                        .style("font-size", "10px")
                        .style("background-color", "#D0D0D0")
                        .style("border-radius", "10px");
                    tooltip
                        .transition()
                        .duration(500)
                        .style("opacity", 1.0);
                })
                .on("mouseout", function (event, d) {
                    d3.select(this)
                        .transition()
                        .style("fill", "#BF0060");
                    tooltip
                        .transition()
                        .duration(500)
                        .style("opacity", 0.0);
                    tooltip
                        .transition()
                        .duration(0)
                        .delay(500)
                        .style("left", "0px")
                        .style("top", "0px");
                })
                .transition()
                .duration(4000 - i * 200)
                .attr("x", xScale2(0))
                .attr("y", yScale2(ageDomain2[i]))
                .attr("width", xScale2(female / femaleTotal * 100) - xScale2(0))
                .attr("height", yScale2.bandwidth() - 2);
        }
    },
    renderChart3: function (jsonData, year) {
        const svgContainer = d3.select("#svg4");
        const width = svgContainer.style("width").slice(0, -2);
        const height = svgContainer.style("height").slice(0, -2);
        const widthMargin = 40;
        const heightMargin = 40;

        svgContainer.selectAll("div")
            .remove();
        const tooltip = svgContainer.append("div")
            .style("opacity", 0.0)
            .style("left", "0px")
            .style("top", "0px");

        svgContainer.selectAll("svg")
            .remove();
        const svg = svgContainer.append("svg")
            .attr("width", width)
            .attr("height", height);

        const yearDomain = [2000, 2020];

        for (let i = yearDomain[0]; i < yearDomain[1]; i++) {
            svg.append("text")
                .attr("stroke", (i == year) ? "#AE8F00" : "none")
                .attr("text-anchor", "left")
                .attr("font-size", "8px")
                .attr("transform", `translate(${width / 20 * (i - 2000)}, ${heightMargin - 25}) rotate(0)`)
                .text(`${i}`)
                .on("mouseover", function (event, d) {
                    if (d3.select(this).style("stroke") == "none") {
                        Population.renderChart3(jsonData, i);
                    }
                });
        }

        let data = {};
        let dataKeys = [];
        for (let key in jsonData[year]) {
            if (key == "總計") {
                continue;
            }
            data[key] = jsonData[year][key]["grand-total"]["total"];
            dataKeys.push(key);
        }

        const radius = d3.min([height - heightMargin * 2, width - widthMargin * 2]) / 2;
        const colors = d3.scaleOrdinal()
            .domain(dataKeys)
            .range(d3.schemeDark2);
        const pie = d3.pie()
            .sort(null)
            .value(function (d) { return d[1]; })
        const pieData = pie(Object.entries(data))
        const arc = d3.arc()
            .innerRadius(radius * 0.5)
            .outerRadius(radius * 0.8)
        const initArc = d3.arc()
            .innerRadius(0.1)
            .outerRadius(0.4);
        const focusArc = d3.arc()
            .innerRadius(radius * 0.5)
            .outerRadius(radius * 1.0)

        let i = 0;
        svg.selectAll("arc")
            .data(pieData)
            .join("path")
            .attr("d", initArc)
            .attr("transform", `translate(${width / 2}, ${height / 2}) rotate(0)`)
            .attr("fill", function (d) { return colors(d.data[1]); })
            .attr("stroke", "#FFFFFF")
            .style("stroke-width", "2px")
            .on("mouseover", function (event, d) {
                d3.select(this)
                    .transition()
                    .duration(500)
                    .attr("d", focusArc);
                tooltip
                    .html(`year: ${year}, city: ${d.data[0]}, people: ${d.data[1]}`)
                    .style("left", `${event.layerX + 10}px`)
                    .style("top", `${event.layerY + 10}px`)
                    .style("position", "absolute")
                    .style("padding", "5px")
                    .style("font-size", "10px")
                    .style("background-color", "#D0D0D0")
                    .style("border-radius", "10px");
                tooltip
                    .transition()
                    .duration(500)
                    .style("opacity", 1.0);
            })
            .on("mouseout", function (event, d) {
                d3.select(this)
                    .transition()
                    .duration(500)
                    .attr("d", arc);
                tooltip
                    .transition()
                    .duration(500)
                    .style("opacity", 0.0);
                tooltip
                    .transition()
                    .duration(0)
                    .delay(500)
                    .style("left", "0px")
                    .style("top", "0px");
            })
            .transition()
            .duration(2000)
            .delay(function (d) { return (i++) * 50; })
            .attr("d", arc);
    }
}


// function renderPopulationMapData(g, projectMethod) {
//     const populationUrl = "https://raw.githubusercontent.com/Yang-Shun-Yu/DataVisualization_TaiwanMap/main/dataset/population.json";
//     // d3.json(populationUrl)
//     //     .then(function (jsonData) {
//     //         d3.selectAll()
//     //     });
// }

// function renderPopulation() {
//     const populationUrl = "https://raw.githubusercontent.com/Yang-Shun-Yu/DataVisualization_TaiwanMap/main/dataset/population.json";
//     d3.json(populationUrl)
//         .then(function (jsonData) {
//             renderPopulationChart1(jsonData);
//             renderPopulationChart2(jsonData, 2000);
//             renderPopulationChart4(jsonData, 2000);
//         });
// }

// function renderPopulationChart1(jsonData) {
//     const svgContainer = d3.select("#svg1");
//     const width = svgContainer.style("width").slice(0, -2);
//     const height = svgContainer.style("height").slice(0, -2);
//     const widthMargin = 40;
//     const heightMargin = 40;

//     // remove old svg
//     svgContainer.selectAll("svg")
//         .remove();

//     const svg = svgContainer.append("svg")
//         .attr("width", width)
//         .attr("height", height);

//     const yearDomain = [2000, 2020];
//     const percentageDomain = [0, 100];

//     // add x-axis
//     const xScale = d3.scaleLinear()
//         .domain(yearDomain)
//         .range([0, width - widthMargin * 2]);
//     svg.append("g")
//         .attr("transform", `translate(${widthMargin}, ${height - heightMargin})`)
//         .call(d3.axisBottom(xScale));

//     // add y-axis
//     const yScale = d3.scaleLinear()
//         .domain(percentageDomain)
//         .range([height - heightMargin * 2, 0]);
//     svg.append("g")
//         .attr("transform", `translate(${widthMargin}, ${heightMargin})`)
//         .call(d3.axisLeft(yScale));

//     // add axis titles
//     svg.append("text")
//         .attr("class", "svg1-axis-title")
//         .attr("transform", `translate(${width / 2}, ${height - heightMargin + 30}) rotate(0)`)
//         .text("year");

//     svg.append("text")
//         .attr("class", "svg1-axis-title")
//         .attr("transform", `translate(15, ${height / 2}) rotate(270)`)
//         .text("population(%)");

//     let line1 = [], line2 = [], line3 = [];
//     for (let i = yearDomain[0]; i <= yearDomain[1]; i++) {
//         let sum1 = 0, sum2 = 0, sum3 = 0;
//         let total = jsonData[i]["總計"]["grand-total"]["total"];
//         for (let j = 0; j < 3; j++) {
//             sum1 += jsonData[i]["總計"]["total"]["total"][j];
//         }
//         for (let j = 4; j < 13; j++) {
//             sum2 += jsonData[i]["總計"]["total"]["total"][j];
//         }
//         for (let j = 13; j < jsonData[i]["總計"]["total"]["total"].length; j++) {
//             sum3 += jsonData[i]["總計"]["total"]["total"][j];
//         }
//         line1.push([i, sum1 / total * 100]);
//         line2.push([i, sum2 / total * 100]);
//         line3.push([i, sum3 / total * 100]);
//     }

//     // Add the lines
//     svg.append("path")
//         .datum(line1)
//         .attr("class", "svg1-line svg1-line-color1")
//         .attr("d", d3.line()
//             .x(function (d) { return xScale(d[0]) + widthMargin; })
//             .y(function (d) { return yScale(d[1]) + heightMargin; })
//         );

//     svg.append("path")
//         .datum(line2)
//         .attr("class", "svg1-line svg1-line-color2")
//         .attr("d", d3.line()
//             .x(function (d) { return xScale(d[0]) + widthMargin; })
//             .y(function (d) { return yScale(d[1]) + heightMargin; })
//         );

//     svg.append("path")
//         .datum(line3)
//         .attr("class", "svg1-line svg1-line-color3")
//         .attr("d", d3.line()
//             .x(function (d) { return xScale(d[0]) + widthMargin; })
//             .y(function (d) { return yScale(d[1]) + heightMargin; })
//         );
// }

// function renderPopulationChart2(jsonData, year) {
//     const svgContainer = d3.select("#svg2");
//     const width = svgContainer.style("width").slice(0, -2);
//     const height = svgContainer.style("height").slice(0, -2);
//     const widthMargin = 40;
//     const heightMargin = 40;

//     svgContainer.selectAll("div")
//         .remove();
//     const tooltip = svgContainer.append("div")
//         .attr("id", "population-svg1-tooltip")
//         .attr("class", "population-tooltip");

//     // remove old svg
//     svgContainer.selectAll("svg")
//         .remove();

//     const svg = svgContainer.append("svg")
//         .attr("width", width)
//         .attr("height", height);

//     const percentageDomain1 = [15, 0];
//     const percentageDomain2 = [0, 15];
//     const ageDomain1 = ["00 -", "05 -", "10 -", "15 -", "20 -", "25 -", "30 -", "35 - ", "40 - ", "45 - ", "50 - ", "55 - ", "60 - ", "65 - ", "70 - ", "75 - ", "> 80 "];
//     const ageDomain2 = ["04", "09", "14", "19", "24", "29", "34", "39", "44", "49", "54", "59", "64", "69", "74", "79", " "];
//     const offset = 25;

//     // add text for selecting year
//     for (let i = 0; i < 20; i++) {
//         svg.append("text")
//             .attr("class", function () { return (year == 2000 + i) ? "svg2-year-text svg2-year-text-highlight-color" : "svg2-year-text"; })
//             .attr("transform", `translate(${width / 20 * i}, ${heightMargin - 25}) rotate(0)`)
//             .text(`${2000 + i}`)
//             .on("mouseover", function (e, d) {
//                 renderPopulationChart2(jsonData, 2000 + i);
//             });
//     }

//     // add x-axis
//     const xScale1 = d3.scaleLinear()
//         .domain(percentageDomain1)
//         .range([0, (width - (widthMargin + offset) * 2) / 2]);
//     svg.append("g")
//         .attr("transform", `translate(${widthMargin}, ${height - heightMargin})`)
//         .call(d3.axisBottom(xScale1));
//     const xScale2 = d3.scaleLinear()
//         .domain(percentageDomain2)
//         .range([0, (width - (widthMargin + offset) * 2) / 2]);
//     svg.append("g")
//         .attr("transform", `translate(${width / 2 + offset}, ${height - heightMargin})`)
//         .call(d3.axisBottom(xScale2));

//     // add y-axis
//     const yScale1 = d3.scaleBand()
//         .domain(ageDomain1)
//         .range([height - heightMargin * 2, 0]);
//     const yScale2 = d3.scaleBand()
//         .domain(ageDomain2)
//         .range([height - heightMargin * 2, 0]);
//     svg.append("g")
//         .attr("transform", `translate(${width / 2 - offset}, ${heightMargin})`)
//         .call(d3.axisRight(yScale1));
//     svg.append("g")
//         .attr("transform", `translate(${width / 2 + offset}, ${heightMargin})`)
//         .call(d3.axisLeft(yScale2));

//     // add axis titles
//     svg.append("text")
//         .attr("class", "svg2-axis-title")
//         .attr("transform", `translate(${width / 2}, ${height - 10}) rotate(0)`)
//         .text("population(%)");

//     svg.append("text")
//         .attr("class", "svg2-axis-title")
//         .attr("transform", `translate(${width / 2}, ${heightMargin - 10}) rotate(0)`)
//         .text("age");

//     // add bars
//     const maleTotal = jsonData[year]["總計"]["grand-total"]["male"];
//     const femaleTotal = jsonData[year]["總計"]["grand-total"]["female"];
//     for (let i = 0; i < 17; i++) {
//         const male = jsonData[year]["總計"]["total"]["male"][i];
//         const female = jsonData[year]["總計"]["total"]["female"][i];
//         svg.append("rect")
//             .attr("class", "rect svg2-male")
//             .attr("x", width / 2 - offset - (xScale1(0) - xScale1(male / maleTotal * 100)))
//             .attr("y", yScale1(ageDomain1[i]))
//             .attr("width", xScale1(0) - xScale1(male / maleTotal * 100))
//             .attr("height", yScale1.bandwidth() - 2)
//             .attr("transform", `translate(${0}, ${heightMargin})`)
//             .on("mouseover", function (event, d) {
//                 d3.select("#population-svg1-tooltip")
//                     .html(`year: ${year}, range: ${i * 5}-${i * 5 + 4}, percentage: ${male / maleTotal * 100}%`)
//                     .style("left", `${event.layerX + 10}px`)
//                     .style("top", `${event.layerY + 10}px`)
//                     .style("position", "absolute")
//                     .style("padding", "5px")
//                     .style("font-size", "10px")
//                     .style("background-color", "#D0D0D0")
//                     .style("border-radius", "10px")
//                     .style("opacity", 1);
//             })
//             .on("mouseout", function (event, d) {
//                 d3.select("#population-svg1-tooltip")
//                     .style("opacity", 0);
//             });

//         svg.append("rect")
//             .attr("class", "rect svg2-female")
//             .attr("x", xScale2(0))
//             .attr("y", yScale2(ageDomain2[i]))
//             .attr("width", xScale2(female / femaleTotal * 100) - xScale2(0))
//             .attr("height", yScale2.bandwidth() - 2)
//             .attr("transform", `translate(${width / 2 + offset}, ${heightMargin})`)
//             .on("mouseover", function (event, d) {
//                 d3.select("#population-svg1-tooltip")
//                     .html(`year: ${year}, range: ${i * 5}-${i * 5 + 4}, percentage: ${female / femaleTotal * 100}%`)
//                     .style("left", `${event.layerX + 10}px`)
//                     .style("top", `${event.layerY + 10}px`)
//                     .style("position", "absolute")
//                     .style("padding", "5px")
//                     .style("font-size", "10px")
//                     .style("background-color", "#D0D0D0")
//                     .style("border-radius", "10px")
//                     .style("opacity", 1);
//             })
//             .on("mouseout", function (event, d) {
//                 d3.select("#population-svg1-tooltip")
//                     .style("opacity", 0);
//             });

//         // function handleMouseOver(event, d) {

//         // }
//     }


// }

// function renderPopulationChart4(jsonData, year) {
//     const svgContainer = d3.select("#svg4");
//     const width = svgContainer.style("width").slice(0, -2);
//     const height = svgContainer.style("height").slice(0, -2);
//     const widthMargin = 40;
//     const heightMargin = 40;

//     // remove old svg
//     svgContainer.selectAll("svg")
//         .remove();

//     const svg = svgContainer.append("svg")
//         .attr("width", width)
//         .attr("height", height);

//     // add text for selecting year
//     for (let i = 0; i < 20; i++) {
//         svg.append("text")
//             .attr("class", function () { return (year == 2000 + i) ? "population-svg4-year population-svg4-year-highlight" : "population-svg4-year"; })
//             .attr("transform", `translate(${width / 20 * i}, ${heightMargin - 25}) rotate(0)`)
//             .text(`${2000 + i}`)
//             .on("mouseover", function (e, d) {
//                 renderPopulationChart4(jsonData, 2000 + i);
//             });
//     }

//     let data = {};
//     let dataKeys = [];
//     for (let key in jsonData[year]) {
//         if (key == "總計") {
//             continue;
//         }
//         data[key] = jsonData[year][key]["grand-total"]["total"];
//         dataKeys.push(key);
//     }

//     const radius = 80;
//     const colors = d3.scaleOrdinal()
//         .domain(dataKeys)
//         .range(d3.schemeDark2);

//     const pie = d3.pie()
//         .sort(function (a, b) { return a[1] - b[1]; })
//         .value(function (d) { return d[1]; })
//     const pieData = pie(Object.entries(data));

//     const arc = d3.arc()
//         .innerRadius(radius * 0.5)
//         .outerRadius(radius * 0.8)
//     const labelArc = d3.arc()
//         .innerRadius(radius * 1.2)
//         .outerRadius(radius * 1.2)

//     svg.selectAll("arc")
//         .data(pieData)
//         .join("path")
//         .attr("d", arc)
//         .attr("fill", function (d) { return colors(d.data[1]); })
//         .attr("class", "population-svg4-arc")
//         .attr("transform", `translate(${width / 2}, ${height / 2})`);

//     svg.selectAll("line")
//         .data(pieData)
//         .join("polyline")
//         .attr("class", "population-svg4-line")
//         .attr("points", function (d) { return [arc.centroid(d), labelArc.centroid(d)]; })
//         .attr("transform", `translate(${width / 2},${height / 2})`);

//     svg.selectAll("label")
//         .data(pieData)
//         .join("text")
//         .attr("class", "population-svg4-label")
//         .attr('transform', function (d) {
//             let pos = labelArc.centroid(d);
//             pos[0] += width / 2;
//             pos[1] += height / 2;
//             return `translate(${pos})`;
//         })
//         .style('text-anchor', function (d) {
//             const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
//             return (midangle < Math.PI ? 'start' : 'end')
//         })
//         .text(function (d) { return d.data[0]; });
// }


// function renderPopulation() {
//     const populationUrl = "https://raw.githubusercontent.com/Yang-Shun-Yu/DataVisualization_TaiwanMap/main/dataset/population.json";
//     d3.json(populationUrl)
//         .then(function (jsonData) {
//             renderPopulationChart1(jsonData);
//             renderPopulationChart2(jsonData, 2000);
//             renderPopulationChart4(jsonData, 2000);
//         });
// }

// function renderPopulationChart1(jsonData) {
//     const svgContainer = d3.select("#svg1");
//     const width = svgContainer.style("width").slice(0, -2);
//     const height = svgContainer.style("height").slice(0, -2);
//     const widthMargin = 40;
//     const heightMargin = 40;

//     // remove old svg
//     svgContainer.selectAll("svg")
//         .remove();

//     const svg = svgContainer.append("svg")
//         .attr("width", width)
//         .attr("height", height);

//     const yearDomain = [2000, 2020];
//     const percentageDomain = [0, 100];

//     // add x-axis
//     const xScale = d3.scaleLinear()
//         .domain(yearDomain)
//         .range([0, width - widthMargin * 2]);
//     svg.append("g")
//         .attr("transform", `translate(${widthMargin}, ${height - heightMargin})`)
//         .call(d3.axisBottom(xScale));

//     // add y-axis
//     const yScale = d3.scaleLinear()
//         .domain(percentageDomain)
//         .range([height - heightMargin * 2, 0]);
//     svg.append("g")
//         .attr("transform", `translate(${widthMargin}, ${heightMargin})`)
//         .call(d3.axisLeft(yScale));

//     // add axis titles
//     svg.append("text")
//         .attr("class", "svg1-axis-title")
//         .attr("transform", `translate(${width / 2}, ${height - heightMargin + 30}) rotate(0)`)
//         .text("year");

//     svg.append("text")
//         .attr("class", "svg1-axis-title")
//         .attr("transform", `translate(15, ${height / 2}) rotate(270)`)
//         .text("population(%)");

//     let line1 = [], line2 = [], line3 = [];
//     for (let i = yearDomain[0]; i <= yearDomain[1]; i++) {
//         let sum1 = 0, sum2 = 0, sum3 = 0;
//         let total = jsonData[i]["總計"]["grand-total"]["total"];
//         for (let j = 0; j < 3; j++) {
//             sum1 += jsonData[i]["總計"]["total"]["total"][j];
//         }
//         for (let j = 4; j < 13; j++) {
//             sum2 += jsonData[i]["總計"]["total"]["total"][j];
//         }
//         for (let j = 13; j < jsonData[i]["總計"]["total"]["total"].length; j++) {
//             sum3 += jsonData[i]["總計"]["total"]["total"][j];
//         }
//         line1.push([i, sum1 / total * 100]);
//         line2.push([i, sum2 / total * 100]);
//         line3.push([i, sum3 / total * 100]);
//     }

//     // Add the lines
//     svg.append("path")
//         .datum(line1)
//         .attr("class", "svg1-line svg1-line-color1")
//         .attr("d", d3.line()
//             .x(function (d) { return xScale(d[0]) + widthMargin; })
//             .y(function (d) { return yScale(d[1]) + heightMargin; })
//         );

//     svg.append("path")
//         .datum(line2)
//         .attr("class", "svg1-line svg1-line-color2")
//         .attr("d", d3.line()
//             .x(function (d) { return xScale(d[0]) + widthMargin; })
//             .y(function (d) { return yScale(d[1]) + heightMargin; })
//         );

//     svg.append("path")
//         .datum(line3)
//         .attr("class", "svg1-line svg1-line-color3")
//         .attr("d", d3.line()
//             .x(function (d) { return xScale(d[0]) + widthMargin; })
//             .y(function (d) { return yScale(d[1]) + heightMargin; })
//         );
// }

// function renderPopulationChart2(jsonData, year) {
//     const svgContainer = d3.select("#svg2");
//     const width = svgContainer.style("width").slice(0, -2);
//     const height = svgContainer.style("height").slice(0, -2);
//     const widthMargin = 40;
//     const heightMargin = 40;

//     // remove old svg
//     svgContainer.selectAll("svg")
//         .remove();

//     const svg = svgContainer.append("svg")
//         .attr("width", width)
//         .attr("height", height);

//     const percentageDomain1 = [20, 0];
//     const percentageDomain2 = [0, 20];
//     const ageDomain1 = ["00 -", "05 -", "10 -", "15 -", "20 -", "25 -", "30 -", "35 - ", "40 - ", "45 - ", "50 - ", "55 - ", "60 - ", "65 - ", "70 - ", "75 - ", "> 80 "];
//     const ageDomain2 = ["04", "09", "14", "19", "24", "29", "34", "39", "44", "49", "54", "59", "64", "69", "74", "79", " "];
//     const offset = 25;

//     // add text for selecting year
//     for (let i = 0; i < 20; i++) {
//         svg.append("text")
//             .attr("class", function () { return (year == 2000 + i) ? "svg2-year-text svg2-year-text-highlight-color" : "svg2-year-text"; })
//             .attr("transform", `translate(${width / 20 * i}, ${heightMargin - 25}) rotate(0)`)
//             .text(`${2000 + i}`)
//             .on("mouseover", function (e, d) {
//                 renderPopulationChart2(jsonData, 2000 + i);
//             });
//     }

//     // add x-axis
//     const xScale1 = d3.scaleLinear()
//         .domain(percentageDomain1)
//         .range([0, (width - (widthMargin + offset) * 2) / 2]);
//     svg.append("g")
//         .attr("transform", `translate(${widthMargin}, ${height - heightMargin})`)
//         .call(d3.axisBottom(xScale1));
//     const xScale2 = d3.scaleLinear()
//         .domain(percentageDomain2)
//         .range([0, (width - (widthMargin + offset) * 2) / 2]);
//     svg.append("g")
//         .attr("transform", `translate(${width / 2 + offset}, ${height - heightMargin})`)
//         .call(d3.axisBottom(xScale2));

//     // add y-axis
//     const yScale1 = d3.scaleBand()
//         .domain(ageDomain1)
//         .range([height - heightMargin * 2, 0]);
//     const yScale2 = d3.scaleBand()
//         .domain(ageDomain2)
//         .range([height - heightMargin * 2, 0]);
//     svg.append("g")
//         .attr("transform", `translate(${width / 2 - offset}, ${heightMargin})`)
//         .call(d3.axisRight(yScale1));
//     svg.append("g")
//         .attr("transform", `translate(${width / 2 + offset}, ${heightMargin})`)
//         .call(d3.axisLeft(yScale2));

//     // add axis titles
//     svg.append("text")
//         .attr("class", "svg2-axis-title")
//         .attr("transform", `translate(${width / 2}, ${height - 10}) rotate(0)`)
//         .text("population(%)");

//     svg.append("text")
//         .attr("class", "svg2-axis-title")
//         .attr("transform", `translate(${width / 2}, ${heightMargin - 10}) rotate(0)`)
//         .text("age");

//     // add bars
//     const maleTotal = jsonData[year]["總計"]["grand-total"]["male"];
//     const femaleTotal = jsonData[year]["總計"]["grand-total"]["female"];
//     for (let i = 0; i < 17; i++) {
//         const male = jsonData[year]["總計"]["total"]["male"][i];
//         const female = jsonData[year]["總計"]["total"]["female"][i];
//         svg.append("rect")
//             .attr("class", "rect svg2-male")
//             .attr("x", width / 2 - offset - (xScale1(0) - xScale1(male / maleTotal * 100)))
//             .attr("y", yScale1(ageDomain1[i]))
//             .attr("width", xScale1(0) - xScale1(male / maleTotal * 100))
//             .attr("height", yScale1.bandwidth() - 2)
//             .attr("transform", `translate(${0}, ${heightMargin})`);

//         svg.append("rect")
//             .attr("class", "rect svg2-female")
//             .attr("x", xScale2(0))
//             .attr("y", yScale2(ageDomain2[i]))
//             .attr("width", xScale2(female / femaleTotal * 100) - xScale2(0))
//             .attr("height", yScale2.bandwidth() - 2)
//             .attr("transform", `translate(${width / 2 + offset}, ${heightMargin})`);
//     }
// }

// function renderPopulationChart4(jsonData, year) {
//     const svgContainer = d3.select("#svg4");
//     const width = svgContainer.style("width").slice(0, -2);
//     const height = svgContainer.style("height").slice(0, -2);
//     const widthMargin = 40;
//     const heightMargin = 40;

//     // remove old svg
//     svgContainer.selectAll("svg")
//         .remove();

//     const svg = svgContainer.append("svg")
//         .attr("width", width)
//         .attr("height", height);

//     // add text for selecting year
//     for (let i = 0; i < 20; i++) {
//         svg.append("text")
//             .attr("class", function () { return (year == 2000 + i) ? "population-svg4-year population-svg4-year-highlight" : "population-svg4-year"; })
//             .attr("transform", `translate(${width / 20 * i}, ${heightMargin - 25}) rotate(0)`)
//             .text(`${2000 + i}`)
//             .on("mouseover", function (e, d) {
//                 renderPopulationChart4(jsonData, 2000 + i);
//             });
//     }

//     let data = {};
//     let dataKeys = [];
//     for (let key in jsonData[year]) {
//         if (key == "總計") {
//             continue;
//         }
//         data[key] = jsonData[year][key]["grand-total"]["total"];
//         dataKeys.push(key);
//     }

//     const radius = 80;
//     const colors = d3.scaleOrdinal()
//         .domain(dataKeys)
//         .range(d3.schemeDark2);

//     const pie = d3.pie()
//         .sort(function (a, b) { return a[1] - b[1]; })
//         .value(function (d) { return d[1]; })
//     const pieData = pie(Object.entries(data));

//     const arc = d3.arc()
//         .innerRadius(radius * 0.5)
//         .outerRadius(radius * 0.8)
//     const labelArc = d3.arc()
//         .innerRadius(radius * 1.2)
//         .outerRadius(radius * 1.2)

//     svg.selectAll("arc")
//         .data(pieData)
//         .join("path")
//         .attr("d", arc)
//         .attr("fill", function (d) { return colors(d.data[1]); })
//         .attr("class", "population-svg4-arc")
//         .attr("transform", `translate(${width / 2}, ${height / 2})`);

//     svg.selectAll("line")
//         .data(pieData)
//         .join("polyline")
//         .attr("class", "population-svg4-line")
//         .attr("points", function (d) { return [arc.centroid(d), labelArc.centroid(d)]; })
//         .attr("transform", `translate(${width / 2},${height / 2})`);

//     svg.selectAll("label")
//         .data(pieData)
//         .join("text")
//         .attr("class", "population-svg4-label")
//         .attr('transform', function (d) {
//             let pos = labelArc.centroid(d);
//             pos[0] += width / 2;
//             pos[1] += height / 2;
//             return `translate(${pos})`;
//         })
//         .style('text-anchor', function (d) {
//             const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
//             return (midangle < Math.PI ? 'start' : 'end')
//         })
//         .text(function (d) { return d.data[0]; });
// }

// function renderPopulationMapData() {
//     console.log("aaaaa");
// }