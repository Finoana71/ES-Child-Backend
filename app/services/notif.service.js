var admin = require("firebase-admin");

var serviceAccount = require("./../../config/firebase.json");

admin.initializeApp({
  	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://prismappfcm.firebaseio.com"
});
var topic = 'general';

function envoyerMessage(cours){
    var message = {
        notification: {
            title: 'Nouveau cours',
            body: 'Un nouveau cours a été ajouté, ce cours c\'est "' + cours.titre + '"'
        },
        topic: topic
    };
    
    // Send a message to devices subscribed to the provided topic.
    admin.messaging().send(message)
    .then((response) => {
        // Response is a message ID string.
        console.log('Successfully sent message:', response);
    })
    .catch((error) => {
        console.log('Error sending message:', error);
    });
}

module.exports = {
    envoyerMessage
}
    