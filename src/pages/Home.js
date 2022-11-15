import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import axios from "axios";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";



const Home = () => {
  // const [workouts, setWorkouts] = useState([]);
  const { workouts, dispatch } = useWorkoutsContext()
  //   useEffect(() => {
  //     const fetchWorkouts = async () => {
  //       const response = await fetch("http:localhost:5000/api/workouts");
  //       const json = await response.json();
  //         console.log(json)
  //       if (response.ok) {
  //         setWorkouts(json);

  //       }
  //     };

  //     fetchWorkouts();
  //   }, []);
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/workouts");
        dispatch({type: 'SET_WORKOUTS', payload: response.data})
      } catch (error) {
        console.log(error);
      }
    };
    fetchWorkouts();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&  
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
         
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
