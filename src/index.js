import React from "react";
import ReactDOM from "react-dom";
import Draggable from "react-draggable";
import Modal from "react-modal";
import { CSSTransition } from "react-transition-group";
import styles from './styles';

const App = () => {
    const [modalIsOpen, setModalIsOpen] = React.useState(false);
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

    const closeModal = () => {
        setModalIsOpen(false);
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
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="modal"
                overlayClassName="modal-overlay"
                shouldCloseOnOverlayClick={true}
                ariaHideApp={false}
            >
                <CSSTransition in={modalIsOpen} timeout={300} classNames="fade">
                    <div className="modal-content">
                        <h2>Playing Strategies</h2>
                        <p>Below are the list of available strategies.</p>
                        <ol>
                          <li>Strategy 1</li>
                          <li>Strategy 2</li>
                          <li>Strategy 3</li>
                          <li>Strategy 4</li>
                          <li>Strategy 5</li>
                          <li>Strategy 6</li>
                          <li>Strategy 7</li>
                        </ol>
                        <button onClick={closeModal}>Close Modal</button>
                    </div>
                </CSSTransition>
            </Modal>
        </React.Fragment>
      </div>
    );
};

const app = document.createElement("div");
app.id = "chessmate";
document.body.appendChild(app);

ReactDOM.render(<App />, app);