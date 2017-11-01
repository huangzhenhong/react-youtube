import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import SearchBar from "./components/search_bar";
import VideoList from "./components/video_list";
import VideoDetail from './components/video_detail';
import _ from 'lodash';
import YTSearch from 'youtube-api-search';

// API Key generated from Google
const API_KEY = 'AIzaSyBCM_mxi4MrMcWKjLVSPkVY2r25Z4ZXlec';

class App extends Component{
  constructor(props){
    super(props);
    this.state = { 
      videos: [],
      selectedVideo: null
    }

    this.videoSearch('surfborads');
  }

  videoSearch(term){
    YTSearch({key:API_KEY, term: term }, 
    (videos) => {
      //console.log(videos);
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    }
  );
  }

  render(){
    
    const videoSearch = _.debounce((term) => { this.videoSearch(term)}, 300);

    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList videos={this.state.videos}
          onVideoSelect={selectedVideo => this.setState({selectedVideo})} />
      </div>
    );
  }
}

//Take this component's generated HTML and put it 
//on the page(in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));