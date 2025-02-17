const express = require('express');
const { verify } = require('../auth')
const workoutController = require('../controllers/workouts');

const router = express.Router()

router.post("/addWorkout", verify, workoutController.addWorkout);
router.get("/getMyWorkouts", verify, workoutController.getWorkouts);
router.patch("/updateWorkout", verify, workoutController.updateWorkout);
router.delete("/deleteWorkout", verify, workoutController.deleteWorkout);
router.patch("/completeWorkoutStatus", verify, workoutController.completeWorkoutStatus);

module.exports = router;