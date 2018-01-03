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
            // Stores fetched groups locally
            fetchedGroups = result["data"];

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
    
    // New tab id
    const tabId = groupId + "-tab";

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
    groupTableContainer.appendChild(spacing);

    // Creates container for user table
    let tableContainer = createElement("div", "", "table-container");

    // Creates a nullified table
    let table = null;

    // Create table if users uid array length is greater than zero
    if (data.user_ids.length > 0) { 
        // Creates a new table element
        table = createElement("table");
    }

    // Creates and returns an anchor button
    let addUserBtn = createAnchorButton({
        id: "show-add-group-user", 
        type: "small", 
        href: "add-group-user",
        text: "Lägg till användare",
        iconText: "&plus;"
    });

    // Add only table if it is not null
    if (table != null)
        groupTableContainer.appendChild(table);

    // Appends the button and a spacing element
    groupTableContainer.appendChild(spacing);
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
    groupPollContainer.appendChild(spacing);

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

    groupPollContainer.appendChild(spacing);
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

    // Increments group count
    groupCount++;
}