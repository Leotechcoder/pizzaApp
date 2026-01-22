import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Error from "./Error"
import Home from "./Home"
import CheckoutForm from "./components/CheckoutForm"

const router = createBrowserRouter([
    {
    path: "/",
        element: <Home />,
        errorElement: <Error />,
    },
    {
    path: "/pagos",
        element: <CheckoutForm />,
        errorElement: <Error />,
    },
    { 
    path: "*", 
    element: <Error/> 
    },
  
])


const App = () => {
  return (    
      <RouterProvider router={router} />
  )
}

export default App