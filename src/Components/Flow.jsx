import { useCallback, useRef, useState } from 'react'
import ReactFlow, { Background, Controls, MarkerType, addEdge, applyEdgeChanges, applyNodeChanges, useEdgesState, useNodesState } from 'reactflow'
import 'reactflow/dist/style.css'
import CustomNode from './CustomNode'

const rfstyle = {
    backgroundColor: "#ffffff"
}

const nodeTypes = { custom: CustomNode }

const initialNodes = [
    {
        id: '1',
        position: { x: 60, y: 50 },
        type: 'custom'
    },
]
let id = 0;
const getId = () => `dndnode_${id++}`

const Flow = () => {
    const reactFlowWrapper = useRef(null)
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
    const [edges, setEdges, onEdgesChange] = useEdgesState([])
    const [reactFlowInstance, setReactrFlowInstance] = useState(0)
    // const onNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)),[])
    // const onEdgesChange = useCallback((changes) => setEdges((edg) => applyEdgeChanges(changes, edg)),[])
    const onConnect = useCallback((params) => setEdges((edg) => addEdge({...params,markerEnd: {type:'arrow'}},edg)),[setEdges])

    const onDragOver = useCallback((e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    }, [])

    const onDrop = useCallback((e) => {
        e.preventDefault();
        const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
        const type = e.dataTransfer.getData('application/reactflow')
        console.log('type of node: ', type);

        if (typeof type === 'undefined' || !type) {
            return;
        }

        const position = reactFlowInstance.project({
            x: e.clientX - reactFlowBounds.left,
            y: e.clientY - reactFlowBounds.top,
        });

        const newNode = {
            id: getId(),
            type,
            position,
        }
        setNodes((nds) => nds.concat(newNode));
    },

        [reactFlowInstance]

    )

    return (
        <div>
            <div className='reactFlow-wrapper' ref={reactFlowWrapper} style={{ height: 900, width: 1500 }}>
                <ReactFlow
                    nodes={nodes}
                    onNodesChange={onNodesChange}
                    edges={edges}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onInit={setReactrFlowInstance}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    nodeTypes={nodeTypes}
                    style={rfstyle}
                >
                    <Background />
                    <Controls />            
        </ReactFlow>
        </div>
        </div >
    )
}

export default Flow