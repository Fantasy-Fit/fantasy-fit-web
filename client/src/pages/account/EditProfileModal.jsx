import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/auth/userSlice';
import { useForm } from 'react-hook-form';
import { useUpdateProfileMutation } from '../../store/auth/authApiSlice';

const EditProfileModal = () => {
    const { id, username, email, location, avatar, gender } = useSelector(selectCurrentUser);
    const [updateProfile, { isLoading }] = useUpdateProfileMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            id: id,
            username: username,
            email: email,
            location: location,
            avatar: avatar,
            gender: gender
        }
    });

    const onSubmit = async (data) => {
        const { id, username, email, location, avatar, gender } = data;
        console.log(data)
        const regData = await updateProfile({ id, username, email, location, avatar, gender }).unwrap();
    };
    const closeEditProfileModal = () => {
        const modal = document.getElementById("edit-profile-modal");
        modal.style.display = "none";
    };

    return (
        <div id="edit-profile-modal">
            <div className="signupScreen modal-content">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1>Edit Profile</h1>
                    <input
                        placeholder={username}
                        type="text"
                        {...register("username")}
                    />
                    <input
                        placeholder={email}
                        type="email"
                        {...register("email")}
                    />
                    <input
                        placeholder={location}
                        type="text"
                        {...register("location")}
                    />
                    <input
                        placeholder={avatar}
                        type="text"
                        {...register("avatar")}
                    />
                    <input
                        placeholder={gender}
                        type="text"
                        {...register("gender")} />
                    <button type="submit">Update</button>

                    {[
                        errors.email?.message,
                        errors.password?.message,
                        errors.passwordConfirm?.message,
                    ]}
                </form>
                <button onClick={closeEditProfileModal}>Cancel</button>
            </div>
        </div>
    );
};

export default EditProfileModal;