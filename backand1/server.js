// === BACKEND: server.js ===
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://radigitalindia:h0rn7AsBvTnZgsgV@radigitalindia.pvxmh92.mongodb.net/?retryWrites=true&w=majority&appName=radigitalindia', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((err) => console.error('MongoDB connection error:', err));

const FormSchema = new mongoose.Schema({
  fullName: String,
  userId: String,
  mobile: String,
  email: String,
  city: String,
  amount: String,
  utr: String,
  digitalIndiaText: String,
  address: String,
  phone: String,
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





app.put('/api/forms/:id', async (req, res) => {
  try {
    const updatedUser = await Form.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) return res.status(404).send({ message: 'User not found' });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).send({ error: 'Failed to update user' });
  }
});

app.delete('/api/forms/:id', async (req, res) => {
  try {
    const deletedUser = await Form.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).send({ message: 'User not found' });
    res.send({ message: 'User deleted' });
  } catch (err) {
    res.status(500).send({ error: 'Failed to delete user' });
  }
});

app.get('/api/forms', async (req, res) => {
  try {
    const forms = await Form.find();
    res.json(forms);
  } catch (err) {
    res.status(500).send({ error: 'Failed to fetch forms' });
  }
});

app.get('/api/forms/latest', async (req, res) => {
  try {
    const latestForm = await Form.findOne().sort({ _id: -1 });
    if (!latestForm) return res.status(404).send({ message: 'No form data found' });
    res.json(latestForm);
  } catch (err) {
    res.status(500).send({ error: 'Failed to fetch latest form' });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'))