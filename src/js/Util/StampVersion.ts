import * as PropertyBag from "./PropertyBag";

/**
 * Stamps version in the specified container
 *
 * @param {string} containerId DOM container
 * @param {string} versionKey Prop bag key
 * @param {string} additionalClassNames Additional class names
 */
const StampVersion = (containerId: string, versionKey: string, additionalClassNames = []): void => {
    getVersion(versionKey)
        .then(version => {
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = String.format("<span class='ms-metadata {1}'>{0}</span>", version, additionalClassNames.join(" "));
            }
        });
};

/**
 * Get version from web property bag
 *
 * @param {string} versionKey Prop bag key
 */
const getVersion = (versionKey: string) => new Promise<string>((resolve, reject) => {
    PropertyBag.GetAllProperties(_spPageContextInfo.webAbsoluteUrl)
        .then(props => {
            let e = Object.keys(props.get_fieldValues()).filter(key => key === versionKey);
            if (e.length === 1) {
                resolve(props.get_item(versionKey));
            } else {
                reject();
            }
        })
        .catch(reject);
});

export default StampVersion;
