import styled from '@emotion/styled'
import { Box, AppBar, Toolbar, Button, Snackbar } from '@mui/material'
import { forwardRef, useState } from 'react';
import MuiAlert from '@mui/material/Alert'

const SaveButton = styled(Button)({
    color: '#80868b',
    backgroundColor: '#ffffff',
    borderColor: '#505892',
    '&:hover': {
        borderColor: 'darkslategray',
    },
})

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



function NavBar({ connectedStatus }) {
     console.log("connectedstatus info in NavBar: ", connectedStatus);
    const [snackState, setSnackState] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });

    const { vertical, horizontal, open } = snackState
    const handleOnClick = (newSnackState) => {
        if (connectedStatus == 0) {
            setSnackState({ ...newSnackState, open: false });
        }
        else {
            setSnackState({ ...newSnackState, open: true });
        }
    }
    const handleClose = () => {
        setSnackState({ ...snackState, open: false });
    };
    return (
        <AppBar position='fixed' elevation={0} sx={{ backgroundColor: '#f3f3f3' }}>
            <Toolbar variant='dense' sx={{ flexDirection: 'row-reverse', marginRight: '120px' }}>
                <SaveButton variant="outlined" onClick={() => handleOnClick({ vertical: 'top', horizontal: 'top' })}>
                    <label style={{ color: '#505892', fontWeight: 'bold' }}>Save Changes</label>
                </SaveButton>
            </Toolbar>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                autoHideDuration={900}
                key={vertical + horizontal}
                onClose={handleClose}
            >
                <Alert severity="error">
                    Cannot be saved!

                </Alert>
            </Snackbar>
        </AppBar>

    )
}

export default NavBar
