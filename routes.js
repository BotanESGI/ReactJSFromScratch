import Home from "./views/Home.js";
import Map from "./views/Map.js";
import Event from "./views/Event.js";
import Setting from "./views/Setting.js";
import Error from "./views/404.js";

const routes = [
  { path: "/", component: Home },
  { path: "/map", component: Map },
  { path: "/event", component: Event },
  { path: "/setting", component: Setting },
  { path: "*", component: Error },
];

export default routes;
