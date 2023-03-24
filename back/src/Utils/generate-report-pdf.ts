import PdfPrinter from "pdfmake";
import { TDocumentDefinitions, TFontDictionary } from "pdfmake/interfaces";
import fs from "node:fs"

export async function generateReportPdf(corpo: any[], cabecalho: any[], caminho: string): Promise<any> {
    const fonts: TFontDictionary = {
        Helvetica: {
            normal: 'Helvetica',
            bold: 'Helvetica-Bold',
            italics: 'Helvetica-Oblique',
            bolditalics: 'Helvetica-BoldOblique',
        }
    }

    const docDefinitions: TDocumentDefinitions = {
        content: [
            {
                table: {
                    body: [
                        cabecalho,
                        ...corpo
                    ],
                }
            },
        ],
        defaultStyle: {
            font: "Helvetica",
            fontSize: 8,

        },
        styles: {
            columnsTitle: {
                bold: true,
                fontSize: 12,
                fillColor: '#051228',
                fillOpacity: 0.8,
                color: '#FFF',
                alignment: "center",
            }
        }

    }
    const printer = new PdfPrinter(fonts)
    const pdfDoc = printer.createPdfKitDocument(docDefinitions)
    const buffers: any[] = []
    pdfDoc.on('data', buffers.push.bind(buffers));
    const res = await new Promise((resolve, reject) => {
        try {
            pdfDoc.on('end', () => {
                const pdfData = Buffer.concat(buffers);
                fs.writeFileSync(caminho, pdfData)
                resolve(caminho)
            })
        } catch (error: any) {
            reject(error)
        }
        pdfDoc.end()
    })


    return res

    // pdfDoc.end()


    // const res = await new Promise((resolve, reject) => {
    //     pdfDoc.on("end", () => {
    //         try {
    //             const result = Buffer.concat(chunks)
    //             resolve(result)
    //         } catch (error) {
    //             reject(error)
    //         }

    //     })
    // })


}

