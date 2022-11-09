import { getSeries, addSeries, deleteSeries, updateSeries } from "../controllers/seriesController";
import express from "express";

const queryRoute = express.Router();

queryRoute
  .route("/(:id)?")
  .get(getSeries, () => {})
  .post(addSeries, () => {})
  .delete(deleteSeries, () => {})
  .put(updateSeries, () => {});

export default queryRoute;
