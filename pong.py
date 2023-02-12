# __all__ limite les modules importés quand on fait "from pong.py import *"
__all__ = ["PLAYER1", "PLAYER2", "PingPangPong"]

# Défini 4 constantes
PLAYER1, PLAYER2, PLAYER3, PLAYER4= "red", "yellow", "blue", "green"

class PingPangPong:
    """
    Une classe pour jouer au PingPangPong
    Pour jouer : Méthode `play`
    Pour voir les coups passés : Attribut `moves`
    Pour voir le gagnant : Attribut `winner`
    """

    def __init__(self):
        # Créateur
        self.moves = []                     # Tableau de coups joués
        self.top = [0 for _ in range(7)]    # Tableau de 6 "0" : Nombre de pions / colonne
        self.winner = None                  # Joueur gagnant ou None

    @property
    def last_player(self):
        """
        Renvoi le joueur qui a joué le dernier coup

        Rappel : @property permet d'utiliser une methode comme un attribut
        Ca crée des getters / setters implicite
        En clair on peut faire foo = Connect4.last_player
        """
        return PLAYER1 if len(self.moves) % 4 else PLAYER2 if len(self.moves) % 4 else PLAYER3 if len(self.moves) % 4 else PLAYER4



    @property
    def last_player_won(self):
        """
        Renvoie vrai si le dernier coup est gagnant
        """
        b = sum(1 << (8 * column + row) for _, column, row in self.moves[::-2])
        return any(b & b >> v & b >> 2 * v & b >> 3 * v for v in [1, 7, 8, 9])



    def play(self, player, column):
        """
        Joue un pion de la couleur `player` dans la colonne `column`
        Renvoie la ligne ou le pion atterit
        Léve `RuntimeError` si le coup est illégal
        """
        if player == self.last_player:
            raise RuntimeError("Ce n'est pas ton tour.")

        row = self.top[column]
        if row == 6:
            raise RuntimeError("Cette colonne est pleinne.")

        self.moves.append((player, column, row))
        self.top[column] += 1

        if self.winner is None and self.last_player_won:
            self.winner = self.last_player

        return row