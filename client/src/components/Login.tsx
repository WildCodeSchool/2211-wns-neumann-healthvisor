import React, { FormEvent, useState } from 'react';
import { FormControl, InputLabel, Input, FormHelperText, Button } from '@mui/material';
import { useLoginUserMutation } from '../gql/generated/schema';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [login] = useLoginUserMutation();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(email, password);
        
    }

    return (
        <div className="Login">
            <form action="" onSubmit={handleSubmit}>
                <FormControl>
                    <InputLabel htmlFor="my-input">Email address</InputLabel>
                    <Input id="email" aria-describedby="my-helper-text" value={email} onChange={e => setEmail(e.target.value)} />
                    <FormHelperText id="email-text">We'll never share your email.</FormHelperText>
                </FormControl>

                <FormControl>
                    <InputLabel htmlFor="my-input">Mot de Passe</InputLabel>
                    <Input id="password" aria-describedby="my-helper-text" value={password} onChange={e => setPassword(e.target.value)} />
                    <FormHelperText id="password-text">We'll never share your password.</FormHelperText>
                </ FormControl>
                <Button variant="outlined" type='submit'>Login</Button>
            </form>
        </div>
    );
};

export default Login;