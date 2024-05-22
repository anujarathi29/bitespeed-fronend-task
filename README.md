# BiteSpeed Frontend Task: Chatbot Flow Builder

## Overview

This project is a simple Chatbot flow builder built using React and React Flow. It allows users to create and connect multiple text nodes to define the order of execution in a chatbot flow.


## Features

1. **Text Node**
    - Supports only one type of message (Text Message).
    - Allows multiple Text Nodes in one flow.
    - Nodes can be added to the flow by dragging and dropping from the Nodes Panel.

2. **Nodes Panel**
    - Houses all kinds of Nodes that the Flow Builder supports.
    - Currently supports only the Message Node, but designed to be extensible for future node types.

3. **Edge**
    - Connects two Nodes together.

4. **Source Handle**
    - Source of a connecting edge.
    - Can only have one edge originating from a source handle.

5. **Target Handle**
    - Target of a connecting edge.
    - Can have more than one edge connecting to a target handle.

6. **Settings Panel**
    - Replaces the Nodes Panel when a Node is selected.
    - Includes a text field to edit the text of the selected Text Node.

7. **Save Button**
    - Button to save the flow.
    - Displays an error if there are more than one Nodes and more than one Node has empty target handles.


## Setup Instructions

1. Clone the repository:
    ```bash
    git clone https://github.com/anujarathi29/bitespeed-fronend-task.git
    cd bitespeed-fronend-task
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm run dev
    ```

## Usage

- Drag and drop a Text Node from the Nodes Panel into the canvas to create a node.
- Connect nodes by dragging from the source handle of one node to the target handle of another.
- Select a node to open the Settings Panel and edit its text.
- Click the Save button to save the flow.

## Code Explanation

- `Flow.js`: Main component containing the React Flow setup and state management.
- `Sidebar.js`: Contains the Nodes Panel for dragging and dropping nodes.
- `CustomNode.js`: Custom node component used in the flow.
- `SidebarMsg.js`: Settings Panel component for editing node text.

## Test Cases

1. **Adding Nodes**
    - Verify that dragging and dropping a Text Node from the Nodes Panel adds the node to the canvas.

2. **Connecting Nodes**
    - Verify that an edge can be created by dragging from the source handle of one node to the target handle of another node.
    - Verify that a node cannot connect to itself.

3. **Editing Node Text**
    - Verify that selecting a node opens the Settings Panel.
    - Verify that editing the text in the Settings Panel updates the node's text in the canvas.

4. **Save Flow**
    - Verify that clicking the Save button saves the current flow.
    - Verify that an error is displayed if there are more than one nodes and more than one node has empty target handles.

5. **Node Constraints**
    - Verify that each node can only have one outgoing edge.
    - Verify that a node can have multiple incoming edges.



