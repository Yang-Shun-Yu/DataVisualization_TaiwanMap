function renderSelection(jsonData) {
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

}

function renderCorrelationMatrix() {
    const svgContainer = d3
        .select("#svg1");
    svgContainer
        .selectAll("rect")
        .remove();
    svgContainer
        .selectAll("svg")
        .remove();
    svgContainer
        .selectAll("div")
        .remove();
    svgContainer
        .selectAll("select")
        .remove();
    svgContainer
        .selectAll("button")
        .remove();

    const width = svgContainer
        .style("width")
        .slice(0, -2);
    const height = svgContainer
        .style("height")
        .slice(0, -2);
    const widthMargin = 40;
    const heightMargin = 40;
    const cellWidth = (width - widthMargin * 2) / 4;
    const cellHeight = (height - heightMargin * 2) / 4;
    const tooltip = svgContainer
        .append("div")
        .style("opacity", 0.0)
        .style("left", "0px")
        .style("top", "0px");
    const svg = svgContainer
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("font-size", "16px")
        .attr("transform", `translate(${width / 2}, ${heightMargin - 10}) rotate(0)`)
        .text("Correlation Matrix");

    const colors = [
        // negative
        "#804040",
        "#984B4B",
        "#AD5A5A",
        "#B87070",
        "#C48888",
        "#CF9E9E",
        "#D9B3B3",
        "#E1C4C4",
        "#EBD6D6",
        "#F2E6E6",
        "#F0F0F0",

        // positive
        "#F3F3FA",
        "#E6E6F2",
        "#D8D8EB",
        "#C7C7E2",
        "#B8B8DC",
        "#A6A6D2",
        "#9999CC",
        "#8080C0",
        "#7373B9",
        "#5A5AAD",
    ];

    // let populationData;
    // d3.json(Population.url)
    //     .then(function (jsonData) {
    //         populationData = jsonData;
    //         console.log(populationData);
    //         const url = "https://raw.githubusercontent.com/Yang-Shun-Yu/DataVisualization_TaiwanMap/main/dataset/%E5%85%A8%E5%9C%8B%E9%81%8B%E5%8B%95%E5%A0%B4%E9%A4%A8%E8%B3%87%E8%A8%8A.csv";
    //         d3.csv(url)
    //             .then(function (csvData) { 
    //                 console.log(csvData);
    //             });
    //     });


    // return;

    const axisTitles = ["", "房價", "人口密度", "體育館"];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (i == 0 && j == 0) {
                continue;
            }
            else if (i == 0) {
                svg
                    .append("rect")
                    .attr("x", i * cellWidth + widthMargin)
                    .attr("y", j * cellHeight + heightMargin)
                    .attr("width", cellWidth)
                    .attr("height", cellHeight)
                    .attr("fill", "none");
                svg
                    .append("text")
                    .attr("x", (i + 0.5) * cellWidth + widthMargin)
                    .attr("y", (j + 0.5) * cellHeight + heightMargin)
                    .attr("text-anchor", "middle")
                    .attr("dy", "0.35em")
                    .attr("font-size", "14px")
                    .text(`${axisTitles[j]}`);
            }
            else if (j == 0) {
                svg
                    .append("rect")
                    .attr("x", i * cellWidth + widthMargin)
                    .attr("y", j * cellHeight + heightMargin)
                    .attr("width", cellWidth)
                    .attr("height", cellHeight)
                    .attr("fill", "none");
                svg
                    .append("text")
                    .attr("x", (i + 0.5) * cellWidth + widthMargin)
                    .attr("y", (j + 0.5) * cellHeight + heightMargin)
                    .attr("text-anchor", "middle")
                    .attr("dy", "0.35em")
                    .attr("font-size", "14px")
                    .text(`${axisTitles[i]}`);
            }
            else {
                svg
                    .append("rect")
                    .attr("x", i * cellWidth + widthMargin)
                    .attr("y", j * cellHeight + heightMargin)
                    .attr("width", cellWidth)
                    .attr("height", cellHeight)
                    .attr("fill", "#FF0000");
                svg
                    .append("text")
                    .attr("x", (i + 0.5) * cellWidth + widthMargin)
                    .attr("y", (j + 0.5) * cellHeight + heightMargin)
                    .attr("text-anchor", "middle")
                    .attr("dy", "0.35em")
                    .attr("font-size", "14px")
                    .style("border-radius", "10px")
                    .text("abc");
            }
        }
    }
}

function renderScatterPlots() {
    const svgContainer = d3
        .select("#svg5");
    svgContainer
        .selectAll("rect")
        .remove();
    svgContainer
        .selectAll("svg")
        .remove();
    svgContainer
        .selectAll("div")
        .remove();
    svgContainer
        .selectAll("select")
        .remove();
    svgContainer
        .selectAll("button")
        .remove();

    const width = svgContainer
        .style("width")
        .slice(0, -2);
    const height = svgContainer
        .style("height")
        .slice(0, -2);
    const widthMargin = 40;
    const heightMargin = 40;
    const cellWidth = (width - widthMargin * 2) / 4;
    const cellHeight = (height - heightMargin * 2) / 4;
    const tooltip = svgContainer
        .append("div")
        .style("opacity", 0.0)
        .style("left", "0px")
        .style("top", "0px");
    const svg = svgContainer
        .append("svg")
        .attr("width", width)
        .attr("height", height);
}