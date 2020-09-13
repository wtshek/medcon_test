const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const uniqid = require("uniqid"); //TODO: use uuid instead of uniqid
const { connection } = require("../js/databse");

const tableName = "clinics";

const register = (req, res) => {
  const { email, password, clinicName, phone, addr } = req.body;
  const hashedPW = bcrypt.hashSync(password, 10);

  const findUserSQL = `
    SELECT * FROM ${tableName} WHERE email = "${email}";
  `;

  const insertSQL = `
      INSERT INTO ${tableName} VALUES("${email}", "${hashedPW}", "${clinicName}", "${phone}", "${addr}", "${uniqid()}")
    `;

  connection.query(findUserSQL, (err, result) => {
    if (result.length !== 0)
      return res.status(300).send("Account already exists");

    connection.query(insertSQL, (err, result) => {
      if (err) return res.status(400).send(err);

      return res.status(200).send("Account created successfully!");
    });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  const findUserSQL = `
    SELECT * FROM ${tableName} WHERE email = "${email}";
  `;

  connection.query(findUserSQL, (err, result) => {
    if (err) return res.status(400).send(err);

    if (result.length === 0)
      return res.status(401).send("Email and password do not match.");

    const isPWValid = bcrypt.compareSync(password, result[0].password);
    const expiresIn = 86400;

    if (isPWValid) {
      const token = jwt.sign({ id: result[0].id }, process.env.JWT_PR_KEYS, {
        expiresIn,
      });

      res.status(200).send({ accessToke: token, id: result[0].id, expiresIn });
    } else {
      res.status(401).send("Email and password do not match.");
    }
  });
};

module.exports = { register, login };
