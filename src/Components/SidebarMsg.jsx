import { Box, Divider, Drawer, IconButton, TextareaAutosize, Toolbar, Typography } from "@mui/material";
import { KeyboardBackspaceOutlined } from "@mui/icons-material";
import Sidebar from "./Sidebar";
import styled from "@emotion/styled";

const drawerWidth = 400;

const StyledTextArea = styled(TextareaAutosize)(
    ({ theme }) => `
        width: 320px;
        border-radius: 12px 12px 0px 12px;
        border: 1px solid lightgrey;
        box-shadow: 0px 2px 2px lightgrey;        
`)

function SidebarMsg({nodeLabel,setNodeLabel,save}) {
    console.log("Value of save is: ", save);
    const label='textNode'
    setNodeLabel(label)
    return (
        <Drawer sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                marginBlockStart: '50px'
            },
            position: 'relative'
        }}
            variant="permanent"
            anchor="right"

        >
            <Toolbar variant='dense'>
                <Box sx={{ flexGrow: 1 }}>
                <IconButton ><KeyboardBackspaceOutlined /></IconButton>
                </Box>
                <Box sx={{flexGrow:1}}>
                <Typography sx={{fontWeight:'bold', color:'darkslategrey'}}>Message</Typography>
                </Box>
                
                
            </Toolbar>
            <Divider sx={{ backgroundColor: 'grey' }} />
            <Toolbar variant='dense'>
                <Typography sx={{ color: 'grey' }}>Text</Typography>
            </Toolbar>
            <Toolbar variant='dense' sx={{ mb: 3 }} >
                <StyledTextArea minRows={3} onChange={(evt) => save ? setNodeLabel(evt.target.value): setNodeLabel(label)} >{nodeLabel}</StyledTextArea>
            </Toolbar>
            <Divider sx={{ backgroundColor: 'grey' }} />

        </Drawer>
    )

}

export default SidebarMsg