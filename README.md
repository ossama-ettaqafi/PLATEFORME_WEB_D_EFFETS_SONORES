# Cahier des charges de la plateforme Meow-it

<div align="center">
  <h3>Ressources et Suivi du Projet</h3>
  
  <a href="https://drive.google.com/drive/folders/1Y3fxcTsiJ2nF_YQMAfViY1RmNV1n2Q-l?usp=drive_link" target="_blank"><img src="https://www.gstatic.com/images/icons/material/product/2x/drive_48dp.png" alt="ossama's google drive" width="30" title="Voir les captures d'écran de l'interface"></a>
  <a href="https://occipital-tornado-e71.notion.site/meow-it-Avancement-du-projet-individuel-3de5a67faebd485bb4b50ef819efee02?pvs=25" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png" alt="ossama's notion" title="Voir la progression du projet" width="30"></a>
  <a href="https://github.com/imossama/Plateforme-web-d-effets-sonores/blob/main/fullstack/README.md" target="_blank"><img src="https://64.media.tumblr.com/15b7fc60bbe2fd927bc223ba628d57a5/tumblr_mrub1w37AL1swnmv6o1_400.pnj" alt="meow-it use" width="30" title="Visitez le guide"></a>
</div>

## Table des matières
- [Introduction](#introduction)
- [Fonctionnalités](#fonctionnalités)
- [Spécifications Techniques](#spécifications-techniques)
- [Conclusion](#conclusion)

## Introduction

### Aperçu
Meow-it est une plateforme communautaire dédiée aux passionnés de son. Elle permet de partager, découvrir et apprécier des effets sonores uniques.

### Objectifs
- Favoriser une communauté dynamique d'utilisateurs passionnés par le son.
- Offrir une expérience fluide et agréable pour le téléchargement, le partage et la découverte d'effets sonores.
- Créer un espace de connexion entre les utilisateurs grâce à des fonctionnalités de suivi et d'interaction.

## Fonctionnalités

### Gestion des Utilisateurs

#### Inscription et Authentification
- Création de comptes avec nom d'utilisateur et adresse e-mail.
- Hachage des mots de passe et stockage sécurisé des informations d'identification.
- Fonctionnalité de connexion et déconnexion sécurisée.
- Gestion des sessions pour l'authentification des utilisateurs.

#### Profils Utilisateurs
- Présentation des sons importés, du nombre de followers et de following.
- Affichage des informations utilisateur.
- Option d'inclure un fil d'activité des actions récentes des utilisateurs suivis.

### Gestion des Sons

#### Importation
- Fonctionnalités d'importation de sons à partir de fichiers externes.
- Prise en charge de différents formats de fichiers sonores.

#### Catégorisation
- Classement des sons par genres ou thèmes pour une navigation facile.

#### Interactions
- Fonctionnalité "J'aime" pour exprimer l'appréciation des effets sonores.
- Compteur de "J'aime" pour chaque effet sonore.
- Téléchargement des fichiers sonores dans divers formats.

### Interactions Sociales

#### Suivre/Ne plus Suivre
- Possibilité de suivre et ne plus suivre d'autres utilisateurs.
- Affichage des compteurs de followers et de following sur les profils.

#### Notifications
- Alertes pour les nouveaux followers et les "J'aime".
- Paramètres de personnalisation des notifications.

### Recherche et Découverte

#### Fonctionnalité de Recherche
- Recherche de sons par titres, catégories ou tags.
- Option de recherche avancée pour des résultats précis.

#### Sons Tendance
- Mise en évidence des sons populaires sur la plateforme.
- Utilisation d'algorithmes basés sur les "J'aime", les interactions et les lectures (optionnel).

### Paramètres Utilisateur

#### Modification de Profil
- Possibilité de modifier les informations de profil, y compris le nom d'utilisateur et la photo de profil.

#### Confidentialité
- Gestion des paramètres de confidentialité du compte.

## Spécifications Techniques

- **Frontend:** Angular pour l'interface utilisateur.
- **Backend:** Laravel pour la logique côté serveur et le développement de l'API.
- **Base de Données:** MySQL pour le stockage des données.

## Conclusion

Meow-it se veut être une plateforme innovante et conviviale pour les passionnés de son. En offrant une variété de fonctionnalités et en encourageant l'interaction entre les utilisateurs, elle vise à devenir un véritable hub pour la découverte et la création sonore.
