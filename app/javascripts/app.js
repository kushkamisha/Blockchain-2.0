// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

import voting_artifacts from '../../build/contracts/Limited.json'

var Limited = contract(voting_artifacts);

// window.getItem = function(candidate) {
//   let candidateName = $("#item-id").val();
//   try {
//     // $("#msg").html("Vote has been submitted. The vote count will increment as soon as the vote is recorded on the blockchain. Please wait.")
//     // $("#candidate").val("");
     
//     Voting.deployed().then(function(contractInstance) {
//       contractInstance.voteForCandidate(candidateName, {gas: 140000, from: web3.eth.accounts[0]}).then(function() {
//         let div_id = candidates[candidateName];
//         return contractInstance.totalVotesFor.call(candidateName).then(function(v) {
//           $("#" + div_id).html(v.toString());
//           $("#msg").html("");
//         });
//       });
//     });
//   } catch (err) {
//     console.log(err);
//   }
// }

window.getItem = function() {
  let itemId = $("#item-id").val();
  console.log(itemId);

  // Get item name
  Limited.setProvider(web3.currentProvider);
  Limited.deployed().then(function(contractInstance) {
    contractInstance.getItemName.call(itemId).then(function(v) {
      $("#getItemName").html(v.toString());
    });
  })

  // Get item color
  Limited.setProvider(web3.currentProvider);
  Limited.deployed().then(function(contractInstance) {
    contractInstance.getItemColor.call(itemId).then(function(v) {
      $("#color-box").css("background", v);
    });
  })

  // Get item size
  Limited.setProvider(web3.currentProvider);
  Limited.deployed().then(function(contractInstance) {
    contractInstance.getItemSize.call(itemId).then(function(v) {
      $("#size-" + v).css("color", "black").css("border", "1px solid black");
    });
  })

  // Get item description
  Limited.setProvider(web3.currentProvider);
  Limited.deployed().then(function(contractInstance) {
    contractInstance.getItemDescription.call(itemId).then(function(v) {
      $("#getItemDescription").html(v.toString());
    });
  })

  // Get item year
  Limited.setProvider(web3.currentProvider);
  Limited.deployed().then(function(contractInstance) {
    contractInstance.getItemYear.call(itemId).then(function(v) {
      $("#getItemYear").html("Year: " + v.toString());
    });
  })

  // Get item belivery volume
  Limited.setProvider(web3.currentProvider);
  Limited.deployed().then(function(contractInstance) {
    contractInstance.getItemBeliveryVolume.call(itemId).then(function(v) {
      $("#getItemBeliveryVolume").html("Volume: " + v.toString());
    });
  })

  // Get item size
  Limited.setProvider(web3.currentProvider);
  Limited.deployed().then(function(contractInstance) {
    contractInstance.getItemPrice.call(itemId).then(function(v) {
      $("#getItemPrice").html("$" + v.toString());
    });
  })

  // Get owner of the item
  Limited.setProvider(web3.currentProvider);
  Limited.deployed().then(function(contractInstance) {
    contractInstance.owners.call(itemId).then(function(v) {
      $("#owners").html("Owner: " + v.toString());
    });
  })

}

window.getItemsOfAddress = function() {
  let address = String($("#ownerAddress").val());

  // Get items of address
  Limited.setProvider(web3.currentProvider);
  Limited.deployed().then(function(contractInstance) {
    contractInstance.getItemsOfAddress.call(address).then(function(v) {
      let arr = Array.from(v);
      let values = [];
      let counter = 0;

      arr.forEach(function(elem) {
          if (counter > 2) {
            values.push(elem.toString());
          }
          counter++;
      })

      console.log(values);

      let result = "";
      values.forEach(function(element) {
        console.log(element);
        result += element + " ";
      });
      $("#getItemsOfAddress").html(result);
    });
  })
}

window.transferRights = function() {
  let myAddress = $("#myAddress").val();
  let newAddress = $("#newAddress").val();
  let itemNumber = $("#itemNumber").val();
  console.log(myAddress);
  console.log(newAddress);
  console.log(itemNumber);

  try {
    $("#msg").html("Your action has been submitted. Centificate will change the owner as soon as your action is recorded on the blockchain. Please wait.")
    $("#transferRights").html("Waiting...");

    Limited.deployed().then(function(contractInstance) {
      contractInstance.transferRights(newAddress, itemNumber, {gas: 140000, from: myAddress}).then(function() {
        return contractInstance.transferRights.call(newAddress, itemNumber).then(function(v) {
          $("#transferRights").html("True");
          $("#msg").html("");
        });
      });
    });
  } catch (err) {
    console.log(err);
  }
}

$( document ).ready(function() {
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source like Metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  Limited.setProvider(web3.currentProvider);
    Limited.deployed().then(function(contractInstance) {
      contractInstance.numOfItems.call().then(function(v) {
        $("#numOfItems").html(v.toString());
      });
    })
});
