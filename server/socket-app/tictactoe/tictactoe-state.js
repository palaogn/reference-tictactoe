var _ = require('lodash');

module.exports = function (injected) {

    return function (history) {

        var gamefull=false;
        var numberOfMoves=0;
        var board = [ ["Y", "Y", "Y"],
                      ["Y", "Y", "Y"],
                      ["Y", "Y", "Y"] ];

        console.debug("History", history);

        function processEvent(event) {
            if(event.type==="GameJoined"){
              gamefull=true;
            }

            if(event.type==="MovePlaced"){
              howManyMoves=howManyMoves+1;
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
