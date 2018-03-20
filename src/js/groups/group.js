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

// Creates a request to insert and create a new group
function addGroup(title, token, callback = null) {
    // Terminate if current user is not admin or super user
    if (currentUser.super_user != "1" &&
        currentUser.admin != "1") return;

    // Data variable to return
    let data = null;

    // Creates a new array for possible parameters
    let params = {};

    /* Gets the appropriate values and store them
    * according to a determined structure below
    */
    if (title != "" && token != "") {
        // Sub parameters
        let subParams = JSON.stringify({ title: title });

        // Adds the sub params to the main params
        params.keys     = ["token", "group"];
        params.values   = [token, subParams];
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

// Attempts to fetch accessible groups based on current user privileges
function fetchGroups(token, callback = null) {
    // Terminate if current user is not admin or super user
    if (currentUser.super_user != "1" &&
        currentUser.admin != "1") return;
    
    // Data variable to return
    let data = null;
     
    // Creates a new array for possible parameters
    let params = {};

    /* Gets the appropriate values and store them
     * according to a determined structure below
     */
    if (token != "") {
        params.keys     = ["token"];
        params.values   = [token];
    } else return data;
    
    /* Executes an AJAX request (Vanilla JS, not jQuery)
     * with the given url, function contains optional arguments
     */
    let result = request(GROUP_API_URL, params);
    
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
                // Attempts to add actual user data to group object
                let modifiedGroupData = fetchGroupUsers(token, result["data"][i]);

                // Attempts to add all poll data to group object
                modifiedGroupData = fetchGroupPolls(token, modifiedGroupData);

                // Push a modified result to finalResult array
                finalResult.push(modifiedGroupData);
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

// Receives all users within a specific group and adds their data
function fetchGroupUsers(token, group) {
    // Terminate if current user is not admin or super user
    if (currentUser.super_user != "1" &&
        currentUser.admin != "1") return;

    // Terminate if group has invalid value
    if (group == null && token == null) return;

    // Modified group object
    let modifiedGroup = group;

    // User data array
    let users = [];

    // Loops through each group and adds data accordingly
    for (let i = 0; i < modifiedGroup.user_ids.length; i++) {
        // Exit current loop if there are no ids
        if (modifiedGroup.user_ids.length < 1) break;
        
        // Current user id in iteration
        const userId = modifiedGroup.user_ids[i];

        // Attempts to fetch user data
        let result = fetchUsers(token, userId);

        /* If result is an object type, it will return
         * some data with from the endpoint, regardless whether it's
         * successful or not. If not, it will return an error string.
         */
        if (typeof result == "object") {
            // If the result was successful
            if (result["success"] && result["data"] != null) {
                // Fetch each user and store them in 
                users.push(result["data"][0]);
            }
        }
    }

    /* Add a new key to group and assign
     * users array variable as a value
     */
    modifiedGroup.users = users;

    // Return users for curr
    return modifiedGroup;
}

// Attempts to delete existing group
function deleteGroup(groupId, token, callback = null) {
    // Terminate if current user is not admin or super user
    if (currentUser.super_user != "1" &&
        currentUser.admin != "1") return;

    // Data variable to return
    let data = null;
    
    // Creates a new array for possible parameters
    let params = {};

    /* Gets the appropriate values and store them
     * according to a determined structure below
     */
    if (token != "" && groupId != "") {
        params.keys     = ["token", "group_id"];
        params.values   = [token, groupId];
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

// Attempts to delete chosen user from current group
function editGroupUsers(groupId, group, token, callback = null) {
    // Terminate if current user is not admin or super user
    if (currentUser.super_user != "1" &&
        currentUser.admin != "1") return;

    // Data variable to return
    let data = null;

    // Creates a new array for possible parameters
    let params = {};

    // Declaration of group object variable
    let modifiedGroup = null;

    /* Gets the appropriate values and store them
    * according to a determined structure below
    */
    if (token != "" && groupId != "") {
        // Sub parameters
        let subParams = JSON.stringify(group);

        params.keys     = ["token", "group"];
        params.values   = [token, subParams];
    } else return data;

    /* Executes an AJAX request (Vanilla JS, not jQuery)
    * with the given url, function contains optional arguments
    */
    let result = request(GROUP_API_URL, params, "PATCH");

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

// Prompts user to choose whether to delete or not to delete group
function deleteCurrentGroup(groupId) {
    // Shows a prompt with two choices; OK and Cancel
    if (confirm("Vill du verkligen ta bort denna grupp?")) {
        // Get result of request and action
        let result = deleteGroup(groupId, currentUser.token);

        // If result is successful, proceed, else alert user
        if (result != null) {
            // Re-render user table if succeeded
            if (result["success"]) {
                // Re-renders groups
                refreshGroups("groups-container");
            } else alert("Kunde inte ta bort denna grupp");
        } else alert("Kunde inte ta bort denna grupp");
    }
}

// Inserts multiple groups to page
function insertGroupData(containerId, data) {
    // Terminate if current user is not admin or super user
    if (currentUser.super_user != "1" &&
        currentUser.admin != "1") return;

    /* Loops through and adds new group tab 
     * based on current index of iteration
     */
    for (let i = 0; i < data.length; i++) {
        // Append fetched data to user table
        appendGroup(containerId, data[i]);
    }
}

// Appends user data to a specific group user table
function insertGroupUserTable(tableId, users) {
    // Terminate if current user is not admin or super user
    if (currentUser.super_user != "1" &&
        currentUser.admin != "1") return;

    // Gets the given group id
    const groupId = tableId.replace("-user-table", "");

    // Declaration of user table data
    let userTableData = [];

    // Column titles for head
    const headTitles = ["Name", "Email address"];
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
                    onclick: (id, e) => showChooseUserPoll(users[i], groupId)
                }
            },
            {
                values: {
                    value: user.email,
                    type: "text",
                    onclick: (id, e) => showChooseUserPoll(users[i], groupId)
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

// Adds group polls to a specified container
function insertGroupPolls(containerId, polls) {
    // Terminate if current user is not admin or super user
    if (currentUser.super_user != "1" &&
        currentUser.admin != "1") return;

    // Gets the container element
    let container = getElement(containerId);

    /* Loops through and adds new poll block 
     * based on current index of iteration
     */
    for (let i = 0; i < polls.length; i++) {
        // Sets custom function to current poll
        let func = function() {
            // Sets href to poll site with id as parameter
            location.href = `poll.html?id=${polls[i]["id"]}`;
        }

        // Creates the poll block
        let poll = createPollBlockElement(polls[i], i + 1, func);

        // Adds a new poll block
        container.appendChild(poll);
    }
}

// Reloads the popup user table
function loadPopupUserTable(groupId) {
    // Terminate if current user is not admin or super user
    if (currentUser.super_user != "1" &&
        currentUser.admin != "1") return;

    // Sets group id to invisible group id input
    getElement("edit-users-group-id").value = groupId;

    // Assigns popup table id
    const tableId = "edit-group-users-table";

    // Gets the popup user table element
    let table = getElement(tableId);

    // If popup table is not empty, remove all children
    removeChildren(tableId);
    
    // Declaration of user table data
    let userTableData = [];
    
    // Column titles for head
    const headTitles = ["Name", "Member"];

    // Attempts to fetch all users and store them locally
    fetchUsers(currentUser.token);

    // Gets group users from given group id
    let groupUsers      = [];
    let availableUsers  = [];

    // Gets the specified group and its users
    for (let i = 0; i < fetchedGroups.length; i++) {
        // If current group was found, filter it correctly
        if (fetchedGroups[i].id == groupId) {
            // Assigns groupUsers to current iteration group users data
            groupUsers = fetchedGroups[i].users;

            // Loop through each available user
            for (let j = 0; j < fetchedUsers.length; j++) {
                // Variable to shorten code
                let user = fetchedUsers[j];

                // Exlude user if user is admin or super user
                // if (user.admin != "1" && user.super_user != "1")
                //     continue;

                /* Push user with checked value if group user count
                 * is greater than zero, add every user if otherwise
                 */
                if (groupUsers.length > 0) {
                    // Checks whether user already is added
                    for (let l = 0; l < groupUsers.length; l++) {
                        // Adds user regardless but with different checked values
                        if (user.id != groupUsers[l].id) {
                            // If not found and current iteration is last
                            if (l == groupUsers.length - 1) {
                                // Adds user with unchecked value
                                availableUsers.push(["0", user]);
                            }
                        } else {
                            // Adds user with checked value
                            availableUsers.push(["1", user]);

                            // Exits current loop and iteration
                            break;
                        }
                    }
                } else availableUsers.push(["0", user]);
            }

            // Exits current loop and iteration
            break;
        }
    }
    
    // Loops through each user and adds specific keys and values
    for (let i = 0; i < availableUsers.length; i++) {
        // Constant variable and value for current user in iteration
        const user       = availableUsers[i][1];
        const userName   = `${user.first_name} ${user.last_name}`;

        // Values to append
        let valuesToAppend = [
            {
                values: {
                    value: userName,
                    type: "text",
                    onclick: (id, e) => {
                        // Gets current checkbox
                        let checkBox = getElement(id.replace("T", "CB"));

                        // Add or remove "checked" attribute 
                        if (!checkBox.checked)
                            checkBox.setAttribute("checked", true);
                        else
                            checkBox.removeAttribute("checked");
                    }
                }
            },
            {
                values: {
                    value: availableUsers[i][0],
                    type: "checkbox",
                    onclick: (id, e) => null,
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
    const tabId             = groupId + "-tab";
    const tableId           = groupId + "-user-table";
    const pollsContainerId  = groupId + "-polls";

    // Creates a tab for the group
    let tab = createElement("div", tabId, "tab");

    // Adds onclick function to tab
    tab.onclick = function() {
        // Gets current element class name
        let tabClassName = getElement(groupId).className;

        // Default class name
        let className = "group minimized";

        // Switch class if class is same as deafult
        if (tabClassName == className)
            className = "group active";

        // Changes class name
        changeElementClass(groupId, className);
    }

    // Creates a title for the tab
    let title = createElement("p");

    // Sets title for title element
    title.innerHTML = data.title;

    // Creates an arrow indicator
    let tabArrow = createElement("a");

    // Adds arrow indicator
    tabArrow.innerHTML = LEFT_ARROW_CHAR;

    // Adds both title and arrow indicator to tab element
    tab.appendChild(title);
    tab.appendChild(tabArrow);

    // Creates a content container
    let content = createElement("div", "", "content");

    // Creats a sub content container
    let subContent = createElement("div", "", "sub-content");

    // Creates a table container for group users
    let groupTableContainer = createElement("div", "", "group-table-container");

    // Creates a title for current section
    title = createElement("p");

    // Sets section title
    
    if (window.localStorage.getItem != true){
        title.innerHTML = "User";
    } else {
        title.innerHTML = "Användare";
    }

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
        href: "#edit-group-users",
        text: "Manage users"
    });

    // Appends the button and a spacing element
    groupTableContainer.appendChild(spacing.cloneNode(true));

    // Gets popup user table on click
    addUserBtn.onclick = () => loadPopupUserTable(groupId);
    groupTableContainer.appendChild(addUserBtn);


    // Adds group table container to sub content container
    subContent.appendChild(groupTableContainer);

    // Adds sub content container to parent container
    content.appendChild(subContent);

    // Creats a new sub content container
    subContent = createElement("div", "", "sub-content");

    // Creates a new group poll container
    let groupPollsContainer = createElement("div", "", "group-polls-container");

    // Creates a new title for current section
    title = createElement("p");
    
    // Sets section title
    if (window.localStorage.getItem != true){
        title.innerHTML = "All forms";
    } else {
        title.innerHTML = "Alla formulär";
    }

    // Adds all sub content children to container
    groupPollsContainer.appendChild(title);
    groupPollsContainer.appendChild(spacing.cloneNode(true));

    // Creates a nullified poll container
    let pollsContainer = null;

    // Proceed only if poll array length is greater than zero
    if (data.polls.length > 0) {
        // Creates a new poll container
        pollsContainer = createElement("div", pollsContainerId, "polls-container");
    }

    // Creates and returns an anchor button
    let addPollBtn = createAnchorButton({
        type: "small", 
        href: "create-poll.html?group_id=" + groupId,
        text: "New form",
        iconText: "&plus;"
    });

    // Add poll container only if it is not null
    if (pollsContainer != null)
        groupPollsContainer.appendChild(pollsContainer);

    groupPollsContainer.appendChild(spacing.cloneNode(true));

    groupPollsContainer.appendChild(addPollBtn);


    // Adds group poll container to sub content container
    subContent.appendChild(groupPollsContainer);

    // Adds sub content container to parent container
    content.appendChild(subContent);

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
    if (window.localStorage.getItem != true){
        deleteButton.innerHTML = "Delete group";
    } else {
        deleteButton.innerHTML = "Ta bort grupp";
    }

    

    // Adds delete function to button
    deleteButton.onclick = (e) => deleteCurrentGroup(groupId);

    // Adds button to centered container
    centeredContainer.appendChild(deleteButton);

    // Adds group poll container to sub content container
    subContent.appendChild(centeredContainer);
    
    // Adds sub content container to parent container
    content.appendChild(subContent);

    // Adds tab and content elements to group element
    group.appendChild(tab);
    group.appendChild(content);

    // Appends current group to the container
    groupContainer.appendChild(group);

    /* Inserts users and polls to group table after all contents
     * of the group container has been initialized and
     * if the group data users and polls length is greater than zero
     */
    if (data.users.length > 0)
        insertGroupUserTable(tableId, data.users);

    if (data.polls.length > 0)
        insertGroupPolls(pollsContainerId, data.polls);

    // Increments group count
    groupCount++;
}

// Fetches all groups and renders them accordingly
function loadGroups(callback = null) {
    // Call a custom and passed callback function
    if (callback != null) {
        /* Creates a cloned callback function and passes
         * fetched data as parameter for external and quick access
         */
        const execCallback = (passedData) => callback(passedData);

        // Executes the cloned function
        execCallback();
    }

    // Fetches all accessible groups based on admin status
    fetchGroups(currentUser.token);

    // Return nothing if users is null
    if (fetchedGroups == null) {
        // Make user aware of progress failure
        if (window.localStorage.getItem != true){
            alert("Unable to retrieve groups, try again.");
        } else {
            alert("Kunde inte hämta grupper, försök igen.");
        }
    

        // Exit function
        return;
    }
}

// Refreshes and re-renders group division
function refreshGroups(groupsId) {
    // Gets the group container
    let groupsContainer = getElement(groupsId);

    // Terminate if groups container does not exist
    if (groupsContainer == null) return;

    // Re-renders table after successful data fetch
    loadGroups(function() {
        // Resets groups division
        removeChildren(groupsId);
        
        // Resets counters for table (critical)
        resetGroupCounters();
    });

    // Append group content once again
    insertGroupData(groupsId, fetchedGroups);
}

// Resets group counter
function resetGroupCounters() {
    // Reset groupCount only if value is greater than zero
    if (groupCount > 0) groupCount = 0;
}
