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
    head: ["Title", "Added"],
    data: [
        {
            values: {
                value: "",
                type: "text",
                onclick: null
            }
        },
        {
            values: {
                value: "",
                type: "checkbox",
                onclick: (obj) => alert(getElement(obj).checked)
            }
        }
    ]
};

const DataValueTypes = {
    Text: "text",
    Checkbox: "checkbox",
    Func: "function"
}; 

// Regular variables
let rowCount = 0;
let colCount = 0;

// Vanilla JS default onload function
window.onload = function() {
    appendDataToTable("user-table");
}

// Proceeds to check whether the given data structure is correct
function checkTableDataStructure(tempData) {
    // Clones given data to return a modified value
    let finalData = tempData;
    
    // Made to achieve less confusion for others
    let headCount   = finalData.head != null ? finalData.head.length : 0;
    let dataLength  = finalData.data.length;

    // Increment column counter
    if (headCount > 0) colCount = headCount;

    /* Proceed if finalData data type is object,
     * else assign finalData to default table object
     */
    if (typeof finalData == "object") {
        /* Proceed if finalData.head data type is array,
         * else, assign default head to finalData.head
         */
        if (typeof finalData.head == "array" && headCount > 0) {
            for (let i = 0; i < headCount; i++) {
                if (typeof finalData.head[i] != "string")
                    finalData.head[i] = finalData.head[i].toString();
                else if (finalData.head[i] == "")
                    finalData.head[i] = "No title";
            }
        } else if (finalData.head != null)
            finalData.head = DEFAULT_TABLE_DATA.head;

        // If there are more data rows than head rows and is not equal
        if (dataLength > headCount && headCount > 0) {
            // Max iteration value for compensation
            let compensationValue = dataLength - headCount;

            // Loops through and adds new rows to prevent empty spots
            for (let j = 0; j < compensationValue; j++) {
                // Add compensated head to finalData.head array
                finalData.head[headCount + j] = "No title";

                // Increment column counter
                colCount++;
            }
        }

        /* Proceed if finalData.data data type is array, 
         * else assign finalData.data to default data array
         */
        if (typeof finalData.data == "object") {
            for (let i = 0; i < dataLength; i++) {
                if (typeof finalData.data[i].values.value != "string") {
                    finalData.data[i].values.value = 
                        finalData.data[i].values.value.toString();
                }
                
                /* Determine what current value will become if
                 * value is empty or invalid.
                 */
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

            // If there are more data rows than head rows and is not equal
            if (colCount > headCount) {
                alert("lol");
                // Max iteration value for compensation
                let compensationValue = colCount - finalData.data.length;

                // Loops through and adds new rows to prevent empty spots
                for (let j = 0; j < compensationValue; j++) {
                    // Add compensated head to finalData.head array
                    finalData.data[compensationValue + j] = DEFAULT_TABLE_DATA.data[0];
                }
            }
        } else finalData.data = DEFAULT_TABLE_DATA.data;
    } else finalData = DEFAULT_TABLE_DATA;

    // Return modified data
    return finalData;
}

// Adds given data to a specified table with id
function appendDataToTable(tableId, data = DEFAULT_TABLE_DATA) {
    // Gets table element with the help of tableId
    let table = document.getElementById(tableId);

    // Analyzes given table data and returns an appropriate value
    let finalData = checkTableDataStructure(data);

    // Return null if data is invalid
    if (finalData == null) return;

    // Adds head values to each row if initialized
    if (finalData.head != null) {
        // Initiates a new table row element
        let tableRow = document.createElement("tr");
    
        // Assigns a class name to the element
        tableRow.className = "table table-row";

        // Loops through finalData.head and creates new head rows
        for (let j = 0; j < finalData.head.length; j++) {
            // Initialization of table row head element
            let tableHead = document.createElement("th");

            // Sets table row head value to finalData.head with given index
            tableHead.innerHTML = finalData.head[j];

            // Appends table row head to table row
            tableRow.appendChild(tableHead);
        }

        // Appends current row to the table
        table.appendChild(tableRow);
    }

    // Initiates a new table row element
    let tableRow = document.createElement("tr");
    
    // Assigns a class name to the element
    tableRow.className = "table table-row";

    // Loops through data for each row and creates a new row data element
    for (let j = 0; j < finalData.data.length; j++) {
        let tableData = document.createElement("td");

        switch (finalData.data[j].values.type) {
            case DataValueTypes.Text:
                // Assign inner HTML value to current finalData.data value
                tableData.innerHTML = finalData.data[j].values.value;
                break;
            case DataValueTypes.Checkbox:
                // Initialize a new input or checkbox element
                let checkBox = document.createElement("input");

                // Custom checkbox id
                const checkBoxId = `AA-CheckBox-${rowCount}`;

                // Sets tabla data attribute/s
                checkBox.setAttribute("type", "checkbox");
                checkBox.setAttribute("id", checkBoxId);

                /* Assigns checkbox onclick function and attribute to current
                    * finalData.data[j].values.onclick functions
                    */
                checkBox.onclick = () => finalData.data[j].values.onclick(checkBoxId);

                // Append checkbox to current row data
                tableData.appendChild(checkBox);
                break;
        }

        // Increment row count
        rowCount++;

        // Appends data to current row
        tableRow.appendChild(tableData);
    }

    // Appends current row to the table
    table.appendChild(tableRow);
}