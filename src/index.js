import React from "react";
import ReactDOM from "react-dom";
import Draggable from "react-draggable";
import ChessMateModal from "./Modal";
import UserAuth from './UserAuth';
import styles from './styles';

import PlayStrategy from './PlayStrategy'
import PlayPuzzle from "./PlayPuzzle";
import { useEffect } from "react";

import { Watch } from  'react-loader-spinner'
import UserPlayStrategy from "./UserPlayStrategy";

// const strategies = [
//     {
//         name: 'The Italian Game',
//         description: 'The Italian game begins with 1.e4 e5 2.Nf3 Nc6 3.Bc4. The point is to control the center quickly with your pawn and knight and then put your bishop on its most dangerous square. You are also preparing to castle to safety.',
//         image: 'strategy-theitaliangame.png'
//     }
// ]

const skillLevels = [
    {
        "name": "Pawn",
        "description": "for beginner players who are just starting to learn the game",
        "level": 1
    },
    {
        "name": "Knight",
        "description": "for novice players who have a basic understanding of the game and can make some strategic moves",
        "level": 2
    },
    {
        "name": "Bishop",
        "description": "for intermediate players who have developed their skills further and can create more complex strategies",
        "level": 3
    },
    {
        "name": "Rook",
        "description": "for advanced players who have mastered the game's fundamental principles and can execute advanced tactics",
        "level": 4
    },
    {
        "name": "Queen",
        "description": "for expert players who have a deep understanding of the game and can execute highly complex strategies",
        "level": 5
    },
    {
        "name": "King",
        "description": "for master players who have achieved a high level of mastery in the game and can compete at a professional level",
        "level": 6
    },
    {
        "name": "Super Sayan GM",
        "description": "for elite players who have achieved the highest level of skill and can compete at the highest levels of international competition.",
        "level": 7
    }
]

const App = () => {
    const [modalIsOpen, setModalIsOpen] = React.useState(false);
    const [strategyModalIsOpen, setStrategyModalIsOpen] = React.useState(false);
    const [playModalIsOpen, setPlayModalIsOpen] = React.useState(false);
    const [loginModalIsOpen, setLoginModalIsOpen] = React.useState(false);
    const [strategy, setStrategy] = React.useState({});
    const [strategies, setStrategies] = React.useState([]);
    const [dragging, setDragging] = React.useState(false);
    const [response, setResponse] = React.useState('');
    const [rating, setRating] = React.useState(0);
    const [puzzles, setPuzzles] = React.useState([]);
    const [username, setUsername] = React.useState('');
    const [puzzle, setPuzzle] = React.useState([]);
    const [completedPuzzles, setCompletedPuzzles] = React.useState([]);
    const [puzzleFens, setPuzzleFens] = React.useState([]);
    const [requestRating, setRequestRating] = React.useState(true);
    const [skill, setSkill] = React.useState('')
    const [playStrategy, setPlayStrategy] = React.useState(false)
    const [replayStrategy, setReplayStrategy] = React.useState(false)

    useEffect(() => {
        console.log('test length')
        console.log(puzzles.length, puzzleFens.length, completedPuzzles.length)
        if ( puzzles.length !== 0 && puzzleFens.length !== 0 && completedPuzzles.length !== 0 && puzzles.length === completedPuzzles.length && puzzles.length === puzzleFens.length && requestRating ) {
            setRequestRating(false)
            const handleUserRating = () => {
                console.log('initial ratings...')
                console.log(puzzleFens)
                console.log('completed puzzles')
                console.log(completedPuzzles)
                
                const getRating = async () => {
                    const puzzleUrl = 'http://127.0.0.1:5000/get-initial-rating'
                    const response = await fetch(puzzleUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ "username": username, "player_fens": puzzleFens }),
                    });
                    const ratingData = await response.json();
                    console.log(ratingData)
                    setRating(ratingData.rating)
                }
                getRating()
            }
            handleUserRating()
        }
        if ( '' !== username && 0 !== rating ) {
            const getStrategies = async () => {
                const strategyUrl = 'http://127.0.0.1:5000/get-opening'
                const strategyResponse = await fetch(strategyUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ "username": username }),
                });
                const strategyData = await strategyResponse.json();
                console.log(strategyData)
                setStrategies(strategyData.openings)
            }
            getStrategies()
        }
    },[puzzles, completedPuzzles, puzzleFens, username, requestRating, rating])

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
            title: strategy.title,
            description: strategy.description,
            moves: strategy.moves
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
        setPlayStrategy(false)
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
                console.log('username: ',username)
                setLoginModalIsOpen(false);
                setModalIsOpen(true);
                // if ( username ) {
                //     console.log('username', username)
                //     setLoginModalIsOpen(false);
                //     setModalIsOpen(true);
                // }
            }
        }, 1000);
    }

    const handleRatingSuccess = (response) => {
        console.log(`rating: ${response}`)
        setRating(response)
    }

    const handlePuzzleModal = (puzzle, id) => {
        puzzle.id = id
        setPuzzle(puzzle)
        setPlayModalIsOpen(true);
    };

    const handleCompletedPuzzle = async () => {
        setCompletedPuzzles([...completedPuzzles, puzzle.id])
        setPuzzleFens([...puzzleFens, puzzle.fen])
        setTimeout(() => {
            // console.log(`completed puzzles:`)
            // console.log(completedPuzzles)
            // console.log(`puzzle fens:`)
            // console.log(puzzleFens)
            setPlayModalIsOpen(false);
        }, 3000);
    }

    const handleSkillLevel = (skill) => {
        setSkill(skill)
        const fetchPuzzles = async () => {
            const puzzleUrl = 'http://127.0.0.1:5000/get-puzzle'
            const response = await fetch(puzzleUrl, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "username": username, "group": skill }),
            });
            const puzzlesR = await response.json();
            console.log(puzzlesR)
            setPuzzles(puzzlesR.puzzles)
        }
        // call the function
        fetchPuzzles()
    }

    const handlePlayStrategy = (strategy) => {
        setPlayStrategy(true)
    }

    const handleReplayStrategy = (moves) => {
        setReplayStrategy(true)
    }

    const handleReplay = () => {
        setReplayStrategy(false)
    }

    return (
      <div>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Questrial&display=swap" rel="stylesheet" />
        <style>{styles}</style>
        <React.Fragment>
            {/* Floating Button */}
            <Draggable
                onStart={handleDragStart}
                onStop={handleDragStop}
            >
                <button className="floating-button" onClick={handleClick}>
                    CheckMate
                </button>
            </Draggable>
            {/* model after login */}
            <ChessMateModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                title={''===skill && !strategies.length ?`Select a skill level` : 0===rating?`Please complete the puzzles`: strategies.length ? `Select a Strategy` : `Puzzles & Strategies`}
            >
                Hello, {username}
                {
                    0 === rating ? 
                        <>
                            { puzzles && puzzles.length === 0 && skill === '' && <>
                                <p>Please select your skill level.</p>
                                <div className="skills">
                                {
                                    skillLevels.map((skill)=>{
                                        return <button key={skill.level} className="btn-skill" onClick={() => handleSkillLevel(skill.level)}>{skill.name}</button>
                                    })
                                }
                                </div>
                            </> }
                            { puzzles && puzzles.length === 0 && skill !== '' && <><p>Hang on.. Generating puzzles based on your skill level...</p><div className="loader"><Watch
                                height="80"
                                width="80"
                                radius="48"
                                color="#baca44"
                                ariaLabel="watch-loading"
                                wrapperStyle={{}}
                                wrapperClassName="loading-wrapper"
                                visible={true}
                                /></div></> }
                            { puzzles && ( puzzles.length > 0 || puzzles.length < 0 ) && skill !== '' && <><p>Below are the list of available puzzles.</p><div className="flex" style={{cursor:'pointer'}}>
                                {
                                    puzzles && puzzles.map((p,i) => {
                                        return <div key={i} className="btn-puzzle" onClick={() => ! completedPuzzles.includes(i) ? handlePuzzleModal(p, i) : false} style={{opacity:`${completedPuzzles.includes(i) ? 0.4: 1}`}}>
                                            Puzzle {+i+1} {completedPuzzles.includes(i) ? <img src="./check-mark.png" alt="done" style={{width:20,marginBottom:'-2px'}} /> : null}
                                        </div>
                                        }
                                    )
                                }
                            </div></>
                            }
                        </>
                    :
                        null
                }
                {
                    0 !== rating ?
                        <>
                            <p>User rating: {rating}</p>
                            <p>Below are the list of available strategies.</p>
                            <div className="strategies" style={{cursor:'pointer'}}>
                                {
                                    strategies instanceof Array && strategies.map((s, i) => <div className="strategy" key={i} onClick={() => handleStrategyModal(s)}>
                                            {s.title}
                                        </div>
                                    )
                                }
                            </div>
                        </>
                    :
                        null
                }
            </ChessMateModal>
            {/* strategy model */}
            <ChessMateModal
                isOpen={strategyModalIsOpen}
                onRequestClose={closeStrategyModal}
                title={strategy.title}
            >
                {
                    ! playStrategy && <><PlayStrategy moves={strategy.moves} replay={replayStrategy} setPlayReplay={handleReplay} />
                    <p>{strategy.description}</p>
                    <div className="flex flex-center">
                        <button className="play-strategy" onClick={() => handleReplayStrategy()}>Replay Strategy</button>
                        <button className="play-strategy" onClick={() => handlePlayStrategy(strategy)}>Practise Strategy</button>
                    </div>
                    </>
                }
                {
                    playStrategy && <UserPlayStrategy />
                }
            </ChessMateModal>
            {/* puzzle model */}
            <ChessMateModal
                isOpen={playModalIsOpen}
                onRequestClose={closePlayModal}
                title={'Play Puzzle'}
            >
                <PlayPuzzle position={puzzle['fen']} bestMove={puzzle['best_move']} setCompletedPuzzle={handleCompletedPuzzle} />
            </ChessMateModal>
            {/* login model */}
            <ChessMateModal
                isOpen={loginModalIsOpen}
                onRequestClose={closeLoginModal}
                title={"Login / Register"}
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