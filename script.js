let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let message = document.querySelector("#msg");
let turnMessage = document.querySelector("#turn");

turnMessage.innerText = "Start Game";

resetBtn.classList.remove("hidden");

let turnO = true;

let winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

boxes.forEach((box) =>{
    box.addEventListener("click", () =>{
        if(turnO){
            box.innerText = "O";
            box.style.color = "#059212";
            turnO = false;
            turnMessage.innerText = "Player X's turn";
            turnMessage.style.color = "#EE4E4E";
        }else{
            box.innerText = "X";
            turnO = true;
            turnMessage.innerText = "Player O's turn";
            turnMessage.style.color = "#365E32";
        }
        box.disabled = true;

        checkWinner();
    })
});

const disableBox = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};

const enableBox = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) =>{
    message.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    resetBtn.classList.add("hidden");
    disableBox();
    turnMessage.innerText = "Start New Game!";
    turnMessage.style.color = "#09203f";
};

const checkWinner = () =>{
    for(let pattern of winPatterns){

        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;


        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                showWinner(pos1Val);
            }
        }
    }

    // Check for a draw
    if (Array.from(boxes).every(box => box.innerText !== "")) {
        message.innerText = "It's a draw!";
        msgContainer.classList.remove("hide");
        resetBtn.classList.add("hidden");
        disableBox();
        turnMessage.innerText = "Start New Game!";
        turnMessage.style.color = "#09203f";
    }
};

const resetGame = () =>{
    turnO = true;
    enableBox();
    msgContainer.classList.add("hide");
    resetBtn.classList.remove("hidden");
    turnMessage.innerText = "Start Game";
    turnMessage.style.color = "#09203f";
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
