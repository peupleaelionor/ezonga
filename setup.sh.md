
### A. BACKEND : LE CŒUR LOGIQUE
- **Modèle de données :** Utilise Prisma avec PostgreSQL (voir `backend/prisma/schema.prisma` pour les modèles User, Profile, Match, Message).
- **Logique Match :** Implémentée dans `backend/src/controllers/match.controller.ts` (gestion des swipes et matches "Sika").
- **Temps Réel :** Socket.IO configuré dans `backend/src/config/socket.ts` pour les messages.

### B. FRONTEND : L'EXPÉRIENCE UTILISATEUR
- **i18n :** Lingala par défaut (config dans `frontend/src/i18n.ts`, traductions dans `public/locales/ln/common.json`).
- **Composant Clé :** `ProfileCard.tsx` pour les swipes animés avec Framer Motion.

---

## 4. GUIDE DE DÉPLOIEMENT (VERCEL)

1. **Préparer le Code :** Assure-toi que la structure est dans ton repo GitHub.
2. **Configuration Vercel :** Connecte GitHub, importe le projet.
3. **Variables d'Environnement :** Ajoute `DATABASE_URL`, `NEXT_PUBLIC_API_URL`, `JWT_SECRET`.
4. **Lancement :** Clique sur **Deploy**.

---

## 5. CONCLUSION

Avec ce plan, **EZONGA** devient culturellement ancrée, techniquement solide et socialement acceptée. 💚⚡