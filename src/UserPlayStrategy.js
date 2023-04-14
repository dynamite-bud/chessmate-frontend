import { useEffect, useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

export default function UserPlayStrategy({moves}) {
  const [game, setGame] = useState(new Chess());
  const [time, setTime] = useState(0);

  function onDrop(sourceSquare, targetSquare) {
    const gameCopy = { ...game };
    const move = gameCopy.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to a queen for example simplicity
    });
    setGame(gameCopy);

    // illegal move
    if (move === null) return false;

    setTimeout(() => {

      makeRandomMove()
      
    }, 1000);

    return true;
  }

  function safeGameMutate(modify) {
    setGame((g) => {
      const update = { ...g };
      modify(update);
      return update;
    });
  }

  function makeRandomMove() {
    const possibleMoves = game.moves();

    // exit if the game is over
    if (game.game_over() || game.in_draw() || possibleMoves.length === 0) return;

    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    safeGameMutate((game) => {
      game.move(possibleMoves[randomIndex]);
    });
  }

  return <Chessboard position={game.fen()} onPieceDrop={onDrop} customBoardStyle={{borderRadius: '4px', boxShadow: '4px 4px 0 rgb(0 0 0 / 20%)'}} customDarkSquareStyle={{ backgroundColor: '#769656' }} customLightSquareStyle={{ backgroundColor: '#eeeed2' }} />;
}