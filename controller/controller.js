import { allTermine, allTermineOverview } from "../service/service.js";

export async function getTermine(req, res) {
  const termine = await allTermine();
  res.status(200).json(termine);
}

export async function getTermineOverview(req, res) {
  const termine = await allTermineOverview();
  res.status(200).json(termine);
}
