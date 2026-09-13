# Accueil Studio

App web statique pour composer des messages d’accueil Instagram et Facebook, avec aperçu type messagerie.

## Important

Cette app **n’envoie aucun message**. L’automatisation réelle doit passer par :

- Meta Business Suite → Inbox → Automations (réponse instantanée, absence, mots-clés, commentaire → message)
- Message d’accueil natif Instagram (selon comptes / régions)
- API officielle Meta (app revue, webhooks, divulgation bot, escalation humaine)

Les DM automatiques aux nouveaux abonnés via scripts / API privée violent les conditions Meta et exposent le compte à un ban.

## Lancer en local

Ouvre `index.html` dans un navigateur, ou :

```bash
npx serve .
```

## Déploiement

Dossier statique. Compatible Netlify / GitHub Pages.
