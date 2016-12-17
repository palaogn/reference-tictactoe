var _ = require('lodash');

module.exports = function (injected) {

    return function (history) {

        var gamefull=false;


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

        processEvents(history);

        return {
            gameFull: gameFull,
            processEvents: processEvents,
            board: board,
            numberOfMoves: numberOfMoves
        }
    };
};
