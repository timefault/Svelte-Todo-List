export function getUID(): number {
    return Math.random() * 10e17;
}

export function sortData(dataSet, col, asc = true) {

    let type = dataSet[0] && typeof dataSet[0][col];
    if (type === 'undefined') return;
    let comparator;
    try {
        switch (type) {
            case 'string':
                if (asc)
                    comparator = (a, b) => a[col].localeCompare(b[col]);
                else // dsc
                    comparator = (a, b) => b[col].localeCompare(a[col]);
                break;
            case 'number' || 'boolean':
                if (asc)
                    comparator = (a, b) => a[col] - b[col];
                else // dsc
                    comparator = (a, b) => b[col] - a[col];
                break;
            default:
                throw new Error('no comparator found for given data')
        }
    }
    catch (e) { console.warn(e); }

    let res;
    res = dataSet.sort(comparator);
    return res;
}