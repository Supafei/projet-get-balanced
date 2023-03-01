const {
    response
} = require('express');
const client = require('./dbClient');

const dataMapper = {
    // fonction générique qui permet de récupérer toutes les colonnes d'une table 
    async getAll(table) {
        let response;
        const sqlQuery = `SELECT * FROM ${table}`;
        console.log(sqlQuery);

        try {
            response = await client.query(sqlQuery);

            console.log(response);
        } catch (error) {
            console.log(error);
        }

        return response.rows;

    },
    //fonction générique qui permet de selectionner un élément d'une table en fonction de son id 
    async getOneById(table, id) {
        let response;
        const sqlQuery = ` SELECT * FROM ${table} WHERE id = ${id}`
        console.log(sqlQuery);

        try {
            response = await client.query(sqlQuery);

            console.log(response);
        } catch (error) {
            console.log(error);
        }
        return response.rows[0];
    },
    // fonction générique qui permet d'ajouter une donnée en bdd
    async insertOne(body, table) {
        let response;
        try {

            console.log("body dans datamapper", body);

            // je récupère les différentes clés de mon objet body :
            // ce qui est envoyé via le formulaire
            // + les valeurs associées aux clées
            let keysNames = Object.keys(body);
            let bodyValues = Object.values(body);

            // je créé des tableaux pour recevoir mes clés, mes valeurs, mes paramètres
            let keys = [];
            let inputs = [];
            let parameters = [];
            let count = 1;

            // j'entre chaque clé dans le tableau vide
            for (const key of keysNames) {
                keys.push(key);
                // je créé un paramètre pour chaque clé
                // clé = colonne de ma table
                // Les paramètres sont les $1, $2, $3
                let parameter = `$${count}`;
                // je les pousse dans un tableau de paramètres
                parameters.push(parameter);
                count++;

            }
            // à la fin de ma boucle, j'ai un tableau avec toutes les clés (noms de colonnes)
            // et un tableau avec mes paramètres ($1)
            console.log(keys);


            // je push chaque input du formulaire dans un tableau
            for (const input of bodyValues) {
                inputs.push(input);
            }

            console.log(inputs);

            // je mets en forme mes clés et mes paramètres pour coller au SQL
            let allKeys = keys.join();

            // console.log(allKeys);

            let allParameters = parameters.join();



            const sqlQuery = `INSERT INTO ${table} (${allKeys}) VALUES (${allParameters}) RETURNING *;`;
            // pas besoin de join les inputs, déjà le bon format (array)
            const values = inputs;


            response = await client.query(sqlQuery, values);



        } catch (error) {
            console.log(error);
        }
        return response.rows[0];
    },
    // fonction générique qui permet de supprimer une donnée en bdd
    async deleteOne(table, id) {
        let response;
        const sqlQuery = ` DELETE FROM ${table} WHERE id = ${id}`
        console.log(sqlQuery);

        try {
            response = await client.query(sqlQuery);


        } catch (error) {
            console.log(error);
        }
        return response.command;
    },
    async getByCondition(table, column, value) {
        let response;

        const sqlQuery = `SELECT * FROM ${table} WHERE ${column} = '${value}';`;
        console.log(sqlQuery);
        try {
            response = await client.query(sqlQuery);

        } catch (error) {
            console.log(error);
        }
        return response.rows[0];

    },
    // fonction générique qui permet de mettre à jour une donnée par son id en bdd
    async updateById(table, column, value, id) {
        let response;
        const sqlQuery = `UPDATE ${table} SET ${column} WHERE id = ${id} RETURNING *;`;
        let values = value;
        try {
            console.log(sqlQuery);
            response = await client.query(sqlQuery, values);

        } catch (error) {
            console.error(505);
        }
        return response.rows[0];
    },
    
};

module.exports = dataMapper;