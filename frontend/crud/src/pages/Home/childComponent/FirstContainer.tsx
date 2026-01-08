import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  titleContainer: {
    padding: "100px 20px",
    fontFamily: '"Exo 2", sans-serif',
    textAlign: "center",
    fontWeight: "bolder",
    fontSize: "1.5rem",
  },
});

export default function FirstContainer() {
  const classes = useStyles();
  return (
    <div className={classes.titleContainer}>
      <h1>Welcome to Crud</h1>
    </div>
  );
}
