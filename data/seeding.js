require('dotenv').config();
const { faker } = require('@faker-js/faker');

const client = require('../app/dbClient');

faker.locale = 'fr';
const NB_USER = 30;


function generateUser(nbUsers) {
    const users = [];
    for (let iUser= 0; iUser < nbUsers; iUser +=1){
        const birthdateUser = faker.date.birthdate();
        const user = {
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(), 
            email:faker.internet.email(),
            birthdate: faker.date.birthdate(),
            //birthdateUser.toLocaleDateString('fr-FR', { year: 'numeric',month: '2-digit',day: '2-digit',  , hour: '2-digit', minute: '2-digit', second: '2-digit'}),
            avatar:faker.image.cats(),
            password:faker.internet.password(),
            color:faker.color.rgb(),
        };
        users.push(user);
    }
    // console.log(users)
    return users;
}

async function insertUsers(users) {
    await client.query('TRUNCATE TABLE "user" RESTART IDENTITY CASCADE');
    const userValues = users.map((user) => `(
        '${user.firstname}',
        '${user.lastname}',
        '${user.email}',
        '${user.birthdate}',
        '${user.avatar}',
        '${user.password}',
        '${user.color}'
    )`);
//   console.log(userValues);
    const queryStr = `INSERT INTO "user" (firstname, lastname, email, birthdate, avatar, password, color) VALUES ${userValues} RETURNING id`;
    // console.log(queryStr);
    const result = await client.query(queryStr);
     return result.rows;
}


(async () => { 

const users = generateUser(NB_USER);
await insertUsers(users);

client.end();

})();