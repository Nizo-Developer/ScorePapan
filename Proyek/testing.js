

const XLSX = require('xlsx');
const workbook = XLSX.readFile('path/to/your/excel/file.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Mendapatkan nilai dari sel A1
const cellValue = worksheet['A1'].v;
console.log(cellValue);
