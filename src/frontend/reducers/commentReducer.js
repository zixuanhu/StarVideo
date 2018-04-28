import * as commentUtil from "../utils/commentUtil";

const defaultState = {
    comments: []
};

const openPlayerReducer = (state = defaultState, action) => {
    Object.freeze(state);
    let comments;
    switch (action.type) {
        case commentUtil.UPDATE_Comment:
            comments = action.video;
            const newCommmentState = Object.assign({}, state, {
                comments: comments
            });
            return newCommmentState;
        default:
            return state;
    }
};

export default openPlayerReducer;
