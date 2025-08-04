import { apiConfig } from "@api/config";
import { ApiUrls } from "@api/api-urls";
import { type Teacher, type ParamsType } from "@types";

export const teacherService = {
  async getTeachers(params: ParamsType) {
    const res = await apiConfig().getRequest(ApiUrls.TEACHER, params);
    return res;
  },

  async getTeacherStudents(params: ParamsType, id: number) {
    const res = await apiConfig().getRequest(
      `${ApiUrls.TEACHER}/${id}`,
      params
    );
    return res;
  },

  async createTeacher(model: Teacher): Promise<any> {
    const res = await apiConfig().postRequest(ApiUrls.TEACHER, model);
    return res;
  },

  async updateTeacher(id: number, model: Omit<Teacher, "id">): Promise<any> {
    const res = await apiConfig().patchRequest(
      `${ApiUrls.TEACHER}/${id}`,
      model
    );
    return res;
  },

  async deleteTeacher(id: number): Promise<any> {
    const res = await apiConfig().deleteRequest(`${ApiUrls.TEACHER}/${id}`);
    return res;
  },

  async setImage(data: FormData, id: number): Promise<string> {
    const res = await apiConfig().postRequest(
      `${ApiUrls.TEACHER}/${id}/avatar`,
      data
    );
    return res?.data?.avatarUrl ?? "";
  },

  async changePassword(
    id: number,
    body: { oldPassword: string; newPassword: string }
  ): Promise<any> {
    const res = await apiConfig().patchRequest(
      `${ApiUrls.TEACHER}/${id}/change-password`,
      body
    );
    return res;
  },

  async getTeacherGroups() {
    const res = await apiConfig().getRequest(ApiUrls.TEACHER_GROUPS);
    return res;
  },

  async getTeacherGroupById(id: number) {
    const res = await apiConfig().getRequest(
      `${ApiUrls.GROUP_STUDENTS_BY_GROUP_ID}/${id}`
    );
    return res;
  },

  async getTeacherById(id: number) {
    const res = await apiConfig().getRequest(`${ApiUrls.TEACHER}/${id}`);
    return res;
  },

  async getMyGroups() {
    const res = await apiConfig().getRequest(`${ApiUrls.TEACHER_MY_GROUP}`);
    return res;
  },
};
