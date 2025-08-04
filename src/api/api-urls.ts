export class ApiUrls {
  // AUTH
  public static AUTH: string = "/log-in";
  public static LOGOUT: string = "/log-out";
  public static REFRESH_TOKEN: string = "/refresh-token";

  // GROUPS
  public static GROUPS: string = "/group";

  // COURSES
  public static COURSES: string = "/courses";

  // STUDENTS
  public static STUDENT: string = "/students";

  // TEACHER
  public static TEACHER: string = "/teacher";
  public static TEACHER_GROUPS: string = "/group";
  public static TEACHER_MY_GROUP: string = "group-teachers/my-groups";
  public static TEACHER_SCHEDULE = (id: number | string): string =>
    `${this.TEACHER}/${id}/schedule`;

  // BRANCH
  public static BRANCH: string = "/branches";

  // ROOMS
  public static ROOM: string = "/rooms";

  // ADMIN
  public static ADMIN: string = "/admin";
  public static ADMIN_PROFILE: string = ApiUrls.ADMIN + "/profile";

  // LESSONS
  public static LESSONS: string = "/lessons";
  public static GROUP_LESSONS: string = ApiUrls.LESSONS + "/group";
  public static UPDATE_LESSONS_STATUS_AND_NOTES = (id: number): string =>
    `${this.LESSONS}/${id}/status`;

  // GROUP TEACHERS
  public static GROUP_TEACHERS: string = "/group-teachers";
  public static GROUP_TEACHERS_BY_GROUP_ID: string =
    ApiUrls.GROUP_TEACHERS + "/by-group";

  // GROUP STUDENTS
  public static GROUP_STUDENTS: string = "/group-students";
  public static GROUP_STUDENTS_BY_GROUP_ID: string =
    ApiUrls.GROUP_STUDENTS + "/by-group";

  // ATTENDANCE
  public static STUDENT_ATTENDANCE = (studentId: number | string): string =>
    `/students/${studentId}/attendance`;

  // NOTIFICATIONS
  public static NOTIFICATIONS: string = "/notifications";
  public static NOTIFICATION_BY_ID = (id: number | string): string =>
    `${this.NOTIFICATIONS}/${id}`;

  // DASHBOARD
  public static DASHBOARD: string = "/dashboard";

  // STATS
  public static STATISTICS: string = "/statistics";
  public static GROUP_STATS = (groupId: number | string): string =>
    `${this.STATISTICS}/groups/${groupId}`;
}
