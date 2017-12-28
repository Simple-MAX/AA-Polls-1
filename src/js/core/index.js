/****************************************************
*                                                   *
*                BluDay - index.js                  *
*                                                   *
*         Developed by : Bachir Bouchemla           *
*                                                   *
*      Date of development : Late October 2017      *
*                                                   *
*   Copyrights @ MicroAA Labs | BluDay | botprizm   *
*                                                   *
*                      (o.0)                        *
*                                                   *
* /**************************************************
*/

// Constant variables
const MAIN_VIEW_INDEX = 0;

const SCRIPT_PATHS      = [];
const DEFERRED_SCRIPTS  = [];

const Pages = {
    Login: "login",
    Users: "users",
    Groups: "groups",
    Results: "results",
    Poll: "poll",
    PollManager: "poll-manager"
};

const INITIAL_PANEL_PAGE = Pages.Users;

// Regular Variables
var views = [];

var currentIndex    = 0;
var previousIndex   = 0;

// Default vanilla JS onload function
window.onload = function() {
    // Initial function in primary sequence
    initialize();
}

// Initiatlizes the main function
function initialize() {
    // Gets current page name
    const currentPage = getCurrentPage(true, true);

    // Gets stored token
    const token = getToken();    

    // Declaration of final function for listener
    let listenerFunc;

    // Adds listener to elements for different pages
    switch (currentPage) {
        case Pages.Login:
            // Declares listener accordingly
            listenerFunc = function() {
                // Used to minimize and shortify this script
                let values = [ 
                    getElementValue("email"),
                    getElementValue("password") 
                ];
                
                // Adds login function to this function
                loginUser(values[0], values[1], "", (result) => handleCurrentUser(result));
            }

            // Adds listener function to element
            addListener("login-submit", () => listenerFunc());
            addListener("password", (e) => { e.keyCode == 13 ? listenerFunc() : null }, "keyup");
            break;
        case Pages.Users:
            // Adds fake data to users table
            insertData("user-table");
            break;
    }
    // Determines whether user is welcome or not
    if (token != "" && currentPage == Pages.Login)
        quickAuth((result) => handleCurrentUser(result));
    else if (token == "" && currentPage != Pages.Login)
        redirectToPage(Pages.Login);

    // Proceed if user is not undefined or non-existent
    if (currentUserData != null) {
        // If token is not empty
        if (currentUserData.token != "") {
            // Determines what function to run on current page
            switch (currentPage) {
                case Pages.Users:
                    // Loads user table with results
                    loadUserTable();
                    break;
            }
        }
    }
}

// Adds on click functions to specified elements
function addListener(id, func, type = "click") {
    // Gets the element with id
    let element = getElement(id);
    
    // Adds listener to element with function
    element.addEventListener(type, (e) => func(e));
}

// Token based authentication for quick access
function quickAuth(callback = null) {
    // Gets stored token
    const token = getToken();

    // Terminates if token is empty and returns false for failure
    if (token == "") {
        // Handles and redirects user to login screen
        handleCurrentUser(null);

        // Terminates
        return;
    }

    // Getscurrent page name
    const currentPage = getCurrentPage(true, true);

    // If current token exists, try to authenticate
    let result = tokenAuthentication(token);

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

// Handles the user by storing token and redirecting to the panel
function handleCurrentUser(result) {
    // Gets current page name
    const currentPage = getCurrentPage(true, true);

    // If data was successfully fetched from endpoint, else log out
    if (result != null) {
        if (result.success && result.data != null) {
            /* Determines what sequence to to choose and execute,
            * depending on url location and current page
            */
            if (currentPage == Pages.Login) {
                // Store current token with the newer one
                if (getToken() != currentUserData.token)
                    setToken(currentUserData.token)

                // If token is not null, redirect user
                redirectToPage(INITIAL_PANEL_PAGE);
            }
        } else logOut();
    }
}

// Fetches users, formats data and appends them to users table 
function loadUserTable() {
    // Fetches users and stores in a variable
    let users = fetchUsers(currentUserData.token);

    // Return nothing if users is null
    if (users == null) {
        // Make user aware of progress failure
        alert("Could not fetch users, try again.");

        // Exit function
        return;
    }

    // Format users accordingly
    insertData("user-table");
}

// Shows a view from a specified index, with optional animation and reset options
function showView(index, anim = false, reset = false) {
    /* If reset variable is false, it will assign the current index (prior to update)
     * to the previous index variable. Then it will assign current 
     * index to the given index value from the passed parameter.
     * If it's true, it will set the current index and previous index to
     * the constant variable "MAIN_VIEW_INDEX".
     */
    if (!reset) 
        previousIndex = currentIndex;
    else
        previousIndex = index; 

    // Assigns the final index to the given index
    var finalIndex = currentIndex = index;

    // If the index is out of bounds, set it to 0
    if (finalIndex > views.length) finalIndex = 0;

    // If the index is not the main index, display the back button
    if (finalIndex != MAIN_VIEW_INDEX && !reset)
        backBtn.style.display = "block";
    else
        backBtn.style.display = "none";

    /* Loops through the view elements and shows 
     * the specified view and hides all remaining views
     */
    for (let i = 0; i < views.length; i++) {
        /* If loop index is final index, show the element (i.e the view)
         * else hide the other and current view (which becomes previous)
         */
        if (i == finalIndex)
            views[i].style.display = "block";
        else
            views[i].style.display = "none";
    }
}

// Goes back to the previous index if navigated beyond once
function goBack() { showView(previousIndex, false, true); }

// Locates and fetches a specified element
function getElement(id) { return document.getElementById(id); }

// Gets the type of a specific element
function getElementType(id) { return (typeof getElement(id)); }

// Gets the value of a specific element
function getElementValue(id) { return getElement(id).value; }

// Creates an element instance
function createElement(type, id = "") {
    // Create a new element with given type
    let element = document.createElement(type);

    // If id is not empty, assign it
    if (id != "") element.setAttribute("id", id);

    // Return newly created element
    return element;
}

// Returns a boolean value based on the existance of substring
function stringContains(string, value) { return string.includes(value); }

/* (Temporarily unavailable)

// Loads constant valued scripts with specific options
function loadScripts() {
    /* Loops through all scripts from an array
     * and initializes given script at given index
     * with a true or false stated deferred option
     * /
    for (let i = 0; i < SCRIPT_PATHS.length; i++) {
        // Deferred boolean statement, default value is false
        let deferred = false;

        // Only if "DEFERRED_SCRIPTS" is greater than zero.
        if (DEFERRED_SCRIPTS.length > 0) {
            // Loops through constant deferred scripts
            for (let j = 0; j < DEFERRED_SCRIPTS; j++) {
                // Checks whether current script is deferred or not
                if (SCRIPT_PATHS[i] == DEFERRED_SCRIPTS[j] && 
                    DEFERRED_SCRIPTS[j] != null)
                    deferred = true;
            }
        }

        // Adds the script to the page
        include(SCRIPT_PATHS[i], deferred);
    }
}

/* Includes a specified script to the current webpage,
 * which can be accessed globally and locally
 * /
function include(uri, deferred = false) {
    // Creates a new script element, with mandatory options
    let script = document.createElement("script");

    // Default options
    script.src      = uri;
    script.type     = "text/javascript";
    script.defer    = deferred;

    // Appends the newly created element to the head element
    document.head.appendChild(script);
}

*/

// Redirects user to the main site or panel
function redirectToPage(page) { 
    // Constant url variable
    const currentUrl = document.location.href;

    // Removes hostname and folders from current url
    let fileName = currentUrl.split("/").slice(-1);

    // Replaces old filename with empty value
    let pagePath = currentUrl.replace(fileName, "");

    console.log(pagePath + page);

    // Redirects user to requested page
    document.location.href = `${pagePath}${page}.html`;
}

// Returns current page url
function getCurrentPage(fileName = false, removeFilePrefix = false) { 
    // Strip current url accordingly
    if (fileName) {
        // Removes hostname and folders from current url
        let page = (getCurrentPage().split("/").slice(-1))[0];

        // Removes prefix from file if true
        if (removeFilePrefix)
            page = page.replace(".html", "");

        // Return modified result
        return page;
    }

    // Return full url if fileName and removePrefix is false
    return document.location.href; 
}
