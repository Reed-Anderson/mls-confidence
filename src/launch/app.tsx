import * as React from 'react';
import HomeView from '../views/home';
import AboutView from '../views/about';
import LoginView from '../views/login';
import RegisterView from '../views/register';
import StandingsView from '../views/standings';
import PickView from '../views/pick';
import ErrorView from '../views/error';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Grommet } from 'grommet';
import { COLORS } from '../utils/constants';
import Firebase from '../utils/firebase-interface';

/* Global Grommet theme */
const theme = {
    global: {
        colors: COLORS,
        font: {
            family: 'Roboto',
            size: '18px',
            height: '20px'
        },
        input: {
            weight: 400
        }
    }
};

/* User Context */
const firebaseInstance = new Firebase();
export const FirebaseContext = React.createContext(firebaseInstance);

/**
 * App component wraps everything in an AppWrapper
 * and Routes to desired views through the URL
 */
const App = () => {

    /* Remove listeners after unmount */
    React.useEffect(() => {
        return () => firebaseInstance.terminate();
    });

    /* Return App */
    return (
        <Grommet theme={theme} full>
            <BrowserRouter>
                <FirebaseContext.Provider value={firebaseInstance}>
                    <Switch>
                        <Route
                            exact
                            component={HomeView}
                            path='/'
                        />
                        <Route
                            exact
                            component={AboutView}
                            path='/about'
                        />
                        <Route
                            exact
                            component={LoginView}
                            path='/logIn'
                        />
                        <Route
                            exact
                            component={RegisterView}
                            path='/register'
                        />
                        <Route
                            exact
                            component={StandingsView}
                            path='/standings'
                        />
                        <Route
                            component={PickView}
                            path='/pick/:weekNumber'
                        />
                        <Route path='*' component={ErrorView} />
                    </Switch>
                </FirebaseContext.Provider>
            </BrowserRouter>
        </Grommet>
    )
};

export default App;