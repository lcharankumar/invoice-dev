const ArabicReducer = (state, action) => {
  switch (action.type) {
    case "ARABIC": {
      return {
        arabic: true,
      };
    }
    case "ENGLISH": {
      return {
        arabic: false,
      };
    }
    case "TOGGLE": {
      return {
        arabic: !state.arabic,
      };
    }
    default:
      return state;
  }
};

export default ArabicReducer;
