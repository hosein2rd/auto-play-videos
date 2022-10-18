import axios, { AxiosError } from "axios";
import { Dispatch, Middleware } from "redux";
import { APIAction } from "../../types";

const api: Middleware =
  ({ dispatch }) =>
  (next: Dispatch<APIAction>) =>
  async (action: APIAction) => {
    if (action.type === "apiRequest") return next(action);

    const {
      url,
      method = "GET",
      data,
      onError,
      onSuccess,
      onStart,
    } = action.payload;

    next(action);

    if (onStart) dispatch({ type: onStart, payload: {} });

    axios
      .request({
        method,
        data,
        url,
      })
      .then(({ data }) => dispatch({ type: onSuccess, payload: data }))
      .catch(
        (e: AxiosError) =>
          onError && dispatch({ type: onError, payload: e.message })
      );
  };

export default api;
