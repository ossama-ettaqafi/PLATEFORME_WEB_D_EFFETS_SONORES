<div align="center">

   <img src="https://media.tenor.com/OKO48giZVgwAAAAM/school-superbad.gif" alt="McLovin pew-pew haha gangsta" width="80%">
  
</div>

<div align="center">
   
  ### Guide sur l'utilisation de notre plateforme locale
  <p>Bienvenue sur notre plateforme locale ! Ce guide vous guidera à travers les étapes pour profiter au maximum de nos fonctionnalités et services. Suivez les instructions ci-dessous pour commencer :</p>
  <img src="https://i.ibb.co/Bc4gXkf/meow-it-logo-new.png" alt="meow-it-logo-new" width="200">
</div>

#### Cloner le dépôt GitHub :

Avant de commencer, assurez-vous de cloner notre dépôt GitHub en utilisant la commande suivante :

```bash
git clone https://github.com/imossama/Plateforme-web-d-effets-sonores/
```

#### Naviguer vers le dossier Backend :

```bash
cd /backend
```

#### Créer la base de données et les tables (si vous souhaitez réinitialiser) :

```bash
php artisan migrate:refresh
```

#### Recréer les tables et les vider :

```bash
php artisan migrate:refresh
```

#### Remplir les tables avec des données de test :

Les seeders doivent être exécutés dans l'ordre car ils sont liés de manière logique (<a href="https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F66ae98fb-9ffb-42fb-9357-900c29c3b85d%2Fe87e575e-d250-4347-9df3-fa58214ebe48%2FUntitled.png?table=block&id=73d551f8-2eac-448a-bcbf-efc0460faa74&spaceId=66ae98fb-9ffb-42fb-9357-900c29c3b85d&width=2000&userId=6e3e97af-252f-4cec-81ab-55f53f9348d5&cache=v2" target="_blank">consultez le diagramme de classe UML</a>) :

```bash
php artisan db:seed --class=UsersTableSeeder     
php artisan db:seed --class=TracksTableSeeder
php artisan db:seed --class=CategoriesTableSeeder     
php artisan db:seed --class=FollowsTableSeeder        
php artisan db:seed --class=LikesTableSeeder
php artisan db:seed --class=NotificationsTableSeeder  
```

#### Sur le serveur Backend, activer Apache et MySQL manuellement :

```bash
php artisan serve
```

#### Naviguer de nouveau vers le dossier du serveur Frontend et le démarrer :

```bash
cd ../frontend
ng serve
```

#### Accéder au site Web Full-stack local :

[http://localhost:4200/](http://localhost:4200/)

Utilisez le site Web avec plaisir ! Merci !
