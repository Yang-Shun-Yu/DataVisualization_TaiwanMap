let TaiwanMap = {
    center: {
        x: 123.5,
        y: 23.5
    },
    scale: {
        init: 6000,
        now: 6000,
        threshold: 5,
        flag: false // true => small scale, false => large scale
    },
    url: {
        low: "https://raw.githubusercontent.com/Yang-Shun-Yu/DataVisualization_TaiwanMap/main/dataset/taiwan_low_detail.json",
        high: "https://raw.githubusercontent.com/Yang-Shun-Yu/DataVisualization_TaiwanMap/main/dataset/taiwan_high_detail.json"
    },
    data: {
        low: null,
        high: null
    },
    svgContainer: null,
    svg: null,
    g: null,
    projectMethod: null,
    pathGenerator: null,
    hook: null,
    render: function (hook) {
        TaiwanMap.svgContainer = d3.select("#svg3")
            .style("background-color", "#003D79")
            .style("cursor", "grab");

        TaiwanMap.svgContainer.selectAll("g")
            .remove();

        TaiwanMap.svg = TaiwanMap.svgContainer.append("g");
        TaiwanMap.g = TaiwanMap.svg.append("g");

        const zoom = d3.zoom()
            .on("zoom", TaiwanMap.handleZoom)
            .on("start", function () { TaiwanMap.svgContainer.style("cursor", "grabbing"); })
            .on("end", function () { TaiwanMap.svgContainer.style("cursor", "grab"); });
        TaiwanMap.svgContainer.call(zoom);

        TaiwanMap.projectMethod = d3.geoMercator()
            .center([TaiwanMap.center.x, TaiwanMap.center.y])
            .scale(TaiwanMap.scale.init);
        TaiwanMap.pathGenerator = d3.geoPath()
            .projection(TaiwanMap.projectMethod);

        d3.json(TaiwanMap.url.low)
            .then(function (jsonData) {
                TaiwanMap.data.low = topojson.feature(jsonData, jsonData.objects["COUNTY_MOI_1090820"]);
                TaiwanMap.renderLowDetail();
            });

        d3.json(TaiwanMap.url.high)
            .then(function (jsonData) {
                TaiwanMap.data.high = topojson.feature(jsonData, jsonData.objects["TOWN_MOI_1120825"]);
            });

        TaiwanMap.hook = hook;
        TaiwanMap.hook();
    },
    renderLowDetail: function () {
        TaiwanMap.g.selectAll("path")
            .data(TaiwanMap.data.low.features)
            .enter()
            .append("path")
            .attr("d", TaiwanMap.pathGenerator)
            .attr("class", "taiwan-map-county")
            .append("title")
            .text(function (d) { return d.properties["COUNTYNAME"]; });
    },
    renderHighDetail: function () {
        TaiwanMap.g.selectAll("path")
            .data(TaiwanMap.data.high.features)
            .enter()
            .append("path")
            .attr("d", TaiwanMap.pathGenerator)
            .attr("class", "taiwan-map-town")
            .append("title")
            .text(function (d) { return d.properties["TOWNNAME"]; });
    },
    handleZoom: function (event) {
        TaiwanMap.scale.now = event.transform.k;
        if (TaiwanMap.scale.now < TaiwanMap.scale.threshold && !TaiwanMap.scale.flag) {
            TaiwanMap.svg.selectAll("path")
                .remove();
            TaiwanMap.svg.selectAll("circle")
                .remove();
            TaiwanMap.renderLowDetail();
            TaiwanMap.scale.flag = true;
        } else if (TaiwanMap.scale.now >= TaiwanMap.scale.threshold && TaiwanMap.scale.flag) {
            TaiwanMap.svg.selectAll("path")
                .remove();
            TaiwanMap.svg.selectAll("circle")
                .remove();
            TaiwanMap.renderHighDetail();
            TaiwanMap.scale.flag = false;
        }
        TaiwanMap.g.attr("transform", event.transform);
        TaiwanMap.hook();
    }
}

