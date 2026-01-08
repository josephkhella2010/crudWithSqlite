import { createUseStyles } from "react-jss";
import FirstContainer from "./childComponent/FirstContainer";
import InputsSection from "./childComponent/InputsSection";
import type { InputsType } from "../../Utilities/InterfacesType";
import TableContainer from "./childComponent/TableContainer";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import SaveContainer from "./childComponent/SaveContainer";
import SearchContainer from "./childComponent/SearchContainer";

/*  */

const InputArr: InputsType[] = [
  {
    name: "firstname",
    Label: "Frist Name",
  },

  {
    name: "lastname",
    Label: "Last Name",
  },
  {
    name: "email",
    Label: "Email",
  },
  {
    name: "username",
    Label: "User Name",
  },
  {
    name: "usernumber",
    Label: "User Number",
  },
].map((item) => {
  return { ...item, placeHolder: `Please Enter Your ${item.Label}` };
});

/*  */
export const useStyles = createUseStyles({
  wrapper: {
    minHeight: "100dvh",
    width: "100%",
  },
  "@global": {
    body: {
      fontFamily: '"Exo 2", sans-serif',
    },
  },
});

export default function HomePage() {
  const classes = useStyles();
  const { showSaveSection } = useSelector(
    (state: RootState) => state.InputeData
  );

  return (
    <div className={classes.wrapper}>
      <FirstContainer />
      <SearchContainer />
      <InputsSection InputArr={InputArr} />
      <TableContainer />
      {showSaveSection && <SaveContainer InputArr={InputArr} />}
    </div>
  );
}
