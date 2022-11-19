import { useState } from "react";
import axios from "axios";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in");
      return;
    }
    axios
      .post("http://localhost:5000/api/workouts", {
        title: title,
        load: load,
        reps: reps,
      },
      {
        headers: {
          'Authorization': `Bearer ${user.token}`,
        }
      }
      )

      .then(async (response) => {
        // if (!response.ok) {
        //   setError(response.error)
        //   setEmptyFields(response.emptyFields)
        // }
        if (response.status === 200) {
          setError(null);
          setTitle("");
          setLoad("");
          setReps("");
          console.log("new workout added:", response);
          dispatch({ type: "CREATE_WORKOUT", payload: response.data });
        }
      })
      .catch((error) => {
        console.log(error.response.data.error.emptyFields);
        setError(error.response.data.error);
        setEmptyFields(error.response.data.emptyFields);
        console.log(emptyFields, "emptyFields");
      });
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>
      <label>Excersize Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        // className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Load (in kg):</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        // className={emptyFields.includes('load') ? 'error' : ''}
      />

      <label>Number of Reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        // className={emptyFields.includes('reps') ? 'error' : ''}
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
