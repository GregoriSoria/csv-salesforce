const csv = require('csv-parser');
const fs = require('fs');
const { Parser } = require('json2csv');

const csvOptions = {
    separator: ";"
};
let csvArray = [];
let csvRows = 0;

const readRows = row => {
    csvRows++;
    // csvArray.push(row);

    execToolsByRow(row);
}

const onEnd = () => {
    console.log(`Empty Columns (${emptyColumns.filter(i => !i.count).length}):`);
    console.log(emptyColumns.filter(i => !i.count));

    console.log(`Different values from column '${differentValuesFromColumn}' (${differentValues.length}):`);
    console.log(differentValues);

    console.log(`CSV file successfully processed | CSV rows: ${csvRows}`);
    exportArrayToCsv(csvArray);
}

const differentValuesFromColumn = "Situacao";
const execToolsByRow = row => {
    showAllEmptyColumns(row);
    verifyDifferentValues(differentValuesFromColumn, row);
}


///////////////// TOOLS

const exportArrayToCsv = array => {
    // export
}

const emptyColumns = [];
const showAllEmptyColumns = row => {
    for (field in row) {
        const fieldValue = row[field].trim();

        const col = emptyColumns.find(i => i.field == field);

        if (col) {
            if (fieldValue) {
                col.count++;
            }
        } else {
            emptyColumns.push({
                field,
                count: fieldValue ? 1 : 0
            })
        }
    }
}

const differentValues = [];
const verifyDifferentValues = (field, row) => {
    const fieldValue = row[field].trim();
    if (fieldValue) {
        if (!differentValues.includes(fieldValue)) {
            differentValues.push(fieldValue);
        }
    }
}

///////////////// END TOOLS


console.log(`CSV file loading . . .`);
fs.createReadStream('file.csv')
    .pipe(csv(csvOptions))
    .on('data', readRows)
    .on('end', onEnd);