import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import axios from "axios";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useAuthContext } from "../hooks/useAuthContext"


const Home = () => {
  // const [workouts, setWorkouts] = useState([]);
  const { workouts, dispatch } = useWorkoutsContext();
  const {user} = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get("https://gymtaskbackend-production.up.railway.app/api/workouts",
        {
          headers: {
            'Authorization': `Bearer ${user.token}`,
          }
        }
        );
        dispatch({type: 'SET_WORKOUTS', payload: response.data})
      } catch (error) {
        console.log(error);
      }
    };
    if(user){
    fetchWorkouts();
    }
  }, [dispatch,user]);

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
