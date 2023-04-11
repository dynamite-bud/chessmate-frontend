import React from "react";
import ReactDOM from "react-dom";
import Draggable from "react-draggable";
import ChessMateModal from "./Modal";
import styles from './styles';

import { Chessboard } from "react-chessboard";

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
    const [strategy, setStrategy] = React.useState({});
    const [dragging, setDragging] = React.useState(false);

    const handleDragStart = () => {
        setDragging(true);
    };

    const handleDragStop = (e) => {
      e.preventDefault()
      setDragging(false);
    };

    const handleClick = () => {
        if (!dragging) {
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

    const handlePlayModal = (strategy) => {
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
            <ChessMateModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                title={`Playing Strategies`}
            >
                <p>Below are the list of available strategies.</p>
                <ol style={{cursor:'pointer'}}>
                    {
                        strategies.map((s) => <li key={s.name} onClick={() => handleStrategyModal(s)}>
                                <h4>{s.name}</h4>
                                <img src={`/${s.image}`} alt={s.name} style={{width:200}} />
                            </li>
                        )
                    }
                </ol>
            </ChessMateModal>
            <ChessMateModal
                isOpen={strategyModalIsOpen}
                onRequestClose={closeStrategyModal}
                title={strategy.name}
                css={{backgroundColor:'blue'}}
            >
                <p>{strategy.description}</p>
                <button className="strategy-button" onClick={handlePlayModal}>
                    Play Strategy
                </button>
                <Chessboard id={strategy.name} />
            </ChessMateModal>
            <ChessMateModal
                isOpen={playModalIsOpen}
                onRequestClose={closePlayModal}
                title={strategy.name}
                css={{backgroundColor:'green'}}
            >
                <p>{strategy.description}</p>
            </ChessMateModal>
        </React.Fragment>
      </div>
    );
};

const app = document.createElement("div");
app.id = "chessmate";
document.body.appendChild(app);

ReactDOM.render(<App />, app);