import RESOURCE_MANAGER from "../../Resources";
import { IColumn } from "office-ui-fabric-react/lib/DetailsList";
import { IBaseWebPartProps } from "../@BaseWebPart";

export default interface IWebPropertyBagEditorProps extends IBaseWebPartProps {
    columns?: IColumn[];
}
export const WebPropertyBagEditorDefaultProps: Partial<IWebPropertyBagEditorProps> = {
    columns: [
        {
            key: "key",
            fieldName: "key",
            name: RESOURCE_MANAGER.getResource("SiteFields_GtKey_DisplayName"),
            minWidth: 150,
            maxWidth: 200,
            isResizable: true,
        },
        {
            key: "value",
            fieldName: "value",
            name: RESOURCE_MANAGER.getResource("SiteFields_GtValue_DisplayName"),
            minWidth: 100,
            maxWidth: 300,
            isResizable: true,
        },
    ],
};
