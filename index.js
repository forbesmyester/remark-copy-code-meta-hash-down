function trim(s) {
    while (s.substr(0, 1) == " ") { s = s.substr(1); }
    while (s.substr(-1) == " ") { s = s.substr(0, s.length - 1); }
    return s
}

function decode(infoString) {
    if (infoString.length == 0) { return {}; }
    if (infoString.indexOf(" ") == -1) {
        return { lang: infoString, meta: null };
    }
    return {
        lang: infoString.substr(0, infoString.indexOf(" ") + 0),
        meta: trim(infoString.substr(infoString.indexOf(" ")))
    };
}

function getParts(meta, separator) {
    const separatorPos = meta.indexOf(separator);
    if (separatorPos == -1) { return {}; }
    return decode(trim(meta.substr(separatorPos + 1)));
}

function saneMeta(meta, separator) {
    if (meta == null) { return null; }
    if (meta.indexOf(separator) == -1) { return meta; }
    return meta.substr(0, meta.indexOf(separator));
}

function copyCodeMetaHashUp(options) {

    const separator = (options || {}).separator || '#';

    return function copyCodeMetaHashUpTree(tree) {

        const children = tree.children.reduce(
            (acc, child) => {
                if (child.type != "code") {
                    return [...acc, child];
                }
                const newInfo = getParts(child.meta || "", separator);
                if (!newInfo.lang) {
                    return [...acc, child];
                }
                return [
                    ...acc,
                    { ...child, lang: newInfo.lang, meta: newInfo.meta },
                    { ...child, lang: child.lang, meta: saneMeta(child.meta, separator) }
                ];
            },
            []
        );

        return { ...tree, children };

    };

}

module.exports = copyCodeMetaHashUp;

// const assert = require('assert');
// assert.deepEqual(getParts("", "#"), {});
// assert.deepEqual(getParts("bash", "#"), {});
// assert.deepEqual(getParts("bash strict", "#"), {});
// assert.deepEqual(getParts("bash strict #", "#"), {});
// assert.deepEqual(getParts("bash strict #morebash", "#"), {lang: "morebash", meta: null});
// assert.deepEqual(getParts("bash strict #morebash   ", "#"), {lang: "morebash", meta: null});
// assert.deepEqual(getParts("bash strict #morebash   x", "#"), {lang: "morebash", meta: "x"});
// assert.deepEqual(getParts("bash strict #morebash   x x", "#"), {lang: "morebash", meta: "x x"});
// assert.deepEqual(getParts("bash strict # morebash", "#"), {lang: "morebash", meta: null});
// assert.deepEqual(getParts("bash strict # morebash   ", "#"), {lang: "morebash", meta: null});
// assert.deepEqual(getParts("bash strict # morebash   x", "#"), {lang: "morebash", meta: "x"});
// assert.deepEqual(getParts("bash strict # morebash   x x", "#"), {lang: "morebash", meta: "x x"});
