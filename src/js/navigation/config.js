/****************************************************
*                                                   *
*                AA-Polls - config.js               *
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
const Pages = {
    Login: "login",
    Users: "users",
    Groups: "groups",
    Statistics: "Statistics",
    Poll: "poll",
    PollManager: "poll-manager"
};

const INITIAL_PANEL_PAGE = Pages.Users;

// Regular Variables
var views = [];

var currentIndex    = 0;
var previousIndex   = 0;