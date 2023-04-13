import { useEffect, useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

export default function PlayStartegy() {
  const [game, setGame] = useState(new Chess());
  const [time, setTime] = useState(0);

  useEffect(() => {
    const makeAMove = (move) => {
      const gameCopy = { ...game };
      const result = gameCopy.move(move);
      setGame(gameCopy);
      return result; // null if the move was illegal, the move object if the move was legal
    }
    const initiateGame = () => {
      const moves = [ 'e4', 'e5', 'Nf3', 'Nc6', 'Bc4' ]
      console.log('game initiated')
      if ( 5 > time ) {
        const timer = setTimeout(() => {
          console.log(`game number ${time}`)
          makeAMove(moves[time])
          setTime(time+1)
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
    initiateGame();
  }, [time])

  return <Chessboard position={game.fen()} arePiecesDraggable={false} />;
}