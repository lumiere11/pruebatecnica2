/* eslint-disable react-hooks/exhaustive-deps */
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { Alert, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import NavbarComponent from "./components/Navbar.jsx";
import { changeOnlineState } from "./features/online/onlineSlice.js";

function App() {
  const dispatch = useDispatch();
  const online = useSelector((state) => state.online.value);
  useEffect(() => {
    const handleBodyClassChange = () => {
      const bodyElement = document.body;
      dispatch(changeOnlineState(!bodyElement.classList.contains("offline")));
    };

    // Add event listener for DOM mutation events
    const observer = new MutationObserver(handleBodyClassChange);

    // Configure the observer to watch for changes in attributes
    const config = { attributes: true };

    // Start observing the body element
    observer.observe(document.body, config);

    // Initial check
    handleBodyClassChange();

    // Clean up the observer on component unmount
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Container className="mt-3">
      <NavbarComponent />
      {!online && <Alert>Se perdio la conexión a internet</Alert>}
      <Outlet/>
    </Container>
  );
}

export default App;
