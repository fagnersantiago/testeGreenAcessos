import { Request, Response } from "express";
import "express-fileupload";

import { ImporSlipUsaCase } from "./importSlip.useCase";

export class ImportController {
  private importService: ImporSlipUsaCase;

  constructor() {
    this.importService = new ImporSlipUsaCase();
  }

  public async handle(req: Request, res: Response) {
    if (!req.files || !req.files.slipsCSV) {
      console.log(req.files);
      return res.status(400).json({ message: "csv file not send." });
    }

    const slipsCSV = req.files.slipsCSV;

    this.importService
      .execute(slipsCSV)
      .then(() => {
        res.status(200).json({ message: "slip was imported ." });
      })
      .catch((error) => {
        console.log("Error to import slip:", error);
        res.status(500).json({ message: "Erro ao importar os boletos." });
      });
  }
}
