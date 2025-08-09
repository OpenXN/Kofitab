/**
 * Responsible set the tab title.
 */
const TitleManager = {
  /**
   * Updates the tab title.
   */
  setTitle(title: string) {
    const tabTitle = document.getElementById("title") as HTMLImageElement;
    tabTitle.textContent = title;
  },
};

export { TitleManager };
