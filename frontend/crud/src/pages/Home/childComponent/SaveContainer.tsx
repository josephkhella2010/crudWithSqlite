import { useEffect, type ChangeEvent } from "react";
import { createUseStyles } from "react-jss";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import type {
  InputsType,
  InputsValType,
} from "../../../Utilities/InterfacesType";
import {
  setCurrentIndex,
  setSaveInputValue,
  setShowSaveSection,
  setUpdateUser,
} from "../../../store/Slices/InputSlice";
import { fetchUpdateUser } from "../../../Utilities/ApiFunctions";
import { IoClose } from "react-icons/io5";

export const useStyles = createUseStyles({
  "@global": {
    "@import": [
      "url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap')",
    ],
  },

  saveMainContainer: {
    minHeight: "100dvh",
    width: "100%",
    backgroundColor: "#000000c7",
    position: "fixed",
    top: "0px",
    left: "0px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  saveInputContainer: {
    color: "#ffffff",
    padding: "30px 20px",
    width: "60%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: "20px",
    borderRadius: "15px",
    backgroundColor: "rgb(255 255 255 / 25%)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    "& button": {
      width: "70%",
      height: "40px",
      borderRadius: "4px",
      border: "10px solid transparent",
      cursor: "pointer",
      fontSize: "20px",
      fontWeight: "520",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  saveInputSection: {
    width: "70%",
    /*  display: "flex",
    flexDirection: "column",
    gap: "15px", */
    display: "grid",
    gridTemplateColumns: "repeat(1, 1fr)",
    gap: "15px",
  },
  saveInputContent: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    "& input": {
      width: "100%",
      height: "40px",
      padding: "10px",
      borderRadius: "5px",
      border: "none",
      outline: "none",
    },
    "& input::placeholder": {
      fontStyle: "italic",
      fontFamily: "cursive",
      color: "gray",
    },
  },
  closeContainer: {
    backgroundColor: "rgb(255 255 255 / 25%)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    position: "absolute",
    top: "10px",
    right: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  closeIcon: {
    color: "white",
    fontSize: "25px",
  },
});
interface inputsProps {
  InputArr: InputsType[];
}
export default function SaveContainer({ InputArr }: inputsProps) {
  const { showSaveSection, saveInputValue, currentIndex } = useSelector(
    (state: RootState) => state.InputeData
  );
  const classes = useStyles();
  const dispatch = useDispatch();

  /* functions */
  useEffect(() => {
    if (showSaveSection) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100dvh";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.minHeight = "100dvh";
    }
    return () => {
      document.body.style.overflow = "auto";
      document.body.style.minHeight = "100dvh";
    };
  }, [showSaveSection]);
  /* handle Change  */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    const key = name as keyof InputsValType;

    const newState: InputsValType = {
      ...saveInputValue,
      [key]: value,
    };
    dispatch(setSaveInputValue(newState));
  };
  console.log(saveInputValue);
  /*  save  function*/
  const handleSave = async () => {
    if (!currentIndex) return;
    const user = await fetchUpdateUser(currentIndex, saveInputValue, dispatch);
    if (!user) return;

    dispatch(
      setUpdateUser({
        id: currentIndex,
        user,
      })
    );
    dispatch(setShowSaveSection(false));
    dispatch(setCurrentIndex(0));

    /*  const index = users.findIndex((u) => u.id === currentIndex); // find by id
    if (index === -1) return;
    const updateUser = [...users];
    updateUser[index] = {
      ...updateUser[index],
      ...saveInputValue,
    };
    dispatch(setUsers(updateUser)); */
    /*  const user = await fetchUpdateUser(currentIndex, saveInputValue);
    if (!currentIndex) return;
    if (!user) return;
    console.log(user);
    const updatedUsers = users.map((u, _i) => {
      const updated = u.id === currentIndex ? { ...u, ...user } : u;
      return updated;
    });
    dispatch(setUsers(updatedUsers)); */
  };

  /*  */
  return (
    <div className={classes.saveMainContainer}>
      <div className={classes.closeContainer}>
        <IoClose
          className={classes.closeIcon}
          onClick={() => dispatch(setShowSaveSection(false))}
        />
      </div>
      <div className={classes.saveInputContainer}>
        <div className={classes.saveInputSection}>
          {InputArr &&
            InputArr.map((item, index) => {
              return (
                <label
                  htmlFor={item.name}
                  key={index}
                  className={classes.saveInputContent}
                >
                  <p>{item.Label}</p>
                  <input
                    type="text"
                    placeholder={item.placeHolder}
                    value={
                      saveInputValue[item.name as keyof typeof saveInputValue]
                    }
                    name={item.name}
                    onChange={(e) => handleChange(e)}
                  />
                </label>
              );
            })}
        </div>
        <button onClick={handleSave}>save</button>
      </div>
    </div>
  );
}
