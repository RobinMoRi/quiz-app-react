import * as actionTypes from './actionTypes';

export const setDifficulty = (difficulty) => {
    return {
        type: actionTypes.SET_DIFFICULTY,
        difficultyLevel: difficulty
    }
}