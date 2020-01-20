import * as React from 'react';
import { Box, Button, Form, FormField, Text } from 'grommet';
import Headered from '../hocs/headered';
import ViewTitle from '../components/view-title';
import { useHistory } from 'react-router-dom';
import { LogoutRequired } from '../hocs/redirects';
import { FirebaseContext } from '../launch/app';

/* Format of the data in the login form */
interface FormState {
    Email: string
    Password: string
};

/* Initial data in the login form */
const initFormState: FormState = {
    Email: '',
    Password: ''
};

/* The names of the login state fields */
type FormStateIndexer = 'Email' | 'Password';

/**
 * Functional Component for the about page
 */
const LoginView = () => {
    /* Hook to you react router history */
    const history = useHistory();

    /* Use custom hook for firebase */
    const firebase = React.useContext(FirebaseContext);

    /* State for the login form */
    const [loginForm, setLoginForm] = React.useState(initFormState);

    /* State for error message when signing in */
    const [errorMessage, setErrorMessage] = React.useState('');

    /* Change the value of a form input */
    const onChange = (event: React.ChangeEvent<HTMLFormElement>) => {
        if (event.target) {
            const name = event.target.name as FormStateIndexer;
            const value = event.target.value;

            setLoginForm({
                ...loginForm,
                [name]: value
            });
        }
    };

    /* Submit the login form */
    const submitForm = () => {
        firebase.signInUser(loginForm.Email, loginForm.Password)
            .then(() => {
                history.push('/')
            })
            .catch(reason => {
                setErrorMessage(reason.message);
            });
    };

    firebase

    /* Return the login view */
    return (
        <Box as='div' fill align='center'>
            <ViewTitle pushFromTop title='Log in to your account!' />
            <Box width='medium'>
                <Form
                    onChange={onChange}
                    onSubmit={submitForm}
                    value={loginForm}
                >
                    <FormField
                        name='Email'
                        label='Email Address'
                        margin='small'
                        required
                    />
                    <FormField
                        name='Password'
                        label='Password'
                        margin='small'
                        required
                        type='password'
                    />
                    <Box align='center'>
                        {errorMessage &&
                            <Text
                                color='status-error'
                                margin='medium'
                                textAlign='center'
                            >
                                {errorMessage}
                            </Text>
                        }
                        <Button
                            alignSelf='center'
                            label='Submit'
                            margin='small'
                            primary
                            type='submit'
                        />
                    </Box>
                </Form>
            </Box>
        </Box>
    );
};

export default () => LogoutRequired(Headered(LoginView(), 'Log In'));