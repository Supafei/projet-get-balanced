const client = require('./dbClient');

const dataMapper = {
//fonction générique qui permets de selectionner un élément d'une table en fonction de son id 
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
        return response;
    },

};

module.exports = dataMapper;