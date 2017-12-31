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
                "refresh-user-table"
            ],
            Functions: [
                () => addUserListener(),
                () => editUserListener(),
                () => deleteUserListener(),
                () => resetUserListener(),
                () => refreshUserTable()
            ],
            Type: [
                "click",
                "click",
                "click",
                "click",
                "click"
            ]
        }
    }
};