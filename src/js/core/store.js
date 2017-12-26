/****************************************************
*                                                   *
*                 BluDay - store.js                 *
*                                                   *
*           Developed by : Bachir Bouchemla         *
*                                                   *
*      Date of development : Late December 2017     *
*                                                   *
*         Copyrights @ MicroAA Labs | BluDay        *
*                                                   *
*                      (o.0)                        *
*                                                   *
* /**************************************************
*/

// Retrieves stored token from an actual and existing cookie
function getToken() { 
    // Gets the actual token
    let token = document.cookie;

    // If the token is not null and is string, proceed
    if (typeof token == "string" && token != null)
        return token.replace("token=", "").replace(";", "");

    // Returns null if token does not exist
    return null;
}

// Stores the given token in a cookie
function setToken(token) { 
    const date = new Date().getDate + 1;

    document.cookie = `token=${token}; expire=${date};`; 
}

// Checks whether an actual token exists, returns boolean
function tokenExists() {
    // Return true boolean value
    if (getToken() != "") return true;

    // Return opposite
    return false;
}