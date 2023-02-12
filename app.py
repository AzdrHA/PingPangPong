import asyncio
import websockets
import json
import secrets
from Pong import PLAYER1, PLAYER2, PLAYER3, PLAYER4, PingPangPong

""" Fichier principal du serveur
    Contient une boucle infinie d'écoute : main() sur localhost:8001
    et une fonction appelée à chaque message entrant : handler 
        ... qui fait un print du message
"""

JOIN = {}
WATCH = {}

async def error(websocket, message):
    event = {
        "type": "error",
        "message": message,
    }
    await websocket.send(json.dumps(event))


async def join(websocket, join_key):
    # Trouver la bonne partie
    try:
        game, connected = JOIN[join_key]
    except KeyError:
        await error(websocket, "Partie non trouvée.")
        return

    # Se connecter à la partie
    connected.add(websocket)
    try:
        await play(websocket, game, PLAYER2, connected)
    finally:
        connected.remove(websocket)


async def start(websocket):
    game = Pong()
    connected = {websocket}

    # On génére une clé de 12 chars de long, compatible avec une URL
    join_key = secrets.token_urlsafe(12)
    #  On stocke le tuple Partie / Connexion dans la case "clé"
    JOIN[join_key] = game, connected

    #On génère également une clé pour les viewers
    watch_key = secrets.token_urlsafe(12)
    WATCH[watch_key] = game, connected

    try:
        # Envoyez la clé d'accès au navigateur du premier joueur,
        # ou elle sera utilisé pour faire un lien "Join"
        event = {
            "type": "init",
            "join": join_key,
            "watch": watch_key,
        }
        await websocket.send(json.dumps(event))
        await play(websocket, game, PLAYER1, connected)

    finally:
        del JOIN[join_key]
        del WATCH[watch_key]


async def play(websocket, game, player, connected):
    """
    Recoit et traite les coups des différents joueurs
    """
    async for message in websocket:
        # Lit un evénement "play" reçu d'un navigateur
        event = json.loads(message)
        assert event["type"] == "play"
        column = event["column"]
        try:
            # Joue le coup demandé
            row = game.play(player, column)
        except RuntimeError as exc:
            # Envoie une erreur si le coup est irrégulier
            await error(websocket, str(exc))
            continue

        # Forge un evénement "play" pour metre à jour le navigateur
        event = {
            "type": "play",
            "player": player,
            "column": column,
            "row": row,
        }
        websockets.broadcast(connected, json.dumps(event))

        # Si le coup est gagnant : Envoie un evénement "win"
        if game.winner is not None:
            event = {
                "type": "win",
                "player": game.winner,
            }
            websockets.broadcast(connected, json.dumps(event))


async def watch(websocket, watch_key):
    # Trouver le "bon" Pong
    try:
        game, connected = WATCH[watch_key]
    except KeyError:
        await error(websocket, "Partie non trouvée.")
        return
    # Se connecter à la partie
    connected.add(websocket)
    try:
        await play(websocket, game, PLAYER2, connected)
    finally:
        connected.remove(websocket)


async def handler(websocket):
    # Lire & traiter les événements "init" depuis le navigateur
    message = await websocket.recv()
    event = json.loads(message)
    assert event["type"] == "init"
    print(message)
    if "join" in event:
        # Le second joueur rejoint une partie existante
        await join(websocket, event["join"])
    elif "watch" in event:
        await watch(websocket, event['watch'])
    else:
        # Le premier joueur commence une partie
        await start(websocket)


async def main():
    async with websockets.serve(handler, "", 8002):
        await asyncio.Future()

if __name__ == "__main__":
    asyncio.run(main())