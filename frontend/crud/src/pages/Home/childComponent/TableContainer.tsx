import { createUseStyles } from "react-jss";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { useEffect } from "react";
import { fetchDeleteUser, getUsers } from "../../../Utilities/ApiFunctions";
import {
  setCurrentIndex,
  setDeleteUser,
  setSaveInputValue,
  setShowSaveSection,
  setUsers,
} from "../../../store/Slices/InputSlice";
import { IoTrash } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";

const useStyles = createUseStyles({
  tableMainContainer: {
    padding: "100px 20px",
    minHeight: "100vh",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#ffffff",
    tableLayout: "fixed", // ✅ important
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
  },

  th: {
    padding: "12px",
    textAlign: "left",
    backgroundColor: "#798bb5ff",
    color: "#ffffff",
    fontWeight: 600,
    border: "1px solid #0f172a",
    whiteSpace: "normal",
    wordBreak: "break-word",
    overflowWrap: "anywhere",

    "@media (max-width: 600px)": {
      fontSize: "8px",
      padding: "3px",
      textAlign: "center",
    },
  },

  td: {
    /*   padding: "10px 12px",
    textAlign: "left",
    border: "1px solid #e5e7eb",
    whiteSpace: "normal",
    wordBreak: "break-word",
    overflowWrap: "anywhere",
    height: "100%",
    backgroundColor: "red", */
    padding: "10px 12px",
    border: "1px solid #e5e7eb",
    whiteSpace: "normal",
    wordBreak: "break-word",
    overflowWrap: "anywhere",
    verticalAlign: "middle",

    // ✅ Only for the action buttons cell
    "&.btnCell": {
      display: "flex",
      alignItems: "stretch",
    },
    "@media (max-width: 600px)": {
      fontSize: "8px",
      padding: "3px",
      textAlign: "center",
    },
  },

  tr: {
    height: "auto",
    "&:nth-child(even)": {
      backgroundColor: "#f1f5f9",
    },
    "&:hover": {
      backgroundColor: "#e0f2fe",
    },
  },

  "@global": {
    body: {
      margin: 0,
      fontFamily: '"Exo 2", sans-serif',
    },
  },
  btnContainer: {
    display: "flex",
    gap: "15px",
    justifyContent: "center",
    alignItems: "stretch", // stretch buttons vertically
    flex: 1, // fill td height
    "& button": {
      flex: 1, // fill container height
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: "1px solid black",
      backgroundColor: "transparent",
      cursor: "pointer",
    },
    "& button:first-of-type": {
      color: "green",
    },
    "& button:nth-of-type(2)": {
      color: "red",
    },
    "@media (max-width: 600px)": {
      flexDirection: "column",
      gap: "5px",
      "& button": {
        flex: "unset", // allow height shrink for column layout
        width: "100%",
      },
    },
  },

  /*   btnContainer: {
    display: "flex",
    gap: "15px",
    justifyContent: "center",
    "@media (max-width: 600px)": {
      flexDirection: "column",
      gap: "5px",
    },
    "& button": {
      backgroundColor: "transparent",
      padding: "8px",
      border: "1px solid black",
      cursor: "pointer",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      "@media (max-width: 600px)": {
        width: "100%",
        padding: "0px",
      },
    },
    "& button:first-of-type": {
      color: "green",
    },
    "& button:nth-of-type(2)": {
      color: "red",
    },
  }, */
});

export default function TableContainer() {
  const classes = useStyles();
  const { users, filteredUsers } = useSelector(
    (state: RootState) => state.InputeData
  );
  const dispatch = useDispatch();

  /* fetch users */
  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers();
      dispatch(setUsers(users));
    };
    fetchUsers();
  }, []);

  /* delete User */
  const handleDelete = async (id: number) => {
    await fetchDeleteUser(id);
    dispatch(setDeleteUser(id));
  };
  console.log("filteredUsers", filteredUsers);

  /* handle Edit */
  const handleEdit = (id: number) => {
    dispatch(setCurrentIndex(id));
    dispatch(setShowSaveSection(true));
    const currentUser = users.find((u) => u.id === id);
    if (!currentUser) return;
    const user = {
      firstname: currentUser?.firstname,
      lastname: currentUser?.lastname,
      email: currentUser?.email,
      username: currentUser?.username,
      usernumber: currentUser?.usernumber,
    };

    dispatch(setSaveInputValue(user));
  };

  /*  */
  return (
    <div className={classes.tableMainContainer}>
      <table className={classes.table}>
        <thead>
          <tr className={classes.tr}>
            <th className={classes.th}>Number</th>
            <th className={classes.th}>First Name</th>
            <th className={classes.th}>Last Name</th>
            <th className={classes.th}>Email</th>
            <th className={classes.th}>User Name</th>
            <th className={classes.th}>User Number</th>
            <th className={classes.th}>Action</th>
          </tr>
        </thead>
        {filteredUsers &&
          filteredUsers.map((item, ind) => {
            const UserNum = String(item.usernumber);
            const formatUserNumber =
              UserNum.length > 3
                ? UserNum.slice(0, 3) + "*".repeat(UserNum.length - 3)
                : UserNum;
            return (
              <tbody key={ind}>
                <tr className={classes.tr}>
                  <td className={classes.td}>{ind + 1}</td>
                  <td className={classes.td}>{item.firstname}</td>
                  <td className={classes.td}>{item.lastname}</td>
                  <td className={classes.td}>{item.email}</td>
                  <td className={classes.td}>{item.username}</td>
                  <td className={classes.td}>{formatUserNumber}</td>
                  <td className={`${classes.td} btnCell`}>
                    <div className={` ${classes.btnContainer}`}>
                      <button title="Edit" onClick={() => handleEdit(item.id)}>
                        <FaEdit />
                      </button>
                      <button
                        title="Delete"
                        onClick={() => handleDelete(item.id)}
                      >
                        <IoTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            );
          })}
      </table>
    </div>
  );
}
