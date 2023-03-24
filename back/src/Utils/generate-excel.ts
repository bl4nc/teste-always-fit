
export async function generateExcel(headers: any[], body: any[], caminho_arquivo: string) {
    const xl = require('excel4node')
    const wb = new xl.Workbook()
    const ws = wb.addWorksheet('relatorio', {
        dateFormat: 'd/m/yy hh:mm:ss',
    })

    headers.forEach((header, i) => {
        ws.cell(1, i + 1).string(header)
    })

    body.forEach((row, i) => {
        Object.entries(row).forEach((column, pos) => {
            ws.cell(i + 2, pos + 1).string(String(column[1]))
        })
    })
    const res = await new Promise((resolve, reject) => {
        //usado pq a função não tem await
        wb.write(caminho_arquivo, (err: any) => err ? reject(err) : resolve(caminho_arquivo));
    })
    return res
}