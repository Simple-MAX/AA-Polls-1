/****************************************************
*                                                   *
*                 BluDay - table.js                 *
*                                                   *
*           Developed by : Bachir Bouchemla         *
*                                                   *
*      Date of development : Late December 2017     *
*                                                   *
*         Copyrights @ MicroAA Labs | BluDay        *
*                                                   *
*                      (o.0)                        *
*                                                   *
* /**************************************************
*/

// Constant variabless
const DEFAULT_TABLE_DATA = {
    head: ["No name"],
    data: [
        {
            values: {
                value: "nAn",
                type: "text",
                onclick: function() {
                    alert("Default function assigned");
                }
            }
        }
    ]
};

const TABLE_DATA_TYPES = {
    String: 
}; 

// Proceeds to check whether the given data structure is correct
function checkTableDataStructure(tempData) {
    let finalData = tempData;
    
    let headCount   = finalData.head.length;
    let dataLength  = finalData.data.length;

    if (typeof finalData == "object") {
        if (typeof finalData.head == "array") {
            for (let i = 0; i < this.headCount; i++) {
                if (typeof finalData.head[i] != "string")
                    finalData.head[i] = finalData.head[i].toString();
                else if (typeof finalData.head[i] == "")
                    finalData.head[i] = "No title";

                let typeCheckerArr = [
                    [ finalData.head[i], "string" ],
                    [ finalData.data[0], "object" ],
                    [ finalData.data[0].values.value, "string" ],
                    [ finalData.values[0].values.type, "string" ]
                ];
            }
        } else finalData.head = DEFAULT_TABLE_DATA.head;

        if (typeof finalData.data == "array") {
            for (let i = 0; i < this.dataLength; i++) {
                if (typeof finalData.data[i].values.value != "string")
            }
        } else finalData.data = DEFAULT_TABLE_DATA.data;
    } else finalData = DEFAULT_TABLE_DATA;

    return finalData;
}

// Adds given data to a specified table with id
function appendDataToTable(tableId, data = DEFAULT_TABLE_DATA) {
    let table = document.getElementById(tableId);

    let finalData = checkTableDataStructure(data);

    const dataValuesLength = finalData.data.length;

    for (let i = 0; i < dataValuesLength; i++) {

    }
}