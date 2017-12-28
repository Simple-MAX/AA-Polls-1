/****************************************************
*                                                   *
*                BluDay - manage.js                 *
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

// Attempts to fetch all users based on current user status
function fetchUsers(token, callback) {
    // Creates a new array for possible parameters
    let params = {  };

    /* Gets the appropriate values and store them
     * according to a determined structure below
     */
    params.keys     = ["token", "fetch"];
    params.values   = [token, true];

    /* Executes an AJAX request (Vanilla JS, not jQuery)
     * with the given url, function contains optional arguments
     */
    let result = execAjaxRequest(`${API_URL}${endpoint.user}`, params);

    /* If result is an object type, it will return
     * some data with from the endpoint, regardless whether it's
     * successful or not. If not, it will return an error string.
     */
    if (typeof result == "object") {
        // If the result was successful and successfully authenticated, else
        if (result["success"] && result["data"] != null) {
            // Call a custom and passed function
            callback();

            // Return data that contains multiple users
            return result;
        }
    } else if (typeof result == "string") alert("Authentication failed");

    // Return nullified data
    return null;
}