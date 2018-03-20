/****************************************************
*                                                   *
*                AA-Polls - config.js                *
*                                                   *
*        Date of development : December 2017        *
*                                                   *
*       Copyrights @ https://github.com/BluDay      *
*                                                   *
*                      (o.0)                        *
*                                                   *
* /**************************************************
*/

// Constant variables
const USER_API_URL = `${API_URL}${Endpoint.User}`;

const UserType = {
    SuperUser: "super_user",
    Admin: "admin",
    User: "user"
};

// Regular variables
var currentUser = {};

var fetchedUsers        = [];
var formattedTableUsers = [];

var userStatus = UserType.User;