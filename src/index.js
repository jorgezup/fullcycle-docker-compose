const express = require('express')
const mysql = require('mysql')
const { faker } = require('@faker-js/faker');

const app = express()

const connection = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
})

const createTable = () => {
  const sql = `CREATE TABLE IF NOT EXISTS people(
    id int NOT NULL AUTO_INCREMENT, 
    name varchar(255) NOT NULL, 
    age int NOT NULL, 
    PRIMARY KEY (id)
  )`
  connection.query(sql, (err) => {
    if(err) throw err
  })
}

const insertData = () => {
  const person = { 
    name: `${faker.person.firstName()} ${faker.person.lastName()}`, 
    age: faker.number.int({min: 10, max: 98}) 
  }

  connection.query('INSERT INTO people SET ?', person, (err, res) => {
    if(err) throw err
    // console.log('Last insert ID:', res.insertId)
  })
}

const retrieveData = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM people', (err, rows) => {
      if (err) {
        reject(err);
      } else {
        const data = rows.map(row => ({ ...row }));
        console.log('Data received from Db:');
        console.log(data);
        resolve(data);
      }
    });
  });
};


app.get('/', async(req, res) => {
  try {
    if (connection.state === 'disconnected') {
      res.send('<h1>Erro ao conectar no banco de dados</h1>')
      return
    }
    createTable()
    insertData()
    const data = await retrieveData()

    const response = `
    <h1>Full Cycle Rocks!</h1>
    <br>
    <h2>Lista de pessoas cadastradas:</h2>
    <ul>
      ${data.map(person => `<li>${person.name} - ${person.age}</li>`).join('')}
    </ul>
    `
    
    res.send(response)
  }
  catch(err) {
    res.send('<h1>Erro ao conectar no banco de dados</h1>')
    console.log(err)
  }
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
  connection.connect((err) => {
    if(err) console.log(err)
    console.log('Connected to MySQL Server!')
  })
})
