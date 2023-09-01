import "./App.css";
import Header from "./components/Header";
// import Dashboard from "./components/Dashboard";
// import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import BodyScan from "./components/BodyScan";
// import Register from "./components/Register";

function App() {
    return (
        <>
            <Header />
            <BodyScan />
            <Main />
            <Footer />
        </>
    );
}

export default App;
