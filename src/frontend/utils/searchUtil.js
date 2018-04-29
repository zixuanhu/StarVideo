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

export const vimeoSearch = keywords => {
    axios.defaults.headers.common["Authorization"] =
        "bearer 7a9fd5a833dd4d05a1832ce02f577b07";
    const url = "https://api.vimeo.com/videos";
    const params = {
        query: keywords
    };
    return axios.get(url, { params }).then(response => {
        return response.data.data;
    });
};

// https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyDrpMSpOKrlS3g8FnOQfur2YXGVZJtjTAg&q=ibaza&type=video&maxResults=3&order=viewCount&pageToken=CAoQAA
