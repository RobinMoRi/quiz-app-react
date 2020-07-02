import { SET_DIFFICULTY } from "../actions/actionTypes";

const initialState = {
    difficulty: null
  };

const reducer = (state = initialState, action) => {
    switch(action.type){
        case SET_DIFFICULTY:
            return{
                ...state,
                difficulty: action.difficultyLevel
            }
        default:
            return state;
    }
}

export default reducer;