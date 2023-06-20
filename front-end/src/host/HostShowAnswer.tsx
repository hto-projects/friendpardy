import * as React from "react";
import "../style.css";
import { Paper, Stack } from "@mui/material";

interface IShowAnswerProps {
  playerName: string;
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
  playerGuesses: Array<any>;
}

export default function HostShowAnswer(props: IShowAnswerProps) {
  const {
    options,
    questionText,
    playerName,
    correctAnswerIndex,
    playerGuesses,
  } = props;

  function interpolatePlayerNameInQuestionText() {
    const [part1, part2] = questionText.split("<PLAYER>");
    return (
      <p>
        {part1}
        <b>{playerName}</b>
        {part2}
      </p>
    );
  }

  return (
    <>
      {interpolatePlayerNameInQuestionText()}
      <div>
        {options.map((o: String, i: number) => (
          <>
            <div className="guesses">
              <Paper
                style={{
                  background:
                    i === correctAnswerIndex
                      ? "linear-gradient(to right, rgb(182, 244, 146), rgb(51, 139, 147))"
                      : "white",
                  color: i === correctAnswerIndex ? "white" : "black",
                }}
              >
                <p
                  style={{
                    color: i === correctAnswerIndex ? "white" : "black",
                    fontWeight: i === correctAnswerIndex ? "bolder" : "normal",
                    fontSize: "1.5rem",
                  }}
                >
                  {o}
                </p>
              </Paper>
              <Stack
                style={{
                  backgroundColor:
                    getComputedStyle(document.body).getPropertyValue(
                      "--accent"
                    ) + ";",
                }}
              >
                {playerGuesses
                  .filter((g) => g.guess === i)
                  .map((g, j) => (
                    <Paper
                      style={{
                        margin: "auto",
                        width: "50vw",
                        alignContent: "center",
                        backgroundColor:
                          getComputedStyle(document.body).getPropertyValue(
                            "--accent"
                          ) + ";",
                        background:
                          getComputedStyle(document.body).getPropertyValue(
                            "--accent"
                          ) + ";",
                      }}
                    >
                      <p
                        style={{
                          background:
                            getComputedStyle(document.body).getPropertyValue(
                              "--accent"
                            ) + ";",
                          color:
                            getComputedStyle(document.body).getPropertyValue(
                              "--accent"
                            ) + ";", //i === correctAnswerIndex ? "white" : "black",
                          fontWeight:
                            i === correctAnswerIndex ? "bolder" : "normal",
                        }}
                        key={j}
                      >
                        {g.name}
                      </p>
                    </Paper>
                  ))}
              </Stack>
              <br />
            </div>
          </>
        ))}
      </div>
    </>
  );
}
