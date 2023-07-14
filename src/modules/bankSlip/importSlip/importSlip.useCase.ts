import { InsertResult } from "typeorm";
import csvParser from "csv-parser";
import fs from "fs";
import { Slip } from "../entities/Slip";
import { datasource } from "../../shared/database";

export class ImporSlipUsaCase {
  public async execute(slipCSV: any): Promise<InsertResult> {
    return new Promise((resolve, reject) => {
      slipCSV.mv("C:\\Users\\fagne\\Downloads\\testecsv.csv", (error: any) => {
        if (error) {
          reject("Error to save CSV.");
        }

        const results: Slip[] = [];

        fs.createReadStream("testecsv.csv")
          .pipe(csvParser({ separator: ";" }))
          .on("data", (data: any) => {
            const { nome, unidade, valor, linha_digitavel } = data;

            const slip = new Slip();
            slip.nome_sacado = nome;
            slip.id_lote = parseInt(unidade);
            slip.valor = parseFloat(valor);
            slip.linha_digitavel = linha_digitavel;
            slip.ativo = true;

            results.push(slip);
          })
          .on("end", () => {
            datasource
              .createQueryBuilder()
              .insert()
              .into(Slip)
              .values(results)
              .execute()
              .then((insertResult) => {
                resolve(insertResult);
              })
              .catch((error) => {
                reject("Erro ao importar os boletos.");
              });
          });
      });
    });
  }
}
