let rooms = {
    startRoom: {
        description
        canChangeTo: ["foyer"],
        actions: {
            readSign: {
                inputs: ["read sign", "read sign!", "read sign.", "read", "read!", "read."],
                result: "The sign says \"Welcome to Burlington Code Academy! Come on up to the second floor. If the door is locked, use the code \'12345\'.\""
            openDoor: ["open door", "open door!", "open door.", "open", "open!", "open."],
            takeSign: ["take sign", "take sign!", "take sign.", "take"],
            exitFunction: ["exit", "end game", "end", "STOP THE MADNESS"],
            lickDoor: ["lick door", "lick", "be disgusting"],
            codeRegEx: /12345/,
            numRegEx: /\d/g 
        }
    },
    foyer: {
        canChangeTo: ["startRoom"], 
    }
};

// function findAction(input) {
//     for (let action in currentRoom.actions) {
//         let inputs = currentRoom.actions[action]
//         if (inputs.includes(currentInput)) {
//         } else { 
        
//         }
//     }
// }

let currentInput;

let currentRoom = "startRoom";

function changeRoom(nextRoom) {
    let validTransitions = rooms[currentRoom].canChangeTo;
    if (validTransitions.includes(nextRoom)) {
        currentRoom = nextRoom;
    } else { 
        throw ("You can't get to " + nextRoom + " from " + currentRoom + " right now.");
    }
};

function startGame() {
    let roomDescription = "182 Main St.\nYou are standing on Main Street between Church and South Winooski.\nThere is a door here. A keypad sits on the handle.\nTaped to the inside of the door is a handwritten sign.\nWhat do you want to do?"
    console.log(rooms[currentRoom].description);
    process.stdin.on('data', (chunk) => {
        let userInput = chunk.toString().trim().toLowerCase();
        let numArray = userInput.match;(rooms.startRoom.input.numRegEx);
        let numBer;
        currentInput = userInput;
        if (currentRoom === "startRoom") {
            startRoom();
        } else if (currentRoom === "foyer") {
            foyer();
    }
    });
}

function startRoom() {
    if (actions.numArray) {
        numBer = Number(actions.numArray.join(""));
    }
    if (actions.readSign.includes(currentInput)) {
        console.log(actions.readSign.result);
    } else if (actions.openDoor.includes(currentInput)) { 
        console.log("The door is locked. There is a keypad on the door handle.");
    } else if (actions.takeSign.includes(currentInput)) {
        console.log("That would be selfish. How will other students find their way?");
    } else if (actions.lickDoor.includes(currentInput)) {
        console.log("You lick the door. Nothing happens. You give up and return home... only to find days later that you have a high fever. You start convulsing, and are taken to the hospital. You spend twenty days there, racking up medical bills beyond the value of your house. You die.\nDo you want to try again?");
        process.exit();
    //} else if (enterCode.includes(userInput)) {
    } else if (typeof actions.numBer === "number" && actions.numBer !== 12345) { 
        console.log("Bzzzzt! The door is still locked.");
    } else if (currentInput.match(actions.codeRegEx)) {
        console.log("Success! The door opens. You enter the foyer and the door shuts behind you.");
        changeRoom("foyer");
    } else if (actions.exitFunction.includes(currentInput)) {
        console.log("Awww, we're sorry to see you go. Come back soon!");
        process.exit();
    } else {
        console.log("Sorry, I don't know how to " + currentInput + ".");
    }
}

startGame();

function foyer() {
    console.log("You are in a foyer. Or maybe it's an antechamber. Or a vestibule. Or an entryway. Or an atrium. Or a narthex. But let's forget all that fancy flatlander vocabulary, and just call it a foyer. In Vermont, this is pronounced \"FO-ee-yurr\".\nA copy of Seven Days lies in a corner.\nWhat do you want to do?")
    // process.stdin.once('data', (chunk) => {
    // let userInput = chunk.toString().trim().toLowerCase();
    // console.log("zeep zorp") })
}