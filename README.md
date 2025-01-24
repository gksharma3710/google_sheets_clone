# Google Sheets Mimicking Web Application

## Overview
This project is a web application that closely mimics the user interface and core functionalities of Google Sheets, focusing on mathematical and data quality functions, data entry, and key UI interactions.

## Features
- **Spreadsheet Interface**: 
  - Mimics Google Sheets UI with a toolbar, formula bar, and cell structure.
  - Drag functions and cell dependencies.
  - Basic cell formatting (bold, italics, font size, color).
  - Ability to add, delete, and resize rows and columns.

- **Mathematical Functions**:
  - SUM
  - AVERAGE
  - MAX
  - MIN
  - COUNT

- **Data Quality Functions**:
  - TRIM
  - UPPER
  - LOWER
  - REMOVE_DUPLICATES
  - FIND_AND_REPLACE

## How to Run the Project
1. **Open the Project**: Ensure you have the project folder open in your code editor (e.g., VSCode).
2. **Open `index.html`**: Locate and open the `index.html` file in your editor.
3. **Launch in a Browser**:
   - Open the `index.html` file directly in a web browser.
   - Alternatively, use a live server extension in VSCode to serve the file.
4. **Testing Functionality**: Interact with the spreadsheet and use the toolbar buttons for functions.
5. **Running Tests**: 
   - Open the console in your browser's developer tools (right-click and select "Inspect" or press `F12`).
   - Type `testMathematicalFunctions();` and press `Enter` to run the mathematical functions tests.
   - Type `testDataQualityFunctions();` and press `Enter` to run the data quality functions tests.
   - Check the console for any assertion failures or success messages.


## Conclusion
This application provides a functional and interactive experience similar to Google Sheets, allowing users to perform various mathematical and data quality operations.
