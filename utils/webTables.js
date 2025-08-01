export async function countWebTableRow(tabRowLocator) {
  const rows = await tabRowLocator.evaluateAll((rows) =>
    rows.filter((row) => row.textContent.trim() !== ""),
  );
  return rows.length;
}
