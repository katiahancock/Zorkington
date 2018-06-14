let states = {
    "green": {canChangeTo: ["yellow"]},
    "yellow": {canChangeTo: ["red"]},
    "red": {canChangeTo: ["green"]}
  }
  
  let currentState = "green";
  
  function enterState(newState) {
    let validTransitions = states[currentState].canChangeTo;
    if (validTransitions.includes(newState)) {
      currentState = newState;
    } else {
      throw "Invalid state transition attempted - from " + currentState + " to " + newState;
    }
  }
enterState("yellow")
console.log(currentState)