const ExcelJS = require('exceljs');
const lee = async () => {
  // read from a file
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile("./excel/diccionarioCruzado.xlsx");

  const worksheet = workbook.getWorksheet('adman');
  
  console.log(workbook.definedNames.getRanges("listSites"))
};

lee();