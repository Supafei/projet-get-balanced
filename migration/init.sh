# je prends l'identité de spedata
export PGUSER=spedata

# je supprime la BDD
dropdb getbalanced

# je supprime l'utilisateur
dropuser admin_gb

# je veux lancer le script
psql -f init_db.sql -d postgres

# j'initialise SQITCH
sqitch init getbalanced --engine pg --target db:pg:getbalanced