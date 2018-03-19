pragma solidity ^0.4.18;

/**
 * @title Limited
 * Implementation of the certificates in the digital form of limited products.
 */
contract Limited {
    
    // Sneakers characteristics
    uint public numOfItems;
    string[] itemName;
    string[] itemColor;
    uint[] itemSize;
    string[] itemDescription;
    uint[] itemYear;
    uint[] itemBeliveryVolume;
    uint[] itemPrice;
    
    // Dictionary of sneakers id - certificate's owner
    mapping (uint => address) public owners;
    
    // Check is sneakers id in range of number of sneakers
    modifier isInRange(uint id) {
        require(id >= 0 && id < numOfItems);
        _;
    }
    
    /**
     * @dev Constructor to set all sneakers characteristics.
     */
    function Limited() public {
        numOfItems = 3;
        
        for (uint i = 0; i < numOfItems; i++) {
            owners[i] = msg.sender;
        }
        
        itemName = ["Adidas Yeezy Boost 350", "Adidas NMD", "Air Jordan 11"];
        itemSize = [38, 44, 45];
        itemColor = ["#BBBBBB", "#F1CD43", "#8F9294"];
        itemDescription = ["The official collaboration sneaker by Kanye West and Adidas.",
            "The NMD, adidas Originals’ new kid on the block, has quickly gained a very solid footing in the sneaker world.",
            "Air Jordan is a brand of basketball footwear and athletic clothing produced by Nike."];
        itemYear = [2017, 2018, 2016];
        itemBeliveryVolume = [200, 300, 100];
        itemPrice = [1000, 1200, 1500];
    }
    
    /**
     * @dev Get item name.
     * @param item uint256 item id.
     * @return string Name of the item.
     */
    function getItemName(uint item) constant public isInRange(item) returns(string) {
        return itemName[item];
    }
    
    /**
     * @dev Get item size.
     * @param item uint256 item id.
     * @return uint256 Size of the item.
     */
    function getItemSize(uint item) constant public isInRange(item) returns(uint) {
        return itemSize[item];
    }
    
    /**
     * @dev Get item color.
     * @param item uint256 item id.
     * @return string Hex value of color of the item.
     */
    function getItemColor(uint item) constant public isInRange(item) returns(string) {
        return itemColor[item];
    }
    
    /**
     * @dev Get item description.
     * @param item uint256 item id.
     * @return string Full description of the item.
     */
    function getItemDescription(uint item) constant public isInRange(item) returns(string) {
        return itemDescription[item];
    }
    
    /**
     * @dev Get item year.
     * @param item uint256 item id.
     * @return uint256 Sneakers year.
     */
    function getItemYear(uint item) constant public isInRange(item) returns(uint) {
        return itemYear[item];
    }
    
    /**
     * @dev Get item belivery volume.
     * @param item uint256 item id.
     * @return uint256 Volume of the snekers issue.
     */
    function getItemBeliveryVolume(uint item) constant public isInRange(item) returns(uint) {
        return itemBeliveryVolume[item];
    }
    
    /**
     * @dev Get item price.
     * @param item uint256 item id.
     * @return uint256 Price of the snekers.
     */
    function getItemPrice(uint item) constant public isInRange(item) returns(uint) {
        return itemPrice[item];
    }
    
    /**
     * @dev Get all snekers id, which address has.
     * @param ownerAddress address owner of the snekers.
     * @return uint256[] id's snekers, which owns the owner.
     */
    function getItemsOfAddress(address ownerAddress) constant public returns(uint[]) {
        uint[] myItems;
        
        for (uint i = 0; i < numOfItems; i++) {
            if (owners[i] == ownerAddress) {
                myItems.push(i);
            }
        }
        
        return myItems;
    }
    
    /**
     * @dev Transfer of rights to crossovers to another account
     * if your are the owner of account from which to send.
     * @param newOwner address of the new owner.
     * @param item uint256 item id.
     * @return bool Status of the transfer.
     */
    function transferRights(address newOwner, uint item) public returns(bool) {
        if (owners[item] == msg.sender) {
            owners[item] = newOwner;
            return true;
        }
        
        return false;
    }
    
}
