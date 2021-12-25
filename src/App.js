import React, {Fragment, Component} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./views/login/Index";


class App extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  render() {
    return(
        <Fragment>
          <BrowserRouter>
            <Routes>
              <Route element={<Login />}  exact path = "/" />
            </Routes>
          </BrowserRouter>
        </Fragment>
      )
    }
}

export default App;
