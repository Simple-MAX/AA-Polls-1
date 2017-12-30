/****************************************************
*                                                   *
*                AA-Polls - index.js                *
*                                                   *
*        Date of development : December 2017        *
*                                                   *
*       Copyrights @ https://github.com/BluDay      *
*                                                   *
*                      (o.0)                        *
*                                                   *
* /**************************************************
*/

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

    // Sets up all listeners
    handleListeners(currentPage);

    // Determines whether user is welcome or not
    if (token != "")
        quickAuth((result) => handleCurrentUser(result));
    else if (token == "" && currentPage != Pages.Login)
        redirectToPage(Pages.Login);

    // Proceed if user is not undefined or non-existent
    if (currentUserData != null) {
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

// Handles listeners for elements
function handleListeners(currentPage) {
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
    } else logOut();
}

// Fetches users, formats data and appends them to users table 
function loadUserTable() {
    // Fetches users and stores in a variable
    let users = fetchUsers(currentUserData.token);

    // Declaration of user table data
    let userTableData = [];

    // Column titles for head
    const headTitles = ["Namn", "Email", "Admin", "Superuser"];

    // Loops through each user and adds specific keys and values
    for (let i = 0; i < users.data.length; i++) {
        // Constant variable and value for current user in iteration
        const currentUser = users.data[i];

        // Values to append
        let valuesToAppend = [
            {
                values: {
                    value: `${currentUser.first_name} ${currentUser.last_name}`,
                    type: "text",
                    onclick: (id, obj) => alert("haha")
                }
            },
            {
                values: {
                    value: currentUser.email,
                    type: "text",
                    onclick: (id, obj) => null
                }
            },
            {
                values: {
                    value: currentUser.admin,
                    type: "checkbox",
                    onclick: (id, obj) => {
                        value = 0;

                        if (getElement(id).checked) value = 1;

                        if (currentUserData.super_user == "1")
                            changeUserType(currentUserData.token, currentUser.id, "Admin", value);
                    }
                }
            },
            {
                values: {
                    value: currentUser.super_user,
                    type: "checkbox",
                    onclick: (id, obj) => {
                        value = 0;

                        if (getElement(id).checked) value = 1;

                        if (currentUserData.super_user == "1")
                            changeUserType(currentUserData.token, currentUser.id, "SuperUser", value);
                    }
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

    // Return nothing if users is null
    if (users == null) {
        // Make user aware of progress failure
        alert("Could not fetch users, try again.");

        // Exit function
        return;
    }

    // Format users accordingly
    insertData("user-table", userTableData);
}

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