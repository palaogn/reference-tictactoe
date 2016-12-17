var _ = require('lodash');

module.exports = function (injected) {

    return function (history) {

        var gamefull=false;
        var howManyMoves=0;
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

        processEvents(history);

        return {
            gameFull: gameFull,
            processEvents: processEvents
        }
    };
};
