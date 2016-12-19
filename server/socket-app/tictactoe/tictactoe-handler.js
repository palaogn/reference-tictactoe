
module.exports = function(injected){
    var TictactoeState = injected('TictactoeState');

    return function(history){

        var gameState = TictactoeState(history);

        return {
            executeCommand: function(cmd, eventHandler){

                var cmdHandlers = {
                    "CreateGame": function (cmd) {
                        eventHandler([{
                            gameId: cmd.gameId,
                            type: "GameCreated",
                            user: cmd.user,
                            name: cmd.name,
                            timeStamp: cmd.timeStamp,
                            side:'X'
                        }]);

                    },
                    "JoinGame": function (cmd) {
                        if(gameState.gameFull()){
                            eventHandler( [{
                                gameId: cmd.gameId,
                                type: "FullGameJoinAttempted",
                                user: cmd.user,
                                name: cmd.name,
                                timeStamp: cmd.timeStamp
                            }]);
                            return;
                        }

                        eventHandler([{
                            gameId: cmd.gameId,
                            type: "GameJoined",
                            user: cmd.user,
                            name: cmd.name,
                            timeStamp: cmd.timeStamp,
                            side:'O'
                        }]);
                    },
                    "PlaceMove": function(cmd){
                        var currentCellState = gameState.board[cmd.coordinate[0]][cmd.coordinate[1]];
                        var XturnToPlay = (gameState.numberOfMoves % 2 === 0);

                        if(XturnToPlay && cmd.side === "O" || !XturnToPlay && cmd.side === "X") {
                          eventHandler([{
                            gameId: cmd.gameId,
                            type: "NotYourMove",
                            user: cmd.user,
                            name: cmd.name,
                            timeStamp: cmd.timeStamp
                          }]);
                          return;
                        }

                        if(currentCellState === "Y" && gameState.numberOfMoves <= 9) {
                           gameState.board[cmd.coordinate[0]][cmd.coordinate[1]] = cmd.side;
                          eventHandler([{
                            gameId: cmd.gameId,
                            type: "MovePlaced",
                            user: cmd.user,
                            name: cmd.name,
                            timeStamp: cmd.timeStamp,
                            side: cmd.side,
                            board: gameState.board
                          }]);
                        }
                        else if(currentCellState === "X" || currentCellState === "O") {
                          eventHandler([{
                            gameId: cmd.gameId,
                            type: "IllegalMove",
                            user: cmd.user,
                            name: cmd.name,
                            timeStamp: cmd.timeStamp,
                            side: cmd.side
                          }]);
                        }



                        // Check here for conditions which prevent command from altering state
                        //gameState.processEvents(events);

                        // Check here for conditions which may warrant additional events to be emitted.
                      //  eventHandler(events);
                    },
                    "CheckIfWinner": function(cmd){

                      if(gameState.hasWon == true){
                        eventHandler([{
                          gameId: cmd.gameId,
                          type: "GameWon",
                          user: cmd.user,
                          name: cmd.name,
                          timeStamp: cmd.timeStamp,
                          side: cmd.side,
                          board: gameState.board
                        }]);
                        return;
                      }
                    }
                };

                if(!cmdHandlers[cmd.type]){
                    throw new Error("I do not handle command of type " + cmd.type)
                }
                cmdHandlers[cmd.type](cmd);
            }
        }
    }
};
