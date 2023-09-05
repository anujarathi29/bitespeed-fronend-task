import { useCallback } from "react";
import { Handle, Position, getConnectedEdges, useNodeId, useStore } from "reactflow";
import { WhatsApp, MessageRounded } from "@mui/icons-material";
import { Avatar, Card, CardContent, CardHeader, Divider, IconButton, TextField, Typography } from "@mui/material";

const selector =   (nodeId) => (s) => {
    const node = s.nodeInternals.get(nodeId)
    const connectedEdges = getConnectedEdges([node],s.edges)
    
    
    return   connectedEdges.filter((e) => e.source === nodeId).length < 1
}

function CustomNode({ data }) {
    const onChange = useCallback((e) => {
        console.log(e.target.value);
    }, [])
    const nodeId = useNodeId()
    const isConnectable = useStore( useCallback(selector(nodeId)))
    return (
        <>
            <Handle type="target" position={Position.Left} />
            <Card sx={{ minWidth: 300, maxHeight: 125, borderRadius: '10px' }} elevation={7}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: '#b3efe2', height:25, width:25}}>
                            <MessageRounded style={{ color: '#467871', fontSize:18}} />
                        </Avatar>
                    }
                    action={
                        <IconButton sx={{ bgcolor: 'white', height:25, width:25}}>
                            <WhatsApp style={{ color: 'green', fontSize: 15 }} />
                        </IconButton>
                    }
                    title='Send Message'
                    titleTypographyProps={{ color: 'darkslategray', fontWeight: 'bold', fontSize: '18px', fontFamily: 'sans-serif' }}
                    sx={{ bgcolor: '#b3efe2', height: 45}}
                />
                <Divider />
                <CardContent sx={{ mt: 0, height: 70 }}>
                    <TextField id="standard-basic" label="test message 1" variant="outlined" size="small" onChange={onChange}
                        sx={{
                            "& fieldset": { border: 'none' },
                        }} />
                </CardContent>
            </Card>
            <Handle type="source" position={Position.Right} isConnectable={isConnectable}/>
        </>
    )
}

export default CustomNode