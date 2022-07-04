const treeObj = {
    'name': 1, 'items': [{
        'name': 2, 'items': [{
            'name': 3
        }, {
            'name': 4, 'items': [{
                'name': 7
            }]
        }, {
            'name': 3
        }]
    }, {
        'name': 5, 'items': [{
            'name': 7, 'items': [{
                'name': 3
            }]
        }, {
            'name': 7, 'items': [{
                'name': 3
            }]
        }]
    }]
};

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

/*
// not working
const buildObjectTreeString = (elements, deepLvl, parentNotLast) => {
    let result = '';

    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        const last = i === elements.length - 1;
        result += (parentNotLast ? `|   ` : '    ').repeat(deepLvl);
        result += (!last ? `├── ${element.name}` : `└── ${element.name}`) + '\n';
        if (element.items && element.items.length) {
            result += buildObjectTreeString(element.items, deepLvl + 1, !last);
        }
    }
    return result;
};
*/


/*
0 - └── {4}
1 - |   └── {4}
2 - |   |    └──{4}
├ - если первый
└ - если последний
│ - в ином случае
 */

/*
└── 1
    ├── 2
    |   ├── 3
    |   ├── 4
    |   |   └── 7
    |   └── 3
    └── 5
        ├── 7
        |   └── 3
        └── 7
            └── 3
 */

