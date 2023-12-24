function renderPopulation() {
    const populationUrl = "https://raw.githubusercontent.com/Yang-Shun-Yu/DataVisualization_TaiwanMap/main/dataset/population.json";
    d3.json(populationUrl)
        .then(function (jsonData) {
            console.log(jsonData);
            renderPopulationChart1(jsonData);
            renderPopulationChart2(jsonData, 2000);
            renderPopulationChart4(jsonData, 2000);
        });
}

function renderPopulationChart1(jsonData) {
    const svgContainer = d3.select("#svg1");
    const width = svgContainer.style("width").slice(0, -2);
    const height = svgContainer.style("height").slice(0, -2);
    const widthMargin = 40;
    const heightMargin = 40;

    const svg = svgContainer.append("svg")
        .attr("width", width)
        .attr("height", height);

    const yearDomain = [2000, 2020];
    const percentageDomain = [0, 100];

    // add x-axis
    const xScale = d3.scaleLinear()
        .domain(yearDomain)
        .range([0, width - widthMargin * 2]);
    svg.append("g")
        .attr("transform", `translate(${widthMargin}, ${height - heightMargin})`)
        .call(d3.axisBottom(xScale));

    // add y-axis
    const yScale = d3.scaleLinear()
        .domain(percentageDomain)
        .range([height - heightMargin * 2, 0]);
    svg.append("g")
        .attr("transform", `translate(${widthMargin}, ${heightMargin})`)
        .call(d3.axisLeft(yScale));

    // add axis titles
    svg.append("text")
        .attr("class", "svg1-axis-title")
        .attr("transform", `translate(${width / 2}, ${height - heightMargin + 30}) rotate(0)`)
        .text("year");

    svg.append("text")
        .attr("class", "svg1-axis-title")
        .attr("transform", `translate(15, ${height / 2}) rotate(270)`)
        .text("population(%)");

    let line1 = [], line2 = [], line3 = [];
    for (let i = yearDomain[0]; i <= yearDomain[1]; i++) {
        let sum1 = 0, sum2 = 0, sum3 = 0;
        let total = jsonData[i]["總計"]["grand-total"]["total"];
        for (let j = 0; j < 3; j++) {
            sum1 += jsonData[i]["總計"]["total"]["total"][j];
        }
        for (let j = 4; j < 13; j++) {
            sum2 += jsonData[i]["總計"]["total"]["total"][j];
        }
        for (let j = 13; j < jsonData[i]["總計"]["total"]["total"].length; j++) {
            sum3 += jsonData[i]["總計"]["total"]["total"][j];
        }
        line1.push([i, sum1 / total * 100]);
        line2.push([i, sum2 / total * 100]);
        line3.push([i, sum3 / total * 100]);
    }

    // Add the lines
    svg.append("path")
        .datum(line1)
        .attr("class", "svg1-line svg1-line-color1")
        .attr("d", d3.line()
            .x(function (d) { return xScale(d[0]) + widthMargin; })
            .y(function (d) { return yScale(d[1]) + heightMargin; })
        );

    svg.append("path")
        .datum(line2)
        .attr("class", "svg1-line svg1-line-color2")
        .attr("d", d3.line()
            .x(function (d) { return xScale(d[0]) + widthMargin; })
            .y(function (d) { return yScale(d[1]) + heightMargin; })
        );

    svg.append("path")
        .datum(line3)
        .attr("class", "svg1-line svg1-line-color3")
        .attr("d", d3.line()
            .x(function (d) { return xScale(d[0]) + widthMargin; })
            .y(function (d) { return yScale(d[1]) + heightMargin; })
        );
}

function renderPopulationChart2(jsonData, year) {
    const svgContainer = d3.select("#svg2");
    const width = svgContainer.style("width").slice(0, -2);
    const height = svgContainer.style("height").slice(0, -2);
    const widthMargin = 40;
    const heightMargin = 40;

    // remove old svg
    svgContainer.selectAll("svg")
        .remove();

    const svg = svgContainer.append("svg")
        .attr("width", width)
        .attr("height", height);

    const percentageDomain1 = [20, 0];
    const percentageDomain2 = [0, 20];
    const ageDomain1 = ["00 -", "05 -", "10 -", "15 -", "20 -", "25 -", "30 -", "35 - ", "40 - ", "45 - ", "50 - ", "55 - ", "60 - ", "65 - ", "70 - ", "75 - ", "> 80 "];
    const ageDomain2 = ["04", "09", "14", "19", "24", "29", "34", "39", "44", "49", "54", "59", "64", "69", "74", "79", " "];
    const offset = 25;

    // add text for selecting year
    for (let i = 0; i < 20; i++) {
        svg.append("text")
            .attr("class", function () { return (year == 2000 + i) ? "svg2-year-text svg2-year-text-highlight-color" : "svg2-year-text"; })
            .attr("transform", `translate(${width / 20 * i}, ${heightMargin - 25}) rotate(0)`)
            .text(`${2000 + i}`)
            .on("mouseover", function (e, d) {
                renderPopulationChart2(jsonData, 2000 + i);
            });
    }

    // add x-axis
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

    // add y-axis
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

    // add axis titles
    svg.append("text")
        .attr("class", "svg2-axis-title")
        .attr("transform", `translate(${width / 2}, ${height - 10}) rotate(0)`)
        .text("population(%)");

    svg.append("text")
        .attr("class", "svg2-axis-title")
        .attr("transform", `translate(${width / 2}, ${heightMargin - 10}) rotate(0)`)
        .text("age");

    // add bars
    const maleTotal = jsonData[year]["總計"]["grand-total"]["male"];
    const femaleTotal = jsonData[year]["總計"]["grand-total"]["female"];
    for (let i = 0; i < 17; i++) {
        const male = jsonData[year]["總計"]["total"]["male"][i];
        const female = jsonData[year]["總計"]["total"]["female"][i];
        svg.append("rect")
            .attr("class", "rect svg2-male")
            .attr("x", width / 2 - offset - (xScale1(0) - xScale1(male / maleTotal * 100)))
            .attr("y", yScale1(ageDomain1[i]))
            .attr("width", xScale1(0) - xScale1(male / maleTotal * 100))
            .attr("height", yScale1.bandwidth() - 2)
            .attr("transform", `translate(${0}, ${heightMargin})`);

        svg.append("rect")
            .attr("class", "rect svg2-female")
            .attr("x", xScale2(0))
            .attr("y", yScale2(ageDomain2[i]))
            .attr("width", xScale2(female / femaleTotal * 100) - xScale2(0))
            .attr("height", yScale2.bandwidth() - 2)
            .attr("transform", `translate(${width / 2 + offset}, ${heightMargin})`);
    }
}

function renderPopulationChart4(jsonData, year) {
    const svgContainer = d3.select("#svg4");
    const width = svgContainer.style("width").slice(0, -2);
    const height = svgContainer.style("height").slice(0, -2);
    const widthMargin = 40;
    const heightMargin = 40;

    // remove old svg
    svgContainer.selectAll("svg")
        .remove();

    const svg = svgContainer.append("svg")
        .attr("width", width)
        .attr("height", height);

    // add text for selecting year
    for (let i = 0; i < 20; i++) {
        svg.append("text")
            .attr("class", function () { return (year == 2000 + i) ? "population-svg4-year population-svg4-year-highlight" : "population-svg4-year"; })
            .attr("transform", `translate(${width / 20 * i}, ${heightMargin - 25}) rotate(0)`)
            .text(`${2000 + i}`)
            .on("mouseover", function (e, d) {
                renderPopulationChart4(jsonData, 2000 + i);
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

    const radius = 80;
    const colors = d3.scaleOrdinal()
        .domain(dataKeys)
        .range(d3.schemeDark2);

    const pie = d3.pie()
        .sort(function (a, b) { return a[1] - b[1]; })
        .value(function (d) { return d[1]; })
    const pieData = pie(Object.entries(data));

    const arc = d3.arc()
        .innerRadius(radius * 0.5)
        .outerRadius(radius * 0.8)
    const labelArc = d3.arc()
        .innerRadius(radius * 1.2)
        .outerRadius(radius * 1.2)

    svg.selectAll("arc")
        .data(pieData)
        .join("path")
        .attr("d", arc)
        .attr("fill", function (d) { return colors(d.data[1]); })
        .attr("class", "population-svg4-arc")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

    svg.selectAll("line")
        .data(pieData)
        .join("polyline")
        .attr("class", "population-svg4-line")
        .attr("points", function (d) { return [arc.centroid(d), labelArc.centroid(d)]; })
        .attr("transform", `translate(${width / 2},${height / 2})`);

    svg.selectAll("label")
        .data(pieData)
        .join("text")
        .attr("class", "population-svg4-label")
        .attr('transform', function (d) {
            let pos = labelArc.centroid(d);
            pos[0] += width / 2;
            pos[1] += height / 2;
            return `translate(${pos})`;
        })
        .style('text-anchor', function (d) {
            const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
            return (midangle < Math.PI ? 'start' : 'end')
        })
        .text(function (d) { return d.data[0]; });
}