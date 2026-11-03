let game_board = Array(9).fill(-1)

// at the beginning the number of choice computer can use.
let computer_options = [1, 2, 3, 4, 5, 6, 7, 8,9];

let win_idx = [// horizontal check
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],

    // vertical check
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],

    // diagonal check
    [1, 5, 9],
    [3, 5, 7],]

function Player(name, marker) {
    this.name = name;
    this.marker = marker;

    this.make_move = function (idx) {
        if (game_board[idx] == -1) {
            game_board[idx] = this.marker
            return true
        }
        else {
            console.log("position already filled")
            return false
        }
    }

    this.check_winner = function () {
        for (let i = 0; i < win_idx.length; i++) {
            if (game_board[win_idx[i][0] - 1] == this.marker
                && game_board[win_idx[i][1] - 1] == this.marker
                && game_board[win_idx[i][2] - 1] == this.marker) {
                return true
            }
        }
        return false
    }
}

const player_one = new Player("first", "O")
const player_two = new Player("second", "X")


function check(player, idx) {
    let move_made = player.make_move(idx)

    if (!move_made) {
        return "invalid"
    }
    if (player.check_winner()) {
        console.log( `${player.marker} won the game`)
        return true
    }
    return null
}

// play game
function play_game(turn, idx) {
    if (turn == "player") {
        return check(player_one, idx)
    }
    else {
        return check(player_two, idx)
    }
}

// get computer choice
function computer_choice()
{
    var idx =  Math.floor(Math.random() * computer_options.length)
    return computer_options[idx]
}

// display choosen option 

function display_mark(id, mark)
{
    let hello = document.getElementById(id)
    if (hello.innerText != "X" && hello.innerText != "O")
    {
        hello.innerText = mark
    }
}

// build a grid
function build_playground() {
    playground = document.querySelector(".playground")
    for (let i = 0; i < 9; i++) {
        div = document.createElement("div")
        div.setAttribute("id", i)
        
        div.addEventListener("click", () => {
            human_mark = "O"
            computer_mark = "X"
            display_mark(i,human_mark)

            // remove the selected index by player from computer available options. 
            computer_options.splice(computer_options.indexOf(i + 1), 1);

            let computer_index = computer_choice();

            computer_options.splice(computer_options.indexOf(computer_index), 1);

            computer_index -= 1;

            display_mark(computer_index,computer_mark)

            // check if human won
            let human_win = play_game("player", i)

            // check if computer_won
            let computer_win = play_game("computer", computer_index)
            if (human_win == true ) {
                alert("Human won the game")
            }

            if (computer_win == true)
            {
                alert("Computer won the game")
            }

            if (game_board.every(position => position !== -1)) 
            {
                alert("It's a draw!");
            }
        })
        playground.appendChild(div)
    }

}
document.addEventListener("DOMContentLoaded", () => {
    build_playground()
})