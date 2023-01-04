import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';

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
export default function Account() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [isLogin, setIsLogin] = useState(false)

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <Box sx={style} component="form">
                    <>
                        <Button> Signup </Button>
                        <Button> Signin </Button>
                    </>
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
                    <Button variant="outlined" onClick={() => createHandler(name, url, video)}>Create</Button>

                </Box>
            </Fade>
        </Modal>
    )
} 