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
        /* Only initialize app if it has not yet been initialized */
        if (FireBase.apps.length === 0) {
            this._app = FireBase.initializeApp(firebaseConfig);
        }
        else {
            this._app = FireBase.apps[0];
        }
    }

    /* Private variables */
    private _app: FireBase.app.App;

    /***
     * Private Functions
     **/

    /* Handle a snapshot of a Document reference */
    private handleRef = (
        docRef: FireBase.firestore.DocumentReference,
        resolve: (data: any) => void,
        reject: () => void
    ) => {
        docRef.onSnapshot(
            (snapshot) => {
                if (snapshot.exists) {
                    const data: FireBase.firestore.DocumentData
                        = snapshot.data();
                    resolve(data);
                }
            },
            (error) => {
                console.log(error);
                reject();
            }
        );
    }

    /***
     * Public Functions
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

    /**
     * Returns promise of the given team in the database
     */
    requestTeam = (
        teamId: string
    ): Promise<FireBase.firestore.DocumentData> => {
        return new Promise((resolve, reject) => {
            const teamRef = this._app.firestore().doc(`teams/${teamId}`);
            this.handleRef(teamRef, resolve, reject);
        });
    }

    /**
     * Returns promise of the given week in the database
     */
    requestWeek = (
        weekNumber: number
    ): Promise<FireBase.firestore.DocumentData> => {
        return new Promise((resolve, reject) => {
            const weekRef = this._app.firestore().doc(`weeks/${weekNumber}`);
            this.handleRef(weekRef, resolve, reject);
        });
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