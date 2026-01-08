import { createUseStyles } from "react-jss";
import { DorpDownArr } from "../../../Utilities/Arrays";
import { FaAngleDown } from "react-icons/fa";
import type { DorpDownArrType } from "../../../Utilities/InterfacesType";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import {
  setDropDownVal,
  setShowDropDown,
  setSortUser,
} from "../../../store/Slices/InputSlice";
import { useEffect, useRef } from "react";

/*  */
export const useStyles = createUseStyles({
  "@global": {
    body: {
      fontFamily: '"Exo 2", sans-serif',
    },
  },
  DropDownContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "column",
    position: "relative",
  },
  DropDownSection: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    alignItems: "center",
    maxWidth: "300px",
    flexShrink: 0,
    borderRadius: "5px",
    cursor: "pointer",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",

    "@media (max-width: 800px)": {
      fontSize: "12px",
    },
    "@media (max-width: 530px)": {
      fontSize: "16px",
      maxWidth: "200px",
    },
  },
  DropdownContent: {
    maxWidth: "300px",
    position: "absolute",
    top: "105%",
    left: "0px",
    width: "100%",
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    transition: "opacity 0.5s linear",
    borderRadius: "5px",
    backgroundColor: "#ffffff",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",

    "@media (max-width: 530px)": {
      fontSize: "16px",
      width: "100%",
      maxWidth: "200px",
    },
    "& li": {
      display: "flex",
      alignItems: "center",
      padding: "15px",
    },
    "& li:nth-of-type(1)": {},
    "& li:nth-of-type(2)": {
      borderTop: "1px solid black",
    },
  },
  showDropdown: {
    opacity: "1",
    zIndex: "10",
    transition: "opacity 0.5s linear",
    pointerEvents: "auto",
  },
  hideDropdown: {
    opacity: "0",
    pointerEvents: "none",
    transition: "opacity 0.5s linear",
  },
});
export default function DropDownSection() {
  const classes = useStyles();
  const { DropDownVal, showDropDown } = useSelector(
    (state: RootState) => state.InputeData
  );
  const dropdownContainer = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const Arr = DorpDownArr;
  const handleDropDownValue = (item: DorpDownArrType) => {
    dispatch(setDropDownVal(item));
  };
  /*  */
  useEffect(() => {
    function clickOut(event: MouseEvent) {
      console.log();
      if (
        dropdownContainer.current &&
        !dropdownContainer.current.contains(event.target as Node)
      ) {
        dispatch(setShowDropDown(false));
      }
    }
    if (showDropDown) {
      document.addEventListener("mousedown", clickOut);
    }

    return () => {
      window.removeEventListener("mousedown", clickOut);
    };
  }, [showDropDown, dispatch]);
  /*  */
  const handleToggleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      dispatch(setShowDropDown(!showDropDown));
    }
  };
  /*  */
  return (
    <div className={classes.DropDownContainer} ref={dropdownContainer}>
      <div
        className={classes.DropDownSection}
        onMouseEnter={(e) => e.currentTarget.focus()}
        onClick={() => dispatch(setShowDropDown(!showDropDown))}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => handleToggleKeyDown(e)}
      >
        <div>
          <p>{DropDownVal.name}</p>
        </div>
        <FaAngleDown
          style={{
            transform: `${showDropDown ? "rotate(180deg)" : "rotate(0deg)"}`,
            transition: "transform 0.3s linear",
          }}
        />
      </div>
      <div>
        <ul
          className={`${classes.DropdownContent}
         ${showDropDown ? classes.showDropdown : classes.hideDropdown}`}
        >
          {Arr &&
            Arr.map((item, index) => {
              return (
                <li
                  key={index}
                  onMouseEnter={(e) => e.currentTarget.focus()}
                  onClick={() => {
                    handleDropDownValue(item);
                    dispatch(setShowDropDown(false));
                    dispatch(setSortUser(item.val));
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      dispatch(setShowDropDown(false));
                      handleDropDownValue(item);
                    }
                  }}
                >
                  {item.name}
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
