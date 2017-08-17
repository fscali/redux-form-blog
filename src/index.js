import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

//with react-router we don't have a central wrapper component, so we can get rid of the App Component
//import App from './components/app';
import reducers from "./reducers";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import promise from "redux-promise";

import PostsIndex from "./components/posts-index";
import PostsNew from "./components/posts-new";
import PostsShow from "./components/posts-show";

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/posts/new" component={PostsNew} />
          <Route path="/posts/:id" component={PostsShow} />
          <Route path="/" component={PostsIndex} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.querySelector(".container")
);
