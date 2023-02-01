const initialState = {
    solarData: [{}],
  };
  
  export const setSolar = (solar) => ({
      type: 'SET_OWNER',
      payload: solar
  });
  
  export const resetSolarState = () => ({
    type: 'RESET_STATE'
  });
  
  const solarReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_SOLAR':
        return {
          ...state,
          solarData: action.payload
        };
      case 'RESET_STATE':
        return {
          ...initialState
        }
      default:
        return state;
    }
  };
  
  export default solarReducer;