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
    // Data variable to return
    let data;

    // Creates a new array for possible parameters
    let params = {};

    /* Gets the appropriate values and store them
     * according to a determined structure below
     */
    params.keys     = ["token", "fetch"];
    params.values   = [token, true];

    /* Executes an AJAX request (Vanilla JS, not jQuery)
     * with the given url, function contains optional arguments
     */
    let result = execAjaxRequest(USER_API_URL, params);

    /* If result is an object type, it will return
     * some data with from the endpoint, regardless whether it's
     * successful or not. If not, it will return an error string.
     */
    if (typeof result == "object") {
        // If the result was successful
        if (result["success"] && result["data"] != null) {
            // Stores fetched users locally
            fetchedUsersData = result["data"];

            // Call a custom and passed function
            callback();
        }

        // Assigns fetched data to data variable
        data = result;
    } else if (typeof result == "string") alert("Authentication failed");

    // Returns final data
    return data;
}