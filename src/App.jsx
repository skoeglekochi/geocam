import Layout from "./Layout/Layout";
import { Link, RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
// import Live from "./Pages/LivePreview";
import LivePreview from "./Pages/LivePreview";
import Downloads from "./Pages/Downloads";
export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout titlename="GeoCam home" >
       <h1>Home Skoegle</h1>
       <Link to="/preview"> Preview</Link> <br/>
       <Link to="/live"> Live</Link><br/>
       <Link to="/downloads"> Downloads</Link> <br/>
       <Link to="https://v-marg2-0.onrender.com/login"> Track</Link>
        </Layout>
      ),
    },
    {
      path:"/live",
      element: <Layout titlename="GeoCam Live"><LivePreview/></Layout>
    },
    {
      path:"/preview",
      element: <Layout titlename="GeoCam preview" ><Home/></Layout>
    },
    {
      path:"/login",
      element: <Layout titlename="GeoCam login" ><h1>login</h1></Layout>
    },
    {
      path:"/signup",
      element: <Layout titlename="GeoCam signup" ><h1>signup</h1></Layout>
    },
    {
      path:"/downloads",
      element:<Layout titlename="downloads" > <Downloads/></Layout>
    }
  ]);
  return <RouterProvider router={router} />;
}
