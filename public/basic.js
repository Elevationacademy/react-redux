main();

var store;
function main() {
  // Create store
  store = Redux.createStore(counterReducer);

  // subscribe handler
  store.subscribe(updateCounter);

  // initialize the app
  store.dispatch({type: 'INIT'});
}

// Reducer
function counterReducer(state = 0, action) {
  switch(action.type) {
    case 'INCREMENT':
      return state + 1;
      break;
    case 'DECREMENT':
      return state - 1;
      break;
    default:
      return state;
  }
}

// Action Dispatcher 1
function increment() {
  store.dispatch({type: 'INCREMENT'});
}

// Action Dispatcher 2
function decrement() {
  store.dispatch({type: 'DECREMENT'});
}

// Dispatch Handler
function updateCounter() {
  document.getElementById('counter').value = store.getState();
}
