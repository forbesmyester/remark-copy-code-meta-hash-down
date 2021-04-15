function copyCodeMetaHashUp(options) {

    const separator = options.separator || '#';

    return function copyCodeMetaHashUpTree(tree) {

        const children = tree.children.reduce(
            (acc, child) => {
                if (
                    (child.type != "code") ||
                    (child.meta || "").indexOf(separator) == -1
                ) {
                    return [...acc, child];
                }
                after = child.meta.substr(child.meta.indexOf(separator) + 1);
                let [whole, lang, _junk, meta] = child.meta.match(
                    /#\s*([^\s]+)(\s*([^\s].*))?/
                );
                meta = meta ? meta : null;
                return [ ...acc, { ...child, lang, meta }, child ];
            },
            []
        );

        return { ...tree, children };

    };

}

module.exports = copyCodeMetaHashUp;
