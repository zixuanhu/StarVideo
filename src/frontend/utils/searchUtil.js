import axios from "axios";
// 什么是ajax
export const UPDATE_VIDEOS = "UPDATE_VIDEOS";
export const UPDATE_VIMEO = "UPDATE_VIMEO";

export const youtubeSearch = (keywords, pageToken, relatedToVideoId) => {
    const url = "https://www.googleapis.com/youtube/v3/search";
    const params = {
        part: "snippet",
        key: "AIzaSyDrpMSpOKrlS3g8FnOQfur2YXGVZJtjTAg",
        q: keywords,
        type: "video",
        maxResults: 12,
        order: "viewCount",
        pageToken: pageToken,
        relatedToVideoId: relatedToVideoId
    };
    return axios.get(url, { params }).then(response => {
        return response;
    });
};

export const vimeoSearch = (keywords, page) => {
    axios.defaults.headers.common["Authorization"] =
        "bearer cfe32c79fd18d6fd6d3186253865fbcf";
    const url = `https://api.vimeo.com/videos?page=${page}&per_page=12&query=${keywords}&sort=comments`;

    return axios.get(url).then(response => {
        return response.data.data;
    });
};

export const vimeoRelatedSearch = video_id => {
    axios.defaults.headers.common["Authorization"] =
        "bearer cfe32c79fd18d6fd6d3186253865fbcf";
    const url = `https://api.vimeo.com/videos/${video_id}/videos?filter=related&per_page=12`;

    return axios.get(url).then(response => {
        return response.data.data;
    });
};
// https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyDrpMSpOKrlS3g8FnOQfur2YXGVZJtjTAg&q=ibaza&type=video&maxResults=3&order=viewCount&pageToken=CAoQAA
