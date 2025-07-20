<<<<<<< HEAD
// === BACKEND: server.js ===
=======
>>>>>>> 5b2256854d8661ea9876f5e8d1dafbb80da48620
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

<<<<<<< HEAD
mongoose.connect('mongodb+srv://radigitalindia:h0rn7AsBvTnZgsgV@radigitalindia.pvxmh92.mongodb.net/?retryWrites=true&w=majority&appName=radigitalindia', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((err) => console.error('MongoDB connection error:', err));

const FormSchema = new mongoose.Schema({
  fullName: String,
=======
// Connect to MongoDB (replace 'yourdbname' with your actual DB name)
mongoose.connect('mongodb://localhost:27017/yourdbname', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the Mongoose schema and model
const FormSchema = new mongoose.Schema({
 fullName: String,
>>>>>>> 5b2256854d8661ea9876f5e8d1dafbb80da48620
  userId: String,
  mobile: String,
  email: String,
  city: String,
  amount: String,
  utr: String,
  digitalIndiaText: String,
  address: String,
  phone: String,
<<<<<<< HEAD
  companyEmail: String,
  authorizedSignature: String
});


const Form = mongoose.model('Form', FormSchema);

app.post("/api/save", async (req, res) => {
  try {
    console.log("Incoming data:", req.body);
    const formData = new FormModel(req.body);
    await formData.save();
    res.status(201).send({ message: "Saved" });
  } catch (err) {
    console.error("❌ Error saving form:", err.message);
    res.status(500).send({ error: "Save failed" });
  }
});





=======
  companyEmail: String,     // NEW field
  authorizedSignature: String
});

const Form = mongoose.model('Form', FormSchema);

// POST route to save form data
app.post('/api/save', async (req, res) => {
  try {
    const form = new Form(req.body);
    await form.save();
    res.status(201).send({ message: 'Data saved' });
  } catch (err) {
    res.status(500).send({ error: 'Failed to save' });
  }
});

// PUT to update a user by ID
>>>>>>> 5b2256854d8661ea9876f5e8d1dafbb80da48620
app.put('/api/forms/:id', async (req, res) => {
  try {
    const updatedUser = await Form.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) return res.status(404).send({ message: 'User not found' });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).send({ error: 'Failed to update user' });
  }
});

<<<<<<< HEAD
=======

// DELETE a user by ID
>>>>>>> 5b2256854d8661ea9876f5e8d1dafbb80da48620
app.delete('/api/forms/:id', async (req, res) => {
  try {
    const deletedUser = await Form.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).send({ message: 'User not found' });
    res.send({ message: 'User deleted' });
  } catch (err) {
    res.status(500).send({ error: 'Failed to delete user' });
  }
});

<<<<<<< HEAD
=======
// GET route to fetch all saved form data
>>>>>>> 5b2256854d8661ea9876f5e8d1dafbb80da48620
app.get('/api/forms', async (req, res) => {
  try {
    const forms = await Form.find();
    res.json(forms);
  } catch (err) {
    res.status(500).send({ error: 'Failed to fetch forms' });
  }
});

<<<<<<< HEAD
=======
// GET route to fetch the latest saved form
>>>>>>> 5b2256854d8661ea9876f5e8d1dafbb80da48620
app.get('/api/forms/latest', async (req, res) => {
  try {
    const latestForm = await Form.findOne().sort({ _id: -1 });
    if (!latestForm) return res.status(404).send({ message: 'No form data found' });
    res.json(latestForm);
  } catch (err) {
    res.status(500).send({ error: 'Failed to fetch latest form' });
  }
});

<<<<<<< HEAD
app.listen(5000, () => console.log('Server running on port 5000'))
=======
// Start server
app.listen(5000, () => console.log('Server running on port 5000'));
>>>>>>> 5b2256854d8661ea9876f5e8d1dafbb80da48620
