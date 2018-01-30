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
function renderChart(canvasId, data) {
    // Gets the chart canvas element
    let canvas = getElement(canvasId);

    // Gets the context of the canvas element
    let context = canvas.getContext("2d");

    // Creates datasets array
    let datasets = [];
    
    // Loops through chart types
    for (let i = 0; i < PollChartTypes.length; i++) {
        // Set pollChartType to selected chart type object
        if (chartType == PollChartTypes[i].value) {
            // Attempts to insert datasets labels to data
            for (let j = 0; j < data.length; j++) {
                // Creates new dataset object
                let dataset = {
                    label: "nAn",
                    
                };

                // Adds dataset to datasets array
                datasets.push(dataset);
            }
        }
    }

    // Terminate if datasets is null
    if (datasets == null || datasets.length <= 0) 
        return;

    // Creates options and inserts chart data
    const options = {
        type: chartType,
        data: {
            labels: data.labels,
            datasets: [{
                label: "",
                data: [],
                backgroundColor: "transparent",
                borderColor: "#00a1ff",
                borderWidth: 4,
                pointRadius: 6,
                pointBackgroundColor: "#fff",
            }, {
                label: "",
                data: [],
                backgroundColor: "transparent",
                borderColor: "#0ace00",
                borderWidth: 4,
                pointRadius: 6,
                pointBackgroundColor: "#fff",
            }, {
                label: "",
                data: [],
                backgroundColor: "transparent",
                borderColor: "#ffe100",
                borderWidth: 4,
                pointRadius: 6,
                pointBackgroundColor: "#fff",
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    };

    // Renders the actual chart with options
    let myChart = new Chart(context, options);
}