import { useCallback, useEffect, useRef, useState } from 'react'
import ReactFlow, { Background, Controls,addEdge, useEdgesState, useNodesState } from 'reactflow'
import Sidebar from './Sidebar'
import NavBar from './NavBar'
import 'reactflow/dist/style.css'
import CustomNode from './CustomNode'
import './custom.css'
import SidebarMsg from './SidebarMsg'
import './custom.css'


const bgstyle = {
    backgroundColor: "#ffffff",
    height:'80%',
    width:'60%'
}


const nodeTypes = { custom: CustomNode }

const initialNodes = [
    {
        id: 'node_0',
        position: { x: 70, y: 170 },
        type: 'custom',
        data: { label: 'textNode'}
    },
]
let id = 1;
const getId = () => `node_${id++}`

const Flow = () => {
    const reactFlowWrapper = useRef(null)
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
    const [edges, setEdges, onEdgesChange] = useEdgesState([])
    const [reactFlowInstance, setReactFlowInstance] = useState(0)
    const [selectedNodeId, setSelectedNodeId] = useState(null)
    const [nodeLabel, setNodeLabel] = useState('textNode')
    

    const onConnect = useCallback((params) => {
        setEdges((edg) => addEdge({
            ...params, markerEnd: { type: 'arrow' }, style: {
                strokeWidth: 3
            }
        }, edg))
        
    }, [setEdges])

    const onDragOver = useCallback((e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    }, [])

    const onDrop = useCallback((e) => {
        e.preventDefault();
        const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
        const type = e.dataTransfer.getData('application/reactflow')

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
            data: { label: nodeLabel},
        }
        setNodes((nds) => nds.concat(newNode));
    },
        [reactFlowInstance]
    )

    const handleNodeSelection = (e, node) => {
        
        setNodeLabel(node.data.label)
        setSelectedNodeId(prev => {            
                if (prev) {
                    if(prev != node.id)
                    return node.id
                    
                    // if current node id is already selected, unselect it
                    setNodes(prev => {
                        let currentNode = prev?.find(p => p.id == node.id);
                        if(currentNode) {
                            currentNode.selected = false;
                        }
                        return [...prev];
                    })

                    return null
                }
            
                return node.id;
            
        });
    }

    const handlePaneClick = (e) => {
            setSelectedNodeId(null)
    }

    useEffect(() => {
        setNodes((nds) =>
          nds.map((node) => {
            if (node.id === selectedNodeId) {
              node.data = {
                ...node.data,
                label: nodeLabel,
              };
            }
            return node;
          })
        );
      }, [nodeLabel, setNodes]);



    return (
        <div>
            <div className='reactFlow-wrapper' ref={reactFlowWrapper} style={{ height: 700, width: 1200 }} >
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
                {selectedNodeId === null ? <Sidebar /> : <SidebarMsg nodeLabel={nodeLabel} nodes={nodes} setNodes={setNodes} setNodeLabel={setNodeLabel} setSelectedNodeId={setSelectedNodeId} />}
            </div>
        </div >
    )
}

export default Flow