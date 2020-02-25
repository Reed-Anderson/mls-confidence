import * as React from 'react';
import { Box, Button, Form, FormField, Text } from 'grommet';
import Headered from '../hocs/headered';
import ViewTitle from '../components/view-title';
import { FirebaseContext } from '../launch/app';
import { LogoutRequired } from '../hocs/redirects';
import { useHistory } from 'react-router-dom';
import PlainLink from '../components/plain-link';

/* Format of the data in the register form */
interface FormState {
    FirstName: string
    LastName: string
    Email: string
    MobileNumber: string
    Password: string
    ConfirmPassword: string
};

/* Initial data in the register form */
const initFormState: FormState = {
    FirstName: '',
    LastName: '',
    Email: '',
    MobileNumber: '',
    Password: '',
    ConfirmPassword: ''
};

/* The names of the register state fields */
type FormStateIndexer =
    'FirstName'
    | 'LastName'
    | 'Email'
    | 'MobileNumber'
    | 'Password'
    | 'ConfirmPassword';

/**
 * Functional Component for the about page
 */
const RegisterView = () => {
    /* Hook to you react router history */
    const history = useHistory();

    /* Use custom hook for using firebase */
    const firebase = React.useContext(FirebaseContext);

    /* State for the register form */
    const [registerForm, setRegisterForm] = React.useState(initFormState);

    /* State for error message */
    const [errorMessage, setErrorMessage] = React.useState('');

    /* Regexes for validation */
    /* Credit to Philip Bulley at https://tinyurl.com/ycx7b6mt */
    const lettersOnlyRegex = /^[a-zA-Z]+$/;
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!$%@#£€*?&]{8,}$/;

    /* Change the value of a form input */
    const onChange = (event: React.ChangeEvent<HTMLFormElement>) => {
        if (event.target) {
            const name = event.target.name as FormStateIndexer;
            const value = event.target.value;

            setRegisterForm({
                ...registerForm,
                [name]: value
            });
        }
    };

    /* Validate First Name */
    const validateFirstName = (name: string) => {
        if (!lettersOnlyRegex.test(name)) {
            return 'Invalid first name.';
        }
        return null;
    };

    /* Validate Last Name */
    const validateLastName = (name: string) => {
        if (!lettersOnlyRegex.test(name)) {
            return 'Invalid last name.';
        }
        return null;
    };

    /* Validate Email */
    const validateEmail = (email: string) => {
        if (!emailRegex.test(email)) {
            return 'Invalid email address.';
        }
        return null;
    };

    /* Validate Password */
    const validatePassword = (password: string) => {
        if (!passwordRegex.test(password)) {
            return `Password must contain a minimum of eight characters,
                    at least one letter, and at least one number.`;
        }
        return null;
    };

    /* Validate Confirm Password */
    const validateConfirmPassword = (confirmPassword: string) => {
        if (confirmPassword !== registerForm.Password) {
            return 'Passwords do not match.';
        }
        return null;
    };

    /* Submit the register form */
    const submitForm = () => {
        firebase.createUser(
            registerForm.FirstName,
            registerForm.LastName,
            registerForm.MobileNumber,
            registerForm.Email,
            registerForm.Password
        )
            .then(() => {
                history.push('/');
            })
            .catch(reason => {
                setErrorMessage(reason.message);
            });
    };

    /* Return the register view */
    return (
        <Headered activeDisplayName='Register'>
        <Box as='div' align='center' fill>
            <ViewTitle pushFromTop title='Create a New Account!' />
            <Box height={{ min: 'auto' }} width='medium'>
                <Form
                    onChange={onChange}
                    onSubmit={submitForm}
                    value={registerForm}
                >
                    <FormField
                        name='FirstName'
                        label='First Name'
                        margin='small'
                        required
                        validate={validateFirstName}
                    />
                    <FormField
                        name='LastName'
                        label='Last Name'
                        margin='small'
                        required
                        validate={validateLastName}
                    />
                    <FormField
                        name='Email'
                        label='Email Address'
                        margin='small'
                        required
                        validate={validateEmail}
                    />
                    <FormField
                        name='MobileNumber'
                        label='Mobile Number (Optional)'
                        margin='small'
                    />
                    <FormField
                        name='Password'
                        label='Password'
                        margin='small'
                        required
                        type='password'
                        validate={validatePassword}
                    />
                    <FormField
                        name='ConfirmPassword'
                        label='Confirm Password'
                        margin='small'
                        required
                        type='password'
                        validate={validateConfirmPassword}
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
                        <Box align='center' direction='row'>
                            <PlainLink to='/login'>
                                <Button label='Log In' margin='small' />
                            </PlainLink>
                            <Button
                                label='Register!'
                                margin='small'
                                primary
                                type='submit'
                            />
                        </Box>
                    </Box>
                </Form>
            </Box>
        </Box>
        </Headered>
    );
};

/* Export the AboutView with a header */
export default () => LogoutRequired(RegisterView());