import { Request, Response } from "express";
import { series } from "@prisma/client";
import prismaClient from "../utils/prismaClient";

const client = prismaClient;

const getSeries = async (req: Request, res: Response) => {
  const queryResults: series[][] = [];
  const states: boolean[] = [true, false];

  for (const state of states) {
    await client.series
      .findMany({ where: { finished: state }, orderBy: { name: "asc" } })
      .then((result) => {
        queryResults.push(result);
      })
      .catch((e) => {
        res.status(400).send(e);
      });
  }

  const results = { finished: queryResults[0], ongoing: queryResults[1] };

  return res.status(200).json(results);
};

const addSeries = async (req: Request, res: Response) => {
  let { name, finished, season, episode }: series = req.body;

  if (name === undefined || finished === undefined) {
    return res.status(400).send({ message: "Invalid fields" });
  }

  if (finished) {
    season = null;
    episode = null;
  }

  await client.series
    .create({
      data: {
        name,
        season,
        episode,
        finished,
      },
    })
    .then((result) => {
      return res.status(200).send(result);
    })
    .catch((e) => {
      return res.status(400).send(e);
    });
};

const deleteSeries = async (req: Request, res: Response) => {
  const id: number = Number(req.params.id);

  if (!id) {
    return res.status(400).send({ message: "Invalid id" });
  }

  await client.series
    .delete({
      where: { id },
    })
    .then((result) => {
      return res.status(200).send(result);
    })
    .catch((e) => {
      return res.status(400).send(e);
    });
};

const updateSeries = async (req: Request, res: Response) => {
  let { id, season, episode, finished }: series = req.body;

  if (finished) {
    season = null;
    episode = null;
  }

  await client.series
    .update({
      where: { id },
      data: { season, episode, finished },
    })
    .then((result) => {
      return res.status(200).send(result);
    })
    .catch((e) => {
      console.log(e);
      return res.status(400).send(e);
    });
};

export { getSeries, addSeries, deleteSeries, updateSeries };
