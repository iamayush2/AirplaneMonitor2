const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/flightDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const flightSchema = new mongoose.Schema({
  flightNumber: String,
  airlineName: String,
  departureCity: String,
  destinationCity: String,
  scheduledDepartureTime: Date,
  scheduledArrivalTime: Date,
  gateNumber: String,
  terminal: String,
  flightStatus: String,
});

const Flight = mongoose.model("Flight", flightSchema);

app.post("/api/flights", async (req, res) => {
  try {
    const newFlight = new Flight(req.body);
    await newFlight.save();
    res.status(201).json(newFlight);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/api/flights", async (req, res) => {
  try {
    const flights = await Flight.find();
    res.status(200).json(flights);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/flights/:id", async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) return res.status(404).json({ message: "Flight not found" });
    res.status(200).json(flight);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/api/flights/:id", async (req, res) => {
  try {
    const updatedFlight = await Flight.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedFlight)
      return res.status(404).json({ message: "Flight not found" });
    res.status(200).json(updatedFlight);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/flights/:id", async (req, res) => {
  try {
    const deletedFlight = await Flight.findByIdAndDelete(req.params.id);
    if (!deletedFlight)
      return res.status(404).json({ message: "Flight not found" });
    res.status(200).json({ message: "Flight deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
