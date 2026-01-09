import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  DorpDownArrType,
  InputsValType,
  UserType,
} from "../../Utilities/InterfacesType";
interface InputSliceType {
  inputValue: InputsValType;
  saveInputValue: InputsValType;
  users: UserType[];
  filteredUsers: UserType[];
  currentIndex: number;
  showSaveSection: boolean;
  DropDownVal: DorpDownArrType;
  showDropDown: boolean;
  searchVal: string;
  showLoading: boolean;
}
const initialState: InputSliceType = {
  users: [],
  filteredUsers: [],
  currentIndex: 0,
  showSaveSection: false,
  showDropDown: false,
  searchVal: "",
  showLoading: false,
  inputValue: {
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    usernumber: "",
  },
  saveInputValue: {
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    usernumber: "",
  },
  DropDownVal: {
    name: "Sort by first name",
    val: "",
  },
};

const InputSlice = createSlice({
  name: "InputSlice",
  initialState,
  reducers: {
    //
    setCurrentIndex: (state, action: PayloadAction<number>) => {
      state.currentIndex = action.payload;
    },
    setShowSaveSection: (state, action: PayloadAction<boolean>) => {
      state.showSaveSection = action.payload;
    },
    // DropdownVal
    setDropDownVal: (state, action: PayloadAction<DorpDownArrType>) => {
      state.DropDownVal = action.payload;
    },
    setShowDropDown: (state, action: PayloadAction<boolean>) => {
      state.showDropDown = action.payload;
    },
    setShowLoading: (state, action: PayloadAction<boolean>) => {
      state.showLoading = action.payload;
    },
    // users inputValue
    setInputValue: (state, action: PayloadAction<InputsValType>) => {
      state.inputValue = action.payload;
    },
    setSaveInputValue: (state, action: PayloadAction<InputsValType>) => {
      state.saveInputValue = action.payload;
    },
    // user function
    setAddUser: (state, action: PayloadAction<UserType>) => {
      state.users.push(action.payload);
      state.filteredUsers.push(action.payload);
    },
    setUsers: (state, action: PayloadAction<UserType[]>) => {
      state.users = action.payload;
      state.filteredUsers = action.payload; // ✅ IMPORTANT
    },
    setDeleteUser: (state, action: PayloadAction<number>) => {
      const restUsers = state.users
        .filter((u) => u.id !== action.payload)
        .map((item, ind) => {
          const updated = { ...item, index: ind + 1 };
          return updated;
        });

      state.users = restUsers;
      state.filteredUsers = restUsers;
    },
    setUpdateUser: (state, action: PayloadAction<any>) => {
      const { id, user } = action.payload;

      //     const index = state.users.findIndex((u) => u.id === id);
      //if (index === -1) return;
      //state.users[index] = { ...state.users[index], ...user };
      let UpdateUser = [...state.users];
      UpdateUser = UpdateUser.map((item, _index) => {
        const update = item.id === id ? { ...item, ...user } : item;
        return update;
      });
      state.users = UpdateUser;
      state.filteredUsers = UpdateUser;
    },
    setSortUser: (state, action: PayloadAction<string>) => {
      const sortedUser = [...state.filteredUsers].sort((a, b) => {
        let sorted = 0;
        if (action.payload === "ascending") {
          sorted = a.firstname.localeCompare(b.firstname);
        }
        if (action.payload === "descending") {
          sorted = b.firstname.localeCompare(a.firstname);
        }
        return sorted;
      });
      state.filteredUsers = sortedUser;
    },
    setSearchVal: (state, action: PayloadAction<string>) => {
      state.searchVal = action.payload;
    },
    setFilteredUser: (state, action: PayloadAction<string>) => {
      const searchWord = action.payload.trim().toLowerCase();

      let filteredUser = [...state.users];

      /// or
      //let filteredUser = [...state.filteredUsers];
      // if (searchWord === "") {
      //state.filteredUsers = state.users;
      // return;
      // }
      filteredUser = filteredUser.filter((item) => {
        return (
          item.firstname.toLowerCase().includes(searchWord) ||
          item.lastname.toLowerCase().includes(searchWord) ||
          item.email.toLowerCase().includes(searchWord) ||
          item.username.toLowerCase().includes(searchWord)
        );
      });
      state.filteredUsers = filteredUser;
    },
  },
});

export const {
  setInputValue,
  setSaveInputValue,
  setAddUser,
  setUsers,
  setDeleteUser,
  setCurrentIndex,
  setShowSaveSection,
  setUpdateUser,
  setDropDownVal,
  setShowDropDown,
  setSearchVal,
  setSortUser,
  setFilteredUser,
  setShowLoading,
} = InputSlice.actions;
export default InputSlice.reducer;
