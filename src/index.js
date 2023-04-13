import React from "react";
import ReactDOM from "react-dom";
import Draggable from "react-draggable";
import ChessMateModal from "./Modal";
import UserAuth from './UserAuth';
import styles from './styles';

import PlayStrategy from './PlayStrategy'
import PlayPuzzle from "./PlayPuzzle";
import { useEffect } from "react";

const strategies = [
    {
        name: 'The Italian Game',
        description: 'The Italian game begins with 1.e4 e5 2.Nf3 Nc6 3.Bc4. The point is to control the center quickly with your pawn and knight and then put your bishop on its most dangerous square. You are also preparing to castle to safety.',
        image: 'strategy-theitaliangame.png'
    }
]

const App = () => {
    const [modalIsOpen, setModalIsOpen] = React.useState(false);
    const [strategyModalIsOpen, setStrategyModalIsOpen] = React.useState(false);
    const [playModalIsOpen, setPlayModalIsOpen] = React.useState(false);
    const [loginModalIsOpen, setLoginModalIsOpen] = React.useState(false);
    const [strategy, setStrategy] = React.useState({});
    const [dragging, setDragging] = React.useState(false);
    const [response, setResponse] = React.useState('');
    const [rating, setRating] = React.useState(false);
    const [puzzles, setPuzzles] = React.useState([]);
    const [username, setUsername] = React.useState([]);
    const [puzzle, setPuzzle] = React.useState([]);
    // const [chess] = React.useState(new Chess());
    // const [currentMove, setCurrentMove] = React.useState(0);
    // const [boardLocked, setBoardLocked] = React.useState(false);

    const handleDragStart = () => {
        setDragging(true);
    };

    const handleDragStop = (e) => {
      e.preventDefault()
      setDragging(false);
    };

    const handleClick = () => {
        if (!dragging && "Logged in successfully" !== response ) {
          setLoginModalIsOpen(true);
        }
        if ("Logged in successfully" === response ) {
            setModalIsOpen(true);
        }
    };

    const handleStrategyModal = (strategy) => {
        setStrategy({
            name: strategy.name,
            description: strategy.description
        })
        setStrategyModalIsOpen(true);
    };

    const handlePlayModal = async (strategy) => {
        const puzzleUrl = 'http://127.0.0.1:5000/get-puzzle'
        const response = await fetch(puzzleUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "group": 1 }),
        });
        const puzzlesR = await response.json();
        console.log(puzzlesR)
        setPuzzles(puzzlesR.puzzles)
        setPlayModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const closeStrategyModal = () => {
        setStrategyModalIsOpen(false);
    };

    const closePlayModal = () => {
        setPlayModalIsOpen(false);
    };

    const closeLoginModal = () => {
        setLoginModalIsOpen(false);
    };

    const handleUsername = (username) => {
        console.log(`handle username: ${username}`)
        setUsername(username)
    }

    const handleLoginSuccess = (response) => {
        setResponse(response)
        setTimeout(() => {
            if ( "Logged in successfully" === response ) {
                console.log('response')
                if ( username ) {
                    console.log('username', username)
                    setLoginModalIsOpen(false);
                    setModalIsOpen(true);

                    const fetchPuzzles = async () => {
                        const puzzleUrl = 'http://127.0.0.1:5000/get-puzzle'
                        const response = await fetch(puzzleUrl, {
                            method: 'POST',
                            headers: {
                            'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ "username": username, "group": 1 }),
                        });
                        const puzzlesR = await response.json();
                        console.log(puzzlesR)
                        setPuzzles(puzzlesR.puzzles)
                    }
                    // call the function
                    fetchPuzzles()
                }
            }
        }, 1000);
    }

    const handleRatingSuccess = (response) => {
        console.log(`rating: ${response}`)
        setRating(response)
    }

    const handlePuzzleModal = (puzzle) => {
        setPuzzle(puzzle)
        setPlayModalIsOpen(true);
    };

    return (
      <div>
        <style>{styles}</style>
        <React.Fragment>
            <Draggable
                onStart={handleDragStart}
                onStop={handleDragStop}
            >
                <button className="floating-button" onClick={handleClick}>
                    Start Playing
                </button>
            </Draggable>
            {/* model after login */}
            <ChessMateModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                title={`Puzzles & Strategies`}
            >
                Hello, {username}
                {
                    0 === rating ? 
                        <>
                            { puzzles && puzzles.length <= 0 && <p>Hang on.. Generating puzzles based on your user level...</p> }
                            { puzzles && puzzles.length > 0 && <p>Below are the list of available puzzles.</p> }
                            <ol style={{cursor:'pointer'}}>
                                {
                                    puzzles && puzzles.map((p,i) => {
                                        console.log(p, i)
                                        return <li key={i} onClick={() => handlePuzzleModal(p)}>
                                            <h4>Puzzle {i}</h4>
                                        </li>
                                        }
                                    )
                                }
                            </ol>
                        </>
                    :
                        null
                }
                {
                    0 < rating ?
                        <>
                            <p>User rating: {rating}</p>
                            <p>Below are the list of available strategies.</p>
                            <ol style={{cursor:'pointer'}}>
                                {
                                    strategies && strategies.map((s) => <li key={s.name} onClick={() => handleStrategyModal(s)}>
                                            <h4>{s.name}</h4>
                                            <img src={`/${s.image}`} alt={s.name} style={{width:200}} />
                                        </li>
                                    )
                                }
                            </ol>
                        </>
                    :
                        null
                }
            </ChessMateModal>
            {/* strategy model */}
            <ChessMateModal
                isOpen={strategyModalIsOpen}
                onRequestClose={closeStrategyModal}
                title={strategy.name}
                css={{backgroundColor:'blue'}}
            >
                <p>{strategy.description}</p>
                <PlayStrategy />
                <button className="strategy-button" onClick={handlePlayModal}>
                    Play a puzzle
                </button>
            </ChessMateModal>
            {/* puzzle model */}
            <ChessMateModal
                isOpen={playModalIsOpen}
                onRequestClose={closePlayModal}
                title={'Play Puzzle'}
                css={{backgroundColor:'green'}}
            >
                <PlayPuzzle position={puzzle['fen']} bestMove={puzzle['best_move']} />
            </ChessMateModal>
            {/* login model */}
            <ChessMateModal
                isOpen={loginModalIsOpen}
                onRequestClose={closeLoginModal}
                title={"Login / Register"}
                css={{backgroundColor:'orange'}}
            >
                <UserAuth response={response} setResponse={handleLoginSuccess} rating={rating} setRating={handleRatingSuccess} getUsername={handleUsername} />
            </ChessMateModal>
        </React.Fragment>
      </div>
    );
};

const app = document.createElement("div");
app.id = "chessmate";
document.body.appendChild(app);

ReactDOM.render(<App />, app);