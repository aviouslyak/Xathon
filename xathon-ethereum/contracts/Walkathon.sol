// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract XathonFactory {
    struct KeyMapping {
      mapping(string => Xathon) map; 
      string[] keys; 
    }

    KeyMapping private deployedXathons; 
    mapping(string => bool) public takenNames; 
    
    function deployXathon(address to, uint minimum, string memory unit, string memory name, string memory description) public {
        require(!takenNames[name], "Name cannot be taken");
        Xathon newXathon = new Xathon(to, minimum, unit, name, description); 
        takenNames[name] = true; 
        
        deployedXathons.map[name] = newXathon; 
        deployedXathons.keys.push(name); 
    }
    
    function getDeployedXathons() public view returns (string[] memory) {
        return deployedXathons.keys; 
    }

    function getAddress(string memory name) public view returns (Xathon) {
      require(takenNames[name], "Contract with name must exist"); 
      return deployedXathons.map[name];
    }
}

contract Xathon {

  struct Donation {
    uint maxValue;
    uint valuePerUnit;
    uint paid;
  }

  struct KeyMapping {
    mapping(address => Donation) map;
    address[] keys;
  }

  address public recipient;
  string public xathonName;
  string public xathonDescription; 

  // the minimum amount of units a contributor must pay for
  uint public minimumUnitDeposit;
  uint public donationPerUnit; 
  string public xathonUnit; 
  KeyMapping private donations;
                 

  event MoneyToClaim(address claimer, uint remaining);
  
  constructor(address to, uint minimum, string memory unit, string memory name, string memory description){
    minimumUnitDeposit = minimum;
    recipient = to;
    xathonName = name; 
    xathonDescription = description;
    xathonUnit = unit;
    donationPerUnit = 0; 
  }

  function contribute(uint valuePerUnit) public payable {
    // require to pay for at least minimumUnitDeposit amount of units
    require(valuePerUnit * minimumUnitDeposit <= msg.value, "Must pay for a minimum amount of units");
    donations.map[msg.sender] = Donation({
      maxValue: msg.value,
      valuePerUnit: valuePerUnit,
      paid: 0
    });
    donations.keys.push(msg.sender);
    donationPerUnit += valuePerUnit; 
  }

  function pay(Donation storage d, uint walked) private {
    require(msg.sender == recipient);
    uint toPay = d.valuePerUnit * walked;
    if (toPay > d.maxValue) {
      toPay = d.maxValue;
 
    }
    (bool sent, ) = recipient.call{value: toPay}("");
    d.paid = toPay;
    donationPerUnit -= d.valuePerUnit; 
    require(sent, "Ether failed to send");
    if (toPay < d.maxValue) {
      emit MoneyToClaim(msg.sender, d.maxValue - toPay);
    }
  }

  function collectFunds(uint walked) public {
    require(msg.sender == recipient, "Only the recipient can collect the funds");
    for (uint i = 0; i < donations.keys.length; i++) {
      pay(donations.map[donations.keys[i]], walked);
    }
  }

  function claimUnspentFunds() public {
    Donation storage donation = donations.map[msg.sender];
    uint remainingToPay = donation.maxValue - donation.paid;
    require(remainingToPay > 0, "Must have remaining money to collect");
    (bool sent, ) = msg.sender.call{value: remainingToPay}("");
    require(sent, "Ether failed to send");
  }
}
