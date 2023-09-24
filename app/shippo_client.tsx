export var shippo = require('shippo')(process.env.SHIPPO_API_KEY);
export var addressFrom  = {
    "name": "Martynas Miliauskas",
    "street1": process.env.SHIPPO_SENDER_STREET,
    "city": process.env.SHIPPO_SENDER_CITY,
    "state": "",
    "zip": process.env.SHIPPO_SENDER_ZIP,
    "country": "SE"
};
export var carrierAccount = (shippo.carrieraccount.create({
    "carrier": "ups",
    "account_id": process.env.SHIPPO_UPS_ACCID, // UPS user ID
    "parameters": {
        "password": process.env.SHIPPO_UPS_PASS, // UPS password
        "account_number": "FG8217" // UPS account number
    }, 
    "test":true,
    "active":true
})).objectID;
