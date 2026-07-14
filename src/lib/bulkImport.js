// Importação/exportação em massa via planilha (Excel), usando a lib SheetJS (window.XLSX).
(function () {
  // Gera e baixa um arquivo .xlsx só com a linha de cabeçalho (modelo para preenchimento).
  function downloadTemplate(headers, filename, exemplo) {
    if (!window.XLSX) { alert("Biblioteca de planilha não carregada."); return; }
    const rows = exemplo ? [headers, exemplo] : [headers];
    const ws = window.XLSX.utils.aoa_to_sheet(rows);
    const wb = window.XLSX.utils.book_new();
    window.XLSX.utils.book_append_sheet(wb, ws, "Modelo");
    window.XLSX.writeFile(wb, filename);
  }

  // Lê um arquivo .xlsx/.csv escolhido pelo usuário e retorna um array de objetos
  // (uma entrada por linha, chaves = cabeçalho da 1ª linha).
  function parseFile(file) {
    return new Promise((resolve, reject) => {
      if (!window.XLSX) { reject(new Error("Biblioteca de planilha não carregada.")); return; }
      const reader = new FileReader();
      reader.onerror = () => reject(new Error("Não foi possível ler o arquivo."));
      reader.onload = (e) => {
        try {
          const wb = window.XLSX.read(e.target.result, { type: "array" });
          const ws = wb.Sheets[wb.SheetNames[0]];
          const rows = window.XLSX.utils.sheet_to_json(ws, { defval: "" });
          resolve(rows);
        } catch (err) { reject(err); }
      };
      reader.readAsArrayBuffer(file);
    });
  }

  // Exporta uma lista de objetos como planilha .xlsx (relatórios).
  function exportRows(rows, headers, filename, sheetName) {
    if (!window.XLSX) { alert("Biblioteca de planilha não carregada."); return; }
    const aoa = [headers.map((h) => h.label)];
    rows.forEach((r) => aoa.push(headers.map((h) => (typeof h.value === "function" ? h.value(r) : r[h.key]))));
    const ws = window.XLSX.utils.aoa_to_sheet(aoa);
    const wb = window.XLSX.utils.book_new();
    window.XLSX.utils.book_append_sheet(wb, ws, sheetName || "Relatório");
    window.XLSX.writeFile(wb, filename);
  }

  window.CicloBulk = { downloadTemplate, parseFile, exportRows };
})();
