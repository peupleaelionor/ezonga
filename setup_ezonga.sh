#!/bin/bash

# ==========================================
# 🚀 EZONGA - GOD MODE SETUP SCRIPT
# ==========================================

echo "🚀 Construction de EZONGA en cours..."

rm -rf ezonga
mkdir -p ezonga
cd ezonga

# --- 1. Fichiers Racine ---
echo "⚙️  Création de la racine..."

cat > .gitignore << 'EOF'
node_modules
.next
dist
.env
.DS_Store
uploads/
