import { Toaster } from "sonner";
import { useTheme } from "./theme-provider";

const ToasterProvider = () => {

  const { theme } = useTheme();

  return (
    <Toaster
      position="top-center"
      richColors
      duration={5000}
      swipeDirections={["left", "right"]}
      theme={theme}
    />
  );
}

export default ToasterProvider;
