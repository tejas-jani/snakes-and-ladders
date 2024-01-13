 

 // creatBord() Create a complete game board using CSS grid.  
function creatBord() {
    let container = document.getElementById("continer");
    let data = "";
    let start = 100;

    let end = 91;
    let loop = 1;
    let temp;
    let Cls;
    while (loop <= 10) {
        temp = parseInt(end / 10);
        console.log(temp);
        if ((temp % 2) == 0) {
           // console.log("if" + end + start);

            for (i = end; i <= start; i++) {
                if (parseInt(i % 2) == 0)
                    Cls = `class="evenColor"`
                else
                    Cls = `class="oddColor"`
                data += `<div  ${Cls}  id="${i}">${i}</div>`
              //  console.log(Cls);

            }   
        }
        else {
           // console.log("else");

            for (i = start; i >= end; i--) {

                if (parseInt(i % 2) == 0)
                    Cls = `class="evenColor"`
                else
                    Cls = `class="oddColor"`
                data += `<div  ${Cls}  id="${i}">${i}</div>`
                // console.log(Cls);

            }
        }
        start -= 10;
        end -= 10;
        loop++;
    }
    container.innerHTML += data;
    // for (let index = 1; index <= 100; index++) {
    //     let A= document.getElementById(`${index}`);
    //     A.className="tejas";

    // }
     
//   playersName();
// player_1=prompt("Enter Player 1 Name");

// // player_2=prompt("Enter Player 2 Name");
// alert(`player1 is ${player_1} And\n Player2 is player_2`);
}
creatBord();

/* ==================================This is PLAYER CLASS==================================================== */
class Player {
    constructor(player, icone) {
        this.player = player;
        this.icone = icone;
        this.lastValue = 0;
        this.diceValue = 0;
    }
    /* ===================This is dice() function <-- and this function only call bu DICE()_Function manage  rendom_dice,
==call_move function for change position of player_icon And winner========================== */
    dice() {

        let btn = document.getElementById("Dice");
        let avatar1 = document.getElementById("avatar1");
        let avatar2 = document.getElementById("avatar2");

        let dise = (Math.floor(1 + (6) * Math.random()));

        this.diceValue = this.lastValue + dise;//100-101   6<=  -1    
        btn.innerHTML = `<img src="img/dice/${dise}.png" alt="" id="dice">`;
        let borderImg = document.getElementById("dice");

        {/* console.log("last value  = " + this.lastValue);
        console.log(btn);
        console.log(this.icone);
        console.log("paso = " + dise);
        console.log("current smile position = " + (100 - this.diceValue));//😎
        console.log("diciValuis =  " + this.diceValue);
        console.log("paso" + (this.diceValue - this.lastValue)); */}
                                //       0                           5           
        if ((dise <= (100 - this.lastValue)) || ((100 - this.diceValue) == 0)) {

            if (chance == true) {
                this.lastValue = player1.move(this.diceValue, this.lastValue, dise);
                console.log("NAME " + this.player)
            }
            else {
                this.lastValue = player2.move(this.diceValue, this.lastValue, dise);
                console.log("NAME " + this.player)
            }
            //ths function for winner.
            if ((this.lastValue == 100) || (player1.lastValue == 100) || (player2.lastValue == 100)) {
                let win = document.getElementById("win");

                setTimeout(() => {
                    alert(`${this.player}${this.icone} is Winner😎😎😎`);
                    location.reload()
                }, 3000)
                sound(`sWinner`);
                console.log(btn.innerHTML);
                win.innerHTML = `<h3>${this.player}${this.icone} is Winner</h3>`;
                return (console.log(btn.innerHTML));
            }
        }
        else {
            console.log("else");
            btn.innerHTML = `<img onclick="Dice()" src="img/dice/${dise}.png" alt="" id="dice">`;

        }
    }
    /* -------------this move() fun only call by dice() fun with with object(plyer);---------*/
    move(diceValue, lastValue, dise) {
        console.log("move is running")
        let lastPosition;
        let icone = this.icone;
        let move1;
        let i=2;//speed of animation(i agree with you in this only change icon_position at div to div ) 
        console.log("move icone =" + this.icone);
        console.log(`dice in move=${dise}`);
        
        for (let p = lastValue; p <= diceValue; p++) {
            move1 = document.getElementById(`${p}`);
            
            if (p == 0)
                continue;

/* Anicone() use full for  overlaping problem of both icons   */
            if (move1.innerHTML == Anicone(chance)) { continue }

            setTimeout(function () {
                move1.innerHTML = `${icone}`;
                move1.style.fontSize = "30px";
 
            }, 100 * (i));
            setTimeout(function () {

                move1 = document.getElementById(`${p}`);
                if (p != diceValue) {
                    move1.innerHTML = `${p}`;
                    move1.style.fontSize = "15px";
                }
            }, 190 * (i));
            lastPosition = diceValue;
        }

        let ladderValue = ladders(lastPosition);
        // let ladderValue=ladders(21);
        console.log("lastposition" + lastPosition);

        if (lastPosition != ladderValue) {
            lastPosition = lastPosition + ladderValue;
            let move1 = document.getElementById(`${lastPosition}`);

            setTimeout(function () {
                move1.innerHTML = `${icone}`;
                document.getElementById(`${diceValue}`).innerHTML = `${diceValue}`;
                document.getElementById(`${diceValue}`).style.fontSize = `15px`;
                move1.style.fontSize = "30px";
            }, 1000);

            console.log("LLLLLLLL " + diceValue);

        }
        let snakeValue = snakes(lastPosition);

        console.log("lastposition for snake" + lastPosition);

        if (lastPosition != snakeValue) {
            lastPosition = snakeValue;
            let move1 = document.getElementById(`${lastPosition}`);

            setTimeout(function () {
                move1.innerHTML = `${icone}`;

                document.getElementById(`${diceValue}`).innerHTML = `${diceValue}`;
                document.getElementById(`${diceValue}`).style.fontSize = `15px`;
                move1.style.fontSize = "30px";
            }, 1000);
            console.log("SSSSSSSSS " + diceValue);


        }
        setTimeout(() => {// this timeOut_Fun for write btn.innerHTML=onclick="Dice()"
            let btn = document.getElementById("Dice");

            btn.innerHTML = `<img onclick="Dice()" src="img/dice/${dise}.png" alt="" id="dice">`;

        }, 300)
        return (lastPosition);
    }
}

let player1 = new Player("Player1", "🦸‍♂");
let player2 = new Player("Player2", "🦹‍♀️");
let chance = true;//chance variable manage decide turn of player.
//if chance==true player1 play otherwise player2 play

/*------------Dice() function call when dice_iamge clicked by player*/
function Dice() {
    document.getElementById(`sDice`).play();
    // document.getElementById(`sDice`).pause();
    for (let index = 0; index < 99999999; index++);

    if (chance) {
        avatar1.style.width = "55px";
        avatar1.style.height = "55px";

        avatar2.style.width = "75px";
        avatar2.style.height = "75px";
        player1.dice();
        chance = false;
        console.log(player1);
    }
    else {
        avatar1.style.width = "75px";
        avatar1.style.height = "75px";

        avatar2.style.width = "55px";
        avatar2.style.height = "55px";
        player2.dice();
        chance = true;
        console.log(player2)
    }
}

{  //helper fun
/* decide  which ladders active or not  */
function ladders(playerlastPossition) {

    switch (playerlastPossition) {
        case 2:
            sound(`sLadder`);
            return 37 - playerlastPossition;
            break;
        case 5:
            sound(`sLadder`);
            return 14 - playerlastPossition;
            break;
        case 21:
            sound(`sLadder`);
            return (41 - playerlastPossition);
            break;
        case 26:
            sound(`sLadder`);
            return 36 - playerlastPossition;
            break;

        case 34:
            sound(`sLadder`);
            return 84 - playerlastPossition;
            break;
        case 61:
            sound(`sLadder`);
            return 82 - playerlastPossition;
            break;
        case 71:
            sound(`sLadder`);
            return 91 - playerlastPossition;
            break;
    }
    return playerlastPossition;
}
/* decide  which Snackes active or not  */
function snakes(playerlastPossition) {

    switch (playerlastPossition) {
        case 17:
            sound(`sSnake`);
            return 7;
            break;
        case 48:
            sound(`sSnake`);
            return 11;
            break;
        case 74:
            sound(`sSnake`);
            console.log(playerlastPossition);
            return 68;
            break;
        case 86:
            sound(`sSnake`);
            return 25;
            break;

        case 99:
            sound(`sSnake`);
            return 78;
            break;
        case 93:
            sound(`sSnake`);
            return 69;
            break;
    }
    return playerlastPossition;
}
function sound(id) { //   play sound accordig audio_tag id.
    sound.currentTime = 0;
    setTimeout(() => {
        document.getElementById(`${id}`).play();
        for (let index = 0; index < 99999999; index++);
    }, 500);
}
/* Anicone() use full for  overlaping problem of both icons   */
function Anicone(chance) {
    if (chance == true)
        return player2.icone;
    if (chance == false)
        return player1.icone;
}
}
/* setTimeout(function () {

    move1 = document.getElementById(`1`);
    move1.innerHTML = "😎";
}, 1000);
setTimeout(function () {

    move2 = document.getElementById(`2`);
    move2.innerHTML = "😎"; move1.innerHTML = "1";
}, 2000);
setTimeout(function () {

    move3 = document.getElementById(`3`);
    move3.innerHTML = "😎"; move2.innerHTML = "2";
}, 3000);
setTimeout(function () {

    move4 = document.getElementById(`4`);
    move4.innerHTML = "😎"; move3.innerHTML = "3";
}, 4000);
// innerHTML=i; */
