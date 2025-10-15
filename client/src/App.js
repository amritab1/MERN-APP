import './App.css';
import User from './getUser/user';
import AddUser from './addUser/addUser';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UpdateUser from './updateUser/updateUser';


function App() {
  const route = createBrowserRouter([{
    path: "/",
    element: <User />
  }, {
    path: "/add",
    element: <AddUser />
  }, {
    path: "/update/:id",
    element: < UpdateUser />
  },])
  return (
    <div className="App">
      <RouterProvider router={route}> </RouterProvider>
    </div>
  );
}

export default App;
