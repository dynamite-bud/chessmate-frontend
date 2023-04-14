import React from "react";
import Modal from "react-modal";
import { CSSTransition } from "react-transition-group";

const ChessMateModal = ({ isOpen, onRequestClose, title, children, css = {
    backgroundColor: '#fff'
} }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="modal"
            overlayClassName="modal-overlay"
            shouldCloseOnOverlayClick={true}
            ariaHideApp={false}
        >
            <CSSTransition in={isOpen} timeout={300} classNames="fade">
                <div className="modal-content" style={css}>
                    <h2 style={{marginTop:0}}>{title}</h2>
                    {children}
                    <button className="close-modal" onClick={onRequestClose}>x</button>
                </div>
            </CSSTransition>
        </Modal>
    );
};

export default ChessMateModal;