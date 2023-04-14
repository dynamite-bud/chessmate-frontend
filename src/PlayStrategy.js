import { useEffect, useRef, useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

export default function PlayStrategy({moves,replay,setPlayReplay}) {
  const [game, setGame] = useState(new Chess());
  const [time, setTime] = useState(0);
  const timers=useRef([]);
  // const []
  // const [stopReplay, setStopReplay] = useState(false)

  useEffect(() => {
    function safeGameMutate(modify) {
      setGame((g) => {
        const update = { ...g };
        modify(update);
        return update;
      });
    }
    const makeAMove = (move) => {
      const gameCopy = { ...game };
      const result = gameCopy.move(move);
      setGame(gameCopy);
      return result; // null if the move was illegal, the move object if the move was legal
    }
    const initiateGame = () => {
      // const moves = [ 'e4', 'e5', 'Nf3', 'Nc6', 'Bc4' ]
      console.log('game initiated')
      if ( moves.length > time ) {
        const timer = setTimeout(() => {
          console.log(`game number ${time}`)
          makeAMove(moves[time])
          setTime(time+1)
        }, 1000);
        timers.current.push(timer);
        return () => {
          timers.current.forEach(timer=>clearTimeout(timer));
        };
      }
    }
    initiateGame();
    if(replay){
      timers.current.forEach(timer=>clearTimeout(timer));
      setGame(new Chess());
      setTime(0);
      setPlayReplay(false);
    }
    
    // if (replay) {
    //   safeGameMutate((game) => {
    //     game.reset();
    //   });
    //   setPlayReplay(false)
    //   // setStopReplay(true)
    //   // setTimeout(() => {
    //   //   initiateGame();
    //   // }, 1000);
    // }
  }, [time,replay])


  return <Chessboard position={game.fen()} arePiecesDraggable={false} customBoardStyle={{borderRadius: '4px', boxShadow: '4px 4px 0 rgb(0 0 0 / 20%)'}} customDarkSquareStyle={{ backgroundColor: '#769656' }} customLightSquareStyle={{ backgroundColor: '#eeeed2' }} />;
}