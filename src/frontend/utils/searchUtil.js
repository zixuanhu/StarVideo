import axios from "axios";
// 什么是ajax
export const UPDATE_VIDEOS = "UPDATE_VIDEOS";

export const youtubeSearch = (keywords, pageToken, relatedToVideoId) => {
    console.log(relatedToVideoId);

    const url = "https://www.googleapis.com/youtube/v3/search";
    const params = {
        part: "snippet",
        key: "AIzaSyDrpMSpOKrlS3g8FnOQfur2YXGVZJtjTAg",
        q: keywords,
        type: "video",
        maxResults: 20,
        order: "viewCount",
        pageToken: pageToken,
        relatedToVideoId: relatedToVideoId
    };
    return axios.get(url, { params }).then(response => {
        return response;
    });
};

// https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyDrpMSpOKrlS3g8FnOQfur2YXGVZJtjTAg&q=ibaza&type=video&maxResults=3&order=viewCount&pageToken=CAoQAA
