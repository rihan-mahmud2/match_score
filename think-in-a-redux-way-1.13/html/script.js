let state;

const matchEl = document.getElementById("match-container");
const add_matchEl = document.getElementById("add_match");
const resetEl = document.getElementById("reset");
const initialState = [{ id: 1, name: "match 1", value: 0 }];

// return {
// ...state,
// counters: state.counters.map(counter=>{
// if(counter.id === theIdOfTheCounterYouWantToIncrease){
// return {...counter,value: counter.value + jotoBarateChan}
// }else{
// return counter
// }
// }

const INCREMENT = "increment";
const DECREMENT = "decrement";
const ADD = "add";
const RESET = "reset";

const increment = (value) => {
  return {
    type: INCREMENT,
    payload: value,
  };
};
const reset = () => {
  return {
    type: RESET,
  };
};
const add = (value) => {
  return {
    type: ADD,
    payload: value,
  };
};

const decrement = (value) => {
  return {
    type: DECREMENT,
    payload: value,
  };
};

function mathReducer(state = initialState, action) {
  if (action.type === ADD) {
    const updated = [...state];
    updated.push({
      id: action.payload,
      name: `Match ${state.length + 1}`,
      value: 0,
    });
    return updated;
  } else if (action.type === INCREMENT) {
    const updated = [...state];
    updated.map((el) => {
      console.log(el.id == parseInt(action.payload.id) - 1);
      if (el.id === parseInt(action.payload.id) - 1) {
        el.value = parseInt(action.payload.value) + el.value;
      }
    });

    return updated;
  } else if (action.type === DECREMENT) {
    const updated = [...state];
    state.map((el) => {
      if (el.id === action.payload.id) {
        el.value = el.value - parseInt(action.payload.value);
      }
    });

    return updated;
  } else if (action.type === RESET) {
    const updated = [...state];
    updated.map((el) => (el.value = 0));
    return updated;
  } else {
    return state;
  }
}

const store = Redux.createStore(mathReducer);
let id;
const render = () => {
  state = store.getState();
  // console.log(state);
  console.log(state);
  id = state.length + 1;
  const div = document.createElement("div");
  state?.map((el) => {
    div.classList.add("match");

    div.innerHTML = `<div class="wrapper">
    <button class="lws-delete">
      <img src="./image/delete.svg" alt="" />
    </button>
    <h3 class="lws-matchName">${el?.name}</h3>
  </div>
  <div class="inc-dec">
    <form class="incrementForm">
      <h4>Increment</h4>
      <input 
        id=${id}
        type="number"
        name="increment"
        class="lws-increment"
      />
    </form>
    <form  class="decrementForm">
      <h4>Decrement</h4>
      <input
        type="number"
        name="decrement"
        class="lws-decrement"
      />
    </form>
  </div>
  <div class="numbers">
    <h2 class="lws-singleResult">${el?.value}</h2>
  </div>`;
  });

  matchEl.appendChild(div);
};

render();

store.subscribe(render);

add_matchEl.addEventListener("click", (e) => {
  store.dispatch(add(id));
});

matchEl.onkeypress = function (e) {
  var key = e.charCode || e.keyCode || 0;
  if (key == 13) {
    e.preventDefault();
    matchEl.innerHTML = "";
    console.log(e.target.name);
    if (e.target.name === "increment") {
      store.dispatch(increment({ id: e.target.id, value: e.target.value }));
    } else {
      store.dispatch(decrement({ id: e.target.id, value: e.target.value }));
    }
  }
};

// resetEl.addEventListener("click", (e) => {
//   state.forEach((match) => {
//     store.dispatch(reset());
//   });
// });
