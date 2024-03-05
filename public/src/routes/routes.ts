import express, { Request, Response } from "express";
import { getFillout } from "../helpers/fillout";
import { IFilterClause } from "../types/demo";
import { filterData } from "../helpers/fillout";
import { validFilters } from "../helpers/utils";

const router = express.Router();

// Define the route with a dynamic parameter (formId)
router.get(
  "/:formId/filteredResponses",
  async (req: Request, res: Response) => {
    const formId: string = req.params.formId;
    const response = await getFillout(formId, req);

    const filters = req.query.filters as string;
    const responseObject = {
      responses: response.data.responses,
      totalResponse: response.data.totalResponses,
      pageCount: response.data.pageCount,
      filteredCount: response.data.totalResponses,
    };
    if (!filters) {
      return res.json(responseObject);
    }
    // Parse filters parameter
    let parsedFilters: IFilterClause[];
    try {
      parsedFilters = JSON.parse(filters);
    } catch (error) {
      return res.status(400).json({
        error: "Invalid filters parameter. It must be a valid JSON string",
      });
    }

    // check for valid filter type
    parsedFilters.map((f) => {
      if (!validFilters.includes(f.condition)) {
        return res.status(400).json({
          error: `Invalid filter type: ${f.condition}`,
        });
      }
    });

    const filteredResponses = filterData(response, parsedFilters);
    responseObject.responses = filteredResponses;
    responseObject.filteredCount = filteredResponses.length;
    // total response will not be accurate because i can't determine the total responses based on the filter.
    return res.json(responseObject);
  }
);

export default router;
