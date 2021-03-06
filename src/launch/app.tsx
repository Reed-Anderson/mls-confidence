import * as React from 'react';
import HomeView from '../views/home';
import AboutView from '../views/about';
import LoginView from '../views/login';
import RegisterView from '../views/register';
import StandingsView from '../views/standings';
import PickView from '../views/pick';
import ErrorView from '../views/error';
import RulesView from '../views/rules';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Grommet } from 'grommet';
import { COLORS } from '../utils/constants';
import Firebase from '../utils/firebase-interface';
import FirebaseInitializer from '../hocs/firebase-initializer';
import Div100vh from 'react-div-100vh'

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
    },
    button: {
        border: {
            radius: '12px'
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
        <Div100vh>
            <Grommet theme={theme} style={{ height: '100%' }}>
                <BrowserRouter>
                    <FirebaseContext.Provider value={firebaseInstance}>
                        <FirebaseInitializer>
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
                                    component={RulesView}
                                    path='/rules'
                                />
                                <Route
                                    exact
                                    component={LoginView}
                                    path='/login'
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
                        </FirebaseInitializer>
                    </FirebaseContext.Provider>
                </BrowserRouter>
            </Grommet>
        </Div100vh>
    )
};

export default App;