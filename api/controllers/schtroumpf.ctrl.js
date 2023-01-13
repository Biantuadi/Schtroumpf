const Schtroumpf = require("../models/schtroumpf.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.loginSchtroumpf = (req, res, next) => {
  Schtroumpf.findOne({ email: req.body.email })
    .then((schtroumpf) => {
      if (!schtroumpf)
        return res.status(401).json({ message: "Utilisateur non trouvé !" });

      bcrypt
        .compare(req.body.password, schtroumpf.password)
        .then((valid) => {
          if (!valid)
            return res
              .status(401)
              .json({ message: "Mot de passe incorrect !" });

          res.status(200).json({
            userId: schtroumpf._id,
            token: jwt.sign(
              {
                userId: schtroumpf._id,
              },
              process.env.JWT_KEY,
              { expiresIn: "24h" }
            ),
          });
        })
        .catch((err) => res.status(500).json({ error: err }));
    })
    .catch((err) => res.status(500).json({ error: err }));
};

exports.createSchtroumpf = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const newSchtroumpf = new Schtroumpf({
      name: req.body.name,
      password: hash,
    });

    newSchtroumpf
      .save()
      .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
      .catch((err) => {
        if (err.message.includes("name"))
          res.status(409).json({ error: err, name: "Nom déjà pris !" });
      });
  });
};

exports.getAllSchtroumpfs = (req, res, next) => {};

exports.getSchtroumpf = (req, res, next) => {};

exports.modifySchtroumpf = (req, res, next) => {};

exports.deleteSchtroumpf = (req, res, next) => {};
