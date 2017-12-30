/****************************************************
*                                                   *
*                AA-Polls - store.js                *
*                                                   *
*        Date of development : December 2017        *
*                                                   *
*       Copyrights @ https://github.com/BluDay      *
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
    // Current day plus one
    const date = new Date().getDate + 1;

    // Stores token in a cookie
    document.cookie = `token=${token}; expire=${date};`; 
}

// Checks whether an actual token exists, returns boolean
function tokenExists() {
    // Retrieves the token
    const token = getToken();

    // Return true boolean value
    if (!stringContains(token, "token=;") || 
        token != "" || token != null)
        return true;

    // Return opposite
    return false;
}