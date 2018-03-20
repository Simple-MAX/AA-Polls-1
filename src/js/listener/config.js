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
const Listeners = {
    Pages: {
        Login: {
            Elements: [
                "login-submit",
                "password"
            ],
            Functions: [
                () => loginUserListener(),
                function(e) {
                    if (e.keyCode == 13)
                        return loginUserListener();
                    else
                        return null;
                }
            ],
            Type: [
                "click",
                "keyup"
            ]
        },
        Users: {
            Elements: [
                "add-user-button",
                "edit-user-button",
                "delete-user-button",
                "reset-user-button",
                "refresh-user-table-button"
            ],
            Functions: [
                () => addUserListener(),
                () => editUserListener(),
                () => deleteUserListener(),
                () => resetUserListener(),
                () => refreshUserTable("user-table")
            ],
            Type: [
                "click",
                "click",
                "click",
                "click",
                "click"
            ]
        },
        Groups: {
            Elements: [
                "add-group-button",
                "refresh-groups-button",
                "edit-group-users-button",
                "show-user-poll-button",
            ],
            Functions: [
                () => addGroupListener(),
                () => refreshGroups("groups-container"),
                () => editGroupUsersListener(),
                () => showUserPollListener()
            ],
            Type: [
                "click",
                "click",
                "click",
                "click"
            ]
        },
        CreatePoll: {
            Elements: [
                "create-poll",
            ],
            Functions: [
                () => createPollListener(),
            ],
            Type: [
                "click",
            ]
        },
        Poll: {
            Elements: [
                "submit-poll",
            ],
            Functions: [
                () => submitPollListener(),
            ],
            Type: [
                "click",
            ]
        },
        Home: {
            Elements: [
                "AA-P-T-1",
                "AA-P-T-2"
            ],
            Functions: [
                () => togglePollsTabListener("non-submitted"),
                () => togglePollsTabListener("submitted")
            ],
            Type: [
                "click",
                "click"
            ]
        },
    }
};