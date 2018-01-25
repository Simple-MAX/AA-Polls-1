/****************************************************
*                                                   *
*              AA-Polls - statistic.js              *
*                                                   *
*         Date of development : January 2018        *
*                                                   *
*       Copyrights @ https://github.com/BluDay      *
*                                                   *
*                      (o.0)                        *
*                                                   *
* /**************************************************
*/

/* Fetches relevant and requested polls in
 * string format and parses it with JSON.parse(),
 * then loops through and fetches the lowest value
 */
function getStatsMin(polls) {
    // Terminate if current user is not admin or super user
    if (currentUser.super_user != "1" &&
        currentUser.admin != "1") return;
    
    // TODO
}

/* Fetches relevant and requested polls in
 * string format and parses it with JSON.parse(),
 * then loops through and fetches the highest value
 */
function getStatsMax(polls) {
    // Terminate if current user is not admin or super user
    if (currentUser.super_user != "1" &&
        currentUser.admin != "1") return;
    
    // TODO
}

/* Fetches relevant and requested polls in
 * string format and parses it with JSON.parse(),
 * then loops through and fetches the "estimation_total" value
 */
function getStatsAverage(polls) {
    // Terminate if current user is not admin or super user
    if (currentUser.super_user != "1" &&
        currentUser.admin != "1") return;
    
    // TODO
}