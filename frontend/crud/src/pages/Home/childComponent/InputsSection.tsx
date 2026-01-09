import { createUseStyles } from "react-jss";
import type {
  InputsType,
  InputsValType,
} from "../../../Utilities/InterfacesType";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { setAddUser, setInputValue } from "../../../store/Slices/InputSlice";
import { AddUse } from "../../../Utilities/ApiFunctions";
import { Toaster } from "react-hot-toast";

export const useStyles = createUseStyles({
  inputConatiner: {
    width: "100%",
    padding: "30px 20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: "30px",
  },
  inputMainSection: {
    width: "70%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: "50px 30px",
    gap: "30px",
    borderRadius: "5px",
    backgroundColor: "rgb(151 149 150 / 44%)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(255, 255, 255, 0.25)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
    "@media (max-width: 900px)": {
      width: "100%",
    },
  },
  inputSection: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(2,1fr)",
    gap: "10px 50px",

    "@media (max-width: 900px)": {
      width: "100%",
    },
    "@media (max-width: 600px)": {
      gridTemplateColumns: "repeat(1,1fr)",
    },
  },
  inputContent: {
    width: "100%",
    //background: "green",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    "& input": {
      width: "100%",
      height: "40px",
      padding: "10px",
      borderRadius: "4px",
      border: "1px solid black",
    },
    "& p": {
      fontWeight: "700",
    },
  },
  btnContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    "& button": {
      padding: "10px 12px",
      width: "200px",
      borderRadius: "5px",
      border: "1px solid transparent",
      cursor: "pointer",
      "@media (max-width: 600px)": {
        width: "100%",
      },
    },
  },
});

interface InputeSectionPropsType {
  InputArr: InputsType[];
}
export default function InputsSection({ InputArr }: InputeSectionPropsType) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { inputValue, users } = useSelector(
    (state: RootState) => state.InputeData
  );
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: keyof InputsValType
  ) => {
    const { value } = e.target;
    dispatch(
      setInputValue({
        ...inputValue,
        [name]: value,
      })
    );
  };

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUser = await AddUse(
      users,
      dispatch,
      inputValue.firstname,
      inputValue.lastname,
      inputValue.email,
      inputValue.username,
      inputValue.usernumber
    );
    if (!newUser) return;

    dispatch(setAddUser(newUser));
  };

  return (
    <div className={classes.inputConatiner}>
      <Toaster />
      <form className={classes.inputMainSection} onSubmit={handleForm}>
        <div className={classes.inputSection}>
          {InputArr &&
            InputArr.map((item, ind) => {
              return (
                <label
                  htmlFor={item.name}
                  key={ind}
                  className={classes.inputContent}
                >
                  <p>{item.Label}</p>
                  <input
                    type="text"
                    placeholder={item.placeHolder}
                    name={item.name}
                    id={item.name}
                    value={inputValue[item.name as keyof InputsValType]}
                    onChange={(e) =>
                      handleInputChange(e, item.name as keyof InputsValType)
                    }
                  />
                </label>
              );
            })}
        </div>
        <div className={classes.btnContainer}>
          <button type="submit"> submit</button>
        </div>
      </form>
    </div>
  );
}
