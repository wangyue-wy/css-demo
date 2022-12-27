import FileSaver from 'file-saver'
import * as XLSX from 'xlsx'

export const multisExcel = (dom, excelName) => {
  const $e = dom.$el
  let $table = $e.querySelector('.el-table__fixed')
  if(!$table) {
    $table = $e
  }
  const wb = XLSX.utils.table_to_book($table, {raw:true})
  const wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST:true, type: 'array'})
  FileSaver.saveAs(
    new Blob([wbout],{type: 'application/octet-stream'}),
    `${excelName}.xlsx`,
  )
}