import { toInteger } from "lodash-es";

function isInteger(n) {
  return n % 1 === 0;
}

export const apiClient = async (resource, id) => {
  if (!isInteger(id)) {
    id = toInteger(id);
  }
  const response = await fetch(
    `${process.env.REACT_APP_SWAPI_URL}/${resource}/${id}/`,
    {
      method: "GET",
    }
  );
  const result = await response.json();
  if (result.detail && result.detail === "Not found") {
    return apiClient(resource, id / 2);
  }
  return result;
};
