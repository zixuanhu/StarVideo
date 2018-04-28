import * as videoUtil from "../utils/videoUtil";

const defaultState = {
    video: {}
};

const videoReducer = (state = defaultState, action) => {
    Object.freeze(state);
    let video;
    switch (action.type) {
        case videoUtil.UPDATE_VIDEO:
            video = action.video;
            const newVideoState = Object.assign({}, state, {
                video: video
            });
            return newVideoState;
        default:
            return state;
    }
};

export default videoReducer;
