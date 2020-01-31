import * as FireBase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { GamePick } from '../views/pick';

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

/* Type alias to shorten name */
type DocumentData = FireBase.firestore.DocumentData

/**
 * Class to initialize database and authentication context
 */
class Firebase {
    constructor() {
        /* Only initialize app if it has not yet been initialized */
        if (FireBase.apps.length === 0) {
            this._app = FireBase.initializeApp(firebaseConfig);
        }
        else {
            this._app = FireBase.apps[0];
        }
    }

    /***
     * Public Variables
     **/
    DataMap: Map<string, DocumentData> = new Map();

    /* Private variables */
    private _app: FireBase.app.App;

    /***
     * Private Functions
     **/

    /* Handle a snapshot of a Document reference */
    private handleRef = (
        docPath: string,
        resolve: (data: DocumentData) => void,
        reject: () => void
    ) => {

        /* If requested data is new, add new listener to it */
        const existingData = this.DataMap.get(docPath);
        if (!existingData) {
            const docRef = this._app.firestore().doc(docPath);
            docRef.onSnapshot(
                (snapshot) => {
                    if (snapshot.exists) {
                        const data = snapshot.data();
                        this.DataMap.set(docPath, data);
                        resolve(data);
                    }
                    else {
                        reject();
                    }
                },
                (error) => {
                    console.log(error);
                    reject();
                }
            );
        }
        /* If we are already listening to data, just return the value */
        else {
            resolve(existingData);
        }
    }

    /***
     * Listeners
     **/

    /* Remove all listeners */
    terminate = () => this._app.firestore().terminate();

    /***
     * Weeks and Picks
     **/

    /* Returns promise of the given week in the database */
    requestWeek = (weekNumber: number): Promise<DocumentData> => {
        const weekPath = `weeks/${weekNumber}`;
        return new Promise(res => this.handleRef(weekPath, res, res));
    }

    /* Returns promise of the given week's picks in the database */
    requestWeekPick = (weekNumber: number): Promise<DocumentData> => {
        const uid = this._app.auth().currentUser?.uid;
        const pickPath = `weeks/${weekNumber}/picks/${uid}`;
        return new Promise(res => this.handleRef(pickPath, res, res));
    }

    /* Write the given picks for the current user at the given week */
    writePicks = (weekNumber: number, picks: GamePick[]): Promise<void> => {
        const dbPicks = picks.map(pick => ({
            awayGoals: pick.AwayGoals,
            homeGoals: pick.HomeGoals,
            confidence: pick.Confidence
        }));
        const docRef = this._app.firestore().doc(
            `weeks/${weekNumber}/picks/${this._app.auth().currentUser.uid}`
        );
        return docRef.set({ picks: dbPicks });
    }

    /***
     * Authentication
     **/

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
    getCurrentUser = () => {
        return this._app.auth().currentUser;
    }

    /* Send an email to reset a user's password */
    sendPasswordReset = (email: string) => {
        this._app.auth().sendPasswordResetEmail(email);
    }

    /* Set a listener on the change of auth state */
    setAuthStateUpdate = (callback: () => void) => {
        this._app.auth().onAuthStateChanged(callback);
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