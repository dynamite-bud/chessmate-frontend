const ranks = { 1: 7, 2: 6, 3: 5, 4: 4, 5: 3, 6: 2, 7: 1, 8: 0 };
const files = { a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7 };

/**
 * Returns indices for a cell
 * (can be used to access board arrays)
 *
 * Example:
 *   getFileRank("a2") => [0, 6]
 *
 *   2 = 6 because arrays usally are displayed with 0,0 in the upper
 *   left corner
 *
 * @param {string} square - Eg: "a2"
 */
function getFileRank(square) {
  const [file, rank] = square;
  return [files[file], ranks[rank]];
}

function emptyBoard() {
  const board = [];
  for (let i = 0; i < 8; i++) {
    board[i] = [];
  }
  return board;
}

class FENBoard {
  constructor(fen) {
    this.board = emptyBoard();
    this.fen = fen;
  }

  /**
   * Gets the piece at a square
   *
   * @param {string} square - The square. Eg: "a2"
   * @return {string} piece - the ascii representation of a piece. Eg: "K"
   */
  piece(square) {
    const [file, rank] = getFileRank(square);
    return this._getPiece(file, rank);
  }

  /**
   * Places a piece in the given square.
   *
   * @param {string} square - The square. Eg: "a2"
   * @param {string} piece - the ascii representation of a piece. Eg: "K"
   */
  put(square, piece) {
    const [file, rank] = getFileRank(square);
    this._setPiece(file, rank, piece);
  }

  /**
   * Removes the piece at the given square.
   *
   * @param {string} square - The square. Eg: "a2"
   */
  clear(square) {
    this.put(square, "");
  }

  /**
   * Moves a piece.
   *
   * @param {string} from - The square to move from. Eg: "a2"
   * @param {string} to - The square to move to. Eg: "a3"
   */
  move(from, to) {
    const piece = this.piece(from);
    if (!piece) {
      throw new Error("Move Error: the from square was empty");
    }
    this.put(to, piece);
    this.clear(from);
  }

  /**
   * Set the current position.
   *
   * @param {string} fen - a position string as FEN
   */
  set fen(fen) {
    // reset board
    this.board.forEach((r) => {
      r.length = 0;
    }); // eslint-disable-line no-param-reassign

    if (!fen) return;
    if (fen === "start") fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"; // eslint-disable-line

    let rank = 0;
    let file = 0;
    let fenIndex = 0;

    let fenChar;
    let count;

    while (fenIndex < fen.length) {
      fenChar = fen[fenIndex];

      if (fenChar === " ") {
        break; // ignore the rest
      }
      if (fenChar === "/") {
        rank++;
        file = 0;
        fenIndex++;
        continue;
      }

      if (isNaN(parseInt(fenChar, 10))) {
        this._setPiece(file, rank, fenChar);
        file++;
      } else {
        count = parseInt(fenChar, 10);
        for (let i = 0; i < count; i++) {
          this._setPiece(file, rank, "");
          file++;
        }
      }

      fenIndex++;
    }
  }

  /**
   * Get the current position as FEN.
   */
  get fen() {
    const fen = [];
    for (let i = 0; i < 8; i++) {
      let empty = 0;
      for (let j = 0; j < 8; j++) {
        const piece = this._getPiece(j, i);
        if (piece) {
          if (empty > 0) {
            fen.push(empty);
            empty = 0;
          }
          fen.push(piece);
        } else {
          empty++;
        }
      }
      if (empty > 0) {
        fen.push(empty);
      }
      fen.push("/");
    }
    fen.pop();
    return fen.join("");
  }

  _setPiece(file, rank, fenChar) {
    this.board[rank][file] = fenChar;
  }

  _getPiece(file, rank) {
    return this.board[rank][file];
  }
}

const chessboardPieces = {
  BLACK_KING: {
    className: "bk",
    asciiKey: "k",
  },
  BLACK_QUEEN: {
    className: "bq",
    asciiKey: "q",
  },
  BLACK_ROOK: {
    className: "br",
    asciiKey: "r",
  },
  BLACK_BISHOP: {
    className: "bb",
    asciiKey: "b",
  },
  BLACK_KNIGHT: {
    className: "bn",
    asciiKey: "n",
  },
  BLACK_PAWN: {
    className: "bp",
    asciiKey: "p",
  },
  WHITE_KING: {
    className: "wk",
    asciiKey: "K",
  },
  WHITE_QUEEN: {
    className: "wq",
    asciiKey: "Q",
  },
  WHITE_ROOK: {
    className: "wr",
    asciiKey: "R",
  },
  WHITE_BISHOP: {
    className: "wb",
    asciiKey: "B",
  },
  WHITE_KNIGHT: {
    className: "wn",
    asciiKey: "N",
  },
  WHITE_PAWN: {
    className: "wp",
    asciiKey: "P",
  },
};

function waitForElm(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

const convertChessComPositionToChessBoardPosition = (position) => {
  // position is a string like "88" that needs to be converted to "h8", or "42" to "d2"
  // so we need to convert the first number to a letter and the second number to a number

  // convert the first number to a letter
  const file = String.fromCharCode(97 + parseInt(position[0]) - 1);
  // convert the second number to a number
  const rank = parseInt(position[1]);
  // return the file and rank
  return `${file}${rank}`;
};

const convertChessBoardPositionToChessComPosition = (position) => {
  // position is a string like "h8" that needs to be converted to "88", or "d2" to "42"
  // so we need to convert the first letter to a number and the second number to a number

  // convert the first letter to a number
  const file = parseInt(position[0].charCodeAt(0) - 96);
  // convert the second number to a number
  const rank = parseInt(position[1]);
  // return the file and rank
  return `${file}${rank}`;
};

function getFenOfCurrentBoard() {
  const board = document.querySelector("chess-board");
  // get the board
  const pieces = board.querySelectorAll(".piece");

  let pieceClassNames = [];
  pieces.forEach((piece) => {
    pieceClassNames.push(piece.className);
  });

  let chessboard = pieceClassNames.map((className) => {
    // the format is like below but the problem is that these could be in any order
    // "piece bb 88";
    // find and remove the "piece" part
    className = className.replace("piece", "");
    // split the string into an array and check if one is integer if it passes the parseInt test

    let classList = className
      .split(" ")
      .filter((className) => className.length > 0);

    let piecePosition = classList.find((className) =>
      className.includes("square")
    );

    let pieceName = classList.find(
      (className) => !className.includes("square")
    );

    piecePosition = piecePosition.split("-")[1];

    piecePosition = convertChessComPositionToChessBoardPosition(piecePosition);

    let pieceKey = Object.values(chessboardPieces).find(
      (piece) => piece.className === pieceName
    )?.asciiKey;
    return { pieceKey, piecePosition };
  });

  // place an event listener on the board

  let fenBoard = new FENBoard("");
  chessboard.forEach(({ pieceKey, piecePosition }) => {
    fenBoard.put(piecePosition, pieceKey);
  });
  return fenBoard.fen;
}

// get the board

// I need to know if I am white or black
// I can get this from the board class by checking if it contains "flipped" then I am black

// once I know my side, I can get the moves
// get the move-list

const COLOR_MAP = ["#22c55e", "#fde047", "#fb923c"];
const GAME_STATE_MAP = {
  New: 0,
  InProgress: 1,
  Ended: 2,
};
// board-modal-container-container
let gameState = GAME_STATE_MAP.New;
let gameBoards = [];
(async () => {
  // eslint-disable-next-line no-undef
  let port = chrome.runtime.connect({ name: "chessboard-script" });

  port.onMessage.addListener((message) => {
    if (!message.data) return;
    if (!message?.type === "best_move") return;

    const { data } = message;
    const bestMoves = data["best_move"];
    //   convert the best moves to a structure like
    /**
     * {
     * from: "58",
     * to: "47"
     * }
     */

    const bestMovesConverted = bestMoves.map((move) => {
      const from = convertChessBoardPositionToChessComPosition(
        move.slice(0, 2)
      );
      const to = convertChessBoardPositionToChessComPosition(move.slice(2, 4));
      return { from, to };
    });
    const board = document.querySelector("chess-board");

    bestMovesConverted.forEach(({ from, to }, idx) => {
      const fromElm = board.querySelector(`.square-${from}`);
      //  clone this element
      const clonedFromElm = fromElm.cloneNode(true);
      const clonedFromElmClasses = clonedFromElm.classList;
      clonedFromElmClasses.remove(`square-${from}`);
      clonedFromElmClasses.add(`square-${to}`);

      //   add a style to the cloned element
      clonedFromElm.style.opacity = "0.6";
      //   add a style for z index
      clonedFromElm.style.zIndex = "1000";
      // add a border to the element
      clonedFromElm.style.border = `4px solid ${COLOR_MAP[idx]}`;

      //   add this element for only 8 seconds
      setTimeout(() => {
        clonedFromElm.remove();
      }, 8000);

      //   insert an adjacent element afterbegin to the board
      board.insertAdjacentElement("afterbegin", clonedFromElm);
    });
  });

  const board = await waitForElm("chess-board");
  let mySide = board.classList.contains("flipped") ? "black" : "white";
  console.log("my side is", mySide);
  const moveList = await waitForElm("#move-list");
  moveList.addEventListener("DOMSubtreeModified", () => {
    if (gameState === GAME_STATE_MAP.New) {
      gameState = GAME_STATE_MAP.InProgress;
      // there are no moves, so I need to confirm my side
      const board = document.querySelector("chess-board");
      mySide = board.classList.contains("flipped") ? "black" : "white";
      let currentFen = getFenOfCurrentBoard();
      let whiteFen = currentFen + " w";
      let myFen = mySide === "white" ? whiteFen : currentFen + " b";
      gameBoards.push(whiteFen);
      port.postMessage({ type: "best-move", fen: myFen, count: 3 });
    }
    // get the moves
    const moves = moveList.querySelectorAll(".move");
    // So going in the move list, I need to get the last node that contains the class "move"
    // I can do this by going through the list of moves and getting the last one that contains the class "move"

    if (moves.length === 0) {
      return;
    }

    const lastMove = moves[moves.length - 1];
    //   In this lastMove div I need to get the number of children divs
    //   I can do this by getting the children of the lastMove div
    const lastMoveChildren = lastMove.querySelectorAll("div");
    // if my side is white, then the last move will have 4 children, if my side is black, then the last move will have 2 children
    // and now I need to make my api call
    // also get my opponent's side

    if (mySide === "white" && lastMoveChildren.length === 4) {
      let currentFen = getFenOfCurrentBoard();
      let fen = currentFen + " w";
      let fenPlayedByOpponent = currentFen + " b";
      gameBoards.push(fenPlayedByOpponent);
      port.postMessage({ type: "best-move", fen, count: 3 });
    } else if (mySide === "black" && lastMoveChildren.length === 2) {
      let currentFen = getFenOfCurrentBoard();
      let fen = currentFen + " b";
      let fenPlayedByOpponent = currentFen + " w";
      gameBoards.push(fenPlayedByOpponent);
      port.postMessage({ type: "best-move", fen, count: 3 });
    } else if (mySide === "white" && lastMoveChildren.length === 2) {
      let myPlayedFen = getFenOfCurrentBoard() + " w";
      gameBoards.push(myPlayedFen);
    } else if (mySide === "black" && lastMoveChildren.length === 4) {
      let myPlayedFen = getFenOfCurrentBoard() + " b";
      gameBoards.push(myPlayedFen);
    }
  });
  //   if this modal appears, then the game has ended
  waitForElm(".board-modal-container-container").then((modal) => {
    console.log("game ended");
    gameState = GAME_STATE_MAP.Ended;
    // send all the boards to the background script
    port.postMessage({
      type: "game-over",
      fens: gameBoards,
      username: "demo",
      playerColor: mySide,
    });
    gameBoards = [];
  });
})();
