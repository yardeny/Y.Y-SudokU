//************************************** Whole game container **************************************/ 

//Toggle screens (inside outter box)
const toggleScreens = (hideEle, nextEle, guest) => {

    //hides the present screen
    document.getElementById(hideEle).style.display = 'none';
    //animates ease-in next screen
    document.getElementById(nextEle).style.animation = 'showNextEle 1s ease-in-out';
    document.getElementById(nextEle).style.display = 'block';
    if (guest == 'guest') {
        document.getElementById('usernameSpan').innerHTML = 'Guest';
    }
}


//************************************** DB **************************************/ 
//Username DB
var usersDB = [{ username: 'abcd', password: '1234', email: 'abcd@abcd.com', securityQuestion: '1993' }];

//************************************** User and DB validations **************************************/ 

// Register Screen validation
function regiserValidation() {
    let regUsernameEle = document.getElementById('regUsername');
    let regPasswordEle = document.getElementById('regPassword');
    let regPasswordRepeatEle = document.getElementById('regPasswordRepeat');
    let regEmailEle = document.getElementById('regEmail');
    let securityQuestionEle = document.getElementById('securityQuestion');
    regUsernameEle.style.borderColor = 'initial';
    regPasswordEle.style.borderColor = 'initial';
    regPasswordRepeatEle.style.borderColor = 'initial';
    regEmailEle.style.borderColor = 'initial';
    securityQuestionEle.style.borderColor = 'initial';
    let flag = 0;
    debugger;
    //Username validation
    if (regUsernameEle.value == '') { //Empty username
        flag = 1;
        regUsernameEle.style.borderColor = 'red';
    } else if (regUsernameEle.value.length < 4 || regUsernameEle.value.length > 8) { //Username not between 4 and 8
        flag = 1;
        regUsernameEle.style.borderColor = 'red';
        regUsernameEle.value = '';
        regUsernameEle.placeholder = 'Must be between 4-8';
    }
    //Password validation
    if (regPasswordEle.value == '') { //Empty password
        flag = 1;
        regPasswordEle.style.borderColor = 'red';
    } else if (regPasswordEle.value.length < 4 || regPasswordEle.value.length > 8) { //Password not between 4 and 8
        flag = 1;
        regPasswordEle.style.borderColor = 'red';
        regPasswordEle.value = '';
        regPasswordEle.placeholder = 'Must be between 4-8';
    }
    //Re-enter password validation
    if (regPasswordRepeatEle.value != regPasswordEle.value) { //Password and repeat password do not match
        flag = 1;
        regPasswordRepeatEle.style.borderColor = 'red';
        regPasswordRepeatEle.placeholder = 'Password do not match';
        regPasswordRepeatEle.value = '';
        regPasswordEle.value = '';
    }
    //Email validation
    if (regEmailEle.value == '') { //Empty email
        flag = 1;
        regEmailEle.style.borderColor = 'red';
    } else if (regEmailEle.value.indexOf('@') == -1) { //Email do not contain @
        flag = 1;
        regEmailEle.style.borderColor = 'red';
        regEmailEle.placeholder = 'Email must contain "@"';
        regEmailEle.value = '';
    } else if (regEmailEle.value.indexOf('.') == -1) { //Email do no contain "."
        flag = 1;
        regEmailEle.style.borderColor = 'red';
        regEmailEle.placeholder = 'Email must contain "."';
        regEmailEle.value = '';
    }
    //security Question validation
    if (securityQuestionEle.value == '') { //Empty security question
        flag = 1;
        securityQuestionEle.style.borderColor = 'red';
    } else if (securityQuestionEle.value.length != 4) { //Security question is not 4 digits(cannot accept characters)
        flag = 1;
        securityQuestionEle.style.borderColor = 'red';
        securityQuestionEle.placeholder = 'Invalid year';
        securityQuestionEle.value = '';
    } else if (parseInt(securityQuestionEle.value) > 2015) { //Year is 2015 or more 
        flag = 1;
        securityQuestionEle.style.borderColor = 'red';
        securityQuestionEle.placeholder = 'Invalid year';
        securityQuestionEle.value = '';
    }
    //User validate & create
    let newUser = 1;
    if (flag == 0) {
        for (let i = 0; i < usersDB.length; i++) { //Runs over DB array
            if (regUsernameEle.value == usersDB[i].username) { //If username already exists
                regUsernameEle.style.borderColor = 'red';
                regUsernameEle.value = '';
                regUsernameEle.placeholder = 'User already exists';
                newUser = 0;
                break;
            }
            if (regEmailEle.value == usersDB[i].email) { //If email already exists
                regEmailEle.style.borderColor = 'red';
                regEmailEle.value = '';
                regEmailEle.placeholder = 'email already exists';
                newUser = 0;
                break;
            }
        }
        if (newUser == 1) { //If it is new user
            usersDB.push({ username: regUsernameEle.value, password: regPasswordEle.value, email: regEmailEle.value, securityQuestion: securityQuestion });
            toggleScreens('registerScr', 'loginScr');
            document.getElementById('usernameSpan').innerHTML = regUsernameEle.value; //Insert username to after login screen
            regEmailEle.value = '';
            regUsernameEle.value = '';
            securityQuestionEle.value = '';
            regPasswordRepeatEle.value = '';
            regPasswordEle.value = '';
        }
    }
}
//Forget Password 
function CheckForgetPass() {
    let usernameForgetEle = document.getElementById("usernameForget");
    let securityQuestionValidEle = document.getElementById("securityQuestionValid");
    let updPasswordEle = document.getElementById("updPassword");
    let updPasswordRepeatEle = document.getElementById("updPasswordRepeat");
    usernameForgetEle.style.borderColor = 'initial';
    securityQuestionValidEle.style.borderColor = 'initial';
    updPasswordEle.style.borderColor = 'initial';
    updPasswordRepeatEle.style.borderColor = 'initial';
    updPasswordRepeatEle.placeholder = 'Repeat password';
    securityQuestionValidEle.placeholder = 'Year of birth';
    updPasswordEle.placeholder = 'Password';
    usernameForgetEle.placeholder = 'Username';
    let forgetValid = 1;
    if (usernameForgetEle.value == '') { //If username is empty
        forgetValid = 0;
        usernameForgetEle.style.borderColor = 'red';
    }
    if (securityQuestionValidEle.value == '') { //If security question is empty
        forgetValid = 0;
        securityQuestionValidEle.style.borderColor = 'red';
    }
    if (updPasswordEle.value == '') { //If password is empty
        forgetValid = 0;
        updPasswordEle.style.borderColor = 'red';
    }
    if (updPasswordRepeatEle.value != updPasswordEle.value) { //Password and Repeat do not match
        forgetValid = 0;
        updPasswordRepeatEle.style.borderColor = 'red';
        updPasswordRepeatEle.value = '';
        updPasswordRepeatEle.placeholder = 'New password do not match';
    }
    if (updPasswordEle.value.length < 4 || updPasswordEle.value.length > 8) { //If not between 4-8
        forgetValid = 0;
        updPasswordEle.style.borderColor = 'red';
        updPasswordEle.value = '';
        updPasswordEle.placeholder = 'Not a valid passowrd';
        updPasswordRepeatEle.value = '';
    }
    if (forgetValid == 1) { //Date is possible
        let usernameIndex;
        for (let i = 0; i < usersDB.length; i++) { //Runs all over DB
            if (usernameForgetEle.value == usersDB[i].username) { //If user is found
                usernameIndex = i; //The index the user located at
            }
        }
        if (usernameIndex == null) { //User was not found in DB
            usernameForgetEle.style.borderColor = 'red';
            usernameForgetEle.value = '';
            usernameForgetEle.placeholder = 'Username does not exist';
        } else if (updPasswordEle.value == usersDB[usernameIndex].password) { //Password already exist in DB
            updPasswordEle.style.borderColor = 'red';
            updPasswordEle.value = '';
            updPasswordEle.placeholder = 'Password alredy set';
        } else if (securityQuestionValidEle.value == usersDB[usernameIndex].securityQuestion) { //Success login after valid security question
            usersDB[usernameIndex].password = updPassword.value;
            toggleScreens('forgetPassScr', 'loginScr');
            usernameForgetEle.value = '';
            securityQuestionValidEle.value = '';
            updPasswordEle.value = '';
            updPasswordRepeatEle.value = '';
        } else { //if security question do not match
            securityQuestionValidEle.style.borderColor = 'red';
            securityQuestionValidEle.value = '';
            securityQuestionValidEle.placeholder = 'Incorrect year';
        }
    }
}
//login page
function Login() {
    let userameLoginEle = document.getElementById("usernameLogin");
    let passwordLoginEle = document.getElementById("passwordLogin");
    userameLoginEle.style.borderColor = 'initial';
    passwordLoginEle.style.borderColor = 'initial';
    userameLoginEle.placeholder = 'Username';
    passwordLoginEle.placeholder = 'Password';
    let loginValid = 1;
    if (userameLoginEle.value == '') { //Empty username
        loginValid = 0;
        userameLoginEle.style.borderColor = 'red';
    }
    if (passwordLoginEle.value == '') { //Empty password
        loginValid = 0;
        passwordLoginEle.style.borderColor = 'red';
    }
    if (loginValid == 1) { //If possible user
        let usernameIndex;
        for (let i = 0; i < usersDB.length; i++) { //Runs all over DB
            if (userameLoginEle.value == usersDB[i].username) { //If user found
                usernameIndex = i;
            }
        }
        if (usernameIndex == null) { //If user was not found
            userameLoginEle.style.borderColor = 'red';
            userameLoginEle.value = '';
            userameLoginEle.placeholder = 'User does not exist';
            passwordLoginEle.value = '';
        } else if (passwordLoginEle.value == usersDB[usernameIndex].password) { //If password and user correct
            document.getElementById('usernameSpan').innerHTML = userameLoginEle.value.charAt(0).toUpperCase() + userameLoginEle.value.slice(1);
            toggleScreens('loginScr', 'afterLoginScr');
            userameLoginEle.value = '';
            userameLoginEle.placeholder = 'Username';
            passwordLoginEle.value = '';
            passwordLoginEle.placeholder = 'Password';
        } else { //If password do not match to the one at DB
            passwordLoginEle.style.borderColor = 'red';
            passwordLoginEle.value = '';
            passwordLoginEle.placeholder = 'Incorrect password';
        }
    }
}
/*HTML properties*/
//input accept only 1-9 and if length equal to 1 replace value to pressed 1-9 
function fillInputOnkey(inputVal, event, ID) {
    let clickedvalue = String.fromCharCode(event.charCode); //Wich value was clicked
    if (inputVal.value.length == 1 && event.charCode >= 49 && event.charCode <= 57) { //If key is 1-9 and length of 1
        document.getElementById(ID).value = clickedvalue; //delete last value and put the one clicked
        return false;
    } else if (event.charCode == 48) { //If clicked value is 0
        return false;
    } else if (event.charCode >= 42 && event.charCode <= 47) { //If clicked value is -,*,/,+,\,.
        return false;
    }
    return true;
}
/***********************************************SUDOKU TABLE FILLING  *******************************************************/
//Numbers config (avoided using magic numbers)
const numbers = {
    rows: 9,
    columns: 9,
    focusColor: '#4bc2c5',
    boardSize: 81
};
//********* Sudoku table filling backtracking
//Empty array 81 values
//Gives row index of the specific cell in the sudokuArray
function rowIndex(cellNumber) {
    return Math.floor(cellNumber / numbers.rows);
}
//Gives col index of the specific cell in the sudokuArray
function colIndex(cellNumber) {
    return Math.floor(cellNumber % numbers.columns);
}
//Gives box index of specific cell in the sudokuArray
function blockIndex(cellNumber) {
    return Math.floor(rowIndex(cellNumber) / 3) * 3 + Math.floor(colIndex(cellNumber) / 3);
}
//Checks if specific number can be placed inside a row
function checkRow(number, rowIndex, sudokuArray) {
    for (let i = 0; i < numbers.rows; i++) {
        if (sudokuArray[rowIndex * numbers.rows + i] == number) {
            return false;
        }
    }
    return true;
}
//Checks if specific number can be pleaced inside a column
function checkColumn(number, colIndex, sudokuArray) {
    for (let i = 0; i < numbers.columns; i++) {
        if (sudokuArray[colIndex + i * numbers.columns] == number) {
            return false;
        }
    }
    return true;
}
//Checks if specific number can be pleaced inside a block
function checkBlock(number, blockIndex, sudokuArray) {
    for (let i = 0; i < 9; i++) { //Runs on the 3*3 block
        if (sudokuArray[Math.floor(blockIndex / 3) * 27 + (i % 3) + numbers.rows * Math.floor(i / 3) + 3 * (blockIndex % 3)] == number) {
            return false;
        }
    }
    return true;
}
//Checks if specific number can be placed inside a specific cell
function possibleNumber(number, sudokuArray, rowI, colI, blockI) {
    return checkColumn(number, colI, sudokuArray) && checkBlock(number, blockI, sudokuArray); //Dont need to check row 
}
//Deletes row when iteration count is more then 50
function deleteRow(colI, cellIndex, sudokuArray) {
    for (let i = colI, j = 1; i > 0; i--, j++) {
        sudokuArray[cellIndex - j] = 0;
    }
    return sudokuArray;
}
//Deletes 3 rows when row is over 3 when iteration count is more then 50
function delete3Rows(colI, cellIndex, sudokuArray) {
    for (let i = colI + 18, j = 1; i >= 0; i--, j++) {
        sudokuArray[cellIndex - j] = 0;
    }
    return sudokuArray;
}
//Reset numbersToChooseFrom
function resetNumbersToChooseFrom() {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9];
}

//Generate a random index given the selected array (length 81 or length 9)
function getRandomIndex(max) {
    return Math.floor((Math.random() * max));
}
//Generates array between 0-80
function generateCellsToChooseFrom() {
    let array = [];
    for (let i = 0; i < numbers.boardSize; i++) {
        array.push(i);
    }
    return array;
}
//Generates empty sudoku with zeros.
function generateEmptySudokuArray() {
    let array = [];
    for (let i = 0; i < numbers.boardSize; i++) {
        array.push(0);
    }
    return array;
}
//placing the number and disable the input
function placeTheNumber(rowI, colI, generatedNumber) {
    const cellInputEle = document.getElementById('i' + rowI + colI);
    cellInputEle.value = generatedNumber; //Writes on HTML
    cellInputEle.style.background = '';
    cellInputEle.disabled = true;
    cellInputEle.setAttribute('type', 'number');
}
let difficultyHide = 20; //Default difficulty is Easy
//Removes random cells by difficulty (20,40,60) (activated after sudoku filled)
function removeCells() {
    let cellsToChooseFrom = generateCellsToChooseFrom();
    for (let i = difficultyHide; i > 0; i--) {
        let randomCellIndex = getRandomIndex(cellsToChooseFrom.length);
        let generatedCell = cellsToChooseFrom[randomCellIndex];
        cellsToChooseFrom.splice(randomCellIndex, 1);
        let rowI = rowIndex(generatedCell);
        let colI = colIndex(generatedCell);
        const selectedEle = document.getElementById('i' + rowI + colI);
        selectedEle.value = "";
        selectedEle.style.background = '#fff'
        selectedEle.disabled = false;
        selectedEle.addEventListener('keypress', function(event) {
            if (!fillInputOnkey(this, event, this.id)) {
                event.preventDefault();
            }
        });
        selectedEle.addEventListener('focus', function(event) {
            focusGuideLines(this.id);
            focusOnCell(this.id);
        });
        selectedEle.addEventListener('blur', function(event) {
            resetGuideLines();
            clearNotDisabled();
        });
    }
}
//Generate a valid sudoku table
function generateSudokuArray() {
    document.getElementById('correctSpan').style.display = 'none'; //Hide the check sudoku status
    let sudokuArray = generateEmptySudokuArray(); //Create empty sudoku array of 81 numbers equal to 0
    let numbersToChooseFrom;
    let cellFilled;
    let generatedNumber;
    let iterationsCount;
    let rowI;
    let colI;
    let blockI;
    let randomIndex;
    let totalIterationCount = 0;
    for (let cellIndex = 0; cellIndex < numbers.boardSize; cellIndex++) { //runs from 0 to 80 (81 numbers)
        cellFilled = 0; //Set flag to 0
        iterationsCount = 0; //Reset iterations that failed to 0 after placing a number.

        rowI = rowIndex(cellIndex); //Check the row index given a cellIndex
        colI = colIndex(cellIndex); //Check the column index given a cellIndex
        blockI = blockIndex(cellIndex); //Check the block index given a cellIndex(3*3)
        if (colI == 0) { //If moved to a new row or cellIndex is at 0.
            numbersToChooseFrom = resetNumbersToChooseFrom(); //Resets the numbers to choose from to 1-9
        }
        while (cellFilled == 0) { //As long as cell did not fill.
            randomIndex = getRandomIndex(numbersToChooseFrom.length); //Generate random index out of the remaining numbers to choose from.
            generatedNumber = numbersToChooseFrom[randomIndex]; //Gets the number with the random index.
            if (rowI == 0) { //If at row 0 dont make any validations.
                sudokuArray[cellIndex] = generatedNumber; //Place the generated number
                cellFilled = 1; //Flag to 1 in order to get out of the while loop.
                numbersToChooseFrom.splice(randomIndex, 1); //Removes the placed number from the numbers to choose from.
                placeTheNumber(rowI, colI, generatedNumber); //placing the number and disable
            } else if (possibleNumber(generatedNumber, sudokuArray, rowI, colI, blockI)) { //checks if number can be placed in column and block 
                sudokuArray[cellIndex] = generatedNumber; //Place the generated number
                cellFilled = 1; //Flag to 1 in order to get out of the while loop.-
                numbersToChooseFrom.splice(randomIndex, 1); //Removes the placed number from the numbers to choose from.
                placeTheNumber(rowI, colI, generatedNumber); //placing the number and disable
            } else if (iterationsCount > 50) { //If tried to place a number in cell more then 50 times
                if (rowI > 0 && rowI <= 3) { //Delete 1 row if row is between 1 to 3 (row 0 dont need to be deleted).
                    sudokuArray = deleteRow(colI, cellIndex, sudokuArray); //Deletes the row values
                    if (rowI == 3) {
                        cellIndex = 26; //Moves to the beggining of the row -1 (-1 because we go back to the for loop and cell index will be increased by 1)
                    } else if (rowI == 2) {
                        cellIndex = 17;
                    } else {
                        cellIndex = 8;
                    }
                    cellFilled = 1; //Sending out of the loop to reset the data
                } else { //Delete 3 rows
                    sudokuArray = delete3Rows(colI, cellIndex, sudokuArray); //Deletes 3 rows
                    cellIndex -= (colI + 19); //Moves to the beggining of the 3 rows deleted -1 (-1 because we reset loop again)
                    cellFilled = 1; //Sending out of the loop to reset the data
                }
            } else if (totalIterationCount > 100000) { //break function if over 100K tries (200 observations showed higher 78K tries)
                generateSudokuArray()
                break;
            } else {
                iterationsCount++; //Adds 1 to the iterations that failed
                totalIterationCount++; //Adds 1 to the total iteration that failed counts 
            }
        }
    }
    console.log(totalIterationCount);
    removeCells()
}
/***************************************************SUDOKU UX**************************************************************/
//Choose difficulty (update values and bgc)
function updateDifficulty(numberToHide) {
    let insideEasyButtonEle = document.getElementById('easyDiffBtn');
    let insideMedButtonEle = document.getElementById('mediumDiffBtn');
    let insideHardButtonEle = document.getElementById('hardDiffBtn');
    difficultyHide = numberToHide;
    if (numberToHide == 20) { //If selected easy reset the medium and hard
        insideEasyButtonEle.style.background = '#28a745';
        insideEasyButtonEle.style.color = '#fff';
        insideMedButtonEle.style.background = '#fff';
        insideMedButtonEle.style.color = '#ffc107';
        insideHardButtonEle.style.background = '#fff';
        insideHardButtonEle.style.color = '#dc3545';
    } else if (numberToHide == 40) { //If selected medium reset easy and hard
        insideMedButtonEle.style.background = '#ffc107';
        insideMedButtonEle.style.color = '#fff';
        insideEasyButtonEle.style.background = '#fff';
        insideEasyButtonEle.style.color = '#28a745';
        insideHardButtonEle.style.background = '#fff';
        insideHardButtonEle.style.color = '#dc3545';

    } else { //If selected hard reset easy and medium
        insideHardButtonEle.style.background = '#dc3545';
        insideHardButtonEle.style.color = '#fff';
        insideMedButtonEle.style.background = '#fff';
        insideMedButtonEle.style.color = '#ffc107';
        insideEasyButtonEle.style.background = '#fff';
        insideEasyButtonEle.style.color = '#28a745';
    }
}
//Toggle between hint state
let hintsState = true;

function toggleHints() {
    let hintsButtonEle = document.getElementById('hintsButton');
    if (hintsState == true) { //If hints are on deactivate
        hintsButtonEle.innerHTML = 'Hints are : Off';
        hintsButtonEle.style.borderColor = '#ef6c57';
        hintsButtonEle.style.background = '#ef6c57';
        hintsButtonEle.style.color = '#fff';
        hintsState = false;
    } else { //If hints are off activate
        hintsButtonEle.innerHTML = 'Hints are : On';
        hintsButtonEle.style.borderColor = '#28a745';
        hintsButtonEle.style.background = '#28a745';
        hintsButtonEle.style.color = '#fff';
        hintsState = true;
    }
}
//Moves all over not disabled inputs and clear (used for focusOnCell + when cell is out of focus)
function clearNotDisabled() {
    for (let row = 0; row < numbers.rows; row++) {
        for (let col = 0; col < numbers.columns; col++) {
            const cellId = 'i' + row + col;
            disabledValue = document.getElementById(cellId).getAttribute("disabled");
            if (disabledValue != '') {
                document.getElementById(cellId).style.background = '#fff';
            }
        }
    }
}
//Focus on specific cell (change color of specific color and change all not disabled cells bgc to white)
function focusOnCell(ID) {
    clearNotDisabled();
    document.getElementById(ID).style.background = '#caf2d7';
    document.getElementById('correctSpan').style.display = 'none';
}
//Reset GuideLines, change bgc to white
function resetGuideLines() {
    for (let row = 0; row < numbers.rows; row++) {
        for (let col = 0; col < numbers.columns; col++) {
            let cellId = 'c' + row + col;
            document.getElementById(cellId).style.background = '#fff';
        }
    }
}
//Given cellIndex, rowI, colI returns the blockIndex
function blockIndexDraw(cellNumber, rowI, colI) {
    return Math.floor(rowI / 3) * 3 + Math.floor(colI / 3);
}
//Focus on block,row and column (changes TD bgc)
function focusGuideLines(ID) {
    if (hintsState == true) {
        let rowI = parseInt(ID.slice(1, 2));
        let colI = parseInt(ID.slice(2, 3))
        let cellIndex = rowI * 9 + colI;
        let blockI = blockIndexDraw(cellIndex, rowI, colI);
        resetGuideLines();
        drawRowCells(rowI);
        drawColCells(colI);
        drawBlockCells(blockI);
    }
}
//Focus on row 
function drawRowCells(rowIndex) {
    for (let i = 0; i < numbers.rows; i++) {
        let cellId = 'c' + rowIndex + i;
        document.getElementById(cellId).style.background = numbers.focusColor;
    }
}

//Focus on column
function drawColCells(colIndex) {
    for (let i = 0; i < numbers.columns; i++) {
        let cellId = 'c' + i + colIndex;
        document.getElementById(cellId).style.background = numbers.focusColor;
    }
}

//Focus on block the 3*3
function drawBlockCells(blockIndex) {
    for (let i = 0; i < numbers.rows; i++) {
        let cellIndex = Math.floor(blockIndex / 3) * 27 + (i % 3) + 9 * Math.floor(i / 3) + 3 * (blockIndex % 3);
        let cellId = 'c' + rowIndex(cellIndex) + colIndex(cellIndex);
        document.getElementById(cellId).style.background = numbers.focusColor;
    }
}
//Close outter box with animation and reveals the soduku screen + animated Healine
const closeAndOpenSudoku = (cellsToHide, sudokuScreen) => {
        if (sudokuScreen != 'sudokuScreen') {
            let sudokuScrEle = document.getElementById('sudokuScr');
            document.getElementById('outterBoxId').style.animation = 'closeOutterBox 1s ease-in-out forwards';
            document.getElementById('afterLoginScr').style.display = 'none';
            sudokuScrEle.style.display = 'block';
            sudokuScrEle.style.animation = 'showNextEle 3s ease-in-out';
            document.getElementById('h1Headline').style.animation = 'moveHeadline 2s ease-in-out forwards';
        }
        updateDifficulty(cellsToHide); //Update the difficulty chosen at after login screen
        generateSudokuArray();
    }
    //Close the soduku screen and move back to main screen. animated headlines and outter box
function closeSoduku() {
    let wellcomeScrEle = document.getElementById('wellcomeScr');
    document.getElementById('sudokuScr').style.display = 'none';
    document.getElementById('outterBoxId').style.animation = 'openOutterBox 1s ease-in-out forwards';
    wellcomeScrEle.style.animation = 'showNextEle 1s ease-in-out';
    wellcomeScrEle.style.display = 'block';
    document.getElementById('h1Headline').style.animation = 'bringHeadline 2s ease-in-out forwards';
}

//////**********************************************SUDOKU VALIDATION****************************************************/
//Function that takes values in sudoku table and push it into 1-81 array.
function putSudokuInArray() {
    let checkedSudoku = [];
    for (let row = 0; row < numbers.rows; row++) {
        for (let col = 0; col < numbers.columns; col++) {
            let cellId = 'i' + row + col;
            if (document.getElementById(cellId).value != '') { //Dont push if input is empty
                checkedSudoku.push(document.getElementById('i' + row + col).value);
            }
        }
    }
    return checkedSudoku;
}
//Checks if specific row is completed and contain 1-9
function correctRow(row, checkedSudoku) {
    let validArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let tempArray = [];
    for (let i = 0; i < numbers.rows; i++) {
        tempArray[i] = checkedSudoku[row * numbers.rows + i];
    }
    tempArray.sort();
    return validArray.join() == tempArray.join();
}
//Checks if specific col is completed and contain 1-9
function correctCol(col, checkedSudoku) {
    let validArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let tempArray = [];
    for (let i = 0; i < numbers.columns; i++) {
        tempArray[i] = checkedSudoku[col + i * numbers.columns];
    }
    tempArray.sort();
    return tempArray.join() == validArray.join()
}
//Checks if specific block is completed and contain 1-9
function correctBlock(block, checkedSudoku) {
    let validArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let tempArray = [];
    for (let i = 0; i < numbers.rows; i++) {
        tempArray[i] = checkedSudoku[Math.floor(block / 3) * 27 + i % 3 + numbers.rows * Math.floor(i / 3) + 3 * (block % 3)];
    }
    tempArray.sort();
    return tempArray.join() == validArray.join();
}
//Checks if whole sudoku is solved
function solvedSudokuCheck() {
    let checkedSudoku = putSudokuInArray();
    let correctSpanEle = document.getElementById('correctSpan');
    if (checkedSudoku.length == numbers.boardSize) { //Checks that all inputs were filled (length of 81)
        for (let i = 0; i < numbers.rows; i++) { //runs 9 times over rows, columns and blocks
            if (!correctRow(i, checkedSudoku) || !correctCol(i, checkedSudoku) || !correctBlock(i, checkedSudoku)) {
                correctSpanEle.innerHTML = 'Sudoku is incorrect';
                correctSpanEle.style.color = '#dc3545';
            } else {
                correctSpanEle.innerHTML = 'Good Job! sudoku is correct';
                correctSpanEle.style.color = '#28a745';
            }
        }
    } else { //If checked sudoku length is not 81
        correctSpanEle.innerHTML = 'There are missing cells';
        correctSpanEle.style.color = '#dc3545';
    }
    correctSpanEle.style.display = 'block'; //Shows the message to the user
}