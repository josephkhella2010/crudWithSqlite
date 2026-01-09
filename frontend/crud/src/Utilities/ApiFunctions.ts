import axios from "axios";
import toast from "react-hot-toast";
import type { InputsValType } from "./InterfacesType";
import { setShowLoading } from "../store/Slices/InputSlice";
import type { AppDispatch } from "../store/store";

export const getUsers = async (dispatch: AppDispatch) => {
  dispatch(setShowLoading(true));

  try {
    const response = await axios.get(
      "https://crud-backend-3dgx.onrender.com/api/users"
    );
    const { users } = response.data;
    return users;
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setShowLoading(false));
  }
};

export const AddUse = async (
  users: InputsValType[],
  dispatch: any,
  firstname: string,
  lastname: string,
  email: string,
  username: string,
  usernumber: string
) => {
  dispatch(setShowLoading(true));

  try {
    if (!firstname || !lastname || !email || !username || !usernumber) {
      toast.error("please fill all fields");
      return;
    }
    const existingUser = users.find(
      (u) =>
        u.email === email ||
        u.username === username ||
        u.usernumber === usernumber
    );
    if (existingUser) {
      toast.error("User is ALready exist");
      return null;
    }
    const newUser = {
      firstname,
      lastname,
      email,
      username,
      usernumber,
    };
    const response = await axios.post(
      "https://crud-backend-3dgx.onrender.com/api/add-user",
      newUser
    );

    return response.data.user;
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setShowLoading(false));
  }
};

export const fetchDeleteUser = async (dispatch: AppDispatch, id?: number) => {
  dispatch(setShowLoading(true));

  try {
    const response = await axios.delete(
      `https://crud-backend-3dgx.onrender.com/api/delete-user/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setShowLoading(false));
  }
};
export const fetchUpdateUser = async (
  id: number,
  saveInputValue: InputsValType,
  dispatch: AppDispatch
) => {
  dispatch(setShowLoading(true));

  try {
    const response = await axios.put(
      `https://crud-backend-3dgx.onrender.com/api/update-user/${id}`,
      saveInputValue
    );

    const { user } = response.data;
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    dispatch(setShowLoading(false));
  }
};
