import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import HomePage from "../Home";
import RegistryPage from "../Registry";
import ShareVideoPage from "../ShareVideo";

const routes = [
  {
    path: "/",
    component: (props?: any) => <HomePage {...props} />,
  },
  {
    path: "/registry",
    component: (props?: any) => <RegistryPage {...props} />,
  },
  {
    path: "/share-video",
    component: (props?: any) => <ShareVideoPage {...props} />,
  },
];

const Layout = (props: any) => {
  return (
    <Router>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/registry">Registry</Link>
        </li>
        <li>
          <Link to="/share-video">Share Video</Link>
        </li>
      </ul>
      <div>
        {props.children}
      </div>
      <div>
        <Routes>
          {routes.map((route, i) => (
            <Route path={route.path} key={i} element={route.component()} />
          ))}
        </Routes>
      </div>
    </Router>
  );
};

export default Layout;
