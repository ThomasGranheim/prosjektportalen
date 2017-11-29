import RESOURCE_MANAGER from "../../../@localization";
import { Site } from "sp-pnp-js";
import ListConfig from "./ListConfig";

/**
 * Retrieve list content configuration fron list
 */
export async function RetrieveConfig(): Promise<ListConfig[]> {
    const list = new Site(_spPageContextInfo.siteAbsoluteUrl).rootWeb.lists.getByTitle(RESOURCE_MANAGER.getResource("Lists_ListContentConfig_Title"));
    const configItems = await list.items.get();
    return configItems.map(item => new ListConfig(item, "GtLcc"));
}

export { ListConfig };

