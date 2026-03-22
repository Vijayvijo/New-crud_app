import './App.css';
import User from './getUser/User';
import AddUser from "./addUser/AddUser";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const route = createBrowserRouter([
    {
      path: "/",
      element: <User />,

    },
    {
      path:"/add",
      element : <AddUser/>,
    },

  ])
  return (


    <div className="App">
      <RouterProvider router={route}></RouterProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
