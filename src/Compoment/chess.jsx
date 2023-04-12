import React, { useState } from 'react';
import Chessboard from 'react-chessboard';

export const ChessBoardWithRoute = ({ pieces, route }) => {
    const [selectedSquare, setSelectedSquare] = useState(null);
    const [targetSquare, setTargetSquare] = useState(null);

    const handleClick = (square) => {
        if (!selectedSquare) {
            setSelectedSquare(square);
            setTargetSquare(null);
        } else {
            setTargetSquare(square);
        }
    }

    const squares = [];
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const square = String.fromCharCode(97 + j) + (8 - i);
            const piece = pieces[square];
            const isTargetSquare = targetSquare === square;
            const isSelectedSquare = selectedSquare === square;
            const isRouteSquare = route && route.includes(square);

            squares.push(
                <div
                    key={square}
                    className={`square ${isTargetSquare ? 'target' : ''} ${isSelectedSquare ? 'selected' : ''} ${isRouteSquare ? 'route' : ''}`}
                    onClick={() => handleClick(square)}
                >
                    {piece && <img src={require(`./pieces/${piece}.svg`)} alt={piece} />}
                </div>
            );
        }
    }

    return (
        <div className="board">
            {squares}
        </div>
    );
}
