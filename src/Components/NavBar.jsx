import styled from '@emotion/styled'
import { AppBar, Toolbar, Button, Snackbar } from '@mui/material'
import { forwardRef, useState } from 'react';
import MuiAlert from '@mui/material/Alert'

// Styled component for the Save button
const SaveButton = styled(Button)({
    color: '#80868b',
    backgroundColor: '#ffffff',
    borderColor: '#505892',
    '&:hover': {
        borderColor: 'darkslategray',
    },
})

// Custom Alert component for Snackbar
const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="standard" {...props} />;
});

function NavBar({ nodes, edges }) {
    
    const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
    const [successSnackbarMsg, setSuccessSnackbarMsg] = useState();
    const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
    const [errorSnackbarMsg, setErrorSnackbarMsg] = useState();

    // Filter nodes that are not connected by any edge
    const unConnectedNodes = nodes.filter((node) => {
        return !edges.some((edge) => edge.source === node.id || edge.target === node.id);
    });

    // Filter nodes that do not have any incoming edge (empty target nodes)
    const emptyTargetNodes = nodes.filter((node) => {
        return !edges.some((edge) => edge.target === node.id);
    });

    // Function to show error snackbar with a message
    const showError = (snackBarMsg) => {
        setErrorSnackbarOpen(true)
        setErrorSnackbarMsg(snackBarMsg)
    }

    // Function to show success snackbar with a message
    const showSuccess = (snackBarMsg) => {
        setSuccessSnackbarOpen(true)
        setSuccessSnackbarMsg(snackBarMsg)        
    }

    let snackBarMsg = ''

    // Handler function for the Save button click
    const handleOnClick = () => {

        if (unConnectedNodes.length != 0) {
            snackBarMsg = 'Cannot save as there is one or more unconnected node(s) or target edge(s)!'
            showError(snackBarMsg)
            return;
        }
        
        if (emptyTargetNodes.length != 1) {
            snackBarMsg = 'Cannot save as there is one or more unconnected node(s) or target edge(s)!'
            showError(snackBarMsg)
            return;
        }
       
        else {
            snackBarMsg = 'React Flow Saved!'
            showSuccess(snackBarMsg)
        }
    }

    return (
        <AppBar position='fixed' elevation={0} sx={{ backgroundColor: '#f3f3f3' }}>
            <Toolbar variant='dense' sx={{ flexDirection: 'row-reverse', marginRight: '120px' }}>
                <SaveButton variant="outlined" onClick={handleOnClick}>
                    <label style={{ color: '#505892', fontWeight: 'bold' }}>Save Changes</label>
                </SaveButton>
            </Toolbar>

            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={successSnackbarOpen}
                autoHideDuration={2000}
                onClose={() => setSuccessSnackbarOpen(false)}
            >
                <Alert severity="success">
                    {successSnackbarMsg}
                </Alert>
            </Snackbar>

            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={errorSnackbarOpen}
                autoHideDuration={2500}
                onClose={() => setErrorSnackbarOpen(false)}
            >
                <Alert severity="error">
                   {errorSnackbarMsg}
                </Alert>
            </Snackbar>
        </AppBar>
    )
}

export default NavBar
