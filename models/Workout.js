const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({

	name: {
		type: String,
		require: [true, 'Workout name is required']
	},

	duration: {
		type: Number,
		require: [true, 'Workout duration is required']
	},

	dateAdded: {
		type: Date,
		default: Date.now
	},

	status: {
		type: String,
		default: "Pending"
	}
});

module.exports = mongoose.model('Workout', workoutSchema)