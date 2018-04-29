import * as searchApiUtil from "../utils/searchUtil";

export const updateVideos = (
    videos,
    nextPageToken,
    prePageToken,
    relatedToVideoId
) => {
    return {
        type: searchApiUtil.UPDATE_VIDEOS,
        videos,
        nextPageToken,
        prePageToken,
        relatedToVideoId
    };
};

export const updateVimeo = videos => {
    return {
        type: searchApiUtil.UPDATE_VIMEO,
        videos
    };
};

export const fetchVideos = (keywords, pageToken, relatedToVideoId) => {
    return dispatch => {
        return searchApiUtil
            .youtubeSearch(keywords, pageToken, relatedToVideoId)
            .then(response => {
                const videoItems = response.data.items;
                const nextPageToken = response.data.nextPageToken;
                const prePageToken = response.data.prevPageToken;
                dispatch(
                    updateVideos(
                        videoItems,
                        nextPageToken,
                        prePageToken,
                        relatedToVideoId
                    )
                );
            });
    };
};

export const fetchVimeo = keywords => {
    return dispatch => {
        return searchApiUtil.vimeoSearch(keywords).then(res => {
            // debugger;
            const videos = res;
            dispatch(updateVimeo(videos));
        });
    };
};

// const dispatch = trigger()
