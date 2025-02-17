const express = require('express')
const mongoose = require('mongoose')

//Routes Middleware
const workoutRoutes = require("./routes/workout");
const userRoutes = require("./routes/user");

const app = express()

app.use(express.json())

app.use("/workouts", workoutRoutes);
app.use("/users", userRoutes);


//MongoDB database
    mongoose.connect("mongodb+srv://LuisPaulo:admin123@cluster0.aere8.mongodb.net/FitnessTrackerAPI?retryWrites=true&w=majority&appName=Cluster0"
, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas.'));

if(require.main === module){
	app.listen(process.env.PORT || 4000, () => {
	    console.log(`API is now online on port ${ process.env.PORT || 4000 }`)
	});
}

module.exports = {app,mongoose};