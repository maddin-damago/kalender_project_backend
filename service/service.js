import { getAllTermine, getTermineOverview } from "../repository/repository.js";

export async function allTermine() {
  const termine = await getAllTermine();
  return termine;
}

export async function allTermineOverview() {
  const termine = await getTermineOverview();
  return termine;
}
