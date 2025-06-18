import { BasicIcons } from "../../../utils/icons";
import { SettingsLoader } from "../../../managers/settings/loader";
import { Settings } from "../../../managers/settings/manager";

const MenuButtonManager = {
    addButton() {
        const menuButton = document.createElement("button");
        menuButton.id = "menu-button";

        if (SettingsLoader.getValue(Settings.MenuButtonVisible) == "false") {
            menuButton.classList.add("hidden");
        }

        const icon = new DOMParser().parseFromString(
            BasicIcons.Menu,
            "image/svg+xml",
        ).documentElement;
        icon.setAttribute("width", "24");
        icon.setAttribute("height", "24");
        icon.classList = "icon";

        menuButton.appendChild(icon);

        menuButton.addEventListener("click", this.handleClick);

        document.body.appendChild(menuButton);
    },

    handleClick() {
        alert("click");
    },
};

export { MenuButtonManager };
