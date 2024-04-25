"use client";
import { io, Socket } from '@/../../node_modules/socket.io-client/build/esm/index';
import React, { useEffect, useRef, useState } from 'react'
import { Winner } from '../../../components/game/Winner';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectProfileInfo } from '@/redux/features/profile/profileSlice';
import Cookies from 'js-cookie';


export default function page(props: any) {


    const [socket,setSocket] = useState<Socket>()
    const [text,setText] = useState<string>("")

    const [start, setStart] = useState<boolean>(true);
    const [game, setGame] = useState<boolean>(false);
    const divv = useRef<HTMLDivElement>(null);

    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
    const [score1,setScore1] = useState<number>(0)
    const [score2,setScore2] = useState<number>(0)

    const [computerWinnes, setComputerWinnes] = useState<boolean>(false);
    const [winning, setWinning] = useState<boolean>(false);
    const [playAgain, setPlayAgain] = useState<boolean>(false);
    
    const [net, setNet] = useState<Net>()
    const [player, setPlayer] = useState<Player>()
    const [computer, setComputer] = useState<Player>()
    const [winnerName, setWinnerName] = useState<string>("");
    
    const [firstName,setFirstName] = useState<string>("Player1");
    const [secondName,setSecondName] = useState<string>("Player2");
    
    const [pic1,setPic1] = useState<string>("");
    const [playerWinnes, setPlayerWinnes] = useState<boolean>(false);
    const [pic2,setPic2] = useState<string>("");
    
    const myData = useSelector(selectProfileInfo);



    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
      const handleResize = () => {
        setIsSmallScreen(window.innerWidth < 910 || window.innerHeight < 450);
      };
  
      handleResize(); 
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
    

    let canv = canvasRef.current;
    const [ball, setBall] = useState<Ball>();

    useEffect(() => {
      if (player && computer && playAgain)
      {
        setComputerWinnes(false);
        setPlayerWinnes(false);
      }
    },[playAgain])

    function getMouesPosition(e:any, canvas: HTMLCanvasElement):any {
      var mouseX = e * canvas.width / canvas.clientWidth | 0;
      var mouseY = e * canvas.height / canvas.clientHeight | 0;
      return {x: mouseX, y: mouseY};
    }
    interface Ball{
      x:number;
      y:number;
      radius:number;
      speed: number;
      velocityX: number;
      velocityY: number;
      color: string;
    }

    interface Net{
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
    giveUp: boolean;
    db_id: string;
    pic:string;
    g_id:string;
}

   interface Game{
      ball: Ball;
      players: Player[];
  }

    interface Canvas{
      height: number;
      width: number;
  }

    useEffect(() => {
        if (canvas && socket)
        {
          let data: Canvas = {height:canvas.height, width:canvas.width};
          socket.emit("canvas_data", data);
          setNet({x: canvas.width / 2 - 1, y: 0, width: 2, height: 10, color: "WHITE" });
          setBall({x: canvas.width / 2, y: canvas.height / 2, radius: 15,speed: 0.9, velocityX: 5, velocityY: 5, color: "WHITE"});
        }  
    }, [ctx])

    useEffect(()=> {
      if (computerWinnes || playerWinnes)
        setWinning((prev) => {return !prev})
    },[computerWinnes, playerWinnes])

    const drawFirstPlayer = (player: Player) =>{
      if (ctx && canvas && player)
      {
        ctx.fillStyle = "WHITE";
        ctx.fillRect(player.x,player.y,player.width,player.height);
      }
      setScore1(player.score);
    }
    const drawSecondPlayer = (computer: Player) =>{
      if (ctx && canvas && computer)
      {
        ctx.fillStyle = "WHITE";
        ctx.fillRect(computer.x,computer.y,computer.width,computer.height);
      }
      setScore2(computer.score);
    }

    const drawRect = () => {
      if (ctx && canvas)
      {
        ctx.fillStyle = "rgb(100 116 139)";
        ctx.fillRect(0,0,canvas.width,canvas.height);
      }
    };

    const drawCircle = (data:Ball) => {
      if (ctx && canvas && ball)
      {
        ctx.fillStyle = data.color;
        ctx.beginPath();
        ctx.arc(data.x, data.y, data.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
    }

    const drawNet = () => {
      if (ctx && canvas && net) {
        for (let i = 0; i <= canvas.height; i += 4) {
          ctx.fillStyle = net.color;
          ctx.fillRect(net.x,net.y + i,net.width,net.height);
        }
      }
    };


    useEffect(() => {
      const keydownHandler = (e:any) => {
          if (e.key === "ArrowUp" ) {
            socket?.emit("arrow_move","down");
          }
          if (e.key === "ArrowDown") {
            socket?.emit("arrow_move","up");
          }

      };
      const mousemoveHandler = (e:any) => {
          if (canvas)
          {
            let rect = canvas.getBoundingClientRect();
            let newPosition = getMouesPosition(e.clientY - rect.top, canvas).y;
            socket?.emit("mouse_move",newPosition);
          }
      };
      document.body.addEventListener('keydown', keydownHandler);
      canvas?.addEventListener("mousemove", mousemoveHandler);
      return () => {
        document.body.removeEventListener('keydown', keydownHandler);
        canvas?.removeEventListener("mousemove", mousemoveHandler);
      };
    });

    const render = (data:Game) => {
      drawRect();
      drawNet()
      drawCircle(data.ball);
      drawFirstPlayer(data.players[0]);
      drawSecondPlayer(data.players[1]);
    } 


    const checkWinner = (name: string) => {
          setComputerWinnes((prev) => {return !prev})
          setWinnerName(name);
    }

  const url = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

    const fetchData = async () => {
      try {
      const response = await axios.get(`${url}/user/me`, {withCredentials: true});
      const userData = response.data.user;
      socket?.emit("user_id",userData.id);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    useEffect(() => {
      socket?.onAny((event, data) => {
        if (event === "start")
        {
          setText("freind has join");
          if (divv.current)
          {
            divv.current.style.display = 'none';
            fetchData();
          }
          setStart(false);
          setGame(true);
        }
        else if (event == "update")
        {
          setFirstName(data.players[0].name);
          setSecondName(data.players[1].name);
          setPic1(data.players[0].pic);
          setPic2(data.players[1].pic);
          canv = canvasRef.current;
          if(canv)
          {
            setCanvas(canv)
            setCtx(canv.getContext('2d'))
          }
          render(data);
        }
        else if(event == "winner")
        {
          checkWinner(data);
        }
        else if(event = "already_in_game")
        {
          setText("Sorry !! you already in game.");
          socket.close();
        }
      })
      return () => {
        socket?.offAny();
      }
    })

    useEffect(() => {
      const token = Cookies.get('JWT_TOKEN');

        for(let i : number = 0; i < 2e9; i++ )
        {
          i *= 1;
        }
        const newSocket = io(`${url}`,{
          path: '/play',
          query: {
            token: token,
            id: myData.id,
            tar: props.params.id,
          }
        });
        setSocket(newSocket);

        setStart(true);
        setText("wait for freind to join");

        newSocket.off();

        return () => {
          newSocket.close();
        };
    },[])


  return (
    <div className='w-full h-screen bg-[#dbe0f6] flex justify-center items-center'>
    <div ref={divv} className='bg-slate-500 bg-opacity-90 rounded-3xl flex justify-center items-center flex-row h-[30%] w-[60%]'>
        {start && <div className='text-white'>{text}</div>}
    </div>
        {game && 
            <>
            <div className="flex items-center justify-center h-screen bg-[#dbe0f6]">

            <div className="flex justify-around  flex-col ">
                <div className="flex justify-around  flex-raw pt-10">
                <div className="flex flex-raw">
                    <div className="bg-slate-500 w-20 h-20 rounded-full " style={{backgroundImage: `url(${pic1})` , backgroundSize: 'cover' }} ></div>
                    <div className="text-white text-5xl font-bold pl-4 pt-4">{`${score1}`}</div>
                </div>
                <div className="flex flex-raw">
                    <div className="text-white text-5xl font-bold pr-4 pt-4">{score2}</div>
                    <div className="bg-slate-500 w-20 h-20 rounded-full " style={{backgroundImage: `url(${pic2})` , backgroundSize: 'cover' }}></div>
                </div>
                </div>
                <div className="flex justify-around items-center flex-raw py-5">
                <span className="text-white pr-12">{firstName}</span>
                <span className="text-white pl-12">{secondName}</span>
                </div>
                <div className="flex justify-center w-full h-full">
                {!winning &&
                    <canvas
                    ref={canvasRef}
                    id="pong"
                    height="450"
                    width="900"
                    style={{
                      width: isSmallScreen ? '100vmin' : '900px',
                      height: isSmallScreen ? '50vmin' : '450px',
                      objectFit: 'contain'
                    }}
                    className="bg-slate-500 bg-opacity-90 rounded-3xl flex justify-center items-center flex-raw"
                >
                </canvas>}
                {winning && <Winner setPlayAgain={setPlayAgain} setWinning={setWinning} winnerName={winnerName} />}
                </div>
            </div>

            </div>
            </>
        }
    </div>
  )
}

