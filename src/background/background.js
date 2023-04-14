async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.

  // eslint-disable-next-line no-undef
  let [tab] = await chrome.tabs.query(queryOptions);

  return tab;
}

let prevFen = "";

// eslint-disable-next-line no-undef
chrome.tabs.onActivated.addListener((activeInfo) => {
  // eslint-disable-next-line no-undef
  chrome.tabs.get(activeInfo.tabId, function (tab) {
    let tabUrl = tab.url;
    if (tabUrl.includes("www.chess.com")) {
      // eslint-disable-next-line no-undef
      chrome.runtime.onConnect.addListener((port) => {
        console.log("Connected to content script:", port.name);

        port.onMessage.addListener((message) => {
          if (message.type === "best-move") {
            let { fen, count } = message;
            if (fen === prevFen) {
              return;
            }
            prevFen = fen;

            console.log("Received message from content script:", message);
            fetch("http://192.168.55.241:5000/best-move", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ board: fen, count }),
            }).then((response) => {
              response.json().then((data) => {
                port.postMessage({ type: "best-move", data });
              });
            });
          } else if (message.type === "game-over") {
            let { fens, username, playerColor } = message;
            fetch("http://192.168.55.241:5000/update-rating", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                fens,
                username,
                player_color: playerColor,
              }),
            }).then((response) => {
              response.json().then((data) => {
                port.postMessage({ type: "updated-rating", data });
              });
            });
          }
        });
      });
    }
  });
});

// console.log(getCurrentTab().then((tab) => console.log(tab)));
