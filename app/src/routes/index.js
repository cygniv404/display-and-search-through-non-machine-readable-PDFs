import React, {useState} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SinglePage from "./document-page";
import "../assets/css/styles.scss";
import ImageComponent from "../components/image-container";
import SearchInImage from "../components/search-image-container";
const App = () => {

  // limit the amount of first load on the flask api
  // In case of production :
  // Use of api call to get all document's pages referred to as imageIds
  const imageIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const [parentQuery, setParentQuery] = useState('')
  const [selectedImages, setSelectedImages] = useState([])
  const handelFetchedImages = ([fetchedIds,query]) => {
    setSelectedImages(fetchedIds);
    setParentQuery(query);
  };
  return (
    <Router>
      <div className="container flex w-100 flex-wrap ">
        <Switch>
          <Route path="/" exact>
            <SearchInImage handelFetchedImages={handelFetchedImages} />
            <ImageComponent imageIds={imageIds} selectedImages={selectedImages} />
          </Route>
          <Route exact path="/singlePage/:imageId" render={(props) => (<SinglePage {...props} parentQuery={parentQuery}/>)} /> />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
