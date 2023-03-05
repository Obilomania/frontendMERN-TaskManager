import TaskList from "./components/TaskList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const URL = process.env.REACT_APP_SERVER_URL
function App() {
  return (
    <div>
      <ToastContainer />
      <TaskList />
    </div>
  );
}

export default App;
