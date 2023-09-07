import { useCallback, useRef, useState } from 'react'
import ReactFlow, { Background, Controls, MarkerType, addEdge, useEdgesState, useNodesState } from 'reactflow'
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
        data:{label: 'textNode', isSelected: false}
    },
]
let id = 1;
const getId = () => `node_${id++}`

const Flow = () => {
    const reactFlowWrapper = useRef(null)
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
    const [edges, setEdges, onEdgesChange] = useEdgesState([])
    const [reactFlowInstance, setReactrFlowInstance] = useState(0)
    const [isSelected,setIsSelected] = useState(false)
    const [isConnected, setIsConnected] = useState(false)
    const [save,setSave] = useState(false)
    const [nodeLabel,setNodeLabel] = useState('textNode')
    
    const onConnect = useCallback((params) => {setEdges((edg) => addEdge({...params,markerEnd: {type:'arrow'}, style: {
        strokeWidth: 3}},edg)) 
        setIsConnected(!isConnected)
    },[setEdges])

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
            data:{isSelected: isSelected},
        }
        setNodes((nds) => nds.concat(newNode));
    },
        [reactFlowInstance]
    )

    const handleNodeSelection = (e,node) =>{
        
        setIsSelected(!isSelected)
        setNodes((nds) =>
        nds.map((item) => {
          if (item.id === node.id) {
            item.data = {
                ...item.data,
                isSelected: !isSelected,
            };
          }
          else{
            item.data = {
                ...item.data,
                isSelected: false,
              };
          }
          return item;
        })
      );
    }

    return (
        <div>
            <div className='reactFlow-wrapper' ref={reactFlowWrapper} style={{ height: 900, width: 1500 }} >
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
                    onNodeClick={handleNodeSelection}
                    style={bgstyle}  
                >
                    <Background/>
                    <Controls />   
        </ReactFlow>
        <NavBar isConnected={isConnected} isSelected={isSelected} setSave={setSave} save={save}/>
        {isSelected?<SidebarMsg nodeLabel={nodeLabel} setNodeLabel={setNodeLabel} save={save}/>:<Sidebar/>}
        </div>
        </div >
    )
}

export default Flow