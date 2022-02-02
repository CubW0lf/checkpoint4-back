
        
CREATE TABLE aime
(
  id             INTEGER NOT NULL AUTO_INCREMENT,
  aime           TINYINT NOT NULL DEFAULT 1,
  id_joueur      INTEGER NOT NULL,
  id_proposition INTEGER NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE equipe
(
  id      INTEGER      NOT NULL AUTO_INCREMENT,
  nom     VARCHAR(255) NOT NULL,
  score   INTEGER      NOT NULL,
  couleur VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE equipe_joueur
(
  id        INTEGER NOT NULL AUTO_INCREMENT,
  id_joueur INTEGER NOT NULL,
  id_equipe INTEGER NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE equipe_partie
(
  id        INTEGER NOT NULL AUTO_INCREMENT,
  id_equipe INTEGER NOT NULL,
  id_partie INTEGER NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE joueur
(
  id       INTEGER      NOT NULL AUTO_INCREMENT,
  pseudo   VARCHAR(255) NOT NULL,
  email    VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE morceau
(
  id        INTEGER      NOT NULL AUTO_INCREMENT,
  auteur    VARCHAR(255) NOT NULL,
  titre     VARCHAR(255) NOT NULL,
  numero    INTEGER      NOT NULL,
  id_partie INTEGER      NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE partie
(
  id INTEGER NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id)
);

CREATE TABLE proposition
(
  id         INTEGER      NOT NULL AUTO_INCREMENT,
  auteur     VARCHAR(255) NOT NULL,
  titre      VARCHAR(255) NOT NULL,
  id_morceau INTEGER      NOT NULL,
  id_equipe  INTEGER      NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE reponse
(
  id         INTEGER      NOT NULL AUTO_INCREMENT,
  auteur     VARCHAR(255) NOT NULL,
  titre      VARCHAR(255) NOT NULL,
  id_morceau INTEGER      NOT NULL,
  id_equipe  INTEGER      NOT NULL,
  PRIMARY KEY (id)
);

ALTER TABLE morceau
  ADD CONSTRAINT FK_partie_TO_morceau
    FOREIGN KEY (id_partie)
    REFERENCES partie (id);

ALTER TABLE proposition
  ADD CONSTRAINT FK_morceau_TO_proposition
    FOREIGN KEY (id_morceau)
    REFERENCES morceau (id);

ALTER TABLE reponse
  ADD CONSTRAINT FK_morceau_TO_reponse
    FOREIGN KEY (id_morceau)
    REFERENCES morceau (id);

ALTER TABLE equipe_partie
  ADD CONSTRAINT FK_partie_TO_equipe_partie
    FOREIGN KEY (id_partie)
    REFERENCES partie (id);

ALTER TABLE equipe_joueur
  ADD CONSTRAINT FK_joueur_TO_equipe_joueur
    FOREIGN KEY (id_joueur)
    REFERENCES joueur (id);

ALTER TABLE proposition
  ADD CONSTRAINT FK_equipe_TO_proposition
    FOREIGN KEY (id_equipe)
    REFERENCES equipe (id);

ALTER TABLE reponse
  ADD CONSTRAINT FK_equipe_TO_reponse
    FOREIGN KEY (id_equipe)
    REFERENCES equipe (id);

ALTER TABLE equipe_partie
  ADD CONSTRAINT FK_equipe_TO_equipe_partie
    FOREIGN KEY (id_equipe)
    REFERENCES equipe (id);

ALTER TABLE equipe_joueur
  ADD CONSTRAINT FK_equipe_TO_equipe_joueur
    FOREIGN KEY (id_equipe)
    REFERENCES equipe (id);

ALTER TABLE aime
  ADD CONSTRAINT FK_joueur_TO_aime
    FOREIGN KEY (id_joueur)
    REFERENCES joueur (id);

ALTER TABLE aime
  ADD CONSTRAINT FK_proposition_TO_aime
    FOREIGN KEY (id_proposition)
    REFERENCES proposition (id);