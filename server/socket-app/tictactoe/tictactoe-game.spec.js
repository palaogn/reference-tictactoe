var should = require('should');
var _ = require('lodash');

var TictactoeState = require('./tictactoe-state')(inject({}));

var tictactoe = require('./tictactoe-handler')(inject({
    TictactoeState
}));

var createEvent = {
    type: "GameCreated",
    user: {
        userName: "TheGuy"
    },
    name: "TheFirstGame",
    timeStamp: "2014-12-02T11:29:29"
};

var joinEvent = {
    type: "GameJoined",
    user: {
        userName: "Gummi"
    },
    name: "TheFirstGame",
    timeStamp: "2014-12-02T11:29:29"
};


describe('create game command', function() {


    var given, when, then;

    beforeEach(function(){
        given=undefined;
        when=undefined;
        then=undefined;
    });

    afterEach(function () {
        tictactoe(given).executeCommand(when, function(actualEvents){
            should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
        });
    });


    it('should emit game created event', function(){

        given = [];
        when =
        {
            id:"123987",
            type: "CreateGame",
            user: {
                userName: "TheGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29"
        };
        then = [
            {
                type: "GameCreated",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side:'X'
            }
        ];

    })
});


describe('join game command', function () {


    var given, when, then;

    beforeEach(function () {
        given = undefined;
        when = undefined;
        then = undefined;
    });

    afterEach(function () {
        tictactoe(given).executeCommand(when, function (actualEvents) {
            should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
        });
    });


    it('should emit game joined event', function () {

        given = [{
            type: "GameCreated",
            user: {
                userName: "TheGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29"
        }
        ];
        when =
        {
            type: "JoinGame",
            user: {
                userName: "Gummi"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29"
        };
        then = [
            {
                type: "GameJoined",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side:'O'
            }
        ];

    });

    it('should emit FullGameJoinAttempted event when game full', function () {

      given = [{
          type: "GameCreated",
          user: {
              userName: "TheGuy"
          },
          name: "TheFirstGame",
          timeStamp: "2014-12-02T11:29:29"
      },
      {
          type: "GameJoined",
          user: {
              userName: "Gummi"
          },
          name: "TheFirstGame",
          timeStamp: "2014-12-02T11:29:29",
          side:'O'
      }
      ];
      when =
      {
          type: "JoinGame",
          user: {
              userName: "Pala"
          },
          name: "TheFirstGame",
          timeStamp: "2014-12-02T11:30:29"
      };
      then = [
          {
              type: "FullGameJoinAttempted",
              user: {
                  userName: "Pala"
              },
              name: "TheFirstGame",
              timeStamp: "2014-12-02T11:30:29"
          }
      ];
    });

    it('should emit MovePlaced on first game move', function () {

      given = [{
          type: "GameCreated",
          user: {
              userName: "TheGuy"
          },
          name: "TheFirstGame",
          timeStamp: "2014-12-02T11:29:29"
      },
      {
          type: "GameJoined",
          user: {
              userName: "Pala"
          },
          name: "TheFirstGame",
          timeStamp: "2014-12-02T11:29:29",
          side:'X'
      }
      ];
      when =
      {
          type: "PlaceMove",
          user: {
              userName: "Pala"
          },
          name: "TheFirstGame",
          timeStamp: "2014-12-02T11:30:29",
          side:'X',
          coordinate: [0,0]
      };
      then = [
          {
              type: "MovePlaced",
              user: {
                  userName: "Pala"
              },
              name: "TheFirstGame",
              timeStamp: "2014-12-02T11:30:29",
              side: "X",
              board: [["X", "Y", "Y"], ["Y", "Y", "Y"], ["Y", "Y", "Y"]]
          }
      ];
    });
    it('should emit IllegalMove when square is already occupied', function () {

      given = [{
          type: "GameCreated",
          user: {
              userName: "TheGuy"
          },
          name: "TheFirstGame",
          timeStamp: "2014-12-02T11:29:29"
      },
      {
          type: "GameJoined",
          user: {
              userName: "Pala"
          },
          name: "TheFirstGame",
          timeStamp: "2014-12-02T11:29:29",
          side:'X'
      },
      {
          type: "MovePlaced",
          user: {
              userName: "Pala"
          },
          name: "TheFirstGame",
          timeStamp: "2014-12-02T11:30:29",
          side:'X',
          coordinate: [0,0],
          board: [["X", "Y", "Y"], ["Y", "Y", "Y"], ["Y", "Y", "Y"]]
      }
      ];
      when =
      {
          type: "PlaceMove",
          user: {
              userName: "TheGuy"
          },
          name: "TheFirstGame",
          timeStamp: "2014-12-02T11:30:29",
          side:'O',
          coordinate: [0,0]
      };
      then = [
          {
              type: "IllegalMove",
              user: {
                  userName: "TheGuy"
              },
              name: "TheFirstGame",
              timeStamp: "2014-12-02T11:30:29",
              side: "O"
          }
      ];
    });

    it('Should emit NotYourMove if attempting to make move out of turn', function () {

      given = [{
          type: "GameCreated",
          user: {
              userName: "TheGuy"
          },
          name: "TheFirstGame",
          timeStamp: "2014-12-02T11:29:29"
      },
      {
          type: "GameJoined",
          user: {
              userName: "Pala"
          },
          name: "TheFirstGame",
          timeStamp: "2014-12-02T11:29:29",
          side:'X'
      },
      {
          type: "MovePlaced",
          user: {
              userName: "Pala"
          },
          name: "TheFirstGame",
          timeStamp: "2014-12-02T11:30:29",
          side:'X',
          coordinate: [0,0],
          board: [["X", "Y", "Y"], ["Y", "Y", "Y"], ["Y", "Y", "Y"]]
      },
      {
          type: "MovePlaced",
          user: {
              userName: "TheGuy"
          },
          name: "TheFirstGame",
          timeStamp: "2014-12-02T11:30:29",
          side:'O',
          coordinate: [0,1],
          board: [["X", "O", "Y"], ["Y", "Y", "Y"], ["Y", "Y", "Y"]]
      }
      ];
      when =
      {
          type: "PlaceMove",
          user: {
              userName: "TheGuy"
          },
          name: "TheFirstGame",
          timeStamp: "2014-12-02T11:30:29",
          side:'O',
          coordinate: [0,2]
      };
      then = [
          {
              type: "NotYourMove",
              user: {
                  userName: "TheGuy"
              },
              name: "TheFirstGame",
              timeStamp: "2014-12-02T11:30:29",
          }
      ];
    });

    it('Should emit game won on', function () {

      given = [{
          type: "GameCreated",
          user: {
              userName: "TheGuy"
          },
          name: "TheFirstGame",
          timeStamp: "2014-12-02T11:29:29"
      },
      {
          type: "GameJoined",
          user: {
              userName: "Pala"
          },
          name: "TheFirstGame",
          timeStamp: "2014-12-02T11:29:29",
          side:'X'
      },
      {
          type: "MovePlaced",
          user: {
              userName: "Pala"
          },
          name: "TheFirstGame",
          timeStamp: "2014-12-02T11:30:29",
          side:'X',
          coordinate: [0,0],
          board: [["X", "Y", "Y"], ["Y", "Y", "Y"], ["Y", "Y", "Y"]]
      },
      {
          type: "MovePlaced",
          user: {
              userName: "TheGuy"
          },
          name: "TheFirstGame",
          timeStamp: "2014-12-02T11:30:29",
          side:'O',
          coordinate: [1,0],
          board: [["X", "Y", "Y"], ["O", "Y", "Y"], ["Y", "Y", "Y"]]
      },
      {
          type: "MovePlaced",
          user: {
              userName: "Pala"
          },
          name: "TheFirstGame",
          timeStamp: "2014-12-02T11:30:29",
          side:'X',
          coordinate: [0,1],
          board: [["X", "X", "Y"], ["O", "Y", "Y"], ["Y", "Y", "Y"]]
      },
      {
          type: "MovePlaced",
          user: {
              userName: "TheGuy"
          },
          name: "TheFirstGame",
          timeStamp: "2014-12-02T11:30:29",
          side:'O',
          coordinate: [1,1],
          board: [["X", "X", "Y"], ["O", "O", "Y"], ["Y", "Y", "Y"]]
      },
      {
          type: "MovePlaced",
          user: {
              userName: "Pala"
          },
          name: "TheFirstGame",
          timeStamp: "2014-12-02T11:30:29",
          side:'X',
          coordinate: [0,2],
          board: [["X", "X", "X"], ["O", "O", "Y"], ["Y", "Y", "Y"]]
      }
      ];
      when =
      {
        type: "CheckIfWinner",
        user: {
            userName: "Pala"
        },
        name: "TheFirstGame",
        timeStamp: "2014-12-02T11:30:29",
        side:'X',
        board: [["X", "X", "X"], ["O", "O", "Y"], ["Y", "Y", "Y"]]
      };
      then = [
          {
              type: "GameWon",
              user: {
                  userName: "Pala"
              },
              name: "TheFirstGame",
              timeStamp: "2014-12-02T11:30:29",
              side:'X',
              board: [["X", "X", "X"], ["O", "O", "Y"], ["Y", "Y", "Y"]]
          }
      ];
    });
    

});
