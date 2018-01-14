/****************************************************
*                                                   *
*               AA-Polls - listener.js              *
*                                                   *
*        Date of development : December 2017        *
*                                                   *
*       Copyrights @ https://github.com/BluDay      *
*                                                   *
*                      (o.0)                        *
*                                                   *
* /**************************************************
*/

// Adds on click functions to specified elements
function addListener(id, func, type = "click") {
    // Gets the element with id
    let element = getElement(id);

    // Terminate if element is non-existent
    if (element == null) return;
    
    // Adds listener to element with function
    element.addEventListener(type, (e) => func(e));
}

// Handles listeners for elements
function handleListeners(currentPage) {
    // Declares listener according to current page
    let currentListener = null;

    // Adds the log out button listener
    addListener("logout-button", logOutListener);

    // Adds listener to elements for different pages
    switch (currentPage) {
        case Pages.Login:
            currentListener = Listeners.Pages.Login;
            break;
        case Pages.Users:
            currentListener = Listeners.Pages.Users;
            break;
        case Pages.Groups:
            currentListener = Listeners.Pages.Groups;
            break;
        case Pages.CreatePoll:
            currentListener = Listeners.Pages.CreatePoll;
            break;
        case Pages.Statistics:
            currentListener = Listeners.Pages.Statistics;
            break;
        case Pages.Home:
            currentListener = Listeners.Pages.Home;
            break;
    }

    // Proceed only if currentListener is assigned
    if (currentListener != null) {
        // Adds listener and function to element
        for (let i = 0; i < currentListener.Elements.length; i++) {
            // Declare and assign current listener type
            let type = currentListener.Type[i];

            // Assign alternative value if not assigned
            if (type == null || type == undefined) type = "click";

            // Adds listener at last
            addListener(currentListener.Elements[i], currentListener.Functions[i], type);
        }
    }
}

// Adds user based on specific click
function addUserListener() {
    // Used to minimize and shortify this script
    let values = [ 
        getElementValue("add-name"),
        getElementValue("add-email"),
        getElementValue("add-pass"),
        getElementValue("add-pass-conf")
    ];

    // Terminate if password is not the same
    if (values[3] != values[2] && values[0] == "" && values[1] == "") {
        alert("Vänligen fyll i all fält korrekt");

        return;
    }
    
    // Adds login function to this function
    let result = registerUser(values[0], values[1], values[2]);

    // If result is successful, proceed, else alert user
    if (result != null) {
        // Re-render user table if succeeded
        if (result["success"]) {
            // Re-render actual user table
            refreshUserTable("user-table");

            // All popup boxes
            closeAllPopups();
        } else alert("Kunde inte lägga till användare");
    } else alert("Vänligen se till att fälten är giltiga");
}

// Edits user based on specific click
function editUserListener() { 
    // Used to minimize and shortify this script
    let values = [ 
        getElementValue("edit-name"),
        getElementValue("edit-email"),
        getElementValue("edit-token")
    ];

    // Terminate if password is not the same
    if (values[0] == "" && values[1] == "") {
        // Checks if token is not empty
        if (values[2] == "")
            alert("Kan inte redigera användare");
        else
            alert("Vänligen fyll i all fält korrekt");

        return;
    }
    
    // Adds login function to this function
    let result = editUser(values[0], values[1], values[2]);

    // If result is successful, proceed, else alert user
    if (result != null) {
        // Re-render user table if succeeded
        if (result["success"]) {
            // Re-render actual user table
            refreshUserTable("user-table");

            // All popup boxes
            closeAllPopups();
        } else alert("Kan inte redigera användare");
    } else alert("Kan inte redigera användare");
}

// Resets user password on given input and submission
function resetUserListener() { 
    // Used to minimize and shortify this script
    let values = [ 
        getElementValue("reset-pass"),
        getElementValue("reset-token")
    ];

    // Terminate if password is not the same
    if (values[0] == "") {
        if (values[1] == "") 
            alert("Kan inte återställa lösenord");
        else
            alert("Vänligen fyll i all fält korrekt");

        return;
    }
    
    // Adds login function to this function
    let result = resetUser(values[0], values[1]);

    // If result is successful, proceed, else alert user
    if (result != null) {
        // Re-render user table if succeeded
        if (result["success"]) {
            // Re-render actual user table
            refreshUserTable("user-table");

            // All popup boxes
            closeAllPopups();
        } else alert("Kan inte återställa lösenord");
    } else alert("Kan inte återställa lösenord");
}

// Deletes user on click
function deleteUserListener() {
    // Gets user token
    const token = getElementValue("edit-token");

    // Terminate if password is not the same
    if (token == "") {
        alert("Kan inte ta bort användare.");

        return;
    }
    
    // Adds login function to this function
    let result = deleteUser(token);

    // If result is successful, proceed, else alert user
    if (result != null) {
        // Re-render user table if succeeded
        if (result["success"]) {
            // Re-render actual user table
            refreshUserTable("user-table");

            // All popup boxes
            closeAllPopups();
        } else alert("Kunde inte ta bort användaren");
    } else alert("Kunde inte ta bort användaren");
}

// Adds login user listener to login button
function loginUserListener() {
    // Used to minimize and shortify this script
    let values = [ 
        getElementValue("email"),
        getElementValue("password") 
    ];

    // Adds login function to this function
    let result = loginUser(values[0], values[1], "");

    // If result is successful, proceed, else alert user
    if (result != null) {
        // Re-render user table if succeeded
        if (result["success"]) {
            // Handles user correctly
            handleCurrentUser(result);
        } else alert("Fel användarnamn eller lösenord");
    } else alert("Kunde inte logga in");
}

// Creates poll on click
function createPollListener() {
    /* Gets inserted data from all fields and
     * stores all values accordingly and carefully
     */
    createPollInsertedObject();

    // Terminate if poll object is null
    if (insertedCreatePollStructure == null) {
        alert("Kunde inte skapa formulär");

        return;
    }

    // Makes code shorter
    let poll = insertedCreatePollStructure;

    // Attempts to create and submit poll
    let result = createPoll(currentUser.token, poll);

    // If result is successful, proceed, else alert user
    if (result != null) {
        // Re-render user table if succeeded
        if (result["success"]) {
            // Redirects user back to group page
            redirectToPage(Pages.Groups);
        } else alert("Kunde inte skapa formulär");
    } else alert("Kunde inte skapa formulär");
}

// Adds a new group
function addGroupListener() {
    // Used to minimize and shortify this script
    let values = [ 
        getElementValue("add-group-title"),
        currentUser.token
    ];

    // Terminate if password is not the same
    if (values[0] == "" && values[1] != "") {
        alert("Vänligen fyll i all fält korrekt");

        return;
    }
    
    // Adds login function to this function
    let result = addGroup(values[0], values[1]);

    // If result is successful, proceed, else alert user
    if (result != null) {
        // Re-render user table if succeeded
        if (result["success"]) {
            // Re-render actual user table
            refreshGroups();

            // All popup boxes
            closeAllPopups();
        } else alert("Kunde inte lägga till grupp");
    } else alert("Kunde inte lägga till grupp");
}

// Adds a new group
function editGroupUsersListener() {
    // Fetches popup table element
    let popupTable = getElement("edit-group-users-table");

    // Gets the current group id
    const groupId = getElementValue("edit-users-group-id");

    // Declaration of selected users array
    let newUsers = [];

    // Loops through popup table
    for (let i = 0; i < popupTable.childNodes.length; i++) {
        // Skip the header
        if (i == 0) continue;

        // Current table row
        const row = popupTable.childNodes[i];

        // Gets and sets the current name text id
        const fullName = row.childNodes[0].innerHTML;

        // Current row user id variable
        let userId = null;
        
        // Gets row user id based on full name
        for (let j = 0; j < fetchedUsers.length; j++) {
            // Gets the full name of current user in iteration
            const currentFullName = `${fetchedUsers[j].first_name} ${fetchedUsers[j].last_name}`;

            // If row user was found, set row user id
            if (fullName == currentFullName) {
                // Sets row user id
                userId = fetchedUsers[j].id;

                // Exit loop and current iteration
                break;
            }
        }

        // Skip if row user id was not found
        if (userId == null) continue;

        // Adds the user if row is checked
        if (row.childNodes[1].childNodes[0].checked)
            newUsers.push(userId);
    }

    // Terminate if users array length is zero
    if (newUsers.length < 1) return;

    // Creates a group object for request
    let group = {
        id: groupId,
        user_ids: newUsers
    };

    // Used to minimize and shortify this script
    let values = [ 
        groupId,
        group,
        currentUser.token
    ];

    // Terminate if password is not the same
    if (values[0] == "" && values[1] != "") {
        alert("Vänligen fyll i all fält korrekt");

        return;
    }
    
    // Adds login function to this function
    let result = editGroupUsers(values[0], values[1], values[2]);

    // If result is successful, proceed, else alert user
    if (result != null) {
        // Re-render user table if succeeded
        if (result["success"]) {
            // Re-render actual user table
            refreshGroups();

            // All popup boxes
            closeAllPopups();
        } else alert("Kunde inte hantera användare");
    } else alert("Kunde inte hantera användare");
}

// Makes the user able to log out from current session
function logOutListener() {
    // Prompts the user to make a final decision
    if (confirm("Vill du verkligen logga ut?"))
        logOut();
}

// Toggle submitted and non submitted poll tabs
function togglePollTabListener(containerId) {
    // Gets current element class name
    let tabClassName = getElement(containerId).className;
    
    // Default class name
    let className = "group minimized";

    // Switch class if class is same as deafult
    if (tabClassName == className)
        className = "group active";

    // Changes class name
    changeElementClass(containerId, className);
} 