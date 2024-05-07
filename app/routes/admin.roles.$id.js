/* eslint-disable no-unused-vars */
import { deleteRoleById, getRolesById } from "../utils/roles.server";

export const loader = async ({ request, params }) => {
  const { id } = params;
  return await getRolesById(id);
};

export const action = async ({ request, params }) => {
  const { id } = params;
  return await deleteRoleById(id);
};
