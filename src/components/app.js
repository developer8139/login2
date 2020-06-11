import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Main from './main';
import Login from './login';

const App = () => {
    return(
        <Router>
            <div>
                <Route exact path="/" component={Login}/>
                <Route path="/main"  component={Main}/>
            </div>
        </Router>
    )
}


export default App;