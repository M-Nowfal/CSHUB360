import { useEffect } from "react";

type ScrollTo = "top" | "bottom" | "percent";
type Behavior = "smooth" | "instant" | "auto";

const useScroll = (to: ScrollTo, behavior: Behavior = "instant", percent?: number): void => {
  useEffect(() => {
    let scrollY = 0;

    if (to === "top") {
      scrollY = 0;
    } else if (to === "bottom") {
      scrollY = document.documentElement.scrollHeight;
    } else if (to === "percent") {
      if (percent !== undefined && percent >= 0 && percent <= 100) {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        scrollY = (percent / 100) * docHeight;
      } else {
        console.warn("useScroll: percent must be between 0 and 100");
        return;
      }
    }

    window.scrollTo({ top: scrollY, behavior });
  }, [to, behavior, percent]);
};

export default useScroll;
