function renderPopulation() {
    const populationUrl = "https://raw.githubusercontent.com/Yang-Shun-Yu/DataVisualization_TaiwanMap/main/dataset/population.json";
    d3.json(populationUrl)
        .then(function (jsonData) {
            renderPopulationChart1(jsonData);
            renderPopulationChart2(jsonData, 2000);
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
        let sum1 = 0, sum2 = 0, sum3 = 0, total = 0;
        for (let j = 0; j < 3; j++) {
            sum1 += jsonData[i]["總計Total"]["total"][j];
            total += jsonData[i]["總計Total"]["total"][j];
        }
        for (let j = 4; j < 13; j++) {
            sum2 += jsonData[i]["總計Total"]["total"][j];
            total += jsonData[i]["總計Total"]["total"][j];
        }
        for (let j = 13; j < jsonData[i]["總計Total"]["total"].length; j++) {
            sum3 += jsonData[i]["總計Total"]["total"][j];
            total += jsonData[i]["總計Total"]["total"][j];
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

    // calculate total population
    let maleTotal = 0, femaleTotal = 0;
    for (let i = 0; i < 17; i++) {
        maleTotal += jsonData[year]["總計Total"]["male"][i];
        femaleTotal += jsonData[year]["總計Total"]["female"][i];
    }

    // add bars
    for (let i = 0; i < 17; i++) {
        svg.append("rect")
            .attr("class", "rect svg2-male")
            .attr("x", width / 2 - offset - (xScale1(0) - xScale1(jsonData[year]["總計Total"]["male"][i] / maleTotal * 100)))
            .attr("y", yScale1(ageDomain1[i]))
            .attr("width", xScale1(0) - xScale1(jsonData[year]["總計Total"]["male"][i] / maleTotal * 100))
            .attr("height", yScale1.bandwidth() - 2)
            .attr("transform", `translate(${0}, ${heightMargin})`);

        svg.append("rect")
            .attr("class", "rect svg2-female")
            .attr("x", xScale2(0))
            .attr("y", yScale2(ageDomain2[i]))
            .attr("width", xScale2(jsonData[year]["總計Total"]["female"][i] / femaleTotal * 100) - xScale2(0))
            .attr("height", yScale2.bandwidth() - 2)
            .attr("transform", `translate(${width / 2 + offset}, ${heightMargin})`);
    }

}