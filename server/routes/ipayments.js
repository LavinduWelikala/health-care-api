const router = require("express").Router();
const Payments = require("../models/giPayments.js");

router.route("/add").post((req, res) => {
  const Cholder = req.body.CardHolderName;
  const Cnumber = Number(req.body.CardNumber);
  const date = Date(req.body.ExpireDate);
  const cvv = Number(req.body.cvv);


  const newPayment = new Payments({
    Cholder: Cholder,
    Cnumber: Cnumber,
    date: date,
    cvv:cvv
  });

  newPayment
    .save()
    .then(() => {
      res.status(200).send({ status: "Success" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "Error with adding data" });
    });
});

router.route("/").get((req, res) => {
  Payments.find()
    .then((payments) => {
      res.json(payments);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "Error with getting data" });
    });
});

router.route("/update/:id").put(async (req, res) => {
  let userId = req.params.id;
  const { Cholder,Cnumber,date,cvv } =
    req.body;

  const updatePayments = {
    Cholder,
    Cnumber,
    date,
    cvv
  };

  const update = await Payments.findByIdAndUpdate(userId, updatePayments)
    .then((update) => {
      res.status(200).send({ status: " Updated", user: update });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "Error with updating data" });
    });
});

router.route("/delete/:id").delete(async (req, res) => {
  let cardId = req.params.id;

  await Payments.findByIdAndDelete(cardId)
    .then(() => {
      res.status(200).send({ status: " Deleted" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "Error with deleting data" });
    });
});

router.route("/get/:id").get(async (req, res) => {
  let userId = req.params.id;

  await Payments.findById(userId)
    .then((card) => {
      console.log(card)
      res.status(200).send({ status: " Deleted", card: card });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "Error with fetching data" });
    });
});

module.exports = router;
