let rooms = {
    mainStreet182: {
        description: "182 Main St.\nYou are standing on Main Street between Church and South Winooski.\nThere is a door here. A keypad sits on the handle.\nTaped to the inside of the door is a handwritten sign.\nWhat do you want to do?",
        canChangeTo: ["foyer"],
        actions: {
            readSign: {
                inputs: ["read sign", "read sign!", "read sign.", "read", "read!", "read.", "view sign", "view sign"],
                result: "The sign says \"Welcome to Burlington Code Academy! Come on up to the second floor. If the door is locked, use the code \'12345\'.\""
            },
            openDoor: {
                inputs: ["open door", "open door!", "open door.", "open", "open!", "open."],
                result: "The door is locked. There is a keypad on the door handle."
            },
            takeSign: {
                inputs:["take sign", "take sign!", "take sign.", "take"],
                result: "That would be selfish. How will other students find their way?"
            },
            exitFunction: {
                inputs: ["exit", "end game", "end", "STOP THE MADNESS"],
                result: "Awww, we're sorry to see you go. Come back soon!"
            },
            lickDoor: {
                inputs: ["lick door", "lick", "be disgusting"],
                result: "You lick the door. Nothing happens. You give up and return home... only to find days later that you have a high fever. You start convulsing, and are taken to the hospital. You spend twenty days there, racking up medical bills beyond the value of your house. You die.\nDo you want to try again?"
            }, 
            codeRegEx: /12345/,
            numRegEx: /\d/g 
        }
    },
    foyer: {
        description: "You are in a foyer. Or maybe it's an antechamber. Or a vestibule. Or an entryway. Or an atrium. Or a narthex. But let's forget all that fancy flatlander vocabulary, and just call it a foyer. In Vermont, this is pronounced \"FO-ee-yurr\".\nA copy of Seven Days lies in a corner.\nWhat do you want to do?",
        canChangeTo: ["mainStreet182"],
        actions: {
            takePaper: {
                inputs: ["take paper", "take seven days", "open seven days", "seven days"],
                result: "You pick up the paper and leaf through it looking for comics and ignoring the articles, just like everybody else does.\nYou have now added Seven Days to your inventory. Type 'inventory' at any time to see what items are in your inventory."
            },
            goBack: {
                inputs: ["go back", "turn around", "leave", "leave room"]
            }
        }
    }
};

let roomInventory = {
    mainStreet182: [],
    foyer: ["Seven Days"],
    stairs: ["granola"],
    mainStreetSidewalk: ["Canadian quarter"]
};

let currentInventory = ["meep morp"];

let userInventory = {
    checkInventoryInputs: ["check inventory", "inventory", "log inventory", "i"],
    takeItemInputs: ["take", "take item", "pick up"],
    dropItemInputs: ["drop", "drop item"],
};

function takeItem(item) {
    if (currentInventory.includes(item)) {
        console.log("You already have " + item)
    } else {
    let itemIndex = roomInventory[currentRoom].indexOf(item);
    roomInventory[currentRoom].splice(itemIndex, 1);
    currentInventory.push(item);
    }
};

//let itemNames = ["Seven Days", "granola", "Canadian quarter"]

let currentInput;

let currentRoom = "mainStreet182";

function playGame() {
    console.log(rooms[currentRoom].description);
    process.stdin.on('data', (chunk) => {
        //console.log("inside playGame, at the start of process.stdin.on(). current room: " + currentRoom);
        let userInput = chunk.toString().trim().toLowerCase();
        currentInput = userInput;
        let words = currentInput.split(' ');
        let action = words.shift();
        let object = words.join(' ');
        if (roomInventory[currentRoom].includes(object)) {
            if (action === "take") {
                takeItem(object);
            }
        } else if (userInventory.checkInventoryInputs.includes(currentInput)) {
            console.log("You are carrying:\n" + currentInventory.join("\n"));
        } else if (currentRoom === "mainStreet182") {
            //Inside playGame, about to call mainStreet182().
            mainStreet182();
        } else if (currentRoom === "foyer") {
            //Inside playGame, about to call foyer().
            foyer();
        }
    });
}

function changeRoom(nextRoom) {
    let validTransitions = rooms[currentRoom].canChangeTo;
    if (validTransitions.includes(nextRoom)) {
        currentRoom = nextRoom;
        console.log("you have moved to " + currentRoom);
        console.log(rooms[currentRoom].description);
    } else { 
        console.log("You cannot go to " + nextRoom + " from " + currentRoom + ".");
    }
};

function mainStreet182() {
    let mainStreet182Actions = rooms.mainStreet182.actions;
    let numArray = currentInput.match(mainStreet182Actions.numRegEx);
    let numBer;
    if (numArray) {
        numBer = Number(numArray.join(""));
    }
    if (mainStreet182Actions.readSign.inputs.includes(currentInput)) {
        console.log(mainStreet182Actions.readSign.result);
    } else if (mainStreet182Actions.openDoor.inputs.includes(currentInput)) { 
        console.log(mainStreet182Actions.openDoor.result);
    } else if (mainStreet182Actions.takeSign.inputs.includes(currentInput)) {
        console.log(mainStreet182Actions.takeSign.result);
    } else if (mainStreet182Actions.lickDoor.inputs.includes(currentInput)) {
        console.log(mainStreet182Actions.lickDoor.result);
        process.exit();
    } else if (typeof numBer === "number" && numBer !== 12345) { 
        console.log("Bzzzzt! The door is still locked.");
    } else if (currentInput.match(mainStreet182Actions.codeRegEx)) {
        console.log("Success! The door opens. You enter the foyer and the door shuts behind you.");
        changeRoom("foyer");
    } else if (mainStreet182Actions.exitFunction.inputs.includes(currentInput)) {
        console.log(mainStreet182Actions.exitFunction.result);
        process.exit();
    } else {
        console.log("Sorry, I don't understand " + currentInput + ".");
    }
}

function foyer() {
    let foyerActions = rooms.foyer.actions;
    if (foyerActions.takePaper.inputs.includes(currentInput)) {
        takeItem("Seven Days");
        console.log(foyerActions.takePaper.result);
    } else if (foyerActions.goBack.inputs.includes(currentInput)) {
        changeRoom("mainStreet182");
    } else {
        console.log("Sorry, I don't understand " + currentInput + ".");
    }

}

playGame();