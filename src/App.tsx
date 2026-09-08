import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";

import { GlobalProvider } from "./context/GlobalProvider";
import { AppRoutes } from "./routes";

function App() {
  return (
    <GlobalProvider>
      <Toaster richColors />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
