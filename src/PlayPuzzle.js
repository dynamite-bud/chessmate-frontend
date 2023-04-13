import { useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import Confetti from 'react-confetti'

export default function PlayPuzzle({position, bestMove}) {
  const [game, setGame] = useState(new Chess(position));
  const [celebrations, setCelebrations] = useState(false);
  const [draggable, setDraggable] = useState(true);

  const makeAMove = (sourceSquare, targetSquare) => {
    console.log('best move',bestMove)
    const gameCopy = { ...game };
    const move = gameCopy.move({
      from: sourceSquare,
      to: targetSquare,
    });
    console.log('player move',move)
    setGame(gameCopy);

    // illegal move
    if (move === null) return false;

    const playerMove = `${move.from}${move.to}`

    console.log(bestMove === playerMove)

    if ( bestMove === playerMove ) {
      console.log(bestMove, playerMove)
      setCelebrations(true)
    }

    setTimeout(() => {
      setDraggable(false);
    }, 1000);

    return true;
  }

  return (
    <>
      {
        celebrations ? <Confetti width={400} height={400} /> : null
      }
      <Chessboard id="puzzle" position={game.fen()} onPieceDrop={makeAMove} arePremovesAllowed={true} arePiecesDraggable={draggable} />
    </>
  );
}
