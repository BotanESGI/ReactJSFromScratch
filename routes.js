import Home from "./views/Home.js";
import Map from "./views/Map.js";
import Event from "./views/Event.js";
import EventDetail from "./views/EventDetail.js";
import Setting from "./views/Setting.js";
import Error from "./views/404.js";

const routes = [
  { path: "/", component: Home },
  { path: "/map", component: Map },
  { path: "/event", component: Event },
  { path: "/event-detail", component: EventDetail },
  { path: "/setting", component: Setting },
  { path: "*", component: Error },
];

export default routes;
