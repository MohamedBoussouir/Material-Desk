const express = require('express')
const app = express()
const connectDB = require('./config/db');
const authroutes = require("./routes/auth.routes")
const equipmentRoutes = require('./routes/equipment.routes');



app.use(express.json())
connectDB()

app.use("/api/auth", authroutes)
app.use("/api/equipments", equipmentRoutes);



app.listen(3000, () => {
    console.log('3000');

})