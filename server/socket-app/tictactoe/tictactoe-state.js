var _ = require('lodash');

module.exports = function (injected) {

    return function (history) {

        var gamefull=false;
        var hasWon = false;

        console.debug("History", history);

        function processEvent(event) {
            if(event.type==="GameJoined"){
              gamefull=true;
            }

            if(event.type==="GameCreated"){
              board = [ ["Y", "Y", "Y"],
                        ["Y", "Y", "Y"],
                        ["Y", "Y", "Y"] ];
              numberOfMoves = 0;
            }

            if(event.type==="MovePlaced"){
              numberOfMoves= numberOfMoves + 1;
              console.debug("number of moves: ");
              console.debug(numberOfMoves);
              board = event.board;
              side = event.side;
              console.debug(event.side);

              //Check each possible winning condition
              if(board[0][0] == side && board[0][1] == side && board[0][2] == side) {
                console.debug("You win!!!!!!!!!!");
                hasWon = true;
                return;
              }
              else if(board[1][0] == side && board[1][1] == side && board[1][2] == side) {
                hasWon = true;
                return;
              }
              else if(board[2][0] == side && board[2][1] == side && board[2][2] == side) {
                hasWon = true;
                return;
              }
              else if(board[0][0] == side && board[1][0] == side && board[2][0] == side) {
                hasWon = true;
                return;
              }
              else if(board[0][1] == side && board[1][1] == side && board[2][1] == side) {
                hasWon = true;
                return;
              }
              else if(board[0][2] == side && board[1][2] == side && board[2][2] == side) {
                hasWon = true;
                return;
              }
              else if(board[0][0] == side && board[1][1] == side && board[2][2] == side) {
                hasWon = true;
                return;
              }
              else if(board[2][0] == side && board[1][1] == side && board[0][2] == side) {
                hasWon = true;
                return;
              }
              else {
                console.debug('nope');
                return;
              }
            }

        }

        function processEvents(history) {
            _.each(history, processEvent);
        }

        function gameFull() {
          return gamefull;
        }

        function board() {
          return board;
        }

        function numberOfMoves() {
          return numberOfMoves;
        }

        function hasWon() {
          return hasWon;
        }

        processEvents(history);

        return {
            gameFull: gameFull,
            processEvents: processEvents,
            board: board,
            numberOfMoves: numberOfMoves,
            hasWon: hasWon
        }
    };
};
