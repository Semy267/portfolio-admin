import { Base } from "./interceptor";

export class Http {
  static async get<T>(url: string, params?: unknown) {
    const response = await Base.get<T>(url, { params });
    return response?.data;
  }

  static async post<T>(url: string, data: unknown, options?: any) {
    const response = await Base.post<T>(url, data, options);
    return response?.data;
  }

  static async put<T>(url: string, data: unknown) {
    const response = await Base.put<T>(url, data);
    return response?.data;
  }

  static async patch<T>(url: string, data: unknown) {
    const response = await Base.patch<T>(url, data);
    return response?.data;
  }

  static async delete<T>(url: string) {
    const response = await Base.delete<T>(url);
    return response?.data;
  }

  // ✅ Fungsi khusus untuk FormData dengan POST
  static async postForm<T>(url: string, data: Record<string, any> | FormData) {
    let formData: FormData;

    if (data instanceof FormData) {
      formData = data;
    } else {
      formData = new FormData();
      for (const key in data) {
        if (data[key] !== undefined && data[key] !== null) {
          formData.append(key, data[key]);
        }
      }
    }

    const response = await Base.post<T>(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response?.data;
  }

  // Tambahkan ke dalam class Http
  static async putForm<T>(url: string, data: Record<string, any> | FormData) {
    let formData: FormData;

    if (data instanceof FormData) {
      formData = data;
    } else {
      formData = new FormData();
      for (const key in data) {
        if (data[key] !== undefined && data[key] !== null) {
          formData.append(key, data[key]);
        }
      }
    }

    const response = await Base.put<T>(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response?.data;
  }
}
