const buildAsciiTree = (child, indent, last) => {
    let result = indent;

    if (last) {
        result += `└── ${child.name}`;
        indent += '    ';
    } else {
        result += `├── ${child.name}`;
        indent += '|   ';
    }
    result += '\n';
    const children = child.items;
    if (children) {
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            result += buildAsciiTree(child, indent, i === children.length - 1);
        }
    }
    return result;
};

const getPrettyAsciiTree = (obj) => {
    return buildAsciiTree(obj, '', true);
};

module.exports = {
    getPrettyAsciiTree
}
