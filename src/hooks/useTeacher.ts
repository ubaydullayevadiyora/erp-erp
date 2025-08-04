import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { teacherService } from "@service";
import { type Teacher, type ParamsType } from "@types";

export const useTeacher = (params?: ParamsType) => {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["teachers", params],
    queryFn: () => teacherService.getTeachers(params!),
  });

  const useTeacherCreate = () =>
    useMutation({
      mutationFn: (data: Teacher) => teacherService.createTeacher(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["teachers"] });
      },
    });

  const useTeacherUpdate = () =>
    useMutation({
      mutationFn: ({ id, ...rest }: Teacher) =>
        teacherService.updateTeacher(id, rest),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["teachers"] });
      },
    });

  const useTeacherDelete = () =>
    useMutation({
      mutationFn: (id: number) => teacherService.deleteTeacher(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["teachers"] });
      },
    });

  const useTeacherUploadImage = () =>
    useMutation({
      mutationFn: ({ data, id }: { data: FormData; id: number }) =>
        teacherService.setImage(data, id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["teachers"] });
      },
    });


  const useTeacherProfile = (id: number) =>
    useQuery({
      queryKey: ["teacher", id],
      queryFn: () => teacherService.getTeacherById(id),
    });

  const useTeacherChangePassword = () =>
    useMutation({
      mutationFn: ({
        id,
        data,
      }: {
        id: number;
        data: {
          oldPassword: string;
          password: string;
          confirmPassword: string;
        };
      }) =>
        teacherService.changePassword(id, {
          oldPassword: data.oldPassword,
          newPassword: data.password,
        }),
    });

  return {
    data,
    useTeacherCreate,
    useTeacherUpdate,
    useTeacherDelete,
    useTeacherUploadImage,
    useTeacherProfile, 
    useTeacherChangePassword, 
  };
};
