import './App.css';
import { BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateUser from './components/CreateUser';
import CreateExercise from './components/CreateExercise';
import ExercisesList from './components/ExercisesList';
import EditExercise from './components/EditExercise';
import ExerciseNavBar from './components/ExerciseNavBar';

function App() {
  return (
    <Router>
      <ExerciseNavBar></ExerciseNavBar>
      <Route path="/" exact component={ExercisesList} />
      <Route path="/user" exact component={CreateUser} />
      <Route path="/create" component={CreateExercise} />
      <Route path="/edit/:id" component={EditExercise} />
    </Router>
  );
}

export default App;
