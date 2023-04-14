const styles = `
  .modal *, .modal *:before, .modal *:after {
    box-sizing: inherit;
  }
  .flex {
    display: flex;
  }
  .flex-center {
    justify-content: center;
  }
  .text-center {
    text-align: center;
  }
  .floating-button {
    position: fixed;
    z-index: 99999;
    background-color: #fff;
    color: #000;
    border: 2px solid #000;
    border-radius: 4px;
    width: 140px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    bottom: 50px;
    right: 50px;
    box-shadow: 4px 4px 0 rgb(0 0 0 / 20%);
  }

  .loader {
    display: flex;
    justify-content: center;
  }
  
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 100000;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    padding: 20px;
  }
  
  .modal {
    font-size: 16px;
    outline: none;
    position: absolute;
    top: 100px;
    right: 100px;
    background-color: #fff;
    border: 3px solid #000;
    border-radius: 5px;
    box-shadow: 8px 8px 0 rgb(0 0 0 / 20%);
    color: #000;
    width: 400px;
    font-family: 'Questrial', sans-serif;
    max-height: 540px;
    overflow-y: scroll;
  }
  
  .modal-content {
    position: relative;
    padding: 20px;
    max-width: 400px;
    font-family: 'Questrial', sans-serif;
  }

  .modal-content form {
    display: flex;
    flex-direction: column;
  }

  .modal-content input {
    font-size: 16px;
    height: 40px;
    padding: 0;
    margin: 0;
    margin-bottom: 10px;
    padding: 0 10px;
    border: 2px solid #000;
    border-radius: 4px;
  }

  .modal-content button[type="submit"], .modal-content button.btn {
    background: #000;
    padding: 0;
    border: 3px solid black;
    box-shadow: 0 0 0 black;
    transition: all 0.2s;
    color: #fff;
    height: 40px;
    border-radius: 4px;
    margin-bottom: 10px;
    cursor: pointer;
    font-family: 'Questrial', sans-serif;
    font-size: 16px;
  }

  .modal-content button.btn {
    width: 100%;
    text-align: center;
    font-family: 'Questrial', sans-serif;
  }

  .btn-link {
    background: transparent;
    border: 0;
    font-size: 16px;
    text-decoration: underline;
    cursor: pointer;
    font-family: 'Questrial', sans-serif;
  }

  .close-modal {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 20px;
    height: 20px;
    padding: 0;
    line-height: 1;
    font-size: 20px;
    cursor: pointer;
    outline: 0;
    border: 0;
    background: transparent;
  }

  .alert {
    padding: 10px;
    font-size: 16px;
    background: #fafafa;
    border-radius: 4px;
    margin-top: 10px;
  }

  .alert-success {
    background-color: #AFE1AF;
  }

  .strategies .strategy, .btn-skill, .play-strategy {
    font-size: 16px;
    border: 2px solid #000;
    padding: 10px;
    border-radius: 4px;
    box-shadow: 4px 4px 0 rgb(0 0 0 / 20%);
    margin-bottom: 10px;
    transition: 0.2s all;
    cursor: pointer;
    background: #fff;
  }

  .play-strategy {
    margin-right: 10px;
  }

  .play-strategy:last-child {
    margin-right: 0;
  }

  .strategies .strategy:hover, .btn-skill:hover, .play-strategy:hover {
    box-shadow: 0.4rem 0.4rem 0 black;
    transform: translate(-0.4rem, -0.4rem);
  }

  .skills {
    display: flex;
    flex-direction: column;
  }

  .btn-puzzle {
    flex: 1;
    text-align: center;
    border: 2px solid #000;
    border-radius: 4px;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    transition: 0.2s all;
  }

  .btn-puzzle:hover {
    box-shadow: 0.4rem 0.4rem 0 black;
    transform: translate(-0.4rem, -0.4rem);
  }

  .btn-puzzle:last-child {
    border-left: 0;
  }

  .best-move-pop {
    position: absolute;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    width: 100px;
    top: 50%;
    background: #fff;
    padding: 20px;
    border-radius: 4px;
    z-index: 9999;
    text-align: center;
    font-weight: bold;
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