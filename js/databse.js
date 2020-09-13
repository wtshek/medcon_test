const mysql = require("mysql");

/**
 * create db connection
 */
const { DB_PW, DB_USER, DB_HOST } = process.env;
const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PW,
  multipleStatements: true,
});

/**
 * Prepare tables
 * users
 * doctors
 * booking
 * consultation records
 */

//create tables if not exists
const createdTablesSQL = `CREATE TABLE IF NOT EXISTS clinics (
    email VARCHAR(50) NOT NULL,
    password CHAR(60) NOT NULL,
    clinic_name VARCHAR(50) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    addr VARCHAR(70) NOT NULL,
    id VARCHAR(60) PRIMARY KEY
  );

  CREATE TABLE IF NOT EXISTS doctors (
    first_name VARCHAR(10) NOT NULL,
    last_name VARCHAR(10) NOT NULL,
    clinic_id VARCHAR(60) NOT NULL,
    PRIMARY KEY (first_name, last_name, clinic_id),
    FOREIGN KEY (clinic_id) REFERENCES clinics(id)
  );

  CREATE TABLE IF NOT EXISTS consultations (
    id MEDIUMINT AUTO_INCREMENT,
    d_fname VARCHAR(10) NOT NULL, 
    d_lname VARCHAR(10) NOT NULL,
    p_fname VARCHAR(10) NOT NULL,
    p_lname VARCHAR(10) NOT NULL, 
    diagnosis VARCHAR(200) NOT NULL, 
    medication VARCHAR(200) NOT NULL, 
    fee DECIMAL(15,2) UNSIGNED NOT NULL, 
    time DATETIME(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    follow_up BOOLEAN NOT NULL,
    clinic_id VARCHAR(60) NOT NULL, 
    PRIMARY KEY (id),
    FOREIGN KEY (clinic_id) REFERENCES clinics(id)
  );
  CREATE TABLE IF NOT EXISTS bookings(
    id MEDIUMINT NOT NULL AUTO_INCREMENT,
    d_fname VARCHAR(10) NOT NULL, 
    d_lname VARCHAR(10) NOT NULL,
    p_fname VARCHAR(10) NOT NULL,
    p_lname VARCHAR(10) NOT NULL,  
    t_from DATETIME(0) NOT NULL,
    t_to DATETIME(0) NOT NULL,
    clinic_id VARCHAR(60) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (clinic_id) REFERENCES clinics(id)
  );`;

function prepareTables() {
  connection.query(createdTablesSQL, (err, result) => {
    if (err) return console.log(err);

    connection.query("SHOW TABLES", (err, result) => {
      console.log(result);
    });
  });
}

module.exports = { connection, prepareTables };
