const initialState = {
  solarData: [{}]
};

export const setSolarData = (solarData) => ({
  type: 'SET_SOLAR_DATA',
  payload: solarData
});

export const resetSolarState = () => ({
  type: 'RESET_STATE'
});

const solarReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SOLAR_DATA':
      return {
        ...state,
        solarData: action.payload
      };
    case 'RESET_STATE':
      return {
        ...initialState
    };
    default:
      return state;
  }
};

export default solarReducer;