import { useCallback, useEffect, useRef, useState } from 'react'
import ReactFlow, { Background, Controls,addEdge, useEdgesState, useNodesState } from 'reactflow'
import Sidebar from './Sidebar'
import NavBar from './NavBar'
import 'reactflow/dist/style.css'
import CustomNode from './CustomNode'
import './custom.css'
import SidebarMsg from './SidebarMsg'

const bgstyle = {
    backgroundColor: "#ffffff"
}


const nodeTypes = { custom: CustomNode }

const initialNodes = [
    {
        id: 'node_0',
        position: { x: 60, y: 50 },
        type: 'custom',
        data: { label: 'textNode', selected:false }
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
            data: { label: nodeLabel ,selected: false },
        }
        setNodes((nds) => nds.concat(newNode));
    },
        [reactFlowInstance]
    )

    const handleNodeSelection = (e, node) => {
        setNodeLabel(node.data.label)
        setSelectedNodeId(prev => {
            //console.log("inside set selected nodeid, prev is - ", prev);
            
                if (prev) {
                    return null;
                }
            
                return node.id;
            
        });

        setNodes(prev => {
            //console.log("inside set nodes prev is ", prev);
            return prev.map(p => {
                //console.log("inside map, p is - ", p);
                if ((p.id !== node.id) || p.data.selected) {
                    //console.log("inside map if - ", node.id);
                    p.data.selected = false;
                } else {
                   // console.log("inside map else - ", node.id);
                    p.data.selected = true;
                }
                return p;
            });
        })
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

      const connectedStatus = nodes.filter((node) => {
        return !edges.some((edge) => edge.source === node.id || edge.target === node.id);
      });

      console.log("Connected Status", connectedStatus.length);
      

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
                    <Background />
                    <Controls />
                </ReactFlow>
                <NavBar connectedStatus={connectedStatus}/>
                {selectedNodeId === null ? <Sidebar /> : <SidebarMsg nodeLabel={nodeLabel} setNodeLabel={setNodeLabel} setSelectedNodeId={setSelectedNodeId} />}
            </div>
        </div >
    )
}

export default Flow