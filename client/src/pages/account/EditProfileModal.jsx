import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser, setUserInfo } from '../../store/auth/userSlice';
import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import { useUpdateProfileMutation } from '../../store/auth/authApiSlice';

const EditProfileModal = () => {
    const dispatch = useDispatch();
    const [cookies] = useCookies(["token"])
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
    // console.log(cookies.token)

    const onSubmit = async (data) => {
        // const authToken = cookies.token
        const { id, username, email, location, avatar, gender } = data;

        const regData = await updateProfile({
            id, username, email, location, avatar, gender
        }
        ).unwrap();
        dispatch(setUserInfo({ user: regData }));
        localStorage.setItem("user", JSON.stringify(regData));
        closeEditProfileModal();
    };

    const closeEditProfileModal = () => {
        const modal = document.getElementById("edit-profile-modal");
        modal.style.display = "none";
    };

    useEffect(() => {
        const modal = document.getElementById("edit-profile-modal");
        window.onclick = (e) => {
            if (e.target == modal) {
                modal.style.display = 'none';
            }
        }
    }, []);

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