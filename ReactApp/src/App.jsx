import Nav from "./components/Nav";
// import Card from "./components/Card.jsx";
// import users from "./users.json"
// import A from "./components/A.jsx"
// import Counter from "./components/Counter.jsx";
// import Data from "./components/Data.jsx";
// import Json from "./components/Json.jsx";
// import Object from "./components/Object.jsx";
// import Axios from "./components/Axios"
import {BrowserRouter, Route,Routes} from "react-router-dom";
// import FetchData from "./components/FetchData"
// import Arrobj from "./components/Arrobj.jsx";
// import Form from "./components/Form.jsx";
// import Form1 from "./components/Form1"
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Service from "./components/Service.jsx";

let App = ()=>{
  return(
    <>
        <BrowserRouter>
            <Nav></Nav>
            <Routes>
                <Route path={"/"} element={<Home></Home>}></Route>
                <Route path={"/about"} element={<About></About>}></Route>
                <Route path={"/contact"} element={<Contact></Contact>}></Route>
                <Route path={"/service"} element={<Service></Service>}></Route>
            </Routes>
        </BrowserRouter>
        {/*<Nav></Nav>*/}
      {/*<Axios></Axios>*/}
      {/* <FetchData></FetchData> */}
      {/* <Form1></Form1> */}
        {/* <Form></Form> */}
        {/*<Arrobj></Arrobj>*/}
        {/*<Object></Object>*/}
        {/*<Json></Json>*/}
        {/*<Data></Data>*/}
        {/*<Counter />*/}
    {/*<Nav />*/}
      {/*<Card userDetails = {users}></Card>*/}
      {/*<A data = "hello"></A>*/}

    </>
  )
}
export default App