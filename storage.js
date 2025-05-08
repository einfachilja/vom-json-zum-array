let users = [];
const BASE_URL = "https://remotestorage-82664-default-rtdb.europe-west1.firebasedatabase.app/";

async function onloadFunc() {
    let userResponse = await getAllUsers("namen");
    let userKeysArray = Object.keys(userResponse);

    for (let index = 0; index < userKeysArray.length; index++) {
        users.push(
            {
                id: userKeysArray[index], // aus dem object die keys holen und in keys schreiben
                user: userResponse[userKeysArray[index]], // in user kommt an der id aus dem array der wert rein
            }
        )
    }

    // übergabe der neuen einträge z.B: Peter an die datenbank
    await addEditSingleUser(users[2].id, { name: "Peter" })
    console.log(users);
}

// function zum updaten in der datenbank
async function putData(path = "", data = {}) { // in den angegebenen Pfad wird die neue data übergeben
    let response = await fetch(BASE_URL + path + ".json", { // am Ende der url nach .json fragen, sonst gehts nicht!
        method: "PUT", // methode PUT "updaten" vorhandener Daten wird angewandt
        header: {   // header muss mitgegeben werden, z.B. dass es sich um json handelt
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)  // im body wird die eigentliche Datei mitgegeben bzw. inhalt
    });
    return responseJson = await response.json(); // notwendig, damit die function loadData() auch etwas zurückmeldet
}

// aufrufen der function inkl. übergabe parameter um in der datenbank updaten
async function addEditSingleUser(id = 44, user = { name: "Adam" }) {
    putData(`namen/${id}`, user);
}

// aus der datenbank laden
async function getAllUsers(path) {
    let response = await fetch(BASE_URL + path + ".json");
    return responseToJson = await response.json();
}



