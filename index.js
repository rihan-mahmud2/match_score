const initialState = [
  {
    id: 1,
    value: 0,
  },
];

function addMatch(state, action) {
  if (action.type === "add") {
    return [
      ...state,
      {
        id: state.length - 1,
        value: 0,
      },
    ];
  } else return [...state];

  // if(action.type === "remove") {
  //   return [
  //     ...state,
  //     {
  //       id: state.length - 1,
  //       value: 0,
  //     }
  //   ]
  // }
}

