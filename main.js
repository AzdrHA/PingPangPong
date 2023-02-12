import {app} from "./scripts/app.ts";

function initGame(websocket) {
    websocket.addEventListener("open", () => {
        // Envoie un événement "init" en fonction de la personne qui se connecte.
        const params = new URLSearchParams(window.location.search);
        let event = { type: "init" };
        if (params.has("join")) {
            // Un second joueur rejoint une partie existante
            event.join = params.get("join");
        } else if (params.has("watch")){
            event.watch = params.get("watch");
            console.log(params.get("watch"))
        }else{
            // Le 1er joueur crée la partie
        }
        websocket.send(JSON.stringify(event));
    });
    }
  
function showMessage(message) {
    window.setTimeout(() => window.alert(message), 50);
}

function receiveDeplacement (websocket) {
    websocket.addEventListener("message", ({ data }) => {
        const event = JSON.parse(data);
        switch (event.type) {
            case "init":
                // Créer un lien pour inviter le second joueur
                document.querySelector(".join").href = "?join=" + event.join;
                document.querySelector(".watch").href = "?watch=" + event.watch;
                break;
            case "play":
                // Afficher le coup joué avec playMove de connect4.js
                playMove(board, event.player, event.column, event.row);
                break;
            case "win":
                showMessage(`Joueur ${event.player} à gagné !`);
                // Game over ! On ferme la connexion.
                websocket.close(1000);
                break;
            case "error":
                // Afficher le message envoyé par le serveur
                showMessage(event.message);
                break;
            default:
                throw new Error(`Unsupported event type: ${event.type}.`);
        }
    });
}



