const asciiHelper = require('./ascii-helper');
const fs = require('fs');
const fsPromisified = require('fs/promises');
const path = require('path');

const DEFAULT_DEPTH_LVL = 3;
const rootPath = process.argv[2];

if (!rootPath) {
    console.warn('Please specify a path');
    process.exit();
}
if (!fs.lstatSync(rootPath).isDirectory()) {
    console.warn('Path must be a folder');
    process.exit();
}

const maxDepLvl = process.argv[3] === '-d' || process.argv[3] === '-depth' ? process.argv[4] * 1 : DEFAULT_DEPTH_LVL;

const buildDirTree = async (node, depLvl, dirPath) => {
    const items = [];
    try {
        const dirs = (await fsPromisified.readdir(`${dirPath}`));

        await Promise.all(dirs.map(async (dir) => {
            const childDirPath = path.join(dirPath, dir);
            const stat = await fsPromisified.lstat(childDirPath);
            if (stat.isDirectory()) {
                const containsDirs = (await fsPromisified.readdir(childDirPath)).length > 0;
                if (containsDirs && depLvl < maxDepLvl) {
                    items.push(await buildDirTree({ name: dir }, depLvl + 1, childDirPath));
                } else {
                    items.push({ name: dir });
                }
            } else {
                items.push({ name: dir });
            }
        }));
    } catch (err) {
        throw err;
    }
    node.items = items;
    return node;
};

(async () => {
    const treeObj = await buildDirTree({ name: rootPath }, 1, rootPath);
    console.log(asciiHelper.getPrettyAsciiTree(treeObj));
})();
