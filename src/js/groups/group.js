/****************************************************
*                                                   *
*                AA-Polls - group.js                *
*                                                   *
*        Date of development : December 2017        *
*                                                   *
*       Copyrights @ https://github.com/BluDay      *
*                                                   *
*                      (o.0)                        *
*                                                   *
* /**************************************************
*/

// Regular variables
let groupCount = 0;

// Creates a request to insert and create a new group
function addGroup(title, token, callback = null) {
    // Data variable to return
    let data = null;

    // Creates a new array for possible parameters
    let params = {};

    /* Gets the appropriate values and store them
    * according to a determined structure below
    */
    if (title != "" && token != "") {
        // Sub parameters
        let subParams = { title: title };

        // Adds the sub params to the main params
        params.keys     = [ "token", "group" ];
        params.values   = [ token, JSON.stringify(subParams) ];
    } else return data;

    /* Executes an AJAX request (Vanilla JS, not jQuery)
    * with the given url, function contains optional arguments
    */
    let result = request(GROUP_API_URL, params, "PUT");

    /* If result is an object type, it will return
    * some data with from the endpoint, regardless whether it's
    * successful or not. If not, it will return an error string.
    */
    if (typeof result == "object") {
        // If the result was successful
        if (result["success"] && result["data"] != null) {
            // Call a custom and passed callback function
            if (callback != null) {
                /* Creates a cloned callback function and passes
                * fetched data as parameter for external and quick access
                */
                const execCallback = (passedData) => callback(passedData);

                // Executes the cloned function
                execCallback(result);
            }
        }

        // Assigns fetched data to data variable
        data = result;
    }

    // Returns final data
    return data;
}

// Receives all users within a specific group and adds their data
function fetchGroupUsers(group, token) {
    // Terminate if group has invalid value
    if (group == null && token == null) return;

    // Modified group object
    let modifiedGroup = group;

    // User data array
    let users = []; 

    // Loops through each group and adds data accordingly
    for (let i = 0; i < modifiedGroup.user_ids.length; i++) {
        // Current user id in iteration
        const userId = modifiedGroup.user_ids[i];

        // Attempts to fetch user data
        let result = fetchUsers(token, userId);

        // Creates a nullified user data variable
        let userData = null;

        /* If result is an object type, it will return
         * some data with from the endpoint, regardless whether it's
         * successful or not. If not, it will return an error string.
         */
        if (typeof result == "object") {
            // If the result was successful
            if (result["success"] && result["data"] != null) {
                // Assigns successful data to userData variable
                userData = result["data"][0];

                // Fetch each user and store them in 
                users.push(userData);
            }
        }
    }

    /* Add a new key to group and assign
     * users array variable as a value
     */
    modifiedGroup.users = users;

    // Delete unnecessary user_ids key
    delete modifiedGroup["user_ids"];

    // Return users for curr
    return modifiedGroup;
}

// Attempts to fetch accessible groups based on current user privileges
function fetchGroups(token, callback = null) {
    // Data variable to return
    let data = null;
     
    // Creates a new array for possible parameters
    let params = {};

    /* Gets the appropriate values and store them
     * according to a determined structure below
     */
    if (token != "") {
        params.keys     = [ "token" ];
        params.values   = [ token ];
    } else return data;
    
    /* Executes an AJAX request (Vanilla JS, not jQuery)
     * with the given url, function contains optional arguments
     */
    let result = request(GROUP_API_URL, params, "GET");
    
    /* If result is an object type, it will return
     * some data with from the endpoint, regardless whether it's
     * successful or not. If not, it will return an error string.
     */
    if (typeof result == "object") {
        // If the result was successful
        if (result["success"] && result["data"] != null) {
            // Final and modified result data array variable
            let finalResult = [];

            // Loops through each group and adds data accordingly
            for (let i = 0; i < result["data"].length; i++) {
                // Push a modified result to finalResult array
                finalResult.push(fetchGroupUsers(result["data"][i], token));
            }

            // Stores fetched groups locally
            fetchedGroups = finalResult;

            // Call a custom and passed callback function
            if (callback != null) {
                /* Creates a cloned callback function and passes
                 * fetched data as parameter for external and quick access
                 */
                const execCallback = (passedData) => callback(passedData);

                // Executes the cloned function
                execCallback(result);
            }
        }

        // Assigns fetched data to data variable
        data = result;
    }

    // Returns final data
    return data;
}

// Attempts to delete existing group
function deleteGroup(token, groupId, callback = null) {
    // Data variable to return
    let data = null;
    
    // Creates a new array for possible parameters
    let params = {};

    /* Gets the appropriate values and store them
     * according to a determined structure below
     */
    if (token != "" && groupId != "") {
        params.keys     = [ "token", "group_id" ];
        params.values   = [ token, groupId ];
    } else return data;

    /* Executes an AJAX request (Vanilla JS, not jQuery)
     * with the given url, function contains optional arguments
     */
    let result = request(GROUP_API_URL, params, "DELETE");

    /* If result is an object type, it will return
     * some data with from the endpoint, regardless whether it's
     * successful or not. If not, it will return an error string.
     */
    if (typeof result == "object") {
        // If the result was successful
        if (result["success"] && result["data"] != null) {
            // Call a custom and passed callback function
            if (callback != null) {
                /* Creates a cloned callback function and passes
                 * fetched data as parameter for external and quick access
                 */
                const execCallback = (passedData) => callback(passedData);

                // Executes the cloned function
                execCallback(result);
            }
        }

        // Assigns fetched data to data variable
        data = result;
    }

    // Returns final data
    return data;
}

// Inserts multiple groups to page
function insertGroupData(containerId, data) {
    /* Loops through and adds new group tab 
     * based on current index of iteration
     */
    for (var i = 0; i < data.length; i++) {
        // Append fetched data to user table
        appendGroup(containerId, data[i]);
    }
}

// Appends user data to a specific group user table
function loadGroupUserTable(tableId, users) {
    // Declaration of user table data
    let userTableData = [];

    // Column titles for head
    const headTitles = ["Namn", "Email address"];
    
    // Loops through each user and adds specific keys and values
    for (let i = 0; i < users.length; i++) {
        // Constant variable and value for current user in iteration
        const user       = users[i];
        const userName   = `${user.first_name} ${user.last_name}`;

        // Values to append
        let valuesToAppend = [
            {
                values: {
                    value: userName,
                    type: "text",
                    onclick: (id, e) => alert("not done")
                }
            },
            {
                values: {
                    value: user.email,
                    type: "text",
                    onclick: (id, e) => alert("not done")
                }
            },
        ];

        // Declaration of custom user data object
        const userDataObject = {
            head: i <= 0 ? headTitles : null,
            data: valuesToAppend
        };

        // Add final structure to table data array
        userTableData.push(userDataObject);
    }

    // Format users accordingly
    insertTableData(tableId, userTableData);
}

// Appends a specific group to the group page
function appendGroup(containerId, data) {
    // Creates a new id for current group
    const groupId = data.id;

    // Gets the groups container
    let groupContainer = getElement(containerId);

    // Creates a short spacing element
    let spacing = createElement("hr", "", "short-spacing");

    // Creates a new element for the group
    let group = createElement("div", groupId, "group minimized");
    
    // New tab and table id
    const tabId     = groupId + "-tab";
    const tableId   = groupId + "-user-table";

    // Creates a tab for the group
    let tab = createElement("div", tabId, "tab");

    // Adds onclick function to tab
    tab.onclick = function(e) {
        // Sets class to the opposite on click
        if (e.srcElement.parentNode.className == "group active")
            changeElementClass(groupId, "group minimized");
        else
            changeElementClass(groupId, "group active");
    }

    // Creates a title for the tab
    let title = createElement("p", "");

    // Sets title for title element
    title.innerHTML = data.title;

    // Creates an arrow indicator
    let tabArrow = createElement("a", "");

    // Adds arrow indicator
    tabArrow.innerHTML = LEFT_ARROW_CHAR;

    // Adds both title and arrow indicator to tab element
    tab.appendChild(title);
    tab.appendChild(tabArrow);

    // Creates a content container
    let content = createElement("div", "", "content");

    // ------------------------------------------------------------------------

    // Creats a sub content container
    let subContent = createElement("div", "", "sub-content");

    // Creates a table container for group users
    let groupTableContainer = createElement("div", "", "group-table-container");

    // Creates a title for current section
    title = createElement("p", "");

    // Sets section title
    title.innerHTML = "Användare";

    // Appends the title and a spacing element
    groupTableContainer.appendChild(title);
    groupTableContainer.appendChild(spacing.cloneNode(true));

    // Create table if users uid array length is greater than zero
    if (data.users.length > 0) { 
        // Creates container for user table
        let tableContainer = createElement("div", "", "table-container");
    
        // Creates a new table element
        let table = createElement("table", tableId);

        // Adds actual table to table container
        tableContainer.appendChild(table);

        // Finally adds table container to group table container
        groupTableContainer.appendChild(tableContainer);
    }

    // Creates and returns an anchor button
    let addUserBtn = createAnchorButton({
        id: "show-add-group-user", 
        type: "small", 
        href: "add-group-user",
        text: "Lägg till användare",
        iconText: "&plus;"
    });

    // Appends the button and a spacing element
    groupTableContainer.appendChild(spacing.cloneNode(true));
    groupTableContainer.appendChild(addUserBtn);

    // Adds group table container to sub content container
    subContent.appendChild(groupTableContainer);

    // Adds sub content container to parent container
    content.appendChild(subContent);

    // ------------------------------------------------------------------------

    // Creats a new sub content container
    subContent = createElement("div", "", "sub-content");

    // Creates a new group poll container
    let groupPollContainer = createElement("div", "", "group-poll-container");

    // Creates a new title for current section
    title = createElement("p", "");
    
    // Sets section title
    title.innerHTML = "Alla formulär";

    // Adds all sub content children to container
    groupPollContainer.appendChild(title);
    groupPollContainer.appendChild(spacing.cloneNode(true));

    // Creates a nullified poll container
    let pollContainer = null;

    // Proceed only if poll array length is greater than zero
    if (data.poll_ids.length > 0) {
        // Creates a new poll container
        pollContainer = createElement("div", "", "poll-container");
    }

    // Creates and returns an anchor button
    let addPollBtn = createAnchorButton({
        type: "small", 
        href: "create-poll.html?id=" + groupId,
        text: "Nytt formulär",
        iconText: "&plus;"
    });

    // Add poll container only if it is not null
    if (pollContainer != null)
        groupPollContainer.appendChild(pollContainer);

    groupPollContainer.appendChild(spacing.cloneNode(true));
    groupPollContainer.appendChild(addPollBtn);

    // Adds group poll container to sub content container
    subContent.appendChild(groupPollContainer);

    // Adds sub content container to parent container
    content.appendChild(subContent);

    // ------------------------------------------------------------------------

    // Creats a new sub content container
    subContent = createElement("div", "", "sub-content");
    
    // Creates a new group poll container
    let centeredContainer = createElement("div", "", "content-center-container");

    // New id for delete button
    const deleteButtonId = `remove-${groupId}-button`;

    // Creates a delete group button
    let deleteButton = createElement("button", deleteButtonId, "regular-button");

    // Sets default attributes
    deleteButton.setAttribute("type", "submit");
    deleteButton.setAttribute("style", "background: #dd0000");

    // Adds text to button
    deleteButton.innerHTML = "Ta bort grupp";

    // Adds delete function to button
    deleteButton.onclick = function(e) {
        // Shows a prompt with two choices; OK and Cancel
        if (confirm("Vill du verkligen ta bort denna grupp?")) {
            // Get result of request and action
            let result = deleteGroup(currentUser.token, groupId);

            // If result is successful, proceed, else alert user
            if (result != null) {
                // Re-render user table if succeeded
                if (result["success"]) {
                    // Re-render actual user table
                    refreshGroups();
                } else alert("Kunde inte ta bort denna grupp");
            } else alert("Kunde inte ta bort denna grupp");
        }
    }

    // Adds button to centered container
    centeredContainer.appendChild(deleteButton);

    // Adds group poll container to sub content container
    subContent.appendChild(centeredContainer);
    
    // Adds sub content container to parent container
    content.appendChild(subContent);

    // ------------------------------------------------------------------------

    // Adds tab and content elements to group element
    group.appendChild(tab);
    group.appendChild(content);

    // Appends current group to the container
    groupContainer.appendChild(group);

    /* Inserts user to group table after all contents
     * of the group container has been initialized and
     * if the group data user length is greater than zero
     */
    if (data.users.length > 0) { 
        // Insert group users to table
        loadGroupUserTable(tableId, data.users);
    }

    // Increments group count
    groupCount++;
}

// Resets group counter
function resetGroupCounters() {
    // Reset groupCount only if value is greater than zero
    if (groupCount > 0) groupCount = 0;
}