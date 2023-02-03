const initialState = {
  owner: {}
};

export const setOwner = (owner) => ({
    type: 'SET_OWNER',
    payload: owner
});

export const resetOwnerState = () => ({
  type: 'RESET_STATE'
});

const ownerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_OWNER':
      return {
        ...state,
        owner: action.payload
      };
    case 'RESET_STATE':
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export default ownerReducer;