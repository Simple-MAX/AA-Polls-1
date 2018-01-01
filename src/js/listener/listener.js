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
    
    // Adds listener to element with function
    element.addEventListener(type, (e) => func(e));
}

// Handles listeners for elements
function handleListeners(currentPage) {
    // Declares listener according to current page
    let currentListener;

    // Adds listener to elements for different pages
    switch (currentPage) {
        case Pages.Login:
            currentListener = Listeners.Pages.Login;
            break;
        case Pages.Users:
            currentListener = Listeners.Pages.Users;
            break;
    }

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
            refreshUserTable();

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

    console.log(values);

    // Terminate if password is not the same
    if (values[0] == "" && values[1] == "") {
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
            refreshUserTable();

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
            refreshUserTable();

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
            refreshUserTable();

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