import React, { useReducer, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom';
import firebase from 'firebase/app'
import { loginCometChatUser, registerCometChatUser } from '../cometchat';
const initialState = {
    name: '',
    email: '',
    password:'',
    confirmPassword: '',
}

const reducer = (state, action) => {
    switch(action.type){
        case 'name':
            return { ...state, name: action.payload}
        case 'email':
            return { ...state, email: action.payload}
        case 'password':
            return { ...state, password: action.payload}
        case 'confirmPassword':
            return { ...state, confirmPassword: action.payload}
        default:
            throw new Error();
    }
}
export default function Register() {  
    const [ state, dispatch ] = useReducer(reducer, initialState)
    const [ error, setError ] = useState('');

    let navigate = useNavigate();
    const handleOnChange = (evt) => {
        const { target } = evt;
        dispatch({
            type: target.name,
            payload: target.value,
        })
    }

    const registerUser = (evt) => {
        evt.preventDefault();
        if(state.password !== state.confirmPassword){
            setError('Error: Passwords do not match.');
            return;
        }
        firebase
            .auth()
            .createUserWithEmailAndPassword(state.email, state.password)
            .then(async (doc) => {
                await registerCometChatUser(state.name, doc.user.uid);
                await loginCometChatUser(doc.user.uid)
                navigate('/')
            })
            .catch((err) => {
                setError(err.message);
                console.log(`Unable to register user: ${err.message}`)
            })
    }
    return (
        <div>
            <div>
                <div>
                    <Link>
                        <img></img>
                    </Link>
                </div>
                <form>
                    <h1>{error}</h1>
                    <label htmlFor='name'>Name</label>
                    <input 

                    />
                    <label htmlFor='email'>Email</label>
                    <input 
                    
                    />
                    <label htmlFor='password'>Password</label>
                    <input 
                    
                    />
                    <label htmlFor='password'>confirm Password</label>
                    <input 
                    
                    />
                    <button></button>
                </form>
            </div>
        </div>
  )
}