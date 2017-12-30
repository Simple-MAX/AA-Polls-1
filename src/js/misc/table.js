/****************************************************
*                                                   *
*                AA-Polls - table.js                *
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
const DEFAULT_TABLE_DATA = {
    head: ["Title", "Admin"],
    data: [
        {
            values: {
                value: "",
                type: "text",
                onclick: () => alert("text")
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
}; 

const CheckBoxValues = { ON: "1", OFF: "0" };

// Regular variables
let rowCount = 1;
let colCount = 0;

/* Gets inserted data, formats it correctly and
 * appends it to a given table element with given id
 */
function insertData(tableId, data = DEFAULT_TABLE_DATA) {
    // Initialization of row data container
    let tableData = data;
    
    // Loop through and add row based on current index of iteration
    for (var i = 0; i < tableData.length; i++) {
        // Append fetched data to user table
        appendDataToTable(tableId, tableData[i]);
    }
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
        // If rowCount is greater than zero, remove head
        if (rowCount <= 1) {
            /* Proceed if finalData.head data type is array,
            * else, assign default head to finalData.head.
            * If rowCount is greater than zero, remove head
            */
            if (typeof finalData.head == "object" && headCount > 0) {
                // Loops through entire head
                for (let i = 0; i < headCount; i++) {
                    /* If current head data type is not string,
                    * else set head string in current iteration to "No title"
                    */
                    if (typeof finalData.head[i] != "string")
                        finalData.head[i] = finalData.head[i].toString();
                    else if (finalData.head[i] == "")
                        finalData.head[i] = "No title";
                }
            } else if (typeof finalData.head != "object" && finalData.head != null) {
                // Set finalData head to a default head
                finalData.head = DEFAULT_TABLE_DATA.head;
            }
        } else finalData.head = null;

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
            // Loops through all data
            for (let i = 0; i < dataLength; i++) {
                // If current data values value data type is not string
                if (typeof finalData.data[i].values.value != "string") {
                    finalData.data[i].values.value = 
                        finalData.data[i].values.value.toString();
                }
                
                /* Determine what current value will become if
                 * value is empty or invalid.
                 */
                switch (finalData.data[i].values.type) {
                    case DataValueTypes.Checkbox:
                        // Sets an empty string value to save space
                        if (typeof finalData.data[i].values.value != "string")
                            finalData.data[i].values.value =
                                finalData.data[i].values.value.toString();
                        break;
                    case DataValueTypes.Text:
                        /* Reset current data values "value" type to string,
                         * turn it to a string and set the value to "nAn" otherwise.
                         */
                        if (typeof finalData.data[i].values.value != "string") {
                            finalData.data[i].values.value = 
                                finalData.data[i].values.value.toString();
                        } else if (finalData.data[i].values.value == "")
                            finalData.data[i].values.value = "nAn";
                        break;
                    default:
                        finalData.data[i].values.value = "";
                }
            }

            // If there are more data rows than head rows and is not equal
            if (colCount > headCount) {
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
function appendDataToTable(tableId, data = DEFAULT_TABLE_DATA, id = rowCount) {
    // Gets table element with the help of tableId
    let table = getElement(tableId);

    // Analyzes given table data and returns an appropriate value
    let finalData = checkTableDataStructure(data);

    // Return null if data is invalid
    if (finalData == null) return;

    // Adds head values to each row if initialized
    if (finalData.head != null) {
        // Initiates a new table row element
        let tableRow = createElement("tr");
    
        // Assigns a class name to the element
        tableRow.className = "table table-row";

        // Loops through finalData.head and creates new head rows
        for (let j = 0; j < finalData.head.length; j++) {
            // Initialization of table row head element
            let tableHead = createElement("th");

            // Sets table row head value to finalData.head with given index
            tableHead.innerHTML = finalData.head[j];

            // Appends table row head to table row
            tableRow.appendChild(tableHead);
        }

        // Appends current row to the table
        table.appendChild(tableRow);
    }

    // Counts each checkbox in one row
    let checkBoxColCount    = 1;
    let textValueColCount   = 1;

    // Custom row id
    const rowId = id = rowCount ? `AA-${id}` : id;

    // Initiates a new table row element
    let tableRow = createElement("tr", rowId);
    
    // Assigns a class name to the element
    tableRow.className = "table table-row";

    // Loops through data for each row and creates a new row data element
    for (let j = 0; j < finalData.data.length; j++) {
        // Initiates a new table data element
        let tableData = createElement("td");

        // Checks the data values "type" datatype
        switch (finalData.data[j].values.type) {
            case DataValueTypes.Text:
                // Custom text id
                let textId = `${rowId}-T-${textValueColCount}`;

                // Assigns custom id to text value or table data
                tableData.setAttribute("id", textId);

                /* Assigns text onclick function and attribute to current
                 * finalData.data[j].values.onclick function
                 */
                tableData.onclick = (obj) => finalData.data[j].values.onclick(textId, obj);

                // Assign inner HTML value to current finalData.data value
                tableData.innerHTML = finalData.data[j].values.value;

                /* Increment by one for existance 
                 * of text value in a column
                 */
                textValueColCount++;
                break;
            case DataValueTypes.Checkbox:
                // Custom checkbox id
                let checkBoxId = `${rowId}-CB-${checkBoxColCount}`;

                // Initialize a new input or checkbox element
                let checkBox = createElement("input", checkBoxId);

                // Sets tabla data attribute/s
                checkBox.setAttribute("type", "checkbox");

                // Sets default value for checkbox
                if (finalData.data[j].values.value == CheckBoxValues.ON)
                    checkBox.setAttribute("checked", true);

                /* Assigns checkbox onclick function and attribute to
                 * current finalData.data[j].values.onclick function
                 */
                checkBox.onclick = function(obj) {
                    // Add or remove "checked" attribute 
                    if (checkBox.checked)
                        checkBox.setAttribute("checked", true);
                    else
                        checkBox.removeAttribute("checked");

                    // Execute passed function value
                    finalData.data[j].values.onclick(checkBoxId, obj);
                }

                /* Increment by one for existance 
                 * of checkbox in a column
                 */
                checkBoxColCount++;

                // Append checkbox to current row data
                tableData.appendChild(checkBox);       
                break;
        }

        // Appends data to current row
        tableRow.appendChild(tableData);
    }

    // Increment row count
    rowCount++;

    // Appends current row to the table
    table.appendChild(tableRow);
}