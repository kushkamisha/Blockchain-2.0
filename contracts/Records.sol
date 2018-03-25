pragma solidity ^0.4.18;

contract LinkedList {

    struct Node {
        bytes32 data;
        bytes32 prev;
    }

    uint public length = 0;
    bytes32 public head;
    mapping (bytes32 => Node) public nodes;
    
    function LinkedList() public {}
    
    function push_front(bytes32 data) public returns (bool) {
        Node memory node = Node(data, head);
        bytes32 id = keccak256(node.data, now, length);
        nodes[id] = node;
        head = id;
        length += 1;
    }
    
    function changeData(uint n, bytes32 newData) public returns(bool) {
        bytes32 currentNode = head;
        Node memory prevNode;
        
        if (n >= length) {
            return false;
        }
        
        for (uint i = 0; i < n; ++i) {
            prevNode = nodes[currentNode];
            currentNode = nodes[currentNode].prev;
        }
        
        nodes[currentNode].data = newData;
        bytes32 id = keccak256(nodes[currentNode].data, now, length);
        nodes[id] = nodes[currentNode];
        
        prevNode.prev = id;
        
        return true;
    }
  
    function get(uint n) public constant returns (bytes32, bool) {
        bytes32 currentNode = head;
        
        if (n >= length) {
            return (-1, false);
        }
        
        for (uint i = 0; i < n; ++i) {
            currentNode = nodes[currentNode].prev;
        }
        
        return (nodes[currentNode].data, true);
    }
  
}

contract Records {
    LinkedList[] arr;
    uint public numOfColumns = 0;
    
    function Records() public {
        addColumn();
    }
    
    modifier isOutOfRangeColumn(uint index) {
        require(index >= 0 && index < numOfColumns);
        _;
    }
    
    modifier isOutOfRangeRow(uint columnIndex, uint rowIndex) {
        require(rowIndex >= 0 && rowIndex < arr[columnIndex].length());
        _;
    }
    
    // Get column length by column index
    function getColumnLength(uint index) constant public isOutOfRangeColumn(index) returns(uint) {
        return arr[index].length();
    }
    
    // Adds column to the end of the table
    function addColumn() public {
        arr.push(new LinkedList());
        numOfColumns++;
    }
    
    function changeData(uint columnIndex, uint rowIndex, bytes32 newData) public {
        arr[columnIndex].changeData(rowIndex, newData);
    }
    
    // Adds data to the begining of the column getted by index
    function pushToColumn(uint index, bytes32 data) public isOutOfRangeColumn(index) {
        LinkedList ll = arr[index];
        ll.push_front(data);
    }
    
    // Get cell by column index and row index
    function get(uint columnIndex, uint rowIndex) constant public isOutOfRangeColumn(columnIndex) isOutOfRangeRow(columnIndex, rowIndex) returns(bytes32, bool) {
        LinkedList ll = arr[columnIndex];
        bytes32 value;
        bool status;
        (value, status) = ll.get(rowIndex);
        
        return (value, status);
    }

}
