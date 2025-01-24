const spreadSheetContainer = document.querySelector("#spreadsheet-container")
const exportBtn = document.querySelector("#export-btn")
const addRowBtn = document.querySelector("#add-row-btn")
const addColBtn = document.querySelector("#add-col-btn")
const averageBtn = document.querySelector("#average-btn")
const maxBtn = document.querySelector("#max-btn")
const minBtn = document.querySelector("#min-btn")
const countBtn = document.querySelector("#count-btn")
const trimBtn = document.querySelector("#trim-btn")
const upperBtn = document.querySelector("#upper-btn")
const lowerBtn = document.querySelector("#lower-btn")
const removeDuplicatesBtn = document.querySelector("#remove-duplicates-btn")
const findReplaceBtn = document.querySelector("#find-replace-btn")

const ROWS = 27
const COLS = 27
const spreadsheet = []
const alphabets = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
]

class Cell {
    constructor(isHeader, disabled, data, row, column, rowName, columnName, active = false) {
        this.isHeader = isHeader
        this.disabled = disabled
        this.data = data
        this.row = row
        this.rowName = rowName
        this.column = column
        this.columnName = columnName
        this.active = active
    }
}

exportBtn.onclick = function (e) {
    let csv = ""
    for (let i = 0; i < spreadsheet.length; i++) {
        csv +=
            spreadsheet[i]
                .filter((item) => !item.isHeader)
                .map((item) => item.data)
                .join(",") + "\r\n"
    }

    const csvObj = new Blob([csv])
    const csvUrl = URL.createObjectURL(csvObj)
    console.log("csv", csvUrl)

    const a = document.createElement("a")
    a.href = csvUrl
    a.download = "Exported Spreadsheet.csv"
    a.click()
}

addRowBtn.onclick = function() {
    const newRow = [];
    const rowIndex = spreadsheet.length;
    for (let j = 0; j < COLS; j++) {
        const cellData = (j === 0) ? rowIndex : ""; 
        const cell = new Cell(false, false, cellData, rowIndex, j, rowIndex + 1, alphabets[j % 26]);

        newRow.push(cell);
    }
    spreadsheet.push(newRow);
    drawSheet();
}

addColBtn.onclick = function() {
    for (let i = 0; i < spreadsheet.length; i++) {
        const columnIndex = spreadsheet[0].length;
        const cellData = (i === 0) ? alphabets[columnIndex-1] : "";

        const cell = new Cell(false, false, cellData, i, columnIndex, i, alphabets[columnIndex % 26]);

        spreadsheet[i].push(cell);
    }
    drawSheet();
}

averageBtn.onclick = function() {
    const selectedCells = getSelectedCells();
    const avg = average(selectedCells);
    alert("Average: " + avg);
};


maxBtn.onclick = function() {
    const selectedCells = getSelectedCells();
    const maxValue = max(selectedCells);
    alert("Max: " + maxValue);
};


minBtn.onclick = function() {
    const selectedCells = getSelectedCells();
    const minValue = min(selectedCells);
    alert("Min: " + minValue);
};


countBtn.onclick = function() {
    const selectedCells = getSelectedCells();
    const countValue = count(selectedCells);
    alert("Count: " + countValue);
};


trimBtn.onclick = function() {
    const selectedCells = getSelectedCells();
    selectedCells.forEach(trim);
    alert("Trimmed selected cells.");
};


upperBtn.onclick = function() {
    const selectedCells = getSelectedCells();
    selectedCells.forEach(upper);
    alert("Converted selected cells to uppercase.");
};


lowerBtn.onclick = function() {
    const selectedCells = getSelectedCells();
    selectedCells.forEach(lower);
    alert("Converted selected cells to lowercase.");
};


removeDuplicatesBtn.onclick = function() {
    const selectedCells = getSelectedCells();
    const uniqueCells = removeDuplicates(selectedCells);
    alert("Removed duplicates from selected cells.");
};


findReplaceBtn.onclick = function() {
    const findText = prompt("Enter text to find:");
    const replaceText = prompt("Enter text to replace with:");
    const selectedCells = getSelectedCells();
    findAndReplace(selectedCells, findText, replaceText);
    alert("Replaced text in selected cells.");
};


initSpreadsheet()

function initSpreadsheet() {
    for (let i = 0; i < COLS; i++) {
        let spreadsheetRow = []
        for (let j = 0; j < COLS; j++) {
            let cellData = ""
            let isHeader = false
            let disabled = false
            if (j === 0) {
                cellData = i
                isHeader = true
                disabled = true
            }

            if (i === 0) {
                isHeader = true
                disabled = true
                cellData = alphabets[j - 1]
            }

            if (!cellData) {
                cellData = ""
            }
            const rowName = i
            const columnName = alphabets[j - 1]
            const cell = new Cell(isHeader, disabled, cellData, i, j, rowName, columnName, false)
            spreadsheetRow.push(cell)
        }
        spreadsheet.push(spreadsheetRow)
    }
    console.log("spreadsheet", spreadsheet)
    drawSheet()
}

function drawSheet() {
    spreadSheetContainer.innerHTML = ""
    for (let i = 0; i < spreadsheet.length; i++) {
        const rowContainerEl = document.createElement("div")
        rowContainerEl.className = "cell-row"

        for (let j = 0; j < spreadsheet[i].length; j++) {
            const cell = spreadsheet[i][j]
            rowContainerEl.append(createCellEl(cell))
        }
        spreadSheetContainer.append(rowContainerEl)
    }
}

function createCellEl(cell) {
    const cellEl = document.createElement("input")
    cellEl.className = "cell"
    cellEl.id = "cell_" + cell.row + cell.column
    cellEl.value = cell.data
    cellEl.disabled = cell.disabled

    if (cell.isHeader) {
        cellEl.classList.add("header")
    }

    cellEl.onclick = () => handleCellClick(cell)
    cellEl.onchange = (e) => handleOnChange(e.target.value, cell)
    return cellEl
}

function handleCellClick(cell) {
    clearHeaderActiveStates()
    const columnHeader = spreadsheet[0][cell.column]
    const rowHeader = spreadsheet[cell.row][0]
    const columnHeaderEl = getElFromRowCol(columnHeader.row, columnHeader.column)
    const rowHeaderEl = getElFromRowCol(rowHeader.row, rowHeader.column)
    columnHeaderEl.classList.add("active")
    rowHeaderEl.classList.add("active")
    document.querySelector("#cell-status").innerHTML = cell.columnName + "" + cell.rowName
}

function handleOnChange(data, cell) {
    cell.data = data
}

function clearHeaderActiveStates() {
    for (let i = 0; i < spreadsheet.length; i++) {
        for (let j = 0; j < spreadsheet[i].length; j++) {
            const cell = spreadsheet[i][j]
            if (cell.isHeader) {
                let cellEl = getElFromRowCol(cell.row, cell.column)
                cellEl.classList.remove("active")
            }
        }
    }
}

function getElFromRowCol(row, col) {
    return document.querySelector("#cell_" + row + col)
}

function sum(range) {
    return range.reduce((acc, cell) => acc + (parseFloat(cell.data) || 0), 0);
}

function average(range) {
    const total = sum(range);
    return total / range.length;
}

function max(range) {
    return Math.max(...range.map(cell => parseFloat(cell.data) || -Infinity));
}

function min(range) {
    return Math.min(...range.map(cell => parseFloat(cell.data) || Infinity));
}

function count(range) {
    return range.filter(cell => !isNaN(cell.data)).length;
}

function trim(cell) {
    cell.data = cell.data.trim();
}

function upper(cell) {
    cell.data = cell.data.toUpperCase();
}

function lower(cell) {
    cell.data = cell.data.toLowerCase();
}

function removeDuplicates(range) {
    const uniqueData = [...new Set(range.map(cell => cell.data))];
    return uniqueData.map(data => new Cell(false, false, data));
}

function findAndReplace(range, findText, replaceText) {
    range.forEach(cell => {
        if (cell.data.includes(findText)) {
            cell.data = cell.data.replace(new RegExp(findText, 'g'), replaceText);
        }
    });
}
