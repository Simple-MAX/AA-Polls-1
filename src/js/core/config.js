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
const MAIN_VIEW_INDEX = 0;

const SCRIPT_PATHS      = [];
const DEFERRED_SCRIPTS  = [];

const Listeners = {
    Pages: {
        Login: {
            Elements: [
                "login-submit",
                "password"
            ],
            Functions: [
                (e) => loginUserListener(e),
                function(e) {
                    if (e.keyCode == 13)
                        return loginUserListener(e);
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
                "edit-user-button"
            ],
            Functions: [
                (e) => addUserListener(e),
                (e) => editUserListener(e)
            ],
            Type: [
                "click",
                "click"
            ]
        }
    }
};