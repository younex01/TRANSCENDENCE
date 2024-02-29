///compoent for friend for know it made like random one

import {
  io,
  Socket,
} from "@/../../node_modules/socket.io-client/build/esm/index";
import React, { useEffect, useRef, useState } from "react";
import { Winner } from "./Winner";

export const YourFriendsGame = () => {
  const [socket, setSocket] = useState<Socket>();
  const [text, setText] = useState<string>("");
  const [random, setRandom] = useState<boolean>(true);
  const [start, setStart] = useState<boolean>(false);
  const [game, setGame] = useState<boolean>(false);
  const divv = useRef<HTMLCanvasElement>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [score1, setScore1] = useState<number>(0);
  const [score2, setScore2] = useState<number>(0);
  const [playerWinnes, setPlayerWinnes] = useState<boolean>(false);
  const [computerWinnes, setComputerWinnes] = useState<boolean>(false);
  const [winning, setWinning] = useState<boolean>(false);
  const [playAgain, setPlayAgain] = useState<boolean>(false);

  const [net, setNet] = useState<Net>();
  const [player, setPlayer] = useState<Player>();
  const [computer, setComputer] = useState<Player>();
  const [winnerName, setWinnerName] = useState<string>("");

  //select canvas
  let canv = canvasRef.current;
  const [ball, setBall] = useState<Ball>();

  useEffect(() => {
    if (player && computer && playAgain) {
      // player.score = 0;
      // computer.score = 0;
      // setScore1(0);
      // setScore2(0);
      setComputerWinnes(false);
      setPlayerWinnes(false);
    }
  }, [playAgain]);

  //ball interface
  interface Ball {
    x: number;
    y: number;
    radius: number;
    speed: number;
    velocityX: number;
    velocityY: number;
    color: string;
  }

  interface Net {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
  }

  interface Player {
    id: string;
    playerNb: number;
    x: number;
    y: number;
    score: number;
    width: number;
    height: number;
    name: string;
  }

  interface Game {
    ball: Ball;
    players: Player[];
  }

  interface Canvas {
    height: number;
    width: number;
  }

  useEffect(() => {
    if (canvas && socket) {
      let data: Canvas = { height: canvas.height, width: canvas.width };
      socket.emit("canvas_data", data);
      setNet({
        x: canvas.width / 2 - 1,
        y: 0,
        width: 2,
        height: 10,
        color: "WHITE",
      });
      setBall({
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: 15,
        speed: 0.9,
        velocityX: 5,
        velocityY: 5,
        color: "WHITE",
      });
    }
  }, [ctx]);

  useEffect(() => {
    if (computerWinnes || playerWinnes)
      setWinning((prev) => {
        return !prev;
      });
  }, [computerWinnes, playerWinnes]);

  const drawFirstPlayer = (player: Player) => {
    if (ctx && canvas && player) {
      ctx.fillStyle = "WHITE";
      ctx.fillRect(player.x, player.y, player.width, player.height);
    }
    setScore1(player.score);
  };
  const drawSecondPlayer = (computer: Player) => {
    if (ctx && canvas && computer) {
      ctx.fillStyle = "WHITE";
      ctx.fillRect(computer.x, computer.y, computer.width, computer.height);
    }
    setScore2(computer.score);
  };

  const drawRect = () => {
    if (ctx && canvas) {
      ctx.fillStyle = "rgb(100 116 139)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  };

  const drawCircle = (data: Ball) => {
    if (ctx && canvas && ball) {
      ctx.fillStyle = data.color;
      ctx.beginPath();
      ctx.arc(data.x, data.y, data.radius, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }
  };

  const drawNet = () => {
    if (ctx && canvas && net) {
      for (let i = 0; i <= canvas.height; i += 4) {
        ctx.fillStyle = net.color;
        ctx.fillRect(net.x, net.y + i, net.width, net.height);
      }
    }
  };

  useEffect(() => {
    const keydownHandler = (e: any) => {
      if (e.key === "ArrowUp") {
        socket?.emit("arrow_move", "down");
      }
      if (e.key === "ArrowDown") {
        socket?.emit("arrow_move", "up");
      }
    };
    const mousemoveHandler = (e: any) => {
      if (canvas) {
        let rect = canvas.getBoundingClientRect();
        let newPosition = e.clientY - rect.top;
        //send to the server positon of the player
        socket?.emit("mouse_move", newPosition);
      }
    };
    document.body.addEventListener("keydown", keydownHandler);
    canvas?.addEventListener("mousemove", mousemoveHandler);
    return () => {
      document.body.removeEventListener("keydown", keydownHandler);
      canvas?.removeEventListener("mousemove", mousemoveHandler);
    };
  });

  const render = (data: Game) => {
    drawRect();
    drawNet();
    //draw the ball
    drawCircle(data.ball);
    //draw the player
    drawFirstPlayer(data.players[0]);
    drawSecondPlayer(data.players[1]);
  };

  const checkWinner = (name: string) => {
    setComputerWinnes((prev) => {
      return !prev;
    });
    setWinnerName(name);
  };

  useEffect(() => {
    socket?.onAny((event, data) => {
      if (event === "start") {
        setText("freind has join");
        if (divv.current) {
          console.log("remove div");
          divv.current.style.display = "none";
        }
        setStart(false);
        setGame(true); //todo update
      } else if (event == "update") {
        canv = canvasRef.current;
        if (canv) {
          console.log("start the game");
          setCanvas(canv);
          setCtx(canv.getContext("2d"));
        }
        render(data);
      } else if (event == "winner") {
        console.log("i am in the winner");
        checkWinner(data);
      }
      // else if(event == "give_up")
      // {

      // }
    });
    return () => {
      socket?.offAny();
    };
  });

  useEffect(() => {

    console.log("send connection");
    const newSocket = io("http://localhost:3001");
    setSocket(newSocket);
    setRandom(false);
    setStart(true);
    setText("wait for freind to join");
    newSocket.off();
},[]);

// ref={divv}
  return (
    <>
      <div
        className="bg-slate-500 rounded-3xl flex justify-center items-center flex-raw h-[calc(100vh-15rem)] w-[calc(100%-20rem)] overflow-hidden"
      >
        {random && (
            <div className="w-full h-full flex items-center justify-center bg-center bg-cover " style={{backgroundImage: `url(/giphy.gif)`}}>
          <div className="fixed flex justify-center items-center h-full w-full left-0 top-0 bg-[#000000] bg-opacity-80 z-50">
            <div className="fixed  rounded-[20px] max-w-[800px] w-[80%] mx-[50px] h-[60%] bg-[#6e7aaa] flex flex-col items-center overflow-hidden">
              <div className="w-full h-[10%] text-center">waiting for other player to join</div>
            </div>
          </div>
          </div>
        )}
        {start && <div className="text-white">{text}</div>}
      </div>
      {game && (
        <>
          <div className="flex justify-around  flex-col">
            <div className="flex justify-around  flex-raw pt-10">
              <div className="flex flex-raw">
                <div className="bg-slate-500 w-20 h-20 rounded-full"></div>
                <div className="text-white text-5xl font-bold pl-4 pt-4">
                  {score1}
                </div>
              </div>
              <div className="flex flex-raw">
                <div className="text-white text-5xl font-bold pr-4 pt-4">
                  {score2}
                </div>
                <div className="bg-slate-500 w-20 h-20 rounded-full "></div>
              </div>
            </div>
            <div className="flex justify-around items-center flex-raw py-5">
              <span className="text-white pr-12">sanji</span>
              <span className="text-white pl-12">AI</span>
            </div>
            <div className="flex justify-center">
              {!winning && (
                <canvas
                  ref={canvasRef}
                  id="pong"
                  height="450"
                  width="900"
                  className="bg-slate-500 bg-opacity-90 rounded-3xl flex justify-center items-center flex-raw"
                ></canvas>
              )}
              {winning && (
                <Winner
                  setPlayAgain={setPlayAgain}
                  setWinning={setWinning}
                  winnerName={winnerName}
                />
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};
