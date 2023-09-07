import { Button, styled } from "@mui/material";
import { MusicNote } from "@mui/icons-material";
function AudioButton() {
    const AudButton = styled(Button)({
        color: '#80868b',
        borderColor: '#80868b',
        '&:hover': {
            borderColor: '#ffffff'
        },
        padding: '20px 55px',
        flexDirection: 'column'
    })

    return (
        <AudButton variant="outlined" startIcon={<MusicNote />} size='large'>
            Audio
        </AudButton>

)}

export default AudioButton