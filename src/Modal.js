import React from "react";
import { CSSTransition } from "react-transition-group";

const ChessMate = ({ isOpen, onRequestClose, title, children, css = {
    backgroundColor: '#000',
    width: 300,
    marginLeft:-550
} }) => {
    return (
        <div
            className='model'
        >
            {isOpen?
                <CSSTransition in={isOpen} timeout={300} classNames="fade">
                    <div className="modal-content" style={css}>
                        <h2 style={{marginTop: 0}}>Chess</h2>
                        {children}
                        <button className="close-modal" onClick={onRequestClose}>x</button>
                    </div>
                </CSSTransition>:null
            }
        </div>
    );
};

export default ChessMate;
