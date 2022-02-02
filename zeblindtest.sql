-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le : mer. 02 fév. 2022 à 16:39
-- Version du serveur :  5.7.34
-- Version de PHP : 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `zeblindtest`
--

-- --------------------------------------------------------

--
-- Structure de la table `aime`
--

CREATE TABLE `aime` (
  `id` int(11) NOT NULL,
  `aime` tinyint(4) NOT NULL DEFAULT '1',
  `id_joueur` int(11) NOT NULL,
  `id_proposition` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `equipe`
--

CREATE TABLE `equipe` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `score` int(11) NOT NULL,
  `couleur` varchar(255) NOT NULL,
  `id_partie` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `equipe`
--

INSERT INTO `equipe` (`id`, `nom`, `score`, `couleur`, `id_partie`) VALUES
(1, 'Ploppers', 10, 'red', 1);

-- --------------------------------------------------------

--
-- Structure de la table `joueur`
--

CREATE TABLE `joueur` (
  `id` int(11) NOT NULL,
  `pseudo` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `joueur`
--

INSERT INTO `joueur` (`id`, `pseudo`, `email`, `password`) VALUES
(4, 'CubWolf', 'cottalorda.vincent@gmail.com', '$2b$10$qvmPhj/fp/rCFru2K1/GyO12.6SwE3PDw5D/.x7otN59W8TQd40Oy');

-- --------------------------------------------------------

--
-- Structure de la table `joueur_partie`
--

CREATE TABLE `joueur_partie` (
  `id` int(11) NOT NULL,
  `id_joueur` int(11) NOT NULL,
  `id_partie` int(11) NOT NULL,
  `id_equipe` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `joueur_partie`
--

INSERT INTO `joueur_partie` (`id`, `id_joueur`, `id_partie`, `id_equipe`) VALUES
(2, 4, 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `morceau`
--

CREATE TABLE `morceau` (
  `id` int(11) NOT NULL,
  `auteur` varchar(255) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `id_partie` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `morceau`
--

INSERT INTO `morceau` (`id`, `auteur`, `titre`, `id_partie`) VALUES
(1, 'John Dahlback', 'Blink', 1),
(3, 'plop', 'plop', 1);

-- --------------------------------------------------------

--
-- Structure de la table `partie`
--

CREATE TABLE `partie` (
  `id` int(11) NOT NULL,
  `organisateur` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `partie`
--

INSERT INTO `partie` (`id`, `organisateur`) VALUES
(1, 4),
(3, 4),
(4, 4);

-- --------------------------------------------------------

--
-- Structure de la table `proposition`
--

CREATE TABLE `proposition` (
  `id` int(11) NOT NULL,
  `auteur` varchar(255) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `id_morceau` int(11) NOT NULL,
  `id_equipe` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `reponse`
--

CREATE TABLE `reponse` (
  `id` int(11) NOT NULL,
  `auteur` varchar(255) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `id_morceau` int(11) NOT NULL,
  `id_equipe` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `aime`
--
ALTER TABLE `aime`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_joueur_TO_aime` (`id_joueur`),
  ADD KEY `FK_proposition_TO_aime` (`id_proposition`);

--
-- Index pour la table `equipe`
--
ALTER TABLE `equipe`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_partie_TO_equipe` (`id_partie`);

--
-- Index pour la table `joueur`
--
ALTER TABLE `joueur`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `joueur_partie`
--
ALTER TABLE `joueur_partie`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_joueur_TO_joueur_partie` (`id_joueur`),
  ADD KEY `FK_partie_TO_joueur_partie` (`id_partie`),
  ADD KEY `FK_equipe_TO_joueur_partie` (`id_equipe`);

--
-- Index pour la table `morceau`
--
ALTER TABLE `morceau`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_partie_TO_morceau` (`id_partie`);

--
-- Index pour la table `partie`
--
ALTER TABLE `partie`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `proposition`
--
ALTER TABLE `proposition`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_morceau_TO_proposition` (`id_morceau`),
  ADD KEY `FK_equipe_TO_proposition` (`id_equipe`);

--
-- Index pour la table `reponse`
--
ALTER TABLE `reponse`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_morceau_TO_reponse` (`id_morceau`),
  ADD KEY `FK_equipe_TO_reponse` (`id_equipe`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `aime`
--
ALTER TABLE `aime`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `equipe`
--
ALTER TABLE `equipe`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `joueur`
--
ALTER TABLE `joueur`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `joueur_partie`
--
ALTER TABLE `joueur_partie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `morceau`
--
ALTER TABLE `morceau`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `partie`
--
ALTER TABLE `partie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `proposition`
--
ALTER TABLE `proposition`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `reponse`
--
ALTER TABLE `reponse`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `aime`
--
ALTER TABLE `aime`
  ADD CONSTRAINT `FK_joueur_TO_aime` FOREIGN KEY (`id_joueur`) REFERENCES `joueur` (`id`),
  ADD CONSTRAINT `FK_proposition_TO_aime` FOREIGN KEY (`id_proposition`) REFERENCES `proposition` (`id`);

--
-- Contraintes pour la table `equipe`
--
ALTER TABLE `equipe`
  ADD CONSTRAINT `FK_partie_TO_equipe` FOREIGN KEY (`id_partie`) REFERENCES `partie` (`id`);

--
-- Contraintes pour la table `joueur_partie`
--
ALTER TABLE `joueur_partie`
  ADD CONSTRAINT `FK_equipe_TO_joueur_partie` FOREIGN KEY (`id_equipe`) REFERENCES `equipe` (`id`),
  ADD CONSTRAINT `FK_joueur_TO_joueur_partie` FOREIGN KEY (`id_joueur`) REFERENCES `joueur` (`id`),
  ADD CONSTRAINT `FK_partie_TO_joueur_partie` FOREIGN KEY (`id_partie`) REFERENCES `partie` (`id`);

--
-- Contraintes pour la table `morceau`
--
ALTER TABLE `morceau`
  ADD CONSTRAINT `FK_partie_TO_morceau` FOREIGN KEY (`id_partie`) REFERENCES `partie` (`id`);

--
-- Contraintes pour la table `proposition`
--
ALTER TABLE `proposition`
  ADD CONSTRAINT `FK_equipe_TO_proposition` FOREIGN KEY (`id_equipe`) REFERENCES `equipe` (`id`),
  ADD CONSTRAINT `FK_morceau_TO_proposition` FOREIGN KEY (`id_morceau`) REFERENCES `morceau` (`id`);

--
-- Contraintes pour la table `reponse`
--
ALTER TABLE `reponse`
  ADD CONSTRAINT `FK_equipe_TO_reponse` FOREIGN KEY (`id_equipe`) REFERENCES `equipe` (`id`),
  ADD CONSTRAINT `FK_morceau_TO_reponse` FOREIGN KEY (`id_morceau`) REFERENCES `morceau` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
