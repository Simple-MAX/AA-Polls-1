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

    // If data is null, clear canvas context
    if (data == null) {
        // Clears canvas context
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Terminates function
        return;
    }

    // Creates datasets and labels array
    let datasets = [], labels = [];
    
    // Loops through chart types
    for (let i = 0; i < PollChartTypes.length; i++) {
        // Set pollChartType to selected chart type object
        if (chartType == PollChartTypes[i].value) {
            // Attempts to insert datasets labels to data
            for (let j = 0; j < PollChartTypes[i].labels.length; j++) {
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

                        // Pushes data to dataset
                        datasetData.push(data[k].values[j]);
                    }
                }

                // Defines background color
                let bgColor = chartType != ChartType.Line
                    ? PollChartTypes[i].borderColors[j]
                    : "transparent";

                // Creates new dataset object
                let dataset = {
                    label: PollChartTypes[i].labels[j],
                    data: datasetData,
                    backgroundColor: bgColor,
                    borderColor: PollChartTypes[i].borderColors[j],
                    borderWidth: 4,
                    pointRadius: 6,
                    pointBackgroundColor: "#fff",
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
            labels: labels,
            datasets: datasets
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