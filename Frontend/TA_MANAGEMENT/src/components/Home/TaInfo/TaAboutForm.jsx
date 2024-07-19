import React, { useEffect, useState, useCallback } from "react";
import { Input, Button, RadioButton } from "../../index";
import Cat from "../../../assets/cat.jpg";
import { useSelector } from "react-redux";
import { UPDATE_USER } from "../../../graphql/mutations/user.mutations";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER } from "../../../graphql/queries/user.queries";

const capitalizeName = (name) =>
  name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

function TaAboutForm() {
  const userData = useSelector((state) => state.auth.user);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [profilePicture, setProfilePicture] = useState(Cat);
  const [currentAboutValues, setCurrentAboutValues] = useState({
    Name: userData?.name || "User Name",
    Gender: userData?.gender || "Gender",
    Bio: userData?.bio || "Bio",
    Email: userData?.email || "Email",
    Phone: userData?.phoneNumber || "Mobile Number",
    image: null,
  });

  const [updateUserMutation] = useMutation(UPDATE_USER);

  const { data } = useQuery(GET_USER, {
    variables: { idNumber: userData.idNumber },
  });

  useEffect(() => {
    if (data) {
      const { name, gender, bio, email, phoneNumber, profilePicture } = data.getUser;
      setProfilePicture(profilePicture?.picture || Cat);
      setCurrentAboutValues({
        Name: name,
        Gender: capitalizeName(gender || "Male"),
        Bio: bio,
        Email: email,
        Phone: phoneNumber,
        image: currentAboutValues.image
      });
    }
  }, [data]);

  const handleSave = async () => {
    try {
      await updateUserMutation({
        variables: {
          input: {
            idNumber: userData.idNumber,
            ...currentAboutValues
          },
        },
      });
      resetForm();
      setIsFormVisible(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleCancel = () => {
    resetForm();
    setIsFormVisible(false);
  };

  const resetForm = () => {
    setCurrentAboutValues({
      Name: userData?.name || "User Name",
      Gender: userData?.gender || "Gender",
      Bio: userData?.bio || "Bio",
      Email: userData?.email || "Email",
      Phone: userData?.phoneNumber || "Mobile Number",
      image: null,
    });
  };

  const handleChange = useCallback((e) => {
    const { name, value, type } = e.target;
    setCurrentAboutValues((prevData) => ({
      ...prevData,
      [name]: type === "radio" ? value : value
    }));
  }, []);

  const handleImageChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentAboutValues((prevData) => ({ ...prevData, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const editForm = () => setIsFormVisible(true);

  return (
    <div className="flex flex-col gap-5 m-2 lg:m-5 mt-4">
      <h1 className="text-lg font-bold text-gray-800 pl-4">About</h1>
      <div className="flex flex-col justify-center self-center gap-4 w-3/4 bg-custom-gray rounded-xl p-4">
        {!isFormVisible ? (
          <ProfileDisplay
            currentAboutValues={currentAboutValues}
            capitalizeName={capitalizeName}
            editForm={editForm}
            profilePicture={profilePicture}
          />
        ) : (
          <ProfileForm
            currentAboutValues={currentAboutValues}
            handleChange={handleChange}
            handleImageChange={handleImageChange}
            handleSave={handleSave}
            handleCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
}

const ProfileDisplay = React.memo(({ profilePicture, currentAboutValues, capitalizeName, editForm }) => (
  <div className="flex flex-col justify-between self-center gap-4 w-full lg:w-3/4 bg-custom-gray rounded-xl">
    <div className="flex justify-center self-center">
      <img
        src={profilePicture || Cat}
        alt="Profile Image"
        width="150px"
        className="rounded-full"
      />
    </div>
    <div className="flex flex-col gap-2 w-3/4">
      <h1 className="text-2xl font-bold text-custom-black">
        {capitalizeName(currentAboutValues.Name)}
      </h1>
      <p className="text-base font-medium text-gray-500">
        {currentAboutValues.Bio}
      </p>
      <div className="flex flex-row gap-3 text-lg">
        <p className="text-sm text-gray-500 cursor-pointer" title="Gender">
          {currentAboutValues.Gender}
        </p>
        <p className="text-sm text-gray-500 cursor-pointer" title="Mobile Number">
          {currentAboutValues.Phone}
        </p>
        <p className="text-sm text-gray-500 cursor-pointer" title="Email">
          {currentAboutValues.Email}
        </p>
      </div>
      {currentAboutValues.image && (
        <img
          src={currentAboutValues.image}
          alt="Profile"
          className="mt-2 ml-5 h-20 w-20 rounded-full object-cover"
        />
      )}
    </div>
    <Button
      className="bg-custom-black text-sm px-4 py-2 rounded-lg text-white"
      onClick={editForm}
    >
      Edit Profile
    </Button>
  </div>
));

const ProfileForm = React.memo(({ currentAboutValues, handleChange, handleImageChange, handleSave, handleCancel }) => (
  <>
    <Input
      type="text"
      name="Name"
      value={currentAboutValues.Name}
      placeholder="Name"
      className="rounded-md bg-white"
      label="Name"
      onChange={handleChange}
    />
    <Input
      type="text"
      name="Bio"
      value={currentAboutValues.Bio}
      placeholder="Bio"
      className="rounded-md bg-white"
      label="Bio"
      onChange={handleChange}
    />
    <Input
      type="text"
      name="Email"
      value={currentAboutValues.Email}
      placeholder="Email"
      className="rounded-md bg-white"
      label="Email"
      onChange={handleChange}
    />
    <Input
      type="text"
      name="Phone"
      value={currentAboutValues.Phone}
      placeholder="Phone"
      className="rounded-md bg-white"
      label="Phone"
      onChange={handleChange}
    />
    <div className="flex gap-10">
      <RadioButton
        id="male"
        label="Male"
        name="Gender"
        value="Male"
        onChange={handleChange}
        checked={currentAboutValues.Gender === "Male"}
        required
      />
      <RadioButton
        id="female"
        label="Female"
        name="Gender"
        value="Female"
        onChange={handleChange}
        checked={currentAboutValues.Gender === "Female"}
        required
      />
    </div>
    <div className="flex flex-col">
      <label className="inline-block mb-1 pl-1 font-bold text-custom-black">
        Profile Picture
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="px-3 py-2 text-custom-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full rounded-lg bg-white"
      />
      {currentAboutValues.image && (
        <img
          src={currentAboutValues.image}
          alt="Profile"
          className="mt-2 ml-5 h-20 w-20 rounded-full object-cover"
        />
      )}
    </div>
    <div className="flex gap-5 m-5 w-1/2 self-center">
      <Button
        className="bg-custom-black text-sm px-4 py-2 rounded-lg text-white"
        onClick={handleSave}
      >
        Save
      </Button>
      <Button
        className="bg-custom-black text-sm px-4 py-2 rounded-lg text-white"
        onClick={handleCancel}
      >
        Cancel
      </Button>
    </div>
  </>
));

export default TaAboutForm;
