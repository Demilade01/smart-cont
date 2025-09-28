// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SimpleStorage {
    uint256 private storedData;
    address public owner;

    event DataStored(uint256 indexed value, address indexed setter);

    constructor() {
        owner = msg.sender;
    }

    function set(uint256 x) public {
        storedData = x;
        emit DataStored(x, msg.sender);
    }

    function get() public view returns (uint256) {
        return storedData;
    }

    function getOwner() public view returns (address) {
        return owner;
    }
}

