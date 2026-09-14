import { Http } from "@/configs/http/http-method";

export const Apis = {
  auth: {
    login: (payload: any) =>
      Http.post<{ access_token: string; user: any }>(
        "/api/v1/auth/sign-in/email",
        payload,
      ),
    guestLogin: () =>
      Http.post<{ access_token: string; user: any }>(
        "/api/v1/auth/anonymous",
        {},
      ),
    me: () => Http.get<any>("/api/v1/auth/get-session"),
  },

  profile: {
    get: () => Http.get<IResponse<ICmsProfile>>("/api/v1/admin/profile"),
    update: (data: Partial<ICmsProfile>) =>
      Http.patch<IResponse<ICmsProfile>>("/api/v1/admin/profile", data),
  },

  projects: {
    list: (params?: any) =>
      Http.get<IResponse<ICmsProjectListResponse>>(
        "/api/v1/admin/projects",
        params,
      ),
    get: (id: string) =>
      Http.get<IResponse<ICmsProject>>(`/api/v1/admin/projects/${id}`),
    create: (data: any) =>
      Http.post<IResponse<ICmsProject>>("/api/v1/admin/projects", data),
    update: (id: string, data: any) =>
      Http.patch<IResponse<ICmsProject>>(`/api/v1/admin/projects/${id}`, data),
    delete: (id: string) =>
      Http.delete<IResponse<null>>(`/api/v1/admin/projects/${id}`),
    togglePublish: (id: string) =>
      Http.post<IResponse<ICmsProject>>(
        `/api/v1/admin/projects/${id}/publish`,
        {},
      ),
    toggleFeatured: (id: string) =>
      Http.post<IResponse<ICmsProject>>(
        `/api/v1/admin/projects/${id}/featured`,
        {},
      ),
  },

  technologies: {
    list: () =>
      Http.get<IResponse<ICmsTechnology[]>>("/api/v1/admin/technologies"),
    get: (id: string) =>
      Http.get<IResponse<ICmsTechnology>>(`/api/v1/admin/technologies/${id}`),
    create: (data: any) =>
      Http.post<IResponse<ICmsTechnology>>("/api/v1/admin/technologies", data),
    update: (id: string, data: any) =>
      Http.patch<IResponse<ICmsTechnology>>(
        `/api/v1/admin/technologies/${id}`,
        data,
      ),
    delete: (id: string) =>
      Http.delete<IResponse<null>>(`/api/v1/admin/technologies/${id}`),
  },

  skills: {
    list: () => Http.get<IResponse<ICmsSkill[]>>("/api/v1/admin/skills"),
    get: (id: string) =>
      Http.get<IResponse<ICmsSkill>>(`/api/v1/admin/skills/${id}`),
    create: (data: any) =>
      Http.post<IResponse<ICmsSkill>>("/api/v1/admin/skills", data),
    update: (id: string, data: any) =>
      Http.patch<IResponse<ICmsSkill>>(`/api/v1/admin/skills/${id}`, data),
    delete: (id: string) =>
      Http.delete<IResponse<null>>(`/api/v1/admin/skills/${id}`),
  },

  experiences: {
    list: () =>
      Http.get<IResponse<ICmsExperience[]>>("/api/v1/admin/experiences"),
    get: (id: string) =>
      Http.get<IResponse<ICmsExperience>>(`/api/v1/admin/experiences/${id}`),
    create: (data: any) =>
      Http.post<IResponse<ICmsExperience>>("/api/v1/admin/experiences", data),
    update: (id: string, data: any) =>
      Http.patch<IResponse<ICmsExperience>>(
        `/api/v1/admin/experiences/${id}`,
        data,
      ),
    delete: (id: string) =>
      Http.delete<IResponse<null>>(`/api/v1/admin/experiences/${id}`),
  },

  socialLinks: {
    list: () =>
      Http.get<IResponse<ICmsSocialLink[]>>("/api/v1/admin/social-links"),
    get: (id: string) =>
      Http.get<IResponse<ICmsSocialLink>>(`/api/v1/admin/social-links/${id}`),
    create: (data: any) =>
      Http.post<IResponse<ICmsSocialLink>>("/api/v1/admin/social-links", data),
    update: (id: string, data: any) =>
      Http.patch<IResponse<ICmsSocialLink>>(
        `/api/v1/admin/social-links/${id}`,
        data,
      ),
    delete: (id: string) =>
      Http.delete<IResponse<null>>(`/api/v1/admin/social-links/${id}`),
  },

  media: {
    list: (params?: { search?: string }) =>
      Http.get<IResponse<ICmsMedia[]>>("/api/v1/admin/media", params),
    get: (id: string) =>
      Http.get<IResponse<ICmsMedia>>(`/api/v1/admin/media/${id}`),
    upload: (formData: FormData) =>
      Http.postForm<IResponse<ICmsMedia>>("/api/v1/admin/media", formData),
    delete: (id: string) =>
      Http.delete<IResponse<null>>(`/api/v1/admin/media/${id}`),
  },
  theme: {
    get: () => Http.get<IResponse<ICmsTheme>>("/api/v1/admin/theme"),
    update: (data: Partial<ICmsTheme>) =>
      Http.patch<IResponse<ICmsTheme>>("/api/v1/admin/theme", data),
  },
};
