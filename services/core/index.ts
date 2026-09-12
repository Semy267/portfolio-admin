import { Http } from "@/configs/http/http-method";

export const Apis = {
  auth: {
    login: (payload: any) =>
      Http.post<{ access_token: string; user: any }>(
        "/api/auth/login",
        payload,
      ),
    guestLogin: () =>
      Http.post<{ access_token: string; user: any }>("/api/auth/guest", {}),
    me: () => Http.get<any>("/api/auth/me"),
  },

  todos: {
    list: () => Http.get<any[]>("/api/todos"),
    get: (id: string) => Http.get<any>(`/api/todos/${id}`),
    create: (data: any) => Http.post<any>("/api/todos", data),
    update: (id: string, data: any) => Http.put<any>(`/api/todos/${id}`, data),
    delete: (id: string) => Http.delete(`/api/todos/${id}`),
  }
};
