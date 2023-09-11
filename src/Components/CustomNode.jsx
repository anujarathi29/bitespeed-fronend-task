import { memo, useCallback } from "react";
import { Handle, Position, getConnectedEdges, useNodeId, useStore } from "reactflow";
import { WhatsApp, MessageRounded } from "@mui/icons-material";
import { Avatar, Card, CardContent, CardHeader, Divider, IconButton, Typography } from "@mui/material";

const selector = (nodeId) => (s) => {
    const node = s.nodeInternals.get(nodeId)
    const connectedEdges = getConnectedEdges([node], s.edges)
    return connectedEdges.filter((e) => e.source === nodeId).length < 1
}

const handleStyle = {
    width: 8,
    height: 8,
    background: 'darkslategrey',
};

function CustomNode({ data, selected }) {

    // console.log("data is ", data);
    const nodeId = useNodeId()
    const isConnectable = useStore(useCallback(selector(nodeId)))

    return (
        <>
            <Handle type="target" position={Position.Left} style={handleStyle} />
            <Card sx={{ minWidth: 280, maxHeight: 95, borderRadius: '10px', border: (selected ? '1px solid steelblue' : '0px') }} elevation={7} >
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: '#b3efe2', height: 25, width: 25 }}>
                            <MessageRounded style={{ color: '#467871', fontSize: 18 }} />
                        </Avatar>
                    }
                    action={
                        <IconButton sx={{ bgcolor: 'white', height: 25, width: 25 }}>
                            <WhatsApp style={{ color: 'green', fontSize: 15 }} />
                        </IconButton>
                    }
                    title='Send Message'
                    titleTypographyProps={{ color: 'darkslategray', fontWeight: 'bold', fontSize: '18px', fontFamily: 'sans-serif' }}
                    sx={{ bgcolor: '#b3efe2', height: 45 }}
                />
                <Divider />
                <CardContent sx={{ mt: 0, height: 55 }}>
                    <Typography sx={{ fontFamily: 'sans-serif', color: 'darkslategray' }} >{data.label}</Typography>
                </CardContent>
            </Card>
            <Handle type="source" position={Position.Right} isConnectable={isConnectable} style={handleStyle} />
        </>
    )
}

export default memo(CustomNode)