
        
CREATE TABLE board
(
  id      INTEGER NOT NULL,
  game_id INTEGER NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE board_cards
(
  id        INTEGER NOT NULL,
  card_id   INTEGER NOT NULL,
  board_id  INTEGER NOT NULL,
  player_id INTEGER NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE card
(
  id          INTEGER NOT NULL,
  name        VARCHAR(255) NOT NULL,
  description TEXT    NOT NULL,
  image       VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE family
(
  id    INTEGER NOT NULL,
  name  VARCHAR(255) NOT NULL,
  color VARCHAR(255) NOT NULL,
  image VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE game
(
  id    INTEGER NOT NULL,
  name  VARCHAR(255) NOT NULL,
  phase INTEGER NOT NULL,
  turn  INTEGER NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE game_player
(
  id        INTEGER NOT NULL,
  player_id INTEGER NOT NULL,
  game_id   INTEGER NOT NULL,
  family_id INTEGER NOT NULL,
  hand_id   INTEGER NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE hand
(
  id INTEGER NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE hand_cards
(
  id      INTEGER NOT NULL,
  card_id INTEGER NOT NULL,
  hand_id INTEGER NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE player
(
  id       INTEGER NOT NULL,
  email    VARCHAR(255) NOT NULL,
  pseudo   VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

ALTER TABLE game_player
  ADD CONSTRAINT FK_player_TO_game_player
    FOREIGN KEY (player_id)
    REFERENCES player (id);

ALTER TABLE game_player
  ADD CONSTRAINT FK_game_TO_game_player
    FOREIGN KEY (game_id)
    REFERENCES game (id);

ALTER TABLE hand_cards
  ADD CONSTRAINT FK_card_TO_hand_cards
    FOREIGN KEY (card_id)
    REFERENCES card (id);

ALTER TABLE hand_cards
  ADD CONSTRAINT FK_hand_TO_hand_cards
    FOREIGN KEY (hand_id)
    REFERENCES hand (id);

ALTER TABLE game_player
  ADD CONSTRAINT FK_family_TO_game_player
    FOREIGN KEY (family_id)
    REFERENCES family (id);

ALTER TABLE board
  ADD CONSTRAINT FK_game_TO_board
    FOREIGN KEY (game_id)
    REFERENCES game (id);

ALTER TABLE board_cards
  ADD CONSTRAINT FK_card_TO_board_cards
    FOREIGN KEY (card_id)
    REFERENCES card (id);

ALTER TABLE board_cards
  ADD CONSTRAINT FK_board_TO_board_cards
    FOREIGN KEY (board_id)
    REFERENCES board (id);

ALTER TABLE board_cards
  ADD CONSTRAINT FK_player_TO_board_cards
    FOREIGN KEY (player_id)
    REFERENCES player (id);

ALTER TABLE game_player
  ADD CONSTRAINT FK_hand_TO_game_player
    FOREIGN KEY (hand_id)
    REFERENCES hand (id);

        
      