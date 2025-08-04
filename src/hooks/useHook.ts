import { useQuery } from "@tanstack/react-query";
import { getStudentLessons, teacherService } from "../service";

export const useStudentLessons = (studentId: number) => {
  return useQuery({
    queryKey: ["student-lessons", studentId],
    queryFn: () =>
      studentId
        ? getStudentLessons(studentId)
        : Promise.resolve({ lessons: [] }),
    enabled: !!studentId,
    select: (res) => res.lessons,
  });
};


export const useTeacherGroupStudents = (id?: number) => {
  return useQuery({
    enabled: !!id,
    queryKey: ["teacher-group-students", id],
    queryFn: () => teacherService.getTeacherGroupById(id!),
  });
};

export const useTeacherGroups = () => {
  return useQuery({
    queryKey: ["teacher-my-groups"],
    queryFn: () => teacherService.getMyGroups(),
  });
};


export const useTeacherProfile = (id: number) => {
  return useQuery({
    queryKey: ["teacher-profile", id],
    queryFn: () => teacherService.getTeacherById(id),
    enabled: !!id,
  });
};
