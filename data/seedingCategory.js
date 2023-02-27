require('dotenv').config();
const client = require('../app/dbClient');

async function insertCategory(){

    const queryStr = `INSERT INTO category (label, color) VALUES 
        ('Ménage','#746785'),
        ('Courses','#03CEA4'),
        ('Cuisine','#BA9A26'),
        ('Bricolage','#EAC435'),
        ('Animaux','#345995'),
        ('Administratifs','#8C2D7E'),
        ('Enfants','#7F8E71'),
        ('Jardinage','#FB4D3D'),
        ('Autre','#E40066')
        RETURNING id` ;
    // console.log(queryStr);
    const result = await client.query(queryStr);
     return result.rows;
}

(async () => { 

    await insertCategory();
    client.end();
    
})();
