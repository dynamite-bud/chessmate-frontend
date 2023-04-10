const styles = `.floating-button {
    position: absolute;
    z-index: 99999;
    background-color: #007bff;
    color: #ffffff;
    border: none;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    bottom: 100px;
    right: 100px;
  }
  
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100000;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    padding: 20px;
  }
  
  .modal {
    outline: none;
    position: absolute;
    top: 100px;
    right: 100px;
    background: #000;
    padding: 20px;
    border-radius: 20px;
    color: #fff;
  }
  
  .modal-content {
    max-width: 400px;
    text-align: center;
  }
  
  .fade-enter {
    opacity: 0;
    transform: scale(0.9);
  }
  
  .fade-enter-active {
    opacity: 1;
    transform: scale(1);
    transition: opacity 300ms, transform 300ms;
  }
  
  .fade-exit {
    opacity: 1;
    transform: scale(1);
  }
  
  .fade-exit-active {
    opacity: 0;
    transform: scale(0.9);
    transition: opacity 300ms, transform 300ms;
  }`;

export default styles;