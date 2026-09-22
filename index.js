let game_board = Array(9).fill(-1)

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
        return `${player.marker} won the game`
    }
    return null
}

// play game
function play_game(turn, idx) {
    if (turn == true) {
        return check(player_one, idx)
    }
    else {
        return check(player_two, idx)
    }
}

// playground

function playground() {
    let move = 0
    let turn = true
    while (move < 9) {
        let index = prompt("Enter the index between 1 to 9")
        index = Number(index) - 1
        let win = play_game(turn, index)
        if (win == "invalid") {
            continue
        }
        move++
        if (win == null) {
            turn = !turn
        }
        else {
            console.log(win)
            break
        }

    }
    if (move == 9) {
        console.log("Draw")
    }

}

playground()