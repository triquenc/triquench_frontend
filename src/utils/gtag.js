import ReactGA from "react-gtag";

const GA_TRACKING_ID = "G-XXXXXXXXXX"; // Replace with your ID

export const initGA = () => {
    ReactGA.initialize(GA_TRACKING_ID);
};

export const logPageView = () => {
    ReactGA.pageview(window.location.pathname + window.location.search);
};
