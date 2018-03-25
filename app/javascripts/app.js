import "../stylesheets/app.css";

import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

import records_artifacts from '../../build/contracts/Records.json'

var Records = contract(records_artifacts);


window.get = function() {
  console.log("hlele");
}

/**
 * Add data to the Blockchain.
 */
 window.addToBlockchain = function() {
    // Get values to save.
    let firstName = $("#firstName").val();
    let secondName = $("#lastName").val();
    let amount = $("#amount").val();

    // Save data to the database.
    let record_id = saveToDatabase(firstName, secondName, amount);

    // Read data from the database.
    let [db_firstName, db_secondName, db_amount] = getDataFromDatabase(record_id);

    // Get hash 
    let data = db_firstName.toString() + db_secondName.toString() + db_amount.toString();
    
    const sha256 = require('js-sha256').sha256;
    let hash = sha256(data);
    hash = "0x" + hash;
    console.log("Hash: " + hash);

    // Add hash to the hash table in the blockchain.
    putHashToBlockchain(hash);
 }

 let isPaused = false;
 let hash = "0x0";
 let id = 0;

 function putHashToBlockchain(hash) {

  console.log("Hast to be in the blockchain: " + hash);

  try {
    // start transaction
    $("#input-sector").css("display", "none");
    $("#loading-sector").css("display", "block");

  Records.deployed().then(function(contractInstance) {
    contractInstance.pushToColumn(0, hash, {gas: 140000, from: web3.eth.accounts[0]}).then(function() {
      return contractInstance.pushToColumn.call(0, hash).then(function(v) {
        // transaction confirmed
        $("#loading-sector").css("display", "none");
        $("#output-sector").css("display", "block");

      });
    });
  });
  } catch (err) {
    console.log(err);
  }
}

/**
 * Save data to the database.
 */
function saveToDatabase(firstName, secondName, amount) {
    console.log("Save data to the database ...");

    let record_id = 3;

    return record_id;
}

/**
 * Get data from the database.
 */
function getDataFromDatabase(id) {
    let firstName = "Adolf";
    let secondName = "Gitler";
    let amount = "125";

    return [firstName, secondName, amount];
}

/**
 * Get hash from the blockchain.
 */
window.get = function(id) {
  Records.setProvider(web3.currentProvider);
  Records.deployed().then(function(contractInstance) {
    contractInstance.get.call(0, id).then(function(v) {
      console.log(v.toString());
      $("input[name=hash-in-blockchain]").val(v.toString().split(",")[0]);
    });
  })
}

/**
 * Update data in the database and hash in the blockchain
 */
window.startUpdating = function() {
  // Get values to save.
  let firstName = $("#firstName").val();
  let lastName = $("#lastName").val();
  let amount = $("#amount").val();

  // Update data in the database.

  // Read data from the database.
  let record_id = 0;
  let [db_firstName, db_secondName, db_amount] = getDataFromDatabase(record_id);

  // Get hash 
  let data = db_firstName.toString() + db_secondName.toString() + db_amount.toString();
  
  const sha256 = require('js-sha256').sha256;
  let hash = sha256(data);
  hash = "0x" + hash;
  console.log("Updated Hash: " + hash);

  // Add hash to the hash table in the blockchain.
  let table_id = 0;
  updateHashInTheBlockchain(hash, table_id);
}

function updateHashInTheBlockchain(hash, table_id) {
  console.log("Hast to be updated in the blockchain: " + hash);

  try {
    // start transaction
    $("#input-sector").css("display", "none");
    $("#loading-sector").css("display", "block");

    Records.deployed().then(function(contractInstance) {
      contractInstance.changeData(0, table_id, hash, {gas: 140000, from: web3.eth.accounts[0]}).then(function() {
        return contractInstance.changeData.call(0, table_id, hash).then(function(v) {
          // transaction complited.
          $("#loading-sector").css("display", "none");
          $("#output-sector").css("display", "block");
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
    window.web3 = new Web3(web3.currentProvider); // Use Mist/MetaMask's provider
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  // Call function, when page loaded.
  Records.setProvider(web3.currentProvider);
    Records.deployed().then(function(contractInstance) {
      contractInstance.numOfColumns.call().then(function(v) {
        $("#numOfColumns").html(v.toString());
      });
    })
});
