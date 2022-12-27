export const blobToExcel = (blobData, name) => {
  const a = document.createElement('a')
  const blob = new Blob([blobData], { type: 'application/vnd.ms-excel' })
  const objectUrl = URL.createObjectURL(blob)
  a.setAttribute('href', objectUrl)
  a.setAttribute('download', `${name}.xlsx`)
  a.click()
}