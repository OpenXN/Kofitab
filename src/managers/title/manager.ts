const TitleManager = {
    setTitle(title: string) {
        const tabTitle = document.getElementById("title") as HTMLImageElement;
        tabTitle.textContent = title;
    },
};

export { TitleManager };
