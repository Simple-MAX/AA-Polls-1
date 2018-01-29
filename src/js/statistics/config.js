/****************************************************
*                                                   *
*                AA-Polls - config.js               *
*                                                   *
*        Date of development : December 2017        *
*                                                   *
*       Copyrights @ https://github.com/BluDay      *
*                                                   *
*                      (o.0)                        *
*                                                   *
* /**************************************************
*/

// Constant variables
const MONTHS = [
    "January",  "February", "Mars",
    "April",    "May",      "June",
    "July",     "August",   "September",
    "November", "October",  "December"
];

const ChartType = {
    Bar: "bar",
    Line: "line"
};

const PollChartTypes = [
    {
        value: ChartType.Line,
        text: "Huvudgraf"
    }, 
    {
        value: ChartType.Bar,
        text: "Påverkningsgraf"
    }
];

const DEFAULT_STATS = { 
    Chart: { 
        Min: 0, 
        Max: 0, 
        Average: 0 
    },
    Date: { 
        From: "", 
        To: "" 
    }
};

// Regular variables
var selectedGroup = {
    group: null,
    polls: null,
    submitted_polls: null,
    dates: null,
};

var chartType = ChartType.Line;