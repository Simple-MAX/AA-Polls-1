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

const DataValueTypes = {
    Text: "text",
    Checkbox: "checkbox",
    Func: "function"
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
                else if (finalData.head[i] == "")
                    finalData.head[i] = "No title";
            }
        } else finalData.head = DEFAULT_TABLE_DATA.head;

        if (typeof finalData.data == "array") {
            for (let i = 0; i < this.dataLength; i++) {
                if (typeof finalData.data[i].values.value != "string") {
                    finalData.data[i].values.value = 
                        finalData.data[i].values.value.toString();
                }
                
                switch (finalData.data[i].values.type) {
                    case DataValueTypes.Checkbox:
                        finalData.data[i].values.value = "";
                        break;
                    case DataValueTypes.Text:
                        if (typeof finalData.data[i].values.value != "string") {
                            finalData.data[i].values.value = 
                                finalData.data[i].values.value.toString();
                        } else if (finalData.data[i].values.value == "")
                            finalData.data[i].values.value = "nAn";
                        break;
                    case DataValueTypes.Func:
                        if (typeof finalData.data[i].values.value != "function")
                            finalData.data[i].values.value = function() {
                                alert("Default function assigned");
                            }
                        break;
                    default:
                        finalData.data[i].values.value = "";
                }
            }
        } else finalData.data = DEFAULT_TABLE_DATA.data;
    } else finalData = DEFAULT_TABLE_DATA;

    return finalData;
}

// Adds given data to a specified table with id
function appendDataToTable(tableId, data = DEFAULT_TABLE_DATA) {
    let table = document.getElementById(tableId);

    let finalData = checkTableDataStructure(data);

    const dataLength = finalData.data.length;
    const headLength = finalData.head.length;

    for (let i = 0; i < dataLength; i++) {

    }
}