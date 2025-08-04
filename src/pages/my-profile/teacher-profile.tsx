import { message } from "antd";
import { useTeacher } from "@hooks";
import { Profile } from "@components";

const TeacherProfile = () => {
  const {
    useTeacherProfile,
    useTeacherUploadImage,
    useTeacherUpdate,
    useTeacherChangePassword,
  } = useTeacher();

  const id = Number(localStorage.getItem("userId"));

  const { data: teacher, isLoading, isError, refetch } = useTeacherProfile(id);
  const { mutate: uploadAvatar } = useTeacherUploadImage();
  const { mutate: updateProfile, isPending: isUpdating } = useTeacherUpdate();
  const { mutate: changePassword, isPending: isChanging } =
    useTeacherChangePassword();

  const handleUpload = (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    uploadAvatar(
      { id, data: formData },
      {
        onSuccess: () => {
          message.success("Avatar updated successfully");
          refetch();
        },
        onError: () => {
          message.error("Avatar upload failed");
        },
      }
    );
  };

  const handleSave = (values: any) => {
    updateProfile(
      { id, ...values },
      {
        onSuccess: () => {
          message.success("Profile updated");
          refetch();
        },
        onError: () => {
          message.error("Failed to update profile");
        },
      }
    );
  };

  const handlePasswordChange = (values: any) => {
    if (values.password !== values.confirmPassword) {
      message.error("Passwords do not match");
      return;
    }

    changePassword(
      { id, data: values },
      {
        onSuccess: () => {
          message.success("Password changed successfully");
        },
        onError: () => {
          message.error("Failed to change password");
        },
      }
    );
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError || !teacher?.data) return <p>Error loading profile</p>;

  const t = teacher.data;

  return (
    <Profile
      type="teacher"
      onUpload={handleUpload}
      onSave={handleSave}
      onPasswordChange={handlePasswordChange}
      loading={isUpdating || isChanging}
      data={{
        firstName: t.first_name,
        lastName: t.last_name,
        email: t.email,
        phone: t.phone,
        role: t.role,
        city: t.city,
        country: t.country,
        dob: t.dob,
        postal: t.postal,
        avatar: t.avatar_url,
      }}
    />
  );
};

export default TeacherProfile;
