import mysql from 'mysql2'
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '53736153',
  database: 'demo'
})

db.connect((err)=>{
    if(err){
        console.error(err);
        return
    }

    console.log("Подключена");
    
})



export default db 