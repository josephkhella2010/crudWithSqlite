import { FaSearch } from "react-icons/fa";
import { createUseStyles } from "react-jss";
import DropDownSection from "./DropDownSection";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import {
  setFilteredUser,
  setSearchVal,
} from "../../../store/Slices/InputSlice";

/*  */
export const useStyles = createUseStyles({
  "@global": {
    body: {
      fontFamily: '"Exo 2", sans-serif',
    },
  },
  searchMainContainer: {
    width: "100%",
    height: "100px",
    padding: "100px 20px 100px 20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  searchSection: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "9fr 3fr",
    gap: "30px",
    "@media (max-width: 600px)": {
      gridTemplateColumns: "repeat(1,1fr)",
    },
  },
  searchBarContent: {
    display: "flex",
    alignItems: "center",
    height: "40px",
    borderRadius: "25px",
    cursor: "pointer",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",

    "& input": {
      width: "90%",
      border: "none",
      outline: "none",
      height: "100%",
      padding: " 10px 15px",
      borderRadius: "25px",
      fontStyle: "italic",
      background: "transparent",
      cursor: "pointer",

      "&::placeHolder": {
        fontStyle: "italic",
        fontFamily: "cursive",
        color: "gray",
      },
    },
  },
  searchIconContainer: {
    background: "transparent",
    cursor: "pointer",
  },
});

export default function SearchContainer() {
  const { searchVal, users } = useSelector(
    (state: RootState) => state.InputeData
  );
  const dispatch = useDispatch();
  const classes = useStyles();
  console.log(searchVal);
  /*  */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      dispatch(setFilteredUser(searchVal));
    }
  };

  const handleClick = () => {
    dispatch(setFilteredUser(searchVal));
  };

  console.log("filtered", users);
  /*  */
  return (
    <div className={classes.searchMainContainer}>
      <div className={classes.searchSection}>
        <div className={classes.searchBarContent}>
          <input
            type="text"
            placeholder="Search For User"
            value={searchVal}
            onChange={(e) => {
              const value = e.target.value;
              dispatch(setSearchVal(value));
              dispatch(setFilteredUser(value));
            }}
          />
          <div
            className={classes.searchIconContainer}
            role="button"
            tabIndex={0}
            onMouseMove={(e) => e.currentTarget.focus()}
            onKeyDown={(e) => handleKeyDown(e)}
            onClick={() => handleClick()}
          >
            <FaSearch />
          </div>
        </div>
        <DropDownSection />
      </div>
    </div>
  );
}
