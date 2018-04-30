import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Nav from "./frontend/components/navbar/navbar";
import GalleryContainer from "./frontend/components/gallery/GalleryContainer";
import vimeoGalleryContainer from "./frontend/components/vimeoGallery/vimeoGalleryContainer";
import PlayerContainer from "./frontend/components/player/PlayerContainer";
import vimeoPlayerContainer from "./frontend/components/vimeoPlayer/vimeoPlayerContainer";

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route path="/" component={Nav} />
                    <Route exact path="/youtube" component={GalleryContainer} />
                    <Route
                        exact
                        path="/vimeo"
                        component={vimeoGalleryContainer}
                    />
                    <Route
                        exact
                        path="/youtube/video/:video_id"
                        component={PlayerContainer}
                    />
                    <Route
                        exact
                        path="/vimeo/videos/:video_id"
                        component={vimeoPlayerContainer}
                    />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
