import * as React from "react";
import "../style.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Socket } from "socket.io-client";
import PlayerWait from "./PlayerWait";

interface IJoinFormProps {
  socket: Socket;
  playerState: any;
}

export default function PlayerJoinForm(props: IJoinFormProps) {
  const [name, setName] = React.useState("");
  const [gameId, setGameId] = React.useState<number>(0);
  const inMessage = `You're in! Please wait for the game to begin.`;

  const { socket, playerState } = props;

  function onSubmitJoin() {
    var nameCheck = name.trim();
    if (nameCheck == "") {
      alert("Please enter a name.");
      return;
    }

    socket.emit("player-submit-join", { name, gameId });
  }

  const joinInputs = (
    <>
      <Stack className="joinForm" spacing={2}>
        <p>Enter your name to join the game:</p>
        <TextField
          className="form"
          id="name"
          label="Name"
          variant="outlined"
          size="medium"
          value={name}
          inputProps={{ maxLength: 10 }}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          className="idInput form"
          id="game-id"
          label="Game ID"
          variant="outlined"
          size="medium"
          type="number"
          value={gameId || ""}
          onChange={(e) => setGameId(Number(e.target.value))}
        />
        <Button
          className="form"
          disabled={!name || !gameId}
          variant="contained"
          size="large"
          sx={{
            bgcolor:
              getComputedStyle(document.body).getPropertyValue("--accent") +
              ";",
          }}
          onClick={onSubmitJoin}
        >
          Join
        </Button>
      </Stack>
      <p style={{ color: "red" }}>{playerState.message}</p>
    </>
  );

  return playerState.state === "joined-waiting" ? (
    <PlayerWait message={inMessage} />
  ) : (
    joinInputs
  );
}
