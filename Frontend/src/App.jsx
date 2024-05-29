import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "../src/App.css"
import Upload from "./components/upload/Upload";
import Signin from "./components/signin/signIn";
import Signup from "./components/signup/Signup";
import Error from "./error";
import Edit from "./components/settings/edit";
import Planselection from "./components/planselection/Planselection";
import Profile from "./components/profile/profile";
import AdminLogin from "./components/signin/AdminLogin";
import AdminPanel from "./components/adminpanel/AdminPanel";
const Layout = () => {
  return (
    <div>
      <Outlet></Outlet>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Profile />,
      },{
        path: "/edit/:id",
        element: <Edit />,
      },
      {
        path: "/plans/:id",
        element: <Planselection />,
      },
      {
        path: "/upload/:id",
        element: <Upload />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },{
        path: "/admin",
        element: <AdminLogin />,
      },,{
        path: "/adminpanel",
        element: <AdminPanel />,
      },

      
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
