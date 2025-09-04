import { TitleLoader } from "./loader";

/**
 * Responsible set the tab title.
 */
const TitleManager = {
  /**
   * Updates the tab title.
   */
  updateTitle() {
    const tabTitle = document.getElementById("title") as HTMLImageElement;
    tabTitle.textContent = TitleLoader.getTitle();
  },
};

export { TitleManager };
