import * as commentUtil from "../utils/commentUtil";

export const updateComment = video => {
    return {
        type: commentUtil.UPDATE_Comment,
        video
    };
};

export const getComment = videoId => {
    return dispatch => {
        return commentUtil.getComment(videoId).then(response => {
            const comment = response.data.items;
            dispatch(updateComment(comment));
        });
    };
};
