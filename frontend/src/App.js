import WebFont from 'webfontloader';
import { loadUser } from './actions/userAction';
import { useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Header from "./Components/Layouts/Header/Header"
import Footer from './Components/Layouts/Footer/Footer'
import AppRoutes from './Routes/Routes'

const App = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto:300,400,500,600,700"]
      },
    });
  });

  useEffect(() => {
    dispatch(loadUser());
    // getStripeApiKey();
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }, [pathname])

  // disable right click
  // window.addEventListener("contextmenu", (e) => e.preventDefault());
  // window.addEventListener("keydown", (e) => {
  //   if (e.keyCode === 123) e.preventDefault();
  //   if (e.ctrlKey && e.shiftKey && e.keyCode === 73) e.preventDefault();
  //   if (e.ctrlKey && e.shiftKey && e.keyCode === 74) e.preventDefault();
  // });
  




  return (
    <>
      <Header />
        <AppRoutes />
      <Footer />
    </>
  )
}

export default App