// Use d3.csv to load data from the CSV file
d3.csv("../data/Population.csv").then(function(data) {

    const margin = { top: 40, right: 40, bottom: 60, left: 80 };
    const width = 1100 - margin.left - margin.right;
    const height = 620 - margin.top - margin.bottom;

    const svg = d3.select('#chart')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    let maxCapitalPopulation = d3.max(data, d => +d.Capital_city_pop);
    let yAxisMax = maxCapitalPopulation + 1000;

    const xScale = d3.scaleBand()
        .domain(data.map(d => d.Country))
        .range([0, width])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .domain([0, yAxisMax])
        .nice()
        .range([height, 0]);

    svg.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(xScale));

    svg.append('g')
        .attr('class', 'y-axis')
        .call(d3.axisLeft(yScale));

        svg.append('g')
    .attr('class', 'x-axis-label')
    .attr('transform', `translate(${width / 2},${height + margin.top - 2})`)
    .append('text')
    .text('Countries')
    .style('text-anchor', 'middle')
    .style('font-weight', 'bold');


    svg.append('g')
        .attr('class', 'y-axis-label')
        .attr('transform', `translate(${-margin.left + 14},${height / 2}) rotate(-90)`)
        .append('text')
        .text('Capital City Population (thousands)')
        .style('text-anchor', 'middle')
        .style('font-weight', 'bold');

    let currentState = 'all';

    function createBars(selectedVariable) {
        svg.selectAll('.bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', d => xScale(d.Country))
            .attr('y', height)
            .attr('width', xScale.bandwidth())
            .attr('height', 0)
            .style("fill", "#ad8ce5")
            .transition()
            .duration(1000)
            .attr('y', d => yScale(+d[selectedVariable]))
            .attr('height', d => height - yScale(+d[selectedVariable]))
            .attr('x', d => xScale(d.Country));
    }

    function updateBars(selectedVariable) {
        const duration = 1000;
        svg.selectAll('.bar')
            .transition()
            .duration(duration)
            .attr('x', d => xScale(d.Country))
            .attr('width', xScale.bandwidth());
        svg.select('.x-axis').transition().duration(duration).call(d3.axisBottom(xScale));
    }

    function updateYAxisMax(selectedVariable) {
        let yAxisLabel;
        let yAxisMax;

        if (selectedVariable === 'Capital_city_pop') {
            yAxisMax = d3.max(data, d => +d.Capital_city_pop + 10000);
            yAxisLabel = 'Capital City Population (thousands)';
        } else if (selectedVariable === 'Population_density') {
            yAxisMax = d3.max(data, d => +d.Population_density + 100);
            yAxisLabel = 'Population Density (people per sq.km)';
        } else if (selectedVariable === 'Population') {
            yAxisMax = d3.max(data, d => +d.Population + 100);
            yAxisLabel = 'Population Mid-year Estimates (millions)';
        }

        yScale.domain([0, yAxisMax]);
        svg.select('.y-axis').transition().duration(1000).call(d3.axisLeft(yScale));
        svg.select('.y-axis-label').select('text').text(yAxisLabel);
        updateBars(selectedVariable);
    }

    d3.select('#select-variable').on('change', function () {
        const selectedVariable = document.getElementById('select-variable').value;
        updateYAxisMax(selectedVariable);

        if (currentState === 'top') {
            filterTopOrBottom5(selectedVariable, 'top');
        } else if (currentState === 'bottom') {
            filterTopOrBottom5(selectedVariable, 'bottom');
        } else {
            resetChart(selectedVariable);
        }
    });

    d3.select('#filter-top5').on('click', function () {
        currentState = 'top';
        const selectedVariable = document.getElementById('select-variable').value;
        filterTopOrBottom5(selectedVariable, 'top');
    });

    d3.select('#filter-bottom5').on('click', function () {
        currentState = 'bottom';
        const selectedVariable = document.getElementById('select-variable').value;
        filterTopOrBottom5(selectedVariable, 'bottom');
    });

    d3.select('#sort-order').on('change', function () {
        const selectedVariable = document.getElementById('select-variable').value;
        const selectedSortOrder = document.getElementById('sort-order').value;
        sortData(selectedVariable, selectedSortOrder);
    });

    d3.select('#reset-button').on('click', function () {
        currentState = 'all';
        const selectedVariable = document.getElementById('select-variable').value;
        resetChart(selectedVariable);
    });

    function filterTopOrBottom5(selectedVariable, filterType) {
        data.sort((a, b) => {
            if (filterType === 'top') {
                return +b[selectedVariable] - +a[selectedVariable];
            } else {
                return +a[selectedVariable] - +b[selectedVariable];
            }
        });

        const filteredData = data.slice(0, 5);
        xScale.domain(filteredData.map(d => d.Country));
        yScale.domain([0, d3.max(filteredData, d => +d[selectedVariable])]);
        svg.selectAll('.bar').remove();

        svg.selectAll('.bar')
            .data(filteredData)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', d => xScale(d.Country))
            .attr('y', height)
            .attr('width', xScale.bandwidth())
            .attr('height', 0)
            .style("fill", "#ad8ce5")
            .transition()
            .duration(1000)
            .attr('y', d => yScale(+d[selectedVariable]))
            .attr('height', d => height - yScale(+d[selectedVariable]));

        svg.select('.x-axis').transition().duration(1000).call(d3.axisBottom(xScale));
    }

    function sortData(selectedVariable, sortOrder) {
        data.sort((a, b) => {
            if (sortOrder === 'ascending') {
                return +a[selectedVariable] - +b[selectedVariable];
            } else {
                return +b[selectedVariable] - +a[selectedVariable];
            }
        });

        xScale.domain(data.map(d => d.Country));
        yScale.domain([0, d3.max(data, d => +d[selectedVariable])]);
        svg.selectAll('.bar').remove();

        svg.selectAll('.bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', d => xScale(d.Country))
            .attr('y', height)
            .attr('width', xScale.bandwidth())
            .attr('height', 0)
            .style("fill", "#ad8ce5")
            .transition()
            .duration(1000)
            .attr('y', d => yScale(+d[selectedVariable]))
            .attr('height', d => height - yScale(+d[selectedVariable]))
            .attr('x', d => xScale(d.Country));

        svg.select('.x-axis').transition().duration(1000).call(d3.axisBottom(xScale));
    }

    function resetChart(selectedVariable) {
        data.sort((a, b) => a.Country.localeCompare(b.Country));
        xScale.domain(data.map(d => d.Country));

        let yAxisMax;

        if (selectedVariable === 'Capital_city_pop') {
            yAxisMax = d3.max(data, d => +d.Capital_city_pop + 10000);
        } else if (selectedVariable === 'Population_density') {
            yAxisMax = d3.max(data, d => +d.Population_density + 100);
        } else if (selectedVariable === 'Population') {
            yAxisMax = d3.max(data, d => +d.Population + 100);
        }

        yScale.domain([0, yAxisMax]);
        svg.selectAll('.bar').remove();

        svg.selectAll('.bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', d => xScale(d.Country))
            .attr('y', height)
            .attr('width', xScale.bandwidth())
            .attr('height', 0)
            .style("fill", "#ad8ce5")
            .transition()
            .duration(1000)
            .attr('y', d => yScale(+d[selectedVariable]))
            .attr('height', d => height - yScale(+d[selectedVariable]))
            .attr('x', d => xScale(d.Country));

        svg.select('.x-axis').transition().duration(1000).call(d3.axisBottom(xScale));
    }

    createBars('Capital_city_pop');
});