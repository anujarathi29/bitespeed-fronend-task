import { useCallback, useEffect, useRef, useState } from 'react'
import ReactFlow, { Background, Controls, addEdge, useEdgesState, useNodesState } from 'reactflow'
import Sidebar from './Sidebar'
import NavBar from './NavBar'
import 'reactflow/dist/style.css'
import CustomNode from './CustomNode'
import './custom.css'
import SidebarMsg from './SidebarMsg'
import { Alert, Snackbar } from '@mui/material'

// Styles for the React Flow background
const bgstyle = {
    backgroundColor: "#ffffff",
    height:'80%',
    width:'60%'
}

// Define custom node types
const nodeTypes = { custom: CustomNode }

// Initial node setup
const initialNodes = [
    {
        id: 'node_0',
        position: { x: 70, y: 120 },
        type: 'custom',
        data: { label: 'textNode'}
    },
]

// Generate unique node IDs
let id = 1;
const getId = () => `node_${id++}`

const Flow = () => {
    const reactFlowWrapper = useRef(null)
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
    const [edges, setEdges, onEdgesChange] = useEdgesState([])
    const [reactFlowInstance, setReactFlowInstance] = useState(0)
    const [selectedNodeId, setSelectedNodeId] = useState(null)
    const [nodeLabel, setNodeLabel] = useState('textNode')
    const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false)
    const [errorSnackbarMsg, setErrorSnackbarMsg] = useState('')

    // Function to show error message in Snackbar
    const showError = (snackBarMsg) => {
        setErrorSnackbarOpen(true)
        setErrorSnackbarMsg(snackBarMsg)
    }

    // Handle connection between nodes
    const onConnect = useCallback((params) => {
        // Prevent self-connection
        if (params.source === params.target) {
            showError('Cannot connect source handle to self target handle!')
            return
        }

        // Add new edge
        setEdges((edg) => addEdge({
            ...params, markerEnd: { type: 'arrow' }, style: {
                strokeWidth: 3
            }
        }, edg))
    }, [setEdges])

    // Handle drag over event for dropping nodes
    const onDragOver = useCallback((e) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'move'
    }, [])

    // Handle drop event to add new nodes to the flow
    const onDrop = useCallback((e) => {
        e.preventDefault()
        const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect()
        const type = e.dataTransfer.getData('application/reactflow')

        if (typeof type === 'undefined' || !type) {
            return
        }

        // Calculate node position and create new node
        const position = reactFlowInstance.project({
            x: e.clientX - reactFlowBounds.left,
            y: e.clientY - reactFlowBounds.top,
        })

        const newNode = {
            id: getId(),
            type,
            position,
            data: { label: nodeLabel },
        }
        setNodes((nds) => nds.concat(newNode))
    }, [reactFlowInstance, nodeLabel, setNodes])

    // Handle node selection to display settings panel
    const handleNodeSelection = (e, node) => {
        setNodeLabel(node.data.label)
        setSelectedNodeId(prev => {
            if (prev) {
                if (prev !== node.id) {
                    return node.id
                }
                
                // Unselect current node if already selected
                setNodes(prev => {
                    let currentNode = prev?.find(p => p.id === node.id)
                    if (currentNode) {
                        currentNode.selected = false
                    }
                    return [...prev]
                })
                return null
            }
            return node.id
        })
    }

    // Handle click on pane to unselect nodes
    const handlePaneClick = (e) => {
        setSelectedNodeId(null)
    }

    // Update node label when it changes
    useEffect(() => {
        setNodes((nds) =>
            nds.map((node) => {
                if (node.id === selectedNodeId) {
                    node.data = {
                        ...node.data,
                        label: nodeLabel,
                    }
                }
                return node
            })
        )
    }, [nodeLabel, setNodes, selectedNodeId])

    return (
        <div>
            <div className='reactFlow-wrapper' ref={reactFlowWrapper} style={{ height: 900, width: 1500 }} >
                <ReactFlow
                    nodes={nodes}
                    onNodesChange={onNodesChange}
                    edges={edges}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onInit={setReactFlowInstance}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    nodeTypes={nodeTypes}
                    onNodeClick={handleNodeSelection}
                    onPaneClick={handlePaneClick}
                    style={bgstyle}
                >
                    <Background/>
                    <Controls />
                </ReactFlow>
                <NavBar nodes={nodes} edges={edges} />
                {selectedNodeId === null 
                    ? <Sidebar />
                    : <SidebarMsg nodeLabel={nodeLabel} nodes={nodes} setNodes={setNodes} setNodeLabel={setNodeLabel} setSelectedNodeId={setSelectedNodeId} />
                }
            </div>
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
        </div>
    )
}

export default Flow
