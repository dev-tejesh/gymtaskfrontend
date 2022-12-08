import axios from "axios";
import React from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { formatDistanceToNow } from "date-fns";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }
    axios
      .delete("https://gymtaskbackend-production.up.railway.app/api/workouts/" + workout._id, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        dispatch({ type: "DELETE_WORKOUT", payload: response.data });
      });
  };

  return (
    <div className="workout-details">
      <div className="workout-details">
        <h4>{workout.title}</h4>
        <p>
          <strong>Load (kg): </strong>
          {workout.load}
        </p>
        <p>
          <strong>Number of reps: </strong>
          {workout.reps}
        </p>
        <p>
          {formatDistanceToNow(new Date(workout.createdAt), {
            addSuffix: true,
          })}
        </p>
        <span className="material-symbols-outlined" onClick={handleClick}>
          delete
        </span>
      </div>
    </div>
  );
};

export default WorkoutDetails;
