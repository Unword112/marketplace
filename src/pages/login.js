import React, { useReducer, useState } from 'react';

import { Link , useHistory } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import { loginCometChatUser } from '../cometchat';

const initialState = {
    email: '',
    password: '',
};

const reducer = (state, action ) => {
    switch(action.type){
        case 'email':
            return { ...state, email: action.payload};
        case 'password':
            return { ...state, password: action.payload}
        default:
            throw new Error();
    }
}

export default function LoginPage() {
    const [ state, dispatch ] = useReducer(reducer, initialState);
    const [ error, setError ] = useState('');

    let history = useHistory();
    const handleOnChange = (evt) => {
        const { target } = evt;
        dispatch({
            type: target.name,
            payload: target.value,
        })
    }
    
    const loginUser = (evt) => {
        evt.preventDefault();
        firebase
            .auth()
            .signInWithEmailAndPassword(state.email, state.password)
            .then((doc) => {
                loginCometChatUser(doc.user.uid);
                history.push('/');
            })
            .catch((err) => {
                setError(err.message);
                console.log(`Unable to login: ${err.message}`);
            })
    }
    return (
        <div>
            <div className='flex flex-col justify-center items-center mx-auto px-2 py-2 border-gray' >
                <Link to='/'>
                    <img src='/logo-black.png' className='w-24' alt='Logo'></img>
                </Link>
            </div>
            <form className='border-gray-300 border rounded-sm my-4 p-4'
                onSubmit={loginUser}
            >
                <h1 className='font-bold'>Sign-In</h1>
            {error && (
                <p className='text-red-500 font-bold text-base py-2'>{error}</p>
            )}
            <label htmlFor='email' className='font-bold text-base md:m1-1'>
                Email
            </label>
            </form>
        </div>
    )
}