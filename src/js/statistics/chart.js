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

    // Creates datasets and labels array
    let datasets = [], labels = [];
    
    // Loops through chart types
    for (let i = 0; i < PollChartTypes.length; i++) {
        // Set pollChartType to selected chart type object
        if (chartType == PollChartTypes[i].value) {
            // Attempts to insert datasets labels to data
            for (let j = 0; j < data.length; j++) {
                // Adds poll id to labels array
                if (data[j].label != "") 
                    labels.push(data[j].label);

                // Data to insert
                let datasetData = [];

                /* Loops through data array again adds
                 * only if current label is not empty
                 */
                for (let k = 0; k < data.length; k++)
                    if (data[k].label != "")
                        datasetData.push(data[k].values[j]);

                // Creates new dataset object
                let dataset = {
                    label: PollChartTypes[i].labels[j],
                    data: datasetData,
                    backgroundColor: "transparent",
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

    console.log(datasets);

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