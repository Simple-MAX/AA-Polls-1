/****************************************************
*                                                   *
*                 AA-Polls - auth.js                *
*                                                   *
*        Date of development : December 2017        *
*                                                   *
*       Copyrights @ https://github.com/BluDay      *
*                                                   *
*                      (o.0)                        *
*                                                   *
* /**************************************************
*/

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

// Attempts to authenticate the user and executes a final action
function loginUser(email = "", password = "", token = "", callback = null) {
    // Data variable to return
    let data = null;

    // Creates a new array for possible parameters
    let params = {};
    
    /* Gets the appropriate values and store them
     * according to a determined structure below
     */
    if ((email != "" && password != "") || token != "") {
        if (email != "" && password != "") {
            params.keys     = ["email", "password"];
            params.values   = [email, password];
        } else if (email == "" && password == "" && token != "") {
            params.keys     = ["token"];
            params.values   = [token];
        }
    } else return data;

    /* Executes an AJAX request (Vanilla JS, not jQuery)
     * with the given url, function contains optional arguments
     */
    let result = request(USER_API_URL, params);

    /* If result is an object type, it will return
     * some data with from the endpoint, regardless whether it's
     * successful or not. If not, it will return an error string.
     */
    if (typeof result == "object") {
        // If the result was successful
        if (result["success"] && result["data"] != null) {
            /* Assign a global variable to the "data" object,
             * given from the current, finished request output
             */
            currentUser = result["data"];

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
    }

    // Assigns fetched data to data variable
    data = result;

    // Return fetched data
    return data;
}

// Token based authentication
function tokenAuthentication(token, callback) {
    /* Terminate authentication before 
     * hand if token is empty
     */
    if (token == "") return;

    // Returns user data
    return loginUser("", "", token, callback);
}

// Removes existing token and redirects user to login site
function logOut() {
    // Removes token
    setToken("");

    // Logs user out
    redirectToPage(Pages.Login);
}

// Handles the user by storing token and redirecting to the panel
function handleCurrentUser(result) {
    // Only if data or result is not null
    if (result != null) {
        // If data was successfully fetched from endpoint
        if (result.success) {
            /* Determines what sequence to to choose and execute,
            * depending on url location and current page
            */
            // Store current token with the newer one
            if (getToken() != currentUser.token)
                setToken(currentUser.token)

            // Sets the deafult user status value
            userStatus = UserType.SuperUser;

            // Determines what type user is
            if (currentUser.super_user != "1" && currentUser.admin != "1")
                userStatus = UserType.User;
            else if (currentUser.super_user != "1" && currentUser.admin == "1")
                userStatus = UserType.Admin;

            // If token is not null, redirect user
            if (currentUser.token != "" && currentPage == Pages.Login)
                redirectToPage(getInitialPage(userStatus));
        } else logOut();
    } else logOut();

    // Redirects user back if failed to authenticate
    if (currentUser.token == "" && currentPage != Pages.Login)
        redirectToPage(Pages.Login);
}