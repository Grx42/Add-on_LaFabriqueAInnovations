# Add-on LaFabriqueAInnovations

##Téléchargement
#####/!\ Instructions de téléchargement /!\
Ne faites pas un `clic droit/enregistrer sous` directement sur la liste des fichiers du dépôt github, vous n'obtiendriez pas des fichiers valides. Il faut les prendre sous format raw. Pour cela, cliquez sur les liens ci-dessous ou cliquez sur le fichier qui vous intéresse puis sur la nouvelle page, cliquez sur `view raw`


##Téléchargez l'add-on
Pour vous procurer les fichiers, [Page de téléchargement !](https://htmlpreview.github.io/?https://github.com/simplon-patrickm/Add-on_LaFabriqueAInnovations/blob/master/index.html)


##Description
Cet addon offre un nouveau moyen de distribution au flux rss de [la fabrique à innovations](http://lafabriqueainnovations.com) en affichant dans un popup les trois dernières news publiées.
Si des news sont disponibles, l'icone devient rouge et un badge indique le nombre de news restant à lire. Sinon  l'icone devient grise.

###L'add-on est disponible pour Chrome et Firefox
Chaque navigateur possède deux versions de l'extension, une version normale et une version dévelopeur reconnaissable par son suffixe `_dev`

**Version normale :**
Nommée `lfai.crx` pour Chrome et `lfai.xpi` pour Firefox, cette version conserve les données d'articles lus, même après la fermeture du navigateur. Elle vérifie la présence de nouveaux articles dès l'ouverture du navigateur puis toutes les heures.

**Version développeur :**
Nommée `lfai_dev.crx` pour Chrome et `lfai_dev.xpi` pour Firefox, cette version ne conserve pas d'historique. A chaque ouverture du navigateur, elle affiche les dernières news comme si vous ne les aviez jamais lues. Elle vérifie la présence de nouveaux articles toutes les 10 secondes.


###Chrome

#####Incompatibilité :
Aucune connue à ce jour.

#####Installation :
Cliquez sur l'icone à droite de la barre d'adresse (celle avec les trois barres horizontales) puis sur `plus d'outils` et enfin sur `extensions`.
Glissez-déposez le fichier lfai.crx **ou** lfai_dev.crx depuis votre ordinateur vers ce nouvel onglet et acceptez l'installation.


###Firefox

#####Incompatibilité
Actuellement, il existe un conflit avec NoScript sur firefox. NoScript n'autorise pas (et ne permet pas d'autoriser) le script du plugin à s'exécuter en arrière plan.

##### Installation

*Tant que l'add-on n'est pas officiellement déployé, il faut autoriser Firefox à installer des extensions non-signées.*

Dans la barre d'adresse de firefox, entrez `about:config`

Dans la barre **search** ou **recherche**, entrez `xpinstall.signatures.required`

Double-cliquez sur le résultat pour changer la valeur `true` en `false`

Revenez sur l'ecran d'accueil de Firefox puis glissez-déposez le fichier lfai.xpi __**ou**__ lfai_dev.xpi depuis votre ordinateur vers ce nouvel onglet et acceptez l'installation.
