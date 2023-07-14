import { Router, Request, Response, NextFunction } from "express";
import { ImportController } from "./modules/bankSlip/importSlip/importSlip.controller";

const importController = new ImportController();

const router = Router();
router.post(
  "/import",

  async (request: Request, response: Response, next: NextFunction) => {
    try {
      importController.handle(request, response);
    } catch (error) {
      next(error);
    }
  }
);

export { router };
