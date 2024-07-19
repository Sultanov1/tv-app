import {Route, Routes} from "react-router-dom";
import SearchBox from './containers/SearchBox.tsx';
import ShowDetails from "./containers/ShowDetails.tsx";

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<SearchBox/>}/>
                <Route path="/shows/:id" element={<ShowDetails/>}/>
            </Routes>
        </>
    );
};

export default App;