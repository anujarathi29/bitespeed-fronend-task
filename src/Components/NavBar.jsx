import styled from '@emotion/styled'
import { Box, AppBar, Toolbar, Button } from '@mui/material'

const SaveButton = styled(Button)({
    color: '#80868b',
    backgroundColor: '#ffffff',
    borderColor: '#505892',
    '&:hover': {
        borderColor: 'darkslategray',
    },
})

function NavBar() {
    return (
        
            <AppBar position='fixed' elevation={0} sx={{ backgroundColor: '#f3f3f3' }}>
                <Toolbar variant='dense' sx={{ flexDirection: 'row-reverse', marginRight: '120px' }}>
                    <SaveButton variant="outlined">
                        <label style={{color:'#505892', fontWeight:'bold'}}>Save Changes</label>
                    </SaveButton>
                </Toolbar>
            </AppBar>

    )
}

export default NavBar
