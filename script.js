var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var startX;
var startY;
var x;
var y;
var delta = 80;
var sizeBlock = 80;
var limitStep;
var currentStep;
var levelCol;
var levelRow;
var currentLevel;
var levelNum = 1;
var keey;
var frames = 7;
var currentFrame = 0;
var currentLR = 0;
var audio = new Audio("sound/loop.mp3");
audio.loop = true;
audio.volume = 0.25;

/*
1)↓←←←↓←←→←↓←↓↓→→↑↑→→→→→→→
2)↑↑→↑↑↑↑→→→↓→→↓↓↓↓←←↓↓
3)←←←←←↓↓↓↓←←↑→→→→→→→→↑↑↑↑↑↑←←←
4)↓↓↓↓→→→→→↓↑↑↑↑←←↑↑↑↑→
5)↑↑↓←←↑↑→↓↓↓←←←↑↑↑↑→→↑→→→→↑↑→→↑↑↑←
*/
//подгрузка пикч
{
    var playerLeft = new Image();
    playerLeft.src = 'img/player_left.png';
    playerLeft.onload = function () { };

    var playerRight = new Image();
    playerRight.src = 'img/player_right.png';
    playerRight.onload = function () { };

    var trap_on = new Image();
    trap_on.src = 'img/trap_on.svg';
    trap_on.onload = function () { };

    var trap_off = new Image();
    trap_off.src = 'img/trap_off.svg';
    trap_off.onload = function () { };

    var mob = new Image();
    mob.src = 'img/mob.png';
    mob.onload = function () { };

    var box = new Image();
    box.src = 'img/box.png';
    box.onload = function () { };

    var room = new Image();
    room.src = 'img/room.png';
    room.onload = function () { };

    var keey = new Image();
    keey.src = 'img/key.svg';
    keey.onload = function () { };

    var lock = new Image();
    lock.src = 'img/lock.svg';
    lock.onload = function () { };

    var goal;
    var goals = new Array();

    var goal5 = new Image();
    goal5.src = 'img/goal5.png';
    goal5.onload = function () { goals.push(goal5); };

    var goal4 = new Image();
    goal4.src = 'img/goal4.png';
    goal4.onload = function () { goals.push(goal4); };

    var goal3 = new Image();
    goal3.src = 'img/goal3.png';
    goal3.onload = function () { goals.push(goal3); };

    var goal2 = new Image();
    goal2.src = 'img/goal2.png';
    goal2.onload = function () { goals.push(goal2); };

    var goal1 = new Image();
    goal1.src = 'img/goal1.png';
    goal1.onload = function () { goals.push(goal1); };

    var ffinal = new Image();
    ffinal.src = 'img/final.png';
    ffinal.onload = function () { };
}

/*ОСТАВЬ НАДЕЖДУ ВСЯК СЮДА ВХОДЯЩИЙ*/

//материалы 1 уровня
{
    var level_1 = [];
    var level_1_col = 9;
    var level_1_row = 8;
    for (var c = 0; c < level_1_col; c++) {
        level_1[c] = [];
        for (var r = 0; r < level_1_row; r++) {
            if (r == 0 || r == level_1_row - 1) {
                level_1[c][r] = { x: c * 80, y: r * 80, type: "Room" };
            }
            if (c == level_1_col - 1 || c == 0) {
                level_1[c][r] = { x: c * 80, y: r * 80, type: "Room" };
            }
        }
    }//карта
    function levelOne() {
        level_1[1][1] = { x: 1 * 80, y: 1 * 80, type: "Room" };
        level_1[2][1] = { x: 2 * 80, y: 1 * 80, type: "Room" };
        level_1[3][1] = { x: 3 * 80, y: 1 * 80, type: "Room" };
        level_1[4][1] = { x: 4 * 80, y: 1 * 80, type: "Room" };
        level_1[5][1] = { x: 5 * 80, y: 1 * 80, type: "Space" };
        level_1[6][1] = { x: startX, y: startY, type: "Space" };
        level_1[7][1] = { x: 7 * 80, y: 1 * 80, type: "Room" };

        level_1[1][2] = { x: 1 * 80, y: 2 * 80, type: "Room" };
        level_1[2][2] = { x: 2 * 80, y: 2 * 80, type: "Space" };
        level_1[3][2] = { x: 3 * 80, y: 2 * 80, type: "Space" };
        level_1[4][2] = { x: 4 * 80, y: 2 * 80, type: "Mob" };
        level_1[5][2] = { x: 5 * 80, y: 2 * 80, type: "Space" };
        level_1[6][2] = { x: 6 * 80, y: 2 * 80, type: "Space" };
        level_1[7][2] = { x: 7 * 80, y: 2 * 80, type: "Room" };

        level_1[1][3] = { x: 1 * 80, y: 3 * 80, type: "Room" };
        level_1[2][3] = { x: 2 * 80, y: 3 * 80, type: "Space" };
        level_1[3][3] = { x: 3 * 80, y: 3 * 80, type: "Mob" };
        level_1[4][3] = { x: 4 * 80, y: 3 * 80, type: "Space" };
        level_1[5][3] = { x: 5 * 80, y: 3 * 80, type: "Mob" };
        level_1[6][3] = { x: 6 * 80, y: 3 * 80, type: "Room" };
        level_1[7][3] = { x: 7 * 80, y: 3 * 80, type: "Room" };

        level_1[1][4] = { x: 1 * 80, y: 4 * 80, type: "Space" };
        level_1[2][4] = { x: 2 * 80, y: 4 * 80, type: "Space" };
        level_1[3][4] = { x: 3 * 80, y: 4 * 80, type: "Room" };
        level_1[4][4] = { x: 4 * 80, y: 4 * 80, type: "Room" };
        level_1[5][4] = { x: 5 * 80, y: 4 * 80, type: "Room" };
        level_1[6][4] = { x: 6 * 80, y: 4 * 80, type: "Room" };
        level_1[7][4] = { x: 7 * 80, y: 4 * 80, type: "Room" };

        level_1[1][5] = { x: 1 * 80, y: 5 * 80, type: "Space" };
        level_1[2][5] = { x: 2 * 80, y: 5 * 80, type: "Box" };
        level_1[3][5] = { x: 3 * 80, y: 5 * 80, type: "Space" };
        level_1[4][5] = { x: 4 * 80, y: 5 * 80, type: "Space" };
        level_1[5][5] = { x: 5 * 80, y: 5 * 80, type: "Box" };
        level_1[6][5] = { x: 6 * 80, y: 5 * 80, type: "Space" };
        level_1[7][5] = { x: 7 * 80, y: 5 * 80, type: "Room" };

        level_1[1][6] = { x: 1 * 80, y: 6 * 80, type: "Space" };
        level_1[2][6] = { x: 2 * 80, y: 6 * 80, type: "Box" };
        level_1[3][6] = { x: 3 * 80, y: 6 * 80, type: "Space" };
        level_1[4][6] = { x: 4 * 80, y: 6 * 80, type: "Box" };
        level_1[5][6] = { x: 5 * 80, y: 6 * 80, type: "Space" };
        level_1[6][6] = { x: 6 * 80, y: 6 * 80, type: "Space" };
        level_1[7][6] = { x: 7 * 80, y: 6 * 80, type: "Goal" };
        return level_1;
    }
}
//материалы 2 уровня
{
    var level_2 = [];
    var level_2_col = 9;
    var level_2_row = 8;
    for (var c = 0; c < level_2_col; c++) {
        level_2[c] = [];
        for (var r = 0; r < level_2_row; r++) {
            if (r == 0 || r == level_2_row - 1) {
                level_2[c][r] = { x: c * 80, y: r * 80, type: "Room" };
            }
            if (c == level_2_col - 1 || c == 0) {
                level_2[c][r] = { x: c * 80, y: r * 80, type: "Room" };
            }
        }
    }//карта
    function levelTwo() {
        level_2[1][1] = { x: 1 * 80, y: 1 * 80, type: "Room" };
        level_2[2][1] = { x: 2 * 80, y: 1 * 80, type: "Space" };
        level_2[3][1] = { x: 3 * 80, y: 1 * 80, type: "Space" };
        level_2[4][1] = { x: 4 * 80, y: 1 * 80, type: "Space" };
        level_2[5][1] = { x: 5 * 80, y: 1 * 80, type: "Space" };
        level_2[6][1] = { x: 6 * 80, y: 1 * 80, type: "Room" };
        level_2[7][1] = { x: 7 * 80, y: 1 * 80, type: "Room" };

        level_2[1][2] = { x: 1 * 80, y: 2 * 80, type: "Room" };
        level_2[2][2] = { x: 2 * 80, y: 2 * 80, type: "Mob" };
        level_2[3][2] = { x: 3 * 80, y: 2 * 80, type: "Room" };
        level_2[4][2] = { x: 4 * 80, y: 2 * 80, type: "Trap", status: 1, boxUp: 0 };
        level_2[5][2] = { x: 5 * 80, y: 2 * 80, type: "Trap", status: 1, boxUp: 0 };
        level_2[6][2] = { x: 6 * 80, y: 2 * 80, type: "Space" };
        level_2[7][2] = { x: 7 * 80, y: 2 * 80, type: "Space" };

        level_2[1][3] = { x: 1 * 80, y: 3 * 80, type: "Space" };
        level_2[2][3] = { x: 2 * 80, y: 3 * 80, type: "Trap", status: 1, boxUp: 0 };
        level_2[3][3] = { x: 3 * 80, y: 3 * 80, type: "Room" };
        level_2[4][3] = { x: 4 * 80, y: 3 * 80, type: "Room" };
        level_2[5][3] = { x: 5 * 80, y: 3 * 80, type: "Trap", status: 1, boxUp: 1 };
        level_2[6][3] = { x: 6 * 80, y: 3 * 80, type: "Trap", status: 1, boxUp: 1 };
        level_2[7][3] = { x: 7 * 80, y: 3 * 80, type: "Box" };

        level_2[1][4] = { x: 1 * 80, y: 4 * 80, type: "Space" };
        level_2[2][4] = { x: 2 * 80, y: 4 * 80, type: "Space" };
        level_2[3][4] = { x: 3 * 80, y: 4 * 80, type: "Room" };
        level_2[4][4] = { x: 4 * 80, y: 4 * 80, type: "Room" };
        level_2[5][4] = { x: 5 * 80, y: 4 * 80, type: "Space" };
        level_2[6][4] = { x: 6 * 80, y: 4 * 80, type: "Trap", status: 1, boxUp: 0 };
        level_2[7][4] = { x: 7 * 80, y: 4 * 80, type: "Space" };

        level_2[1][5] = { x: 1 * 80, y: 5 * 80, type: "Space" };
        level_2[2][5] = { x: 2 * 80, y: 5 * 80, type: "Space" };
        level_2[3][5] = { x: 3 * 80, y: 5 * 80, type: "Room" };
        level_2[4][5] = { x: 4 * 80, y: 5 * 80, type: "Room" };
        level_2[5][5] = { x: 5 * 80, y: 5 * 80, type: "Space" };
        level_2[6][5] = { x: 6 * 80, y: 5 * 80, type: "Mob" };
        level_2[7][5] = { x: 7 * 80, y: 5 * 80, type: "Space" };

        level_2[1][6] = { x: 1 * 80, y: 6 * 80, type: "Room" };
        level_2[2][6] = { x: 2 * 80, y: 6 * 80, type: "Room" };
        level_2[3][6] = { x: 3 * 80, y: 6 * 80, type: "Room" };
        level_2[4][6] = { x: 4 * 80, y: 6 * 80, type: "Room" };
        level_2[5][6] = { x: 5 * 80, y: 6 * 80, type: "Goal" };
        level_2[6][6] = { x: 6 * 80, y: 6 * 80, type: "Space" };
        level_2[7][6] = { x: 7 * 80, y: 6 * 80, type: "Mob" };
        return level_2;
    }
}
//материалы 3 уровня
{
    var level_3 = [];
    var level_3_col = 10;
    var level_3_row = 9;
    for (var c = 0; c < level_3_col; c++) {
        level_3[c] = [];
        for (var r = 0; r < level_3_row; r++) {
            if (r == 0 || r == level_3_row - 1) {
                level_3[c][r] = { x: c * 80, y: r * 80, type: "Room" };
            }
            if (c == level_3_col - 1 || c == 0) {
                level_3[c][r] = { x: c * 80, y: r * 80, type: "Room" };
            }
        }
    }//карта
    function levelThree() {
        level_3[1][1] = { x: 1 * 80, y: 1 * 80, type: "Room" };
        level_3[2][1] = { x: 2 * 80, y: 1 * 80, type: "Room" };
        level_3[3][1] = { x: 3 * 80, y: 1 * 80, type: "Room" };
        level_3[4][1] = { x: 4 * 80, y: 1 * 80, type: "Goal" };
        level_3[5][1] = { x: 5 * 80, y: 1 * 80, type: "Space" };
        level_3[6][1] = { x: 6 * 80, y: 1 * 80, type: "Space" };
        level_3[7][1] = { x: 7 * 80, y: 1 * 80, type: "Space" };
        level_3[8][1] = { x: 8 * 80, y: 1 * 80, type: "Room" };

        level_3[1][2] = { x: 1 * 80, y: 2 * 80, type: "Room" };
        level_3[2][2] = { x: 2 * 80, y: 2 * 80, type: "Room" };
        level_3[3][2] = { x: 3 * 80, y: 2 * 80, type: "Room" };
        level_3[4][2] = { x: 4 * 80, y: 2 * 80, type: "Room" };
        level_3[5][2] = { x: 5 * 80, y: 2 * 80, type: "Room" };
        level_3[6][2] = { x: 6 * 80, y: 2 * 80, type: "Room" };
        level_3[7][2] = { x: 7 * 80, y: 2 * 80, type: "Lock" };
        level_3[8][2] = { x: 8 * 80, y: 2 * 80, type: "Room" };

        level_3[1][3] = { x: 1 * 80, y: 3 * 80, type: "Room" };
        level_3[2][3] = { x: 2 * 80, y: 3 * 80, type: "Room" };
        level_3[3][3] = { x: 3 * 80, y: 3 * 80, type: "Space" };
        level_3[4][3] = { x: 4 * 80, y: 3 * 80, type: "Trap", status: 1, boxUp: 0 };
        level_3[5][3] = { x: 5 * 80, y: 3 * 80, type: "Trap", status: 1, boxUp: 0 };
        level_3[6][3] = { x: 6 * 80, y: 3 * 80, type: "Space" };
        level_3[7][3] = { x: 7 * 80, y: 3 * 80, type: "Space" };
        level_3[8][3] = { x: 8 * 80, y: 3 * 80, type: "Space" };

        level_3[1][4] = { x: 1 * 80, y: 4 * 80, type: "Room" };
        level_3[2][4] = { x: 2 * 80, y: 4 * 80, type: "Room" };
        level_3[3][4] = { x: 3 * 80, y: 4 * 80, type: "Trap", status: 1, boxUp: 0 };
        level_3[4][4] = { x: 4 * 80, y: 4 * 80, type: "Room" };
        level_3[5][4] = { x: 5 * 80, y: 4 * 80, type: "Trap", status: 1, boxUp: 0 };
        level_3[6][4] = { x: 6 * 80, y: 4 * 80, type: "Room" };
        level_3[7][4] = { x: 7 * 80, y: 4 * 80, type: "Space" };
        level_3[8][4] = { x: 8 * 80, y: 4 * 80, type: "Space" };

        level_3[1][5] = { x: 1 * 80, y: 5 * 80, type: "Room" };
        level_3[2][5] = { x: 2 * 80, y: 5 * 80, type: "Room" };
        level_3[3][5] = { x: 3 * 80, y: 5 * 80, type: "Space" };
        level_3[4][5] = { x: 4 * 80, y: 5 * 80, type: "Space" };
        level_3[5][5] = { x: 5 * 80, y: 5 * 80, type: "Mob" };
        level_3[6][5] = { x: 6 * 80, y: 5 * 80, type: "Trap", status: 1, boxUp: 0 };
        level_3[7][5] = { x: 7 * 80, y: 5 * 80, type: "Trap", status: 1, boxUp: 0 };
        level_3[8][5] = { x: 8 * 80, y: 5 * 80, type: "Room" };

        level_3[1][6] = { x: 1 * 80, y: 6 * 80, type: "Key" };
        level_3[2][6] = { x: 2 * 80, y: 6 * 80, type: "Room" };
        level_3[3][6] = { x: 3 * 80, y: 6 * 80, type: "Trap", status: 1, boxUp: 0 };
        level_3[4][6] = { x: 4 * 80, y: 6 * 80, type: "Room" };
        level_3[5][6] = { x: 5 * 80, y: 6 * 80, type: "Trap", status: 1, boxUp: 0 };
        level_3[6][6] = { x: 6 * 80, y: 6 * 80, type: "Room" };
        level_3[7][6] = { x: 7 * 80, y: 6 * 80, type: "Space" };
        level_3[8][6] = { x: 8 * 80, y: 6 * 80, type: "Room" };

        level_3[1][7] = { x: 1 * 80, y: 7 * 80, type: "Space" };
        level_3[2][7] = { x: 2 * 80, y: 7 * 80, type: "Space" };
        level_3[3][7] = { x: 3 * 80, y: 7 * 80, type: "Space" };
        level_3[4][7] = { x: 4 * 80, y: 7 * 80, type: "Space" };
        level_3[5][7] = { x: 5 * 80, y: 7 * 80, type: "Space" };
        level_3[6][7] = { x: 6 * 80, y: 7 * 80, type: "Mob" };
        level_3[7][7] = { x: 7 * 80, y: 7 * 80, type: "Space" };
        level_3[8][7] = { x: 8 * 80, y: 7 * 80, type: "Room" };
        return level_3;
    }
}
//материалы 4 уровня
{
    var level_4 = [];
    var level_4_col = 8;
    var level_4_row = 9;
    for (var c = 0; c < level_4_col; c++) {
        level_4[c] = [];
        for (var r = 0; r < level_4_row; r++) {
            if (r == 0 || r == level_4_row - 1) {
                level_4[c][r] = { x: c * 80, y: r * 80, type: "Room" };
            }
            if (c == level_4_col - 1 || c == 0) {
                level_4[c][r] = { x: c * 80, y: r * 80, type: "Room" };
            }
        }
    }//карта
    function levelFour() {
        level_4[1][1] = { x: 1 * 80, y: 1 * 80, type: "Room" };
        level_4[2][1] = { x: 2 * 80, y: 1 * 80, type: "Room" };
        level_4[3][1] = { x: 3 * 80, y: 1 * 80, type: "Room" };
        level_4[4][1] = { x: 4 * 80, y: 1 * 80, type: "Space" };
        level_4[5][1] = { x: 5 * 80, y: 1 * 80, type: "Goal" };
        level_4[6][1] = { x: 6 * 80, y: 1 * 80, type: "Room" };

        level_4[1][2] = { x: 1 * 80, y: 2 * 80, type: "Room" };
        level_4[2][2] = { x: 2 * 80, y: 2 * 80, type: "Room" };
        level_4[3][2] = { x: 3 * 80, y: 2 * 80, type: "Space" };
        level_4[4][2] = { x: 4 * 80, y: 2 * 80, type: "Lock" };
        level_4[5][2] = { x: 5 * 80, y: 2 * 80, type: "Box" };
        level_4[6][2] = { x: 6 * 80, y: 2 * 80, type: "Space" };

        level_4[1][3] = { x: 1 * 80, y: 3 * 80, type: "Space" };
        level_4[2][3] = { x: 2 * 80, y: 3 * 80, type: "Room" };
        level_4[3][3] = { x: 3 * 80, y: 3 * 80, type: "Trap", status: -1, boxUp: 0 };
        level_4[4][3] = { x: 4 * 80, y: 3 * 80, type: "Space" };
        level_4[5][3] = { x: 5 * 80, y: 3 * 80, type: "Box" };
        level_4[6][3] = { x: 6 * 80, y: 3 * 80, type: "Space" };

        level_4[1][4] = { x: 1 * 80, y: 4 * 80, type: "Space" };
        level_4[2][4] = { x: 2 * 80, y: 4 * 80, type: "Room" };
        level_4[3][4] = { x: 3 * 80, y: 4 * 80, type: "Space" };
        level_4[4][4] = { x: 4 * 80, y: 4 * 80, type: "Trap", status: -1, boxUp: 0 };
        level_4[5][4] = { x: 5 * 80, y: 4 * 80, type: "Space" };
        level_4[6][4] = { x: 6 * 80, y: 4 * 80, type: "Trap", status: -1, boxUp: 0 };

        level_4[1][5] = { x: 1 * 80, y: 5 * 80, type: "Space" };
        level_4[2][5] = { x: 2 * 80, y: 5 * 80, type: "Room" };
        level_4[3][5] = { x: 3 * 80, y: 5 * 80, type: "Box" };
        level_4[4][5] = { x: 4 * 80, y: 5 * 80, type: "Box" };
        level_4[5][5] = { x: 5 * 80, y: 5 * 80, type: "Box" };
        level_4[6][5] = { x: 6 * 80, y: 5 * 80, type: "Box" };

        level_4[1][6] = { x: 1 * 80, y: 6 * 80, type: "Trap", status: -1, boxUp: 0 };
        level_4[2][6] = { x: 2 * 80, y: 6 * 80, type: "Space" };
        level_4[3][6] = { x: 3 * 80, y: 6 * 80, type: "Trap", status: -1, boxUp: 0 };
        level_4[4][6] = { x: 4 * 80, y: 6 * 80, type: "Space" };
        level_4[5][6] = { x: 5 * 80, y: 6 * 80, type: "Space" };
        level_4[6][6] = { x: 6 * 80, y: 6 * 80, type: "Trap", status: -1, boxUp: 0 };

        level_4[1][7] = { x: 1 * 80, y: 7 * 80, type: "Room" };
        level_4[2][7] = { x: 2 * 80, y: 7 * 80, type: "Room" };
        level_4[3][7] = { x: 3 * 80, y: 7 * 80, type: "Room" };
        level_4[4][7] = { x: 4 * 80, y: 7 * 80, type: "Room" };
        level_4[5][7] = { x: 5 * 80, y: 7 * 80, type: "Room" };
        level_4[6][7] = { x: 6 * 80, y: 7 * 80, type: "Key" };
        return level_4;
    }
}
//материалы 5 уровня
{
    var level_5 = [];
    var level_5_col = 8;
    var level_5_row = 9;
    for (var c = 0; c < level_5_col; c++) {
        level_5[c] = [];
        for (var r = 0; r < level_5_row; r++) {
            if (r == 0 || r == level_5_row - 1) {
                level_5[c][r] = { x: c * 80, y: r * 80, type: "Room" };
            }
            if (c == level_5_col - 1 || c == 0) {
                level_5[c][r] = { x: c * 80, y: r * 80, type: "Room" };
            }
        }
    }//карта
    function levelFive() {
        level_5[1][1] = { x: 1 * 80, y: 1 * 80, type: "Room" };
        level_5[2][1] = { x: 2 * 80, y: 1 * 80, type: "Room" };
        level_5[3][1] = { x: 3 * 80, y: 1 * 80, type: "Room" };
        level_5[4][1] = { x: 4 * 80, y: 1 * 80, type: "Goal" };
        level_5[5][1] = { x: 5 * 80, y: 1 * 80, type: "Space" };
        level_5[6][1] = { x: 6 * 80, y: 1 * 80, type: "Room" };

        level_5[1][2] = { x: 1 * 80, y: 2 * 80, type: "Room" };
        level_5[2][2] = { x: 2 * 80, y: 2 * 80, type: "Room" };
        level_5[3][2] = { x: 3 * 80, y: 2 * 80, type: "Room" };
        level_5[4][2] = { x: 4 * 80, y: 2 * 80, type: "Space" };
        level_5[5][2] = { x: 5 * 80, y: 2 * 80, type: "Lock" };
        level_5[6][2] = { x: 6 * 80, y: 2 * 80, type: "Space" };

        level_5[1][3] = { x: 1 * 80, y: 3 * 80, type: "Space" };
        level_5[2][3] = { x: 2 * 80, y: 3 * 80, type: "Key" };
        level_5[3][3] = { x: 3 * 80, y: 3 * 80, type: "Room" };
        level_5[4][3] = { x: 4 * 80, y: 3 * 80, type: "Box" };
        level_5[5][3] = { x: 5 * 80, y: 3 * 80, type: "Box" };
        level_5[6][3] = { x: 6 * 80, y: 3 * 80, type: "Box" };

        level_5[1][4] = { x: 1 * 80, y: 4 * 80, type: "Mob" };
        level_5[2][4] = { x: 2 * 80, y: 4 * 80, type: "Box" };
        level_5[3][4] = { x: 3 * 80, y: 4 * 80, type: "Space" };
        level_5[4][4] = { x: 4 * 80, y: 4 * 80, type: "Mob" };
        level_5[5][4] = { x: 5 * 80, y: 4 * 80, type: "Box" };
        level_5[6][4] = { x: 6 * 80, y: 4 * 80, type: "Space" };

        level_5[1][5] = { x: 1 * 80, y: 5 * 80, type: "Space" };
        level_5[2][5] = { x: 2 * 80, y: 5 * 80, type: "Room" };
        level_5[3][5] = { x: 3 * 80, y: 5 * 80, type: "Mob" };
        level_5[4][5] = { x: 4 * 80, y: 5 * 80, type: "Space" };
        level_5[5][5] = { x: 5 * 80, y: 5 * 80, type: "Space" };
        level_5[6][5] = { x: 6 * 80, y: 5 * 80, type: "Space" };

        level_5[1][6] = { x: 1 * 80, y: 6 * 80, type: "Trap", status: 1, boxUp: 0 };
        level_5[2][6] = { x: 2 * 80, y: 6 * 80, type: "Room" };
        level_5[3][6] = { x: 3 * 80, y: 6 * 80, type: "Room" };
        level_5[4][6] = { x: 4 * 80, y: 6 * 80, type: "Trap", status: -1, boxUp: 0 };
        level_5[5][6] = { x: 5 * 80, y: 6 * 80, type: "Room" };
        level_5[6][6] = { x: 6 * 80, y: 6 * 80, type: "Room" };

        level_5[1][7] = { x: 1 * 80, y: 7 * 80, type: "Trap", status: -1, boxUp: 0 };
        level_5[2][7] = { x: 2 * 80, y: 7 * 80, type: "Trap", status: 1, boxUp: 0 };
        level_5[3][7] = { x: 3 * 80, y: 7 * 80, type: "Trap", status: -1, boxUp: 0 };
        level_5[4][7] = { x: 4 * 80, y: 7 * 80, type: "Trap", status: 1, boxUp: 0 };
        level_5[5][7] = { x: 5 * 80, y: 7 * 80, type: "Room" };
        level_5[6][7] = { x: 6 * 80, y: 7 * 80, type: "Room" };
        return level_5;
    }
}
document.addEventListener("keydown", keyDownHandler, false);

function game() {
    ctx.font = "bold 100px arial";
    ctx.textAlign = "center";
    ctx.fillText("Собери ректор", 560, 250);
    ctx.font = "50px arial";
    ctx.fillText("Для старта нажмите Space", 560, 500);
    ctx.font = "15px arial";
    ctx.fillText("подсказки по прохождению в начале js кода", 560, 790);
}
function startPlay() {
    audio.play();
}
function stopPlay() {
    audio.pause();
}
function volP() {
    audio.volume += 0.05;
}
function volM() {
    audio.volume -= 0.05;
}
function resLvl() {
    if (levelNum == 1) {
        startLevelOne();
    } else if (levelNum == 2) {
        startLevelTwo();
    } else if (levelNum == 3) {
        startLevelThree();
    } else if (levelNum == 4) {
        startLevelFour();
    } else if (levelNum == 5) {
        startLevelFive();
    } else if (levelNum == 6) {
        x -= 30;
        y -= 1;
        canvas.setAttribute("width", 1120);
        canvas.setAttribute("height", 800);
        ctx.drawImage(ffinal, 50, 150);
        ctx.font = "50px arial";
        ctx.fillText("Вы собрали реактор!", 550, 390);
    }
}
function startLevelOne() {
    limitStep = 24;
    currentStep = 0;
    startX = 480;
    startY = 80;
    x = startX;
    y = startY;
    currentLevel = levelOne();
    levelNum = 1;
    levelCol = level_1_col;
    levelRow = level_1_row;
    goal = goals[0];
    draw(levelOne(), levelCol, levelRow, x, y);
}
function startLevelTwo() {
    limitStep = 25;
    currentStep = 0;
    startX = 80;
    startY = 400;
    x = startX;
    y = startY;
    currentLevel = levelTwo();
    levelNum = 2;
    levelCol = level_2_col;
    levelRow = level_2_row;
    goal = goals[1];
    draw(levelTwo(), levelCol, levelRow, x, y);
}
function startLevelThree() {
    limitStep = 35;
    currentStep = 0;
    key = 0;
    startX = 640;
    startY = 240;
    x = startX;
    y = startY;
    currentLevel = levelThree();
    levelNum = 3;
    levelCol = level_3_col;
    levelRow = level_3_row;
    goal = goals[2];
    draw(levelThree(), levelCol, levelRow, x, y);
}
function startLevelFour() {
    limitStep = 25;
    currentStep = 0;
    key = 0;
    startX = 80;
    startY = 240;
    x = startX;
    y = startY;
    currentLevel = levelFour();
    levelNum = 4;
    levelCol = level_4_col;
    levelRow = level_4_row;
    goal = goals[3];
    draw(levelFour(), levelCol, levelRow, x, y);
}
function startLevelFive() {
    limitStep = 33;
    currentStep = 0;
    key = 0;
    startX = 480;
    startY = 400;
    x = startX;
    y = startY;
    currentLevel = levelFive();
    levelNum = 5;
    levelCol = level_5_col;
    levelRow = level_5_row;
    goal = goals[4];
    draw(levelFive(), levelCol, levelRow, x, y);
}
function keyDownHandler(e) {
    if (e.keyCode == 27 && currentLevel != null) {
        resLvl();
    } else if ((e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) && currentLevel != null) {
        checkMove(e.keyCode, currentLevel);
    } if (e.keyCode == 32) {
        audio.play();
        resLvl();
    }
}
var up, upUp;
var left, leftLeft;
var right, rightRight;
var down, downDown;
function checkMove(kCode, level) {//вся логика взаимодействия
    if (kCode == 37) {//влево
        left = level[x / 80 - 1][y / 80];
        if (left.type == "Space" || (left.type == "Trap" && left.boxUp != 1)) {//влево пусто
            ctx.clearRect(x, y, sizeBlock, sizeBlock);
            x -= delta;
            currentLR = 1;
            currentStep += 1;
            drawTraps();
        } else if (left.type == "Goal") {//влево цель
            alert("Уровень пройден!");
            levelNum += 1;
            resLvl();
        } else if (left.type == "Mob") {//влево моб
            leftLeft = level[x / 80 - 2][y / 80];
            if (leftLeft.type == "Space") {//за мобом пусто
                drawObj(leftLeft.x, leftLeft.y, "Mob");
                ctx.clearRect(left.x, left.y, sizeBlock, sizeBlock);
                level[x / 80 - 2][y / 80] = { x: x - 160, y: y, type: "Mob" };
                level[x / 80 - 1][y / 80] = { x: x - 80, y: y, type: "Space" };
                currentLR = 1;
                currentStep += 1;
                drawTraps();
            } else if (leftLeft.type == "Room" || leftLeft.type == "Box" || (leftLeft.type == "Trap" && leftLeft.boxUp == 1)) {//за мобом стена или ящик или ящик с ловушкой
                ctx.clearRect(left.x, left.y, sizeBlock, sizeBlock);
                level[x / 80 - 1][y / 80] = { x: x - 80, y: y, type: "Space" };
                currentLR = 1;
                currentStep += 1;
                drawTraps();
            } else if (leftLeft.type == "Trap" && leftLeft.boxUp == 0) {//за мобом ловушка без ящика
                ctx.clearRect(left.x, left.y, sizeBlock, sizeBlock);
                level[x / 80 - 1][y / 80] = { x: x - 80, y: y, type: "Space" };
                currentLR = 1;
                currentStep += 1;
                drawTraps();
            }
        } else if (left.type == "Box") {//влево ящик
            leftLeft = level[x / 80 - 2][y / 80];
            if (leftLeft.type == "Space") {//за ящиком пусто
                drawObj(leftLeft.x, leftLeft.y, "Box");
                ctx.clearRect(left.x, left.y, sizeBlock, sizeBlock);
                level[x / 80 - 2][y / 80] = { x: x - 160, y: y, type: "Box" };
                level[x / 80 - 1][y / 80] = { x: x - 80, y: y, type: "Space" };
                currentLR = 1;
                currentStep += 1;
                drawTraps();
            } else if (leftLeft.type == "Trap" && leftLeft.boxUp != 1) {//за ящиком ловушка
                level[x / 80 - 2][y / 80] = { x: x - 160, y: y, type: "Trap", status: leftLeft.status, boxUp: 1 };
                ctx.clearRect(left.x, left.y, sizeBlock, sizeBlock);
                level[x / 80 - 1][y / 80] = { x: x - 80, y: y, type: "Space" };
                currentLR = 1;
                currentStep += 1;
                drawTraps();
            }
        } else if (left.type == "Trap" && left.boxUp == 1) {//влево ловушка с ящиком
            leftLeft = level[x / 80 - 2][y / 80];
            if (leftLeft.type == "Space") {//за ловушкой с ящиком пусто
                drawObj(leftLeft.x, leftLeft.y, "Box");
                ctx.clearRect(left.x, left.y, sizeBlock, sizeBlock);
                level[x / 80 - 1][y / 80] = { x: x - 8, y: y, type: "Trap", status: 1, boxUp: 0 };
                level[x / 80 - 2][y / 80] = { x: x - 160, y: y, type: "Box" };
                currentLR = 1;
                currentStep += 1;
                drawTraps();
            } else if (leftLeft.type == "Trap" && leftLeft.boxUp != 1) {// за ловушкой с ящиком ловушка без ящика
                ctx.clearRect(left.x, left.y, sizeBlock, sizeBlock);
                level[x / 80 - 1][y / 80] = { x: x - 80, y: y, type: "Trap", status: 1, boxUp: 0 };
                level[x / 80 - 2][y / 80] = { x: x - 160, y: y, type: "Trap", status: 1, boxUp: 1 };
                currentLR = 1;
                currentStep += 1;
                drawTraps();
            }
        } else if (left.type == "Key") {//влево ключ
            key = 1;
            ctx.clearRect(left.x, left.y, sizeBlock, sizeBlock);
            level[x / 80 - 1][y / 80] = { x: x - 80, y: y, type: "Space" };
            currentLR = 1;
            currentStep += 1;
            drawTraps();
        } else if (left.type == "Lock" && key == 1) {//влево замок и есть ключ
            key = 0;
            ctx.clearRect(left.x, left.y, sizeBlock, sizeBlock);
            level[x / 80 - 1][y / 80] = { x: x - 80, y: y, type: "Space" };
            currentLR = 1;
            currentStep += 1;
            drawTraps();
        }
    } else if (kCode == 38) {//вверх
        up = level[x / 80][y / 80 - 1];
        if (up.type == "Space" || (up.type == "Trap" && up.boxUp != 1)) { //вверх пусто
            ctx.clearRect(x, y, sizeBlock, sizeBlock);
            y -= delta;
            currentStep += 1;
            drawTraps();
        } else if (up.type == "Goal") {//вверх цель
            alert("Уровень пройден!");
            levelNum += 1;
            resLvl();
        } else if (up.type == "Mob") {//вверх моб
            upUp = level[x / 80][y / 80 - 2];
            if (upUp.type == "Space") {//за мобом пусто
                drawObj(upUp.x, upUp.y, "Mob");
                ctx.clearRect(up.x, up.y, sizeBlock, sizeBlock);
                level[x / 80][y / 80 - 2] = { x: x, y: y - 160, type: "Mob" };
                level[x / 80][y / 80 - 1] = { x: x, y: y - 80, type: "Space" };
                currentStep += 1;
                drawTraps();
            } else if (upUp.type == "Room" || upUp.type == "Box" || (upUp.type == "Trap" && upUp.boxUp == 1)) {//за мобом стена или ящик или ящик с ловушкой
                ctx.clearRect(up.x, up.y, sizeBlock, sizeBlock);
                level[x / 80][y / 80 - 1] = { x: x, y: y - 80, type: "Space" };
                currentStep += 1;
                drawTraps();
            } else if (upUp.type == "Trap" && upUp.boxUp == 0) {//за мобом ловушка без ящика
                ctx.clearRect(up.x, up.y, sizeBlock, sizeBlock);
                level[x / 80][y / 80 - 1] = { x: x, y: y - 80, type: "Space" };
                currentStep += 1;
                drawTraps();
            }
        } else if (up.type == "Box") {//вверх ящик
            upUp = level[x / 80][y / 80 - 2];
            if (upUp.type == "Space") {//за ящиком пусто
                drawObj(upUp.x, upUp.y, "Box");
                ctx.clearRect(up.x, up.y, sizeBlock, sizeBlock);
                level[x / 80][y / 80 - 2] = { x: x, y: y - 160, type: "Box" };
                level[x / 80][y / 80 - 1] = { x: x, y: y - 80, type: "Space" };
                currentStep += 1;
                drawTraps();
            } else if (upUp.type == "Trap" && upUp.boxUp != 1) {//за ящиком ловушка
                level[x / 80][y / 80 - 2] = { x: x, y: y - 160, type: "Trap", status: upUp.status, boxUp: 1 };
                ctx.clearRect(up.x, up.y, sizeBlock, sizeBlock);
                level[x / 80][y / 80 - 1] = { x: x, y: y - 80, type: "Space" };
                currentStep += 1;
                drawTraps();
            }
        } else if (up.type == "Trap" && up.boxUp == 1) {//вверх ловушка с ящиком
            upUp = level[x / 80][y / 80 - 2];
            if (upUp.type == "Space") {//за ловушкой с ящиком пусто
                drawObj(upUp.x, upUp.y, "Box");
                ctx.clearRect(up.x, up.y, sizeBlock, sizeBlock);
                level[x / 80][y / 80 - 1] = { x: x, y: y - 80, type: "Trap", status: 1, boxUp: 0 };
                level[x / 80][y / 80 - 2] = { x: x, y: y - 160, type: "Box" };
                currentStep += 1;
                drawTraps();
            } else if (upUp.type == "Trap" && upUp.boxUp != 1) {// за ловушкой с ящиком ловушка без ящика
                ctx.clearRect(up.x, up.y, sizeBlock, sizeBlock);
                level[x / 80][y / 80 - 1] = { x: x, y: y - 80, type: "Trap", status: 1, boxUp: 0 };
                level[x / 80][y / 80 - 2] = { x: x, y: y - 160, type: "Trap", status: 1, boxUp: 1 };
                currentStep += 1;
                drawTraps();
            }
        } else if (up.type == "Key") {//вверх ключ
            key = 1;
            ctx.clearRect(up.x, up.y, sizeBlock, sizeBlock);
            level[x / 80][y / 80 - 1] = { x: x, y: y - 80, type: "Space" };
            currentStep += 1;
            drawTraps();
        } else if (up.type == "Lock" && key == 1) {//вверх замок и есть ключ
            key = 0;
            ctx.clearRect(up.x, up.y, sizeBlock, sizeBlock);
            level[x / 80][y / 80 - 1] = { x: x, y: y - 80, type: "Space" };
            currentStep += 1;
            drawTraps();
        }
    } else if (kCode == 39) {//вправо
        right = level[x / 80 + 1][y / 80];
        if (right.type == "Space" || (right.type == "Trap" && right.boxUp != 1)) {//вправо чисто
            ctx.clearRect(x, y, sizeBlock, sizeBlock);
            x += delta;
            currentLR = 0;
            currentStep += 1;
            drawTraps();
        } else if (right.type == "Goal") {//вправо цель
            alert("Уровень пройден!");
            levelNum += 1;
            resLvl();
        } else if (right.type == "Mob") {//вправо моб
            rightRight = level[x / 80 + 2][y / 80];
            if (rightRight.type == "Space") {//за мобом пусто
                drawObj(rightRight.x, rightRight.y, "Mob");
                ctx.clearRect(right.x, right.y, sizeBlock, sizeBlock);
                level[x / 80 + 2][y / 80] = { x: x + 160, y: y, type: "Mob" };
                level[x / 80 + 1][y / 80] = { x: x + 80, y: y, type: "Space" };
                currentLR = 0;
                currentStep += 1;
                drawTraps();
            } else if (rightRight.type == "Room" || rightRight.type == "Box" || (rightRight.type == "Trap" && rightRight.boxUp == 1)) {//за мобом стена или ящик или ящик с ловушкой
                ctx.clearRect(right.x, right.y, sizeBlock, sizeBlock);
                level[x / 80 + 1][y / 80] = { x: x + 80, y: y, type: "Space" };
                currentLR = 0;
                currentStep += 1;
                drawTraps();
            } else if (rightRight.type == "Trap" && rightRight.boxUp == 0) {//за мобом ловушка без ящика
                ctx.clearRect(right.x, right.y, sizeBlock, sizeBlock);
                level[x / 80 + 1][y / 80] = { x: x + 80, y: y, type: "Space" };
                currentLR = 0;
                currentStep += 1;
                drawTraps();
            }
        } else if (right.type == "Box") {//вправо ящик
            rightRight = level[x / 80 + 2][y / 80];
            if (rightRight.type == "Space") {//за ящиком пусто
                drawObj(rightRight.x, rightRight.y, "Box");
                ctx.clearRect(right.x, right.y, sizeBlock, sizeBlock);
                level[x / 80 + 2][y / 80] = { x: x + 160, y: y, type: "Box" };
                level[x / 80 + 1][y / 80] = { x: x + 80, y: y, type: "Space" };
                currentLR = 0;
                currentStep += 1;
                drawTraps();
            } else if (rightRight.type == "Trap" && rightRight.boxUp != 1) {//за ящиком ловушка
                level[x / 80 + 2][y / 80] = { x: x + 160, y: y, type: "Trap", status: rightRight.status, boxUp: 1 };
                ctx.clearRect(right.x, right.y, sizeBlock, sizeBlock);
                level[x / 80 + 1][y / 80] = { x: x + 80, y: y, type: "Space" };
                currentLR = 0;
                currentStep += 1;
                drawTraps();
            }
        } else if (right.type == "Trap" && right.boxUp == 1) {//вправо ловушка с ящиком
            rightRight = level[x / 80 + 2][y / 80];
            if (rightRight.type == "Space") {//за ловушкой с ящиком пусто
                drawObj(rightRight.x, rightRight.y, "Box");
                ctx.clearRect(right.x, right.y, sizeBlock, sizeBlock);
                level[x / 80 + 1][y / 80] = { x: x + 8, y: y, type: "Trap", status: 1, boxUp: 0 };
                level[x / 80 + 2][y / 80] = { x: x + 160, y: y, type: "Box" };
                currentLR = 0;
                currentStep += 1;
                drawTraps();
            } else if (rightRight.type == "Trap" && rightRight.boxUp != 1) {// за ловушкой с ящиком ловушка без ящика
                ctx.clearRect(right.x, right.y, sizeBlock, sizeBlock);
                level[x / 80 + 1][y / 80] = { x: x + 80, y: y, type: "Trap", status: 1, boxUp: 0 };
                level[x / 80 + 2][y / 80] = { x: x + 160, y: y, type: "Trap", status: 1, boxUp: 1 };
                currentLR = 0;
                currentStep += 1;
                drawTraps();
            }
        } else if (right.type == "Key") {//вправо ключ
            key = 1;
            ctx.clearRect(right.x, right.y, sizeBlock, sizeBlock);
            level[x / 80 + 1][y / 80] = { x: x + 80, y: y, type: "Space" };
            currentLR = 0;
            currentStep += 1;
            drawTraps();
        } else if (right.type == "Lock" && key == 1) {//вправо замок и есть ключ
            key = 0;
            ctx.clearRect(right.x, right.y, sizeBlock, sizeBlock);
            level[x / 80 + 1][y / 80] = { x: x + 80, y: y, type: "Space" };
            currentLR = 0;
            currentStep += 1;
            drawTraps();
        }
    } else if (kCode == 40) {//вниз
        down = level[x / 80][y / 80 + 1];
        if (down.type == "Space" || (down.type == "Trap" && down.boxUp != 1)) {//вниз чисто
            ctx.clearRect(x, y, sizeBlock, sizeBlock);
            y += delta;
            currentStep += 1;
            drawTraps();
        } else if (down.type == "Goal") {//вниз цель
            alert("Уровень пройден!");
            levelNum += 1;
            resLvl();
        } else if (down.type == "Mob") {//вниз моб
            downDown = level[x / 80][y / 80 + 2];
            if (downDown.type == "Space") {//за мобом пусто
                drawObj(downDown.x, downDown.y, "Mob");
                ctx.clearRect(down.x, down.y, sizeBlock, sizeBlock);
                level[x / 80][y / 80 + 2] = { x: x, y: y + 160, type: "Mob" };
                level[x / 80][y / 80 + 1] = { x: x, y: y + 80, type: "Space" };
                currentStep += 1;
                drawTraps();
            } else if (downDown.type == "Room" || downDown.type == "Box" || (downDown.type == "Trap" && downDown.boxUp == 1)) {//за мобом стена или ящик или ящик с ловушкой
                ctx.clearRect(down.x, down.y, sizeBlock, sizeBlock);
                level[x / 80][y / 80 + 1] = { x: x, y: y + 80, type: "Space" };
                currentStep += 1;
                drawTraps();
            } else if (downDown.type == "Trap" && downDown.boxUp == 0) {//за мобом ловушка без ящика
                ctx.clearRect(down.x, down.y, sizeBlock, sizeBlock);
                level[x / 80][y / 80 + 1] = { x: x, y: y + 80, type: "Space" };
                currentStep += 1;
                drawTraps();
            }
        } else if (down.type == "Box") {//вниз ящик
            downDown = level[x / 80][y / 80 + 2];
            if (downDown.type == "Space") {//за ящиком пусто
                drawObj(downDown.x, downDown.y, "Box");
                ctx.clearRect(down.x, down.y, sizeBlock, sizeBlock);
                level[x / 80][y / 80 + 2] = { x: x, y: y + 160, type: "Box" };
                level[x / 80][y / 80 + 1] = { x: x, y: y + 80, type: "Space" };
                currentStep += 1;
                drawTraps();
            } else if (downDown.type == "Trap" && downDown.boxUp != 1) {//за ящиком ловушка
                level[x / 80][y / 80 + 2] = { x: x, y: y + 160, type: "Trap", status: downDown.status, boxUp: 1 };
                ctx.clearRect(down.x, down.y, sizeBlock, sizeBlock);
                level[x / 80][y / 80 + 1] = { x: x, y: y + 80, type: "Space" };
                currentStep += 1;
                drawTraps();
            }
        } else if (down.type == "Trap" && down.boxUp == 1) {//вниз ловушка с ящиком
            downDown = level[x / 80][y / 80 + 2];
            if (downDown.type == "Space") {//за ловушкой с ящиком пусто
                drawObj(downDown.x, downDown.y, "Box");
                ctx.clearRect(down.x, down.y, sizeBlock, sizeBlock);
                level[x / 80][y / 80 + 1] = { x: x, y: y + 80, type: "Trap", status: 1, boxUp: 0 };
                level[x / 80][y / 80 + 2] = { x: x, y: y + 160, type: "Box" };
                currentStep += 1;
                drawTraps();
            } else if (downDown.type == "Trap" && downDown.boxUp != 1) {// за ловушкой с ящиком ловушка без ящика
                ctx.clearRect(down.x, down.y, sizeBlock, sizeBlock);
                level[x / 80][y / 80 + 1] = { x: x, y: y + 80, type: "Trap", status: 1, boxUp: 0 };
                level[x / 80][y / 80 + 2] = { x: x, y: y + 160, type: "Trap", status: 1, boxUp: 1 };
                currentStep += 1;
                drawTraps();
            }
        } else if (down.type == "Key") {//вниз ключ
            key = 1;
            ctx.clearRect(down.x, down.y, sizeBlock, sizeBlock);
            level[x / 80][y / 80 + 1] = { x: x, y: y + 80, type: "Space" };
            currentStep += 1;
            drawTraps();
        } else if (down.type == "Lock" && key == 1) {//вниз замок и есть ключ
            key = 0;
            ctx.clearRect(down.x, down.y, sizeBlock, sizeBlock);
            level[x / 80][y / 80 + 1] = { x: x, y: y + 80, type: "Space" };
            currentStep += 1;
            drawTraps();
        }
    }
    drawStep();
}
function drawObj(x, y, type) {
    if (type == "Box") {
        ctx.drawImage(box, x, y);
    } else if (type == "Room") {
        ctx.drawImage(room, x, y);
    } else if (type == "Trap") {
        if (currentLevel[x / 80][y / 80].status == 1) {
            ctx.drawImage(trap_on, x, y, sizeBlock, sizeBlock);
        }
        else if (currentLevel[x / 80][y / 80].status == -1) {
            ctx.drawImage(trap_off, x, y, sizeBlock, sizeBlock);
        }
        if (currentLevel[x / 80][y / 80].boxUp == 1) {
            ctx.drawImage(box, x, y);
        }
    } else if (type == "Space") {

    } else if (type == "Goal") {
        ctx.drawImage(goal, x, y);
    }
    else if (type == "Key") {
        ctx.drawImage(keey, x, y);
    } else if (type == "Lock") {
        ctx.drawImage(lock, x, y);
    }
}
var gg = 0;
function drawTraps() {
    for (var c = 0; c < levelCol; c++) {
        for (var r = 0; r < levelRow; r++) {
            if (currentLevel[c][r].type == "Trap") {
                if (levelNum == 4 || levelNum == 5) {
                    currentLevel[c][r].status *= -1;
                }
                if (currentLevel[c][r].status == -1) {
                    ctx.clearRect(c * 80, r * 80, sizeBlock, sizeBlock);
                    ctx.drawImage(trap_off, c * 80, r * 80, sizeBlock, sizeBlock);
                    if (currentLevel[c][r].boxUp == 1) {
                        ctx.drawImage(box, c * 80, r * 80);
                    }
                }
                else if (currentLevel[c][r].status == 1) {
                    ctx.clearRect(c * 80, r * 80, sizeBlock, sizeBlock);
                    ctx.drawImage(trap_on, c * 80, r * 80, sizeBlock, sizeBlock);
                    if (x == c * 80 && y == r * 80) {
                        currentStep += 1;
                        drawStep();
                    }
                    if (currentLevel[c][r].boxUp == 1) {
                        ctx.drawImage(box, c * 80, r * 80);
                    }
                }
            }
        }
    }
}
function drawStep() {
    let div = document.getElementById("info");
    div.innerHTML = "Осталось ходов: " + (limitStep - currentStep);
    if (limitStep - currentStep <= 0) {
        currentStep = 0;
        alert("Уровень провален, начните заново!");
        resLvl();
    }
}
function draw(lvl, levelCol, levelRow, x, y) {
    canvas.setAttribute("width", levelCol * 80);
    canvas.setAttribute("height", levelRow * 80);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var c = 0; c < levelCol; c++) {
        for (var r = 0; r < levelRow; r++) {
            drawObj(lvl[c][r].x, lvl[c][r].y, lvl[c][r].type)
        }
    }
    drawStep();
}

function drawAnim() {
    if (levelNum != 6) {
        for (var c = 0; c < levelCol; c++) {
            for (var r = 0; r < levelRow; r++) {
                if (currentLevel[c][r].type == "Mob") {
                    ctx.clearRect(c * 80, r * 80, sizeBlock, sizeBlock);

                    if (currentLevel[c][r].tr == 1) {
                        ctx.drawImage(trap_off, c * 80, r * 80);
                    }
                    ctx.drawImage(mob, 0, 80 * currentFrame, 80, 80, c * 80, r * 80, sizeBlock, sizeBlock);
                }
            }
        }
    }
    ctx.clearRect(x, y, sizeBlock, sizeBlock);
    if (currentLevel[x / 80][y / 80].type == "Trap" && currentLevel[x / 80][y / 80].status == 1) {
        ctx.drawImage(trap_on, x, y);
    } else if (currentLevel[x / 80][y / 80].type == "Trap" && currentLevel[x / 80][y / 80].status != 1) {
        ctx.drawImage(trap_off, x, y);
    }
    if (currentLR == 0) {
        ctx.drawImage(playerRight, 0, 80 * currentFrame, 80, 80, x, y, sizeBlock, sizeBlock);
    } else if (currentLR == 1) {
        ctx.drawImage(playerLeft, 0, 80 * currentFrame, 80, 80, x, y, sizeBlock, sizeBlock);
    }
    if (currentFrame == frames) {
        currentFrame = 0;
    } else {
        currentFrame++;
    }
}
setInterval(drawAnim, 100);