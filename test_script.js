
function testMathematicalFunctions() {
    const testRange = [
        new Cell(false, false, "10", 1, 1, 1, "A"),
        new Cell(false, false, "20", 1, 2, 1, "B"),
        new Cell(false, false, "30", 1, 3, 1, "C"),
    ];

    console.assert(sum(testRange) === 60, "SUM Test Failed");
    console.assert(average(testRange) === 20, "AVERAGE Test Failed");
    console.assert(max(testRange) === 30, "MAX Test Failed");
    console.assert(min(testRange) === 10, "MIN Test Failed");
    console.assert(count(testRange) === 3, "COUNT Test Failed");

    console.log("Mathematical Functions Tests Passed");
}


function testDataQualityFunctions() {
    const testCell = new Cell(false, false, "  Hello World  ", 1, 1, 1, "A");
    trim(testCell);
    console.assert(testCell.data === "Hello World", "TRIM Test Failed");

    const upperCell = new Cell(false, false, "hello", 1, 1, 1, "A");
    upper(upperCell);
    console.assert(upperCell.data === "HELLO", "UPPER Test Failed");

    const lowerCell = new Cell(false, false, "HELLO", 1, 1, 1, "A");
    lower(lowerCell);
    console.assert(lowerCell.data === "hello", "LOWER Test Failed");

    const duplicatesRange = [
        new Cell(false, false, "A", 1, 1, 1, "A"),
        new Cell(false, false, "B", 1, 2, 1, "B"),
        new Cell(false, false, "A", 1, 3, 1, "C"),
    ];
    const uniqueCells = removeDuplicates(duplicatesRange);
    console.assert(uniqueCells.length === 2, "REMOVE_DUPLICATES Test Failed");

    const findReplaceRange = [
        new Cell(false, false, "Hello World", 1, 1, 1, "A"),
        new Cell(false, false, "Hello", 1, 2, 1, "B"),
    ];
    findAndReplace(findReplaceRange, "Hello", "Hi");
    console.assert(findReplaceRange[0].data === "Hi World", "FIND_AND_REPLACE Test Failed");

    console.log("Data Quality Functions Tests Passed");
}


testMathematicalFunctions();
testDataQualityFunctions();
