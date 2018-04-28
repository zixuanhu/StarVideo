import { combineReducers } from "redux";
import videolist from "./youtubeDataReducer";
import comments from "./commentReducer";
import video from "./videoReducer";

const RootReducer = combineReducers({
    videolist,
    comments,
    video
});

export default RootReducer;
