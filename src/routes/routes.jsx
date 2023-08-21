import { createBrowserRouter } from "react-router-dom";
import publicRoutes from "./publictRoutes/publicRoutes";
import privateRoutes from "./privateRoutes/privateRoutes";
// Create Router
const route = createBrowserRouter([...publicRoutes, ...privateRoutes]);

// Export
export default route;
