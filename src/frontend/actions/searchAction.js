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

export const updateVimeo = (videos, page) => {
    return {
        type: searchApiUtil.UPDATE_VIMEO,
        videos,
        page
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

export const fetchVimeo = (keywords, page) => {
    return dispatch => {
        return searchApiUtil.vimeoSearch(keywords, page).then(res => {
            const videos = res;
            dispatch(updateVimeo(videos, page));
        });
    };
};
export const fetchRelatedVimeo = video_id => {
    return dispatch => {
        return searchApiUtil.vimeoRelatedSearch(video_id).then(res => {
            // debugger;
            const videos = res;

            dispatch(updateVimeo(videos));
        });
    };
};

// const dispatch = trigger()
