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
        case Pages.Poll:
            currentListener = Listeners.Pages.Poll;
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
        alert("Please fill in all fields correctly");

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
        } else alert("Could not add user");
    } else alert("Please ensure the fields are valid");
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
            alert("Unable to edit users");
        else
            alert("Please fill in all fields correctly");

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
        } else alert("Unable to edit users");
    } else alert("Unable to edit users");
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
            alert("Unable to reset password");
        else
            alert("Please fill in all fields correctly");

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
        } else alert("Unable to reset password");
    } else alert("Unable to reset password");
}

// Deletes user on click
function deleteUserListener() {
    // Gets user token
    const token = getElementValue("edit-token");

    // Terminate if password is not the same
    if (token == "") {
        alert("Unable to delete users.");

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
        } else alert("Could not remove user");
    } else alert("Could not remove user");
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
        } else alert("Wrong username or password");
    } else alert("Could not log in");
}

// Creates poll on click
function createPollListener() {
    /* Gets inserted data from all fields and
     * stores all values accordingly and carefully
     */
    sendPoll(false);

    // Makes code shorter
    let poll = insertedCreatePollStructure;

    // Terminate if poll object is null
    if (poll == null) {
        alert("Could not create forms");

        return;
    }

    // Attempts to create and submit poll
    let result = createPoll(currentUser.token, poll);

    // If result is successful, proceed, else alert user
    if (result != null) {
        // Re-render user table if succeeded
        if (result["success"]) {
            // Redirects user back to group page
            redirectToPage(Pages.Groups);
        } else alert("Could not create forms, try again");
    } else alert("Could not create forms, try again");
}

// Creates poll on click
function submitPollListener() {
    /* Gets inserted data from all fields and
     * stores all values accordingly and carefully
     */
    sendPoll(true);

    // Makes code shorter
    let poll = insertedCreatePollStructure;

    // Terminate if poll object is null
    if (poll == null) {
        alert("Could not create forms");

        return;
    }

    // Adds user id to poll
    poll["user_id"] = currentUser.id;

    // Creates poll data to submit
    let pollData = {
        id: poll.id,
        group_id: poll.group_id,
        poll: poll,
    };

    // Attempts to create and submit poll
    let result = submitPoll(currentUser.token, pollData);

    // If result is successful, proceed, else alert user
    if (result != null) {
        // Re-render user table if succeeded
        if (result["success"]) {
            // Redirects user back to group page
            redirectToPage(Pages.Home);
        } else alert("Could not send assessment, please try again");
    } else alert("Could not send assessment, please try again");
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
        alert("Please fill in all fields correctly");

        return;
    }
    
    // Adds login function to this function
    let result = addGroup(values[0], values[1]);

    // If result is successful, proceed, else alert user
    if (result != null) {
        // Re-render user table if succeeded
        if (result["success"]) {
            // Re-render actual user table
            refreshGroups("groups-container");

            // All popup boxes
            closeAllPopups();
        } else alert("Could not add group");
    } else alert("Could not add group");
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

        // Only used if super user was found
        let skip = false;
        
        // Gets row user id based on full name
        for (let j = 0; j < fetchedUsers.length; j++) {
            // Reset skip value
            skip = false;

            // Gets the user
            const user = fetchedUsers[j];

            // Exclude super users
            if (user.super_user == 1) skip = true;

            // Gets the full name of current user in iteration
            const currentFullName = `${user.first_name} ${user.last_name}`;

            // If row user was found, set row user id
            if (fullName == currentFullName) {
                // Sets row user id
                userId = user.id;

                // Exit loop and current iteration
                break;
            }
        }
        
        /* Skip if row user id was not found
         * or if skip boolean value is true
         */
        if (skip || userId == null) continue;

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
        alert("Please fill in all fields correctly");

        return;
    }
    
    // Adds login function to this function
    let result = editGroupUsers(values[0], values[1], values[2]);

    // If result is successful, proceed, else alert user
    if (result != null) {
        // Re-render user table if succeeded
        if (result["success"]) {
            // Re-render actual user table
            refreshGroups("groups-container");

            // All popup boxes
            closeAllPopups();
        } else alert("Unable to manage users");
    } else alert("Unable to manage users");
}

// Attempts to show selected user poll
function showUserPollListener() {
    // Gets the user polls picker element
    let userPollsPicker = getElement("user-polls-picker");

    // Gets selected user id
    let userId = getElement("show-user-polls-user-id").value;

    // Terminate if user polls picker
    if (userPollsPicker == null) return;

    // Gets the selected option and id
    let pollId = null;

    // Gets all children of select element
    const options = userPollsPicker.childNodes;

    // Loops through each element in user polls picker
    options.forEach(function(element) {
        // Checks only for elements with "option" as tag name
        if (element.tagName == "option".toUpperCase()) {
            // Checks whether element is selected or not
            if (element.selected != null && element.selected) {
                // Set poll id to element's innerHTML
                pollId = element.innerHTML;
            }
        }
    });

    // Terminate if poll or user id is undefined or null
    if (pollId == null || pollId == undefined) return;
    if (userId == null || userId == undefined) return;

    // Redirects admin or super user to user poll
    location.href = `poll.html?id=${pollId}&user_id=${userId}`;
}

// Makes the user able to log out from current session
function logOutListener() {
    // Prompts the user to make a final decision
    if (confirm("Do you really want to log out?"))
        logOut();
}

// Toggle submitted and non submitted poll tabs
function togglePollsTabListener(containerId) {
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

// Passes input value to some element
function passElementValueListener(e, targetId) {
    // Terminate if target id or event is empty
    if (targetId == "" || e == null) return;

    // Executes pass element value function
    passElementValue(e.target.id, targetId);
}