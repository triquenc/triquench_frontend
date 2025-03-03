import { useEffect } from "react";
import { initGA, logPageView } from "./utils/gtag";

function App() {
    useEffect(() => {
        initGA();
        logPageView();
    }, []);

    return <div>My React App with Google Analytics</div>;
}

export default App;
