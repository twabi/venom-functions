const admin = require("firebase-admin");
const functions = require("firebase-functions");

admin.initializeApp();

exports.deleteUser = functions.https.onRequest(async (request, response) => {
        response.set("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Headers",
            "Content-Type, Access-Control-Allow-Headers, " +
            "Authorization, X-Requested-With");
        response.set("Access-Control-Allow-Methods", "GET, POST");

        if (request.method === "OPTIONS") {
            // stop preflight requests here
            response.status(204).send("");
            return;
        }
        const userID = request.body.uid;

        admin.auth().deleteUser(userID).then(()=>{
            console.log("successfully deleted user");
            response.status(200).send("User Deleted");
        }).catch((error) => {
            console.log("unable to delete user");
            response.status(500).send("Failed to delete User : " + error.message);
        });
    });


exports.getUserDetails = functions.https.onRequest(
    async (request, response) => {
        response.set("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Headers",
            "Content-Type, Access-Control-Allow-Headers, " +
            "Authorization, X-Requested-With");
        response.set("Access-Control-Allow-Methods", "GET, POST");

        if (request.method === "OPTIONS") {
            // stop preflight requests here
            response.status(204).send("");
            return;
        }
        const userID = request.body.uid;

        admin.auth().getUser(userID)
            .then((userRecord) => {
                console.log(`Successfully fetched user data: 
            ${userRecord.toJSON()}`);
                response.status(200).send(userRecord.toJSON());
            })
            .catch((error) => {
                console.log("Error fetching user data:", error);
                response.status(500).send("Failed to get User : " + error.message);
            });
    });
