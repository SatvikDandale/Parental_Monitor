// SCRIPT FOR FIREBASE
var flag_for_sync = false;
var flag_for_update = false;

var config = {
    apiKey: "AIzaSyC5VDpdFZVH3OuzN_sbnMAiMIq9gac39WQ",
    authDomain: "chrome-extension-83331.firebaseapp.com",
    databaseURL: "https://chrome-extension-83331.firebaseio.com",
    projectId: "chrome-extension-83331",
    storageBucket: "chrome-extension-83331.appspot.com",
    messagingSenderId: "911483901445",
    appId: "1:911483901445:web:8c4577a3f06d59c7006e6c"
};
const app = firebase.initializeApp(config);

// Get today's date:
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = dd + '/' + mm + '/' + yyyy;

// CREATE REFERENCE
const db = firebase.database().ref().child('Internet Usage').child(yyyy).child(mm).child(dd);
// This will create a new Node
db.once('value', function(snap){
    temp_dict = (snap.val());
    flag_for_sync = true;
});

// Add to the child
function UpdateInfo(obj){
    if (flag_for_sync){
        // Compare the snap with the updated dictionary
        //console.log("Temp Dict is", temp_dict);
        if (flag_for_update === false){ // We only have to update temp_dict with obj once
            for(var website in obj){
                if (temp_dict !== null && temp_dict[website] !== undefined){  // If the website is already in temp_dict, just add previous time of temp_dict to current obj dict.
                    obj[website] += temp_dict[website]
                }
                flag_for_update = true; // We only have to update temp_dict with obj once
            }
        }

        //console.log(obj);
        db.update(obj);
    }
}
/*

    1. After every predefined interval, update the firebase with the dictionary of tabs.

*/