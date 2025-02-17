const Workout = require("../models/Workout");
const { errorHandler } = require('../auth')

module.exports.addWorkout = (req , res) => {

	let newWorkout = new Workout({
		name: req.body.name,
		duration: req.body.duration,
		dateAdded: req.body.dateAdded,
		status: req.body.status
	})

	Workout.findOne({ name: req.body.name})
	.then(workout => {
		if(workout) {
			return res.status(200).send({message: 'Workout already exists'});
		}
	}).catch(error => errorHandler(error, req, res));

	return newWorkout.save()
	.then((workout) => res.status(201).send({message: 'Workout created successfully'}))
	.catch(error => errorHandler (error, req, res))

}

module.exports.getWorkouts = (req, res) => {
	return Workout.find({})
	.then(result => {
		if(result.length > 0) {
			res.status(200).send(result)
		} else {
			res.status(404).send({ message: 'Workout not found'})
		}
	})
	.catch(error => errorhandler(error, req, res))
}


module.exports.updateWorkout = (req, res) => {
	
	let updatedWorkout = {
		name: req.body.newName,
		duration: req.body.duration
	}

	return Workout.findOneAndUpdate(
		{name: req.body.oldName},
		updatedWorkout,
		{new: true}
	)
	.then(update => {
		if(!update) {
			return res.status(404).send({ message: 'Workout not found'})
		}

		return res.status(200).send(updatedWorkout)
	})
	.catch( error => errorHandler(error, req, res))

}


module.exports.deleteWorkout = (req, res) => {

	Workout.findOneAndDelete({
		name: req.body.name
	})
	.then(workout => {
		if(!workout) {
			return res.status(404).send({ message: "Workout not found"})
		} else {
			return res.status(200).send({ message: "Workout deleted"})
		}
	})
	.catch(error => errorHandler(error, req, res))
}


module.exports.completeWorkoutStatus = (req, res) => {

	let workoutStatus = {
		status: req.body.status
	}

	return Workout.findOneAndUpdate(
		{name: req.body.name},
		workoutStatus,
		{new: true}
	)
	.then(update => {
		if(!update) {
			return res.status(404).send({ message: 'Workout not found'})
		}

		return res.status(404).send(workoutStatus)
	})
	.catch( error => errorHandler(error, req, res))
}