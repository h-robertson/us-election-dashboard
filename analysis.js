const houseDict = {
    "D": "#124683",
    "R": "#9C1515",
}

var getCol = function (myKey) {
    return houseDict[myKey];
};

var margin = {
        top: 50,
        right: 50,
        bottom: 50,
        left: 100
    },
    width = 1100 - margin.left - margin.right,
    height = 250 - margin.top - margin.bottom;

var svg = d3.select('.timeline')
    .append('svg')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


//Adapted from: https://bl.ocks.org/arpitnarechania/4b4aa79b04d2e79f30765674b4c24ace 
d3.json('data/timeline.json').then(function (data) {

    parseDate = d3.timeParse("%d/%m/%Y")

    // parse start & end dates as date types
    data.forEach(function (d) {
        d.startdate = parseDate(d.startdate)
        d.enddate = parseDate(d.enddate)
    })

    var x = d3.scaleTime()
        .domain([new Date(1900, 10, 1), new Date(2021, 0, 20)])
        .range([0, width])

    var y = d3.scaleBand()
        .range([0, height])
        .domain(data.map(function (d) {
            return d.house
        }))

    var yAxis = d3.axisLeft()
        .scale(y)

    svg.append("g")
        .attr("class", "x-axis")
        .call(d3.axisBottom(x))
        .attr("transform", "translate(0," + height + ")");

    svg.append("g")
        .attr("class", "y-axis")
        .call(yAxis)

    svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .style('fill', function (d) {
            return getCol(d.party)
        })
        .attr("y", function (d) {
            return y(d.house);
        })
        .attr("height", y.bandwidth())
        .attr("x", function (d) {
            return x(d.startdate);
        })
        .attr("width", function (d) {
            return x(d.enddate) - x(d.startdate)
        });

    console.log(data)
})