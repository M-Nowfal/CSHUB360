import { Provider } from "react-redux";
import { ThemeProvider } from "./components/ui/theme-provider";
import Routes from "./Routes";
import store from "./redux/store";
import { Toaster } from "sonner";
import type { JSX } from "react";

const App = (): JSX.Element => {

  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="system">
        <Toaster
          position="top-center"
          richColors
          duration={5000}
          swipeDirections={["left", "right"]}
        />
          <Routes />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
