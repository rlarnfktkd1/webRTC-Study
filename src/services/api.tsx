import axios from "axios";

class Api {
  static defaultHeaderOptions: any = {
    "Access-Control-Allow-Origin": "*",
    "content-type": "application/json"
  };

  async ajax(
    method: string,
    apiUrl: string,
    url: string,
    data?: any,
    options?: any
  ) {
    const _options = !!options
      ? { ...Api.defaultHeaderOptions, ...options }
      : Api.defaultHeaderOptions;

    if (method === "get" || method === "delete") {
      const axiosResult = await axios[method](`${apiUrl}${url}`, _options);

      return axiosResult;
    } else if (method === "post" || method === "put" || method === "patch") {
      const axiosResult = !data
        ? await axios[method](`${apiUrl}${url}`, _options)
        : await axios[method](`${apiUrl}${url}`, data, _options);

      return axiosResult;
    }
  }
}

export default Api;
