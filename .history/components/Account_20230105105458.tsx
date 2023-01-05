import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "25ch",
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    m: 1,
};

type Props = {
    handleSignUp: (name: string, email: string, password: string) => void,
    handleSignIn: (email: string, password: string) => void,
    fetchStatus: 'error'|'loading'|'success'| false,
};
export default function Account({ handleSignUp, handleSignIn, fetchStatus }: Props) {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('')
    const [isLogin, setIsLogin] = useState<boolean>(false)

    return (
        <Box sx={style} component="form">

            <>
                <Button variant="outlined" sx={{ mb: 2 }} onClick={() => setIsLogin(false)}> Signup </Button>
                <Button variant="outlined" sx={{ mb: 2 }} onClick={() => setIsLogin(true)}> Signin </Button>
            </>
            {!isLogin ?

                <>
                    <TextField
                        id="outlined-name"
                        label="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        id="outlined-uncontrolled"
                        label="Enter Email"
                        sx={{ mb: 2 }}
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <TextField
                        id="outlined-uncontrolled"
                        label="Choose Password"
                        sx={{ mb: 2 }}
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </>
                :
                <>
                    <TextField
                        id="outlined-uncontrolled"
                        label="Enter Email"
                        sx={{ mb: 2 }}
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <TextField
                        id="outlined-uncontrolled"
                        label="Choose Password"
                        sx={{ mb: 2 }}
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </>
            }
            {console.log("sssfetchStatus)}
            <Button variant="outlined" onClick={() => !isLogin ? handleSignUp(name, email, password) : handleSignIn(email,password)}>{isLogin ? "Login" : "Signup"}</Button>
            { fetchStatus && <Alert severity={fetchStatus =='error' ? "error":"success"} sx={{mt:2}}>{fetchStatus ==='error' ? "error":"success"}</Alert>}  
        </Box>
    )
} 