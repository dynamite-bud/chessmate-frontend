import React from "react";
import './styles.css'
import { Chessboard } from "react-chessboard";
import Card from "./Compoment/Card"
import ChessMate from "./Modal";

export default function App(){
    const [modalIsOpen, setModalIsOpen] = React.useState(false);
    const [strategy, setStrategy] = React.useState({});
    const [dragging, setDragging] = React.useState(false);

    const handleClick = () => {
        if (!dragging) {
          setModalIsOpen(true);
        }
    };


    const closeModal = () => {
        setModalIsOpen(false);
    };


    return (
      <div className="chess">
          <button className="floating-button" onClick={handleClick}>
              Start Playing
          </button>
          <div style={{display:"flex",flexDirection:"row"}}>
            <Card props = {modalIsOpen}/>
            <ChessMate
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                title={strategy.name}
                css={{backgroundColor:'blue'}}
            >
                <p>{strategy.description}</p>
                <Chessboard id={strategy.name} areArrowsAllowed={true} customArrows={[ ['a3', 'a5'], ['g1', 'f3'] ]}/>
            </ChessMate>
          </div>
      </div>
    )
};

