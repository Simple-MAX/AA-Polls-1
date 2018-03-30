/****************************************************
*                                                   *
*                AA-Polls - chart.js                *
*                                                   *
*        Date of development : December 2017        *
*                                                   *
*       Copyrights @ https://github.com/BluDay      *
*                                                   *
*                      (o.0)                        *
*                                                   *
* /**************************************************
*/

// Renders a chart using the Chart.js library with given stats
function renderChart(canvasId, data, options, randomColor = false) {
    // Destroys current chart
    if (chart) destroyChart();

    // Gets the chart canvas element
    let canvas = getElement(canvasId);

    // Gets the context of the canvas element
    let context = canvas.getContext("2d");

    // If data is null, clear canvas context
    if (data == null) {
        // Clears canvas context
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Terminates function
        return;
    }

    // Used to determine highest voted value
    let highestValue = 0;

    // Creates options if it is null or undefined
    if (options == null || options == undefined) {
        // Creates datasets and labels array
        let datasets = [], labels = [];
        
        // Loops through chart types
        for (let i = 0; i < PollChartTypes.length; i++) {
            // Set pollChartType to selected chart type object
            if (chartType == PollChartTypes[i].value) {
                // Attempts to insert datasets labels to data
                for (let j = 0; j < pollChartType.labels.length; j++) {
                    // Data to insert
                    let datasetData = [];

                    /* Loops through data array again adds
                     * only if current label is not empty
                     */
                    for (let k = 0; k < data.length; k++) {
                        // Adds if label is not empty
                        if (data[k].label != "") {
                            // Adds only labels if j variable is zero
                            if (j == 0) labels.push(data[k].label);

                            /* Adds new value to highestValue if
                             * element is greater than current value
                             */
                            if (data[k].values[j] > highestValue)
                                highestValue = data[k].values[j];

                            // Pushes data to dataset
                            if (data[k].values[j] != null)
                                datasetData.push(data[k].values[j]);
                        }
                    }

                    // Defines background color
                    let bgColor = chartType != ChartType.Line
                        ? PollChartTypes[i].borderColors[j]
                        : "transparent";

                    // Defines border color
                    let borderColor = randomColor
                        ? randomColor
                        : PollChartTypes[i].borderColors[j]

                    // Creates new dataset object
                    let dataset = {
                        label: PollChartTypes[i].labels[j],
                        data: datasetData,
                        tension: 0,
                        backgroundColor: bgColor,
                        borderColor: borderColor,
                        borderWidth: 4,
                        pointRadius: 6,
                        pointBackgroundColor: "#fff",
                    };

                    // Adds dataset to datasets array
                    datasets.push(dataset);
                }

                // Breaks loop
                break;
            }
        }

        // Terminate if datasets is null
        if (datasets == null || datasets.length <= 0) 
            return;

        // Determines max Y axis value
        const maxY = chartType == ChartType.Bar 
            ? highestValue
            : 10;

        // Creates options and inserts chart data
        options = {
            type: chartType,
            data: {
                labels: labels,
                datasets: datasets
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            max: maxY,
                        },
                        stacked: 
                            chartType == ChartType.Bar
                                ? true
                                : false
                    }],
                    xAxes: [{ stacked: true }]
                }
            }
        };
    }

    // Renders the actual chart with options
    chart = new Chart(context, options);
}

// Destroys current chart
function destroyChart() {
    // Destorys current chart
    if (chart) chart.destroy();
}