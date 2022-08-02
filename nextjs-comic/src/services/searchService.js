import * as httpRequest from "~/utils/httpRequest";

export const search = async (q, type = "less") => {
  try {
    const res = await httpRequest.get("comics", {
      params: {
        q,
        type,
      },
    });
    return res.results; //the api return the results (array)
  } catch (error) {
    console.log(error);
  }
};
