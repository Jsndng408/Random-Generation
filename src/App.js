import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { NavigationBar } from './components/navigation/NavigationBar';
import { Home } from './components/static/Home';
import { About } from './components/static/About';
import { NoMatch } from './components/static/NoMatch';

export default function App() {
    return (
        <div>
            <React.Fragment>
                <Router>
                    <NavigationBar />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/about" component={About} />
                        <Route component={NoMatch} />
                    </Switch>
                </Router>
            </React.Fragment>
        </div>
    );
}
