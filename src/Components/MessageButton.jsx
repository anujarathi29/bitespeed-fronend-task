import { Button, styled } from "@mui/material";
import { MessageOutlined } from "@mui/icons-material";

function MessageButton() {
const TxtButton = styled(Button)({
    color: '#80868b',
    borderColor: '#80868b',
    '&:hover': {
        borderColor: '#ffffff'
    },
    padding: '20px 30px',
    flexDirection: 'column'
})
return (
    <TxtButton variant = "outlined" startIcon = {< MessageOutlined />} size = 'large' sx = {{ mt: 3 }}>
        Message
    </TxtButton >

)}

export default MessageButton