function renderTaiwanMap() {
    let taiwanCenterX = 124;
    let taiwanCenterY = 23.5;
    let taiwanScale = 4500;
    const lowDetailDataUrl = "https://raw.githubusercontent.com/Yang-Shun-Yu/Data-Visualization-Project/master/FinalProject/COUNTY_MOI_1090820.json";
    const highDetailDataUrl = "https://raw.githubusercontent.com/Yang-Shun-Yu/Data-Visualization-Project/master/FinalProject/T.json";
    let lowDetailData;
    let highDetailData;
    let flagLarge = false;
    let flagSmall = false;

    const svgContainer = d3.select("#svg3")
        .style("background-color", "#003D79")
        .style("cursor", "grab");

    const svg = svgContainer.append("g");
    const g = svg.append("g");

    const zoom = d3.zoom()
        .on("zoom", handleZoom)
        .on("start", function () { svgContainer.style("cursor", "grabbing"); })
        .on("end", function () { svgContainer.style("cursor", "grab"); });
    svgContainer.call(zoom);

    const initialScale = taiwanScale;
    const projectMethod = d3.geoMercator()
        .center([taiwanCenterX, taiwanCenterY])
        .scale(initialScale);
    const pathGenerator = d3.geoPath()
        .projection(projectMethod);

    d3.json(lowDetailDataUrl)
        .then(function (jsonData) {
            lowDetailData = topojson.feature(jsonData, jsonData.objects["COUNTY_MOI_1090820"]);
            renderTaiwanLowDetail(g);
        });

    d3.json(highDetailDataUrl)
        .then(function (jsonData) {
            highDetailData = topojson.feature(jsonData, jsonData.objects["TOWN_MOI_1120825"]);
        });

    function renderTaiwanLowDetail(g) {
        g.selectAll("path")
            .data(lowDetailData.features)
            .enter()
            .append("path")
            .attr("d", pathGenerator)
            .attr("class", "town")
            .append("title")
            .text(function (d) { return d.properties["COUNTYNAME"]; });
    }

    function renderTaiwanHighDetail(g) {
        g.selectAll("path")
            .data(highDetailData.features)
            .enter()
            .append("path")
            .attr("d", pathGenerator)
            .attr("class", "country")
            .append("title")
            .text(function (d) { return d.properties["TOWNNAME"]; });
    }

    function handleZoom(event) {
        const currentScale = event.transform.k;
        const thresholdScale = 5;
        if (currentScale < thresholdScale && !flagSmall) {
            svg.selectAll("path").remove();
            svg.selectAll("circle").remove();
            renderTaiwanLowDetail(g);
            flagSmall = true;
            flagLarge = false;
        } else if (currentScale >= thresholdScale && !flagLarge) {
            svg.selectAll("path").remove();
            svg.selectAll("circle").remove();
            renderTaiwanHighDetail(g);
            flagLarge = true;
            flagSmall = false;
        }
        g.attr("transform", event.transform);
    }
}