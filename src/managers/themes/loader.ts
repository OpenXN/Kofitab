import { Log } from "../../utils/logger";
import { THEMES_BASE } from "../../utils/consts";

const LOCAL_THEMES = new Set(["default", "animations"]);

const ThemeLoader = {
    async loadThemes(ids: string) {
        const idList = ids
            .split(",")
            .map((id) => id.trim())
            .filter((id) => id.length > 0);

        for (const id of idList) {
            try {
                await this.loadTheme(id);
            } catch (error) {
                console.error(`Failed to load theme: ${id}`, error);
            }
        }
    },

    async loadTheme(id: string) {
        let url: string;

        if (LOCAL_THEMES.has(id)) {
            url = `./assets/styles/${id}.css`;
            Log.Debug(`Loading local theme: ${id} from ${url}`);
        } else {
            url = `${THEMES_BASE}/${id}.css`;
            Log.Debug(`Loading remote theme: ${id} from ${url}`);
        }

        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const css = await res.text();
            const style = document.createElement("style");
            style.textContent = css;
            document.head.appendChild(style);
            Log.Debug(`Style loaded: ${id} from ${url}`);
        } catch (err) {
            Log.Error(`Failed to load style '${id}' from ${url}: ${err}`);
        }
    },
};

export { ThemeLoader };
