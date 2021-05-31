// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

contract Lottery {

    address public manager;
    address[] public players;
    address public winner;

    constructor() public {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value > .001 ether);

        players.push(msg.sender);
    }

    function random() private view returns(uint){
        return uint(keccak256(abi.encodePacked(block.difficulty, now, players.length)));
    }


    function pickWinner() public payable restricted {
        uint index = random() % players.length;
        winner = players[index];
        players = new address[](0);
    }

   
    function getPlayers() public view returns (address[] memory) {
        return players;
    }
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

}