const router = require("express").Router();
const Invoice = require("../models/Invoice");

router.route("/add").post((req, res) => {


  const patientName = req.body.patientName;
  const address = req.body.address;
  const invoiceNumber = req.body.invoiceNumber;
  const paymentType = req.body.paymentType;
  const date = Date.parse(req.body.date);
  const contactNumber = req.body.contactNumber;
  const medicineName=req.body.medicineName;
  const quantity=req.body.quantity;
  const mrp=req.body.mrp;
  const total=req.body.total;

  

  const newInvoice = new Invoice({

   
    patientName,
    address,
    invoiceNumber,
    paymentType,
    date,
    contactNumber,
    medicineName,
    quantity,
    mrp,
    total,

  });

  newInvoice
    .save()
    .then(() => {
      res.json("Invoice Added");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/").get((req, res) => {
  Invoice.find()
    .then((invoices) => {
      res.json(invoices);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/update/:id").put(async (req, res) => {
  let invoiceId = req.params.id;
  const { patientName, address, invoiceNumber, paymentType, date, contactNumber,medicineName,quantity,mrp,total } = req.body;

  const updateInvoice = {

   
    patientName,
    address,
    invoiceNumber,
    paymentType,
    date: Date.parse(date),
    contactNumber,
    medicineName,
    quantity,
    mrp,
    total,
  };
  const update = await Invoice.findByIdAndUpdate(invoiceId, updateInvoice)
    .then(() => {
      res.status(200).send({ status: "Invoice updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating data", error: err.message });
    });
});

router.route("/delete/:id").delete(async (req, res) => {
  let invoiceId = req.params.id;

  await Invoice.findByIdAndDelete(invoiceId)
    .then(() => {
      res.status(200).send({ status: "Invoice deleted" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with deleting data", error: err.message });
    });
});

router.route("/get/:id").get(async (req, res) => {
  let invoiceId = req.params.id;
  const user= await Invoice.findById(invoiceId)
    .then((invoice) => {
      res.status(200).json({ status:  "Invoice fetched",invoice});
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "Error with getting data", error: err.message });
    })
})

module.exports = router;