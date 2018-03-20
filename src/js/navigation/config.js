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
    Home: "home",
    Statistics: "statistics",
    Poll: "poll",
    CreatePoll: "create-poll"
};

const INITIAL_PANEL_PAGE = Pages.Users;

const DEFAULT_TAB_DATA = [["Tab", "index.html"]];

const DEFAULT_TABS_DATA = [
    ["User", "users.html"],
    ["Groups", "groups.html"],
    ["Statistics", "statistics.html"],
    ["Log out", () => logOutListener()],
];

const ADMIN_TABS_DATA = [
    ["Groups", "groups.html"],
    ["Statistics", "statistics.html"],
    ["Log out", () => logOutListener()],
];

const USER_TABS_DATA = [
    ["Home", "home.html"],
    ["Log out", () => logOutListener()],
];

// Regular variables
var currentPage;