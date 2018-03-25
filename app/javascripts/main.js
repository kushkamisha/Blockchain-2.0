/**
 * Add data to the Blockchain.
 */
 window.addToBlockchain = function() {
    // Get values to save.
    let firstName = $("input[name=first-name]").val();
    let secondName = $("input[name=second-name]").val();
    let amount = $("input[name=amount]").val();

    // Save data to the database.
    let record_id = saveToDatabase(firstName, secondName, amount);

    // Read data from the database.
    let [db_firstName, db_secondName, db_amount] = getDataFromDatabase(record_id);

    // Get hash 
    let data = db_firstName.toString() + db_secondName.toString() + db_amount.toString();
    
    const sha256 = require('js-sha256').sha256;
    let hash = sha256(data);
    console.log("Hash: " + hash);

    // Add hash to the hash table in the blockchain.
    // putHashToBlockchain(hash);
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
    let amount = "50";

    return [firstName, secondName, amount];
}
