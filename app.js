const players = {
  "1": "X",
  "-1": "O",
};
// console.log(players[-1])
let turn, winner;
let $whosTurn = $(".whosTurn");

const combos = [
  //Horizontal wins
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  //Vertical wins
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  //diagonal wins
  [0, 4, 8],
  [2, 4, 6],
];

const generateBoard = () => {
  $("body").append($("<div>").attr("class", "container"));
  $gameboard = $(".container");
  turn = 1;
  winner = false;
  $whosTurn.text(`Player ${players[turn]}'s Turn`)

  //generate squares
  for (let i = 0; i < 9; i++) {
    let $square = $("<div>");
    $square.addClass("square").attr("id", `square-${i}`);
    // $square.on("click", (playerTurn))
    $gameboard.append($square);
  }
  //creating an array so later I can update each null with a 1 or -1 to check win
  $gameboard = [null, null, null, null, null, null, null, null, null];
};

const handlePlayerClick = (evt) => {
  //creating variable to store 1 or -1 in the selected square $gameboard array
  let $selectedIdx = $(evt.currentTarget).index();
  //if winner or the square has a value in it, don't overwrite it
  if (winner || $gameboard[$selectedIdx]) return;
  $(evt.currentTarget).text(players[turn]);
  $gameboard[$selectedIdx] = turn;
  turn *= -1;
  winner = checkWin();
  render();

};

const checkWin = () => {
  for (let i = 0; i < combos.length; i++) {
    console.log($gameboard);
    if (
      //using absolute value, if the row or column is complete the value =3 and it'll check for a win
      Math.abs(
        $gameboard[combos[i][0]] +
        $gameboard[combos[i][1]] +
        $gameboard[combos[i][2]]
      ) === 3
    )
      return $gameboard[combos[i][0]]; // whoever is the winner we return that value - 1 or -1
  }
  if ($gameboard.includes(null)) return false;
  return "T"; //If no winner and no nulls we have a tie
};

const render = () => {
  if (!winner) {
    //Display a message based on no winner, tie or winner
    $whosTurn.text(`Player ${players[turn]}'s Turn`);
  } else if (winner === "T") {
    $whosTurn.text("It's a tie game");
  } else {
    $whosTurn.text(`Player ${players[winner]} wins!!`);
  }
};

generateBoard();

//Event Listeners
$(".square").on("click", handlePlayerClick);
