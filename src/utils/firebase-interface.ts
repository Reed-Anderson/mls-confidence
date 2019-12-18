import * as FireBase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

/**
 * These values are stored in var.env (git ignored)
 * to prevent publicly exposing private IDs and keys
 */
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

/**
 * Class to initialize database and authentication context
 */
class Firebase {
    constructor() {
        if (FireBase.apps.length === 0) {
            this._app = FireBase.initializeApp(firebaseConfig);
        }
        else {
            this._app = FireBase.apps[0];
        }
    }

    /* Private variables */
    private _app: FireBase.app.App;

    /* Create a user with email and password */
    createUser = (email: string, password: string) => {
        const promise = this._app.auth()
            .createUserWithEmailAndPassword(email, password);
        promise.then(user => {
            user.user.sendEmailVerification();
        });
        return promise;
    }

    /* Get the currently signed in user */
    getCurrentUser = () => this._app.auth().currentUser

    /* Gets the games in a week */
    getGames = (weekNumber: number) => {
        return this._app.firestore().collectionGroup('games').get()
    }

    /* Gets a week of games */
    getWeek = (weekNumber: number) => {
        return this._app.firestore().doc(`weeks/${weekNumber}`).get();
    }

    /* Send an email to reset a user's password */
    sendPasswordReset = (email: string) => {
        this._app.auth().sendPasswordResetEmail(email);
    }

    /* Sign in a user with email and password */
    signInUser = (email: string, password: string) => {
        const promise = this._app.auth()
            .signInWithEmailAndPassword(email, password);
        return promise;
    }

    /* Sign out a user */
    signOutUser = () => {
        return this._app.auth().signOut();
    }

    /* Updates a user's password */
    updatePassword = (password: string) => {
        this._app.auth().currentUser.updatePassword(password);
    }
}

export default Firebase;