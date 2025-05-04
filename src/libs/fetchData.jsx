import { callPublicApi } from "@/libs/callApis";

export const fetchData = async () => {
  try {
    const responseSize = await callPublicApi("/size", "GET");
    const responseWeight = await callPublicApi("/weight", "GET");
    const responseRam = await callPublicApi("/ram", "GET");

    return {
      responseSize: responseSize?.data,
      responseWeight: responseWeight?.data,
      responseRam: responseRam?.data,
    };
  } catch (error) {
    return { error: error?.message || "Something went wrong" };
  }
};
