export type APIPayload = {
  url: string;
  method?: "GET" | "POST" | "PUT" | "PATCH";
  data?: any;
  onSuccess?: string;
  onError?: string;
  onStart?: string;
};

export type APIAction = {
  type: string;
  payload: APIPayload;
};

export type Video = {
  type: string;
  id: string;
  attributes: { id: string; title: string; preview_src: string };
};
