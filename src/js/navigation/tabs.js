/****************************************************
*                                                   *
*                AA-Polls - tabs.js                 *
*                                                   *
*        Date of development : December 2017        *
*                                                   *
*       Copyrights @ https://github.com/BluDay      *
*                                                   *
*                      (o.0)                        *
*                                                   *
* /**************************************************
*/

// Initialization of dynamic tabs which is critical
function loadTabs(containerId, tabs = DEFAULT_TABS_DATA) {
    // Terminate if passed tabs values is null
    if (tabs == null) return;

    // Gets the container element based on passed id
    let container = getElement(containerId);

    // Proceed if element is not null
    if (container == null) return;

    // Final tab data
    let finalTabs = tabs;

    // Determines what type of tabs to be generated
    if (currentUser.super_user != "1" && currentUser.admin != "1")
        finalTabs = USER_TABS_DATA;
    else if (currentUser.super_user != "1" && currentUser.admin == "1")
        finalTabs = ADMIN_TABS_DATA;

    /* Loops through each object in tabs array.
     * This section is also customizable
     */
    for (let i = 0; i < finalTabs.length; i++) {
        // Returns a custom tab based on current data
        let tab = createTab(finalTabs[i]);

        // Appends the tab to the container as a child
        container.appendChild(tab);
    }
}

/* Creates a tab dynamically which can be altered by
 * this section of code. This function is optional
 */
function createTab(data = DEFAULT_TAB_DATA) {
    // Creates a class name, does not add if empty
    let className = "";

    // Determines to set tab to active
    if (stringContains(data[1].toString(), currentPage)) 
        className = "active";

    // Creates a list item element
    let listItem = createElement("li", "", className);

    // Creates an anchor button for the list item
    let button = createElement("a");

    // Sets button text
    button.innerHTML = data[0];

    // Checks given data value type
    if (typeof data[1] == "string")
        button.href = data[1];
    else if (typeof data[1] == "function")
        button.onclick = (e) => data[1]();
    else
        button.href = "http://google.com";

    // Appends the anchor button to the list item
    listItem.appendChild(button); 

    // Returns the list item
    return listItem;
}

