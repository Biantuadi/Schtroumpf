const Schtroumpf = require("../models/schtroumpf.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.loginSchtroumpf = (req, res) => {
  Schtroumpf.findOne({ name: req.body.name })
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
                role: schtroumpf.role,
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

exports.createSchtroumpf = (req, res) => {
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

exports.getAllSchtroumpfs = (req, res) => {
  Schtroumpf.find()
    .select("-password")
    .then((users) => res.status(200).json(users))
    .catch((err) => res.status(500).json({ error: err }));
};

exports.getSchtroumpf = (req, res) => {
  Schtroumpf.findOne({ _id: req.params.id })
    .select("-password")
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(500).json({ error: err }));
};

exports.modifySchtroumpf = (req, res) => {
  // get user data
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_KEY);
  const userId = decodedToken.userId;

  Schtroumpf.findOne({ _id: userId }).then((schtroumpf) => {
    const oldName = schtroumpf.name;
    const oldRole = schtroumpf.role;

    if (oldName === req.body.name || oldRole === req.body.role)
      return res.status(400).json({ error: "Aucune modification !" });

    if (Object.values(req.body).every((val) => val === ""))
      return res
        .status(400)
        .json({ error: "Les champs ne peuvent pas être vide" });

    const filledFields = Object.entries(req.body).filter(
      ([_, value]) => value !== ""
    );

    const [field] = filledFields;
    const updateData = Object.assign(
      { _id: req.params.id },
      { [field[0]]: field[1] }
    );

    Schtroumpf.updateOne({ _id: req.params.id }, updateData)
      .then(() => res.status(200).json({ message: "Utilisateur modifié !" }))
      .catch((err) => res.status(500).json({ error: err }));
  });
};

exports.deleteSchtroumpf = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_KEY);
  const userId = decodedToken.userId;
  const role = decodedToken.role;

  // if the user is an admin, delete the user
  if (role === "admin" || userId === req.params.id) {
    userModel
      .deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: "Utilisateur supprimé !" }))
      .catch((err) => res.status(500).json({ error: err }));
  } else {
    res.status(401).json({ error: "Vous n'êtes pas autorisé !" });
  }
};
