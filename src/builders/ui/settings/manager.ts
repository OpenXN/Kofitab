import { BasicIcons } from "../../../utils/icons";
import { SettingsLoader } from "../../../managers/settings/loader";
import { Settings } from "../../../managers/settings/manager";

const SettingsButtonManager = {
    addButton() {
        const settingsButton = document.createElement("button");
        settingsButton.id = "settings-button";

        if (
            SettingsLoader.getValue(Settings.SettingsButtonVisible) == "false"
        ) {
            settingsButton.classList.add("hidden");
        }

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
