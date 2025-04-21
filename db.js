const mongoose = require('mongoose');

// const connection = mongoose.createConnection("mongodb://localhost:27017/Pavi_Painting_Website").on("open", ()=>{
//   console.log("Database Connected");
// });
const connectionString = "mongodb://127.0.0.1:27017/Pavi_Painting_Website";

const connection = mongoose.createConnection(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.on('connected', () => {
  console.log("✅ Database Connected Successfully");
})
.on('error', (err) => {
  console.error("❌ Database Connection Error:", err.message);
})
.on('disconnected', () => {
  console.warn("⚠️ Database Disconnected");
});


module.exports = connection 