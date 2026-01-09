import { createUseStyles } from "react-jss";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { useEffect } from "react";

/*  */
export const useStyles = createUseStyles({
  "@global": {
    body: {
      fontFamily: '"Exo 2", sans-serif',
    },
  },
  loadingContainer: {
    height: "100dvh",
    width: "100%",
    backgroundColor: "#000000b5",
    position: "fixed",
    left: "0px",
    top: "0px",
    zIndex: "200",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingSection: {
    color: "#ffffff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
  },
  pointsContainer: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "green",
    listStyle: "none",
    position: "relative",
  },
  pointsContent: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    backgroundColor: "#ffffff",
    position: "absolute",
    top: "0px",
    right: "0px",
    animation: "$moveDot 4.5s ease-in-out infinite",
    animationFillMode: "both",
  },

  "@keyframes moveDot": {
    "0%": {
      transform: "translateX(-100vw)",
      opacity: 0,
    },

    "50%": {
      transform: "translateX(var(--offset))",
      opacity: 1,
    },

    "100%": {
      transform: "translateX(100vw)",
      opacity: 0,
    },
  },
  shakeLetter: {
    display: "inline-block",
    animation: "$shake 2s ease-in-out infinite",
    marginLeft: "5px",
  },
  "@keyframes shake": {
    "0%": { transform: "translateY(0px)" },

    "50%": { transform: "translateY(10px)" },

    "100%": {
      transform: "translateY(0px)",
    },
  },
});

export default function LoadingSection() {
  const classes = useStyles();
  const { showLoading } = useSelector((state: RootState) => state.InputeData);
  const span: number = 8;
  const spanNumber = Array.from({ length: span }, (_, i) => i);
  const word = "Loading";
  word.split("");

  /* function */
  useEffect(() => {
    function showLoadingFun() {
      if (showLoading) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    }
    showLoadingFun();
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showLoading]);
  return (
    <div className={classes.loadingContainer}>
      <div className={classes.loadingSection}>
        <h1>
          {" "}
          {word.split("").map((item, ind) => {
            return (
              <span
                key={ind}
                className={classes.shakeLetter}
                style={{ animationDelay: `${ind * 0.2}s` }}
              >
                {item}
              </span>
            );
          })}
        </h1>
        <div className={classes.pointsContainer}>
          {spanNumber &&
            spanNumber.map((_item, i) => {
              return (
                <li
                  key={i}
                  className={classes.pointsContent}
                  style={
                    {
                      animationDelay: `${i * 0.13}s`,
                      "--offset": `${i * -8}px`,
                    } as React.CSSProperties
                  }
                ></li>
              );
            })}
        </div>
      </div>
    </div>
  );
}
