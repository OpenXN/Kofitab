import { BasicIcons } from "../../../utils/icons";

const SettingsButtonManager = {
    addButton() {
        const settingsButton = document.createElement("button");
        settingsButton.id = "settings-button";

        const icon = new DOMParser().parseFromString(
            BasicIcons.Settings,
            "image/svg+xml",
        ).documentElement;
        icon.setAttribute("width", "24");
        icon.setAttribute("height", "24");
        icon.classList = "icon";
        settingsButton.appendChild(icon);

        settingsButton.addEventListener("click", this.handleClick);

        document.body.appendChild(settingsButton);
    },

    handleClick() {
        alert("click");
    },
};

export { SettingsButtonManager };
