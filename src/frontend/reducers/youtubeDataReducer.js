import * as searchApiUtil from "../utils/searchUtil";

const defaultState = Object.freeze({
    videos: [],
    nextPageToken: "CBQQAA",
    prePageToken: "CBQQAA"
});

const youtubeDataReducer = (state = defaultState, action) => {
    Object.freeze(state);
    let videos = [],
        nextPageToken,
        prePageToken;
    switch (action.type) {
        case searchApiUtil.UPDATE_VIDEOS:
            videos = action.videos;
            nextPageToken = action.nextPageToken;
            prePageToken = action.prePageToken;
            return Object.assign({}, state, {
                videos: videos,
                nextPageToken: nextPageToken,
                prePageToken: prePageToken
            });
        default:
            return state;
    }
};

export default youtubeDataReducer;
