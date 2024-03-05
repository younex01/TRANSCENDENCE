import { Injectable, Req } from '@nestjs/common';
import { Ball, Canvas, Game, Player, Sides } from './game-data.interface';
import { Server } from 'socket.io';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import * as jwt from 'jsonwebtoken';


@Injectable()
export class GameService {

    private bSide: Sides = { top: 0, bottom: 0, left: 0, right: 0 };
    private pSide: Sides = { top: 0, bottom: 0, left: 0, right: 0 };
    eventService: any;
  jwtService: any;

    constructor(
      private readonly userService: UserService,
      private readonly prisma: PrismaService
    ) {}

    async addGameResult(players:Player[],userId:string,result:boolean){
      // const existingGameResult = await this.prisma.gameResult.findFirst({
      //   where: {
      //     userId,
      //   },
      // });
  
      // if (existingGameResult) {
      //   // Game result already exists for this user
      //   return existingGameResult;
      // } else {
        // Game result does not exist, create a new one
        return this.prisma.gameResult.create({
          data: {
            opponent_pic: players[1].pic,
            score_player: players[0].score,
            score_opponent: players[1].score,
            result,
            userId,
          },
        });
      // }
    }
    
    //fix the movement in the the player if we replay the game
    checkWinner(players: Player[],rooms:{[roomId: string]: string[];}, roomId: string, server: Server): boolean{
      if (!players[0] || !players[1])
        return true;
      if (players[0].score >= 5)
      {
        server.to(roomId).emit("winner",players[0].name);
        this.addGameResult(players, players[0].db_id,true);
        // players[0].score = 0;
        // players[1].score = 0;
        return true;
      }
      else if (players[1].score >= 5)
      {
        server.to(roomId).emit("winner",players[1].name)
        this.addGameResult(players, players[1].db_id,false);
        // players[0].score = 0;
        // players[1].score = 0;
        return true;
      }
      return false;
    }

    collision(ball: Ball, canvas: Canvas, players: Player[]): boolean {

        if (!players[0] || !players[1])
          return;
        this.bSide.top = ball.y - ball.radius;
        this.bSide.bottom = ball.y + ball.radius;
        this.bSide.left = ball.x - ball.radius;
        this.bSide.right = ball.x + ball.radius;

        if (ball.x < canvas.width / 2) {
        this.pSide.top = players[0].y;
        this.pSide.bottom = players[0].y + players[0].height;
        this.pSide.left = players[0].x;
        this.pSide.right = players[0].x + players[0].width;
        } else {
        this.pSide.top = players[1].y;
        this.pSide.bottom = players[1].y + players[1].height;
        this.pSide.left = players[1].x;
        this.pSide.right = players[1].x + players[1].width;
        }

        return (
        this.bSide.right > this.pSide.left &&
        this.bSide.bottom > this.pSide.top &&
        this.bSide.left < this.pSide.right &&
        this.bSide.top < this.pSide.bottom
        );
    }
    
    handleArrowMove(data: string, socketId: string, players: Player[]): void {
      if (data === "up") {
        if (socketId === players[0].id) {
          if(players[0].y <= 350)
          players[0].y += 20;
      } else {
        if(players[1].y <= 350)
          players[1].y += 20;
        }
      } else if (data === "down") {
        if (socketId === players[0].id) {
          if(players[0].y > 0)
            players[0].y -= 20;
        } else {
          if(players[1].y > 1)
            players[1].y -= 20;
        }
      }
    }
  
    handleMouseMove(data: number, socketId: string, players: Player[]): void {
      if (!players[0])
        return;
      if (socketId === players[0].id) {
        players[0].y = data - players[0].height / 2;
      } else {
        players[1].y = data - players[1].height / 2;
      }
    }

    removePlayer(players:Player[], Id: string)
    {
      for (let i = 0; i < players.length;i++)
      {
        if (!players[i])
          continue;
        if (players[i].id === Id)
        {
          players.splice(i, 1);
          players.length = players.length;
          return;
        }
      }
    }

    deletePlayerFromPlayers(players: {[id:number]: Player[]},id:string):{[id:number]: Player[]}
    {
      const indexs = Object.keys(players);

      for(let i = 0; i < indexs.length;i++)
      {
          if(players[indexs[i]].length == 1 && players[indexs[i]][0].id == id)
              delete players[indexs[i]];    
          else if(players[indexs[i]].length == 2)
          {
            if(players[indexs[i]][0].id == id)
              delete players[indexs[i]];
            else if(players[indexs[i]][1].id == id)
              delete players[indexs[i]];
          }
      }
      const index = Object.keys(players);
      if(index[0] !== '0')
      {
          let new_players : { [id: string]: Player[] } = {};
          for (let i =0; i < index.length; i++)
          {
                new_players[i.toString()] = players[index[i]];
          }
          return (new_players);
      }
      return players;
    }

    removeDataFromRooms(game: Game[], id: string,gameId:number,server:Server): number {
      //remove player from players
      //remove player from players + check if players lengh == 1 to remove the room
      //update the id from game
      let check:number = 0;
      for (let i=0;i<game.length;i++)
      {
        // players[i] = players[i].filter(player => player.id !== id)
        if (game[i].players.length === 2)
        {
          if (game[i].players[0].id == id || game[i].players[1].id == id)
          {
            if(game[i].players[0].score < 5 && game[i].players[1].score < 5)
            {
              //this player is give up the game
              const roomId = Object.keys(game[i].rooms);
              if (game[i].players[0].id === id)
              {
                game[i].players[0].giveUp = true;
                server.to(roomId[0]).emit("winner",game[i].players[1].name);
                this.addGameResult(game[i].players, game[i].players[1].db_id,false);
              }
              else
              {
                game[i].players[1].giveUp = true;
                server.to(roomId[0]).emit("winner",game[i].players[0].name);
                this.addGameResult(game[i].players, game[i].players[0].db_id,true);
              }
            }
            game[i].players = game[i].players.filter(player => player.id !== id);//to think about it
            // if(gameId > -1)
            //   gameId--;
            game.splice(i, 1);
            // check++;
            break;
          }
        }
        else
        {
          //check if the room of the game has the id and the lenght is 1 if that is true remove the game
          if (game[i].players[0].id === id && game[i].players.length == 1)
          {
            game.splice(i, 1);
            // if(gameId > -1)
            //   gameId--;
            // check++;
            break;
          }
        } 
      }
      for(let i =0;i< game.length;i++)
      {
        game[i].nb = i;
      }
      gameId = game.length - 1;
      return gameId;
  }

  resetBall(ball:Ball , canvas:Canvas)
  {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
  }

  startTheGame(players: Player[], rooms: {[roomId: string]: string[]}, roomId: string, server: Server, ball: Ball, canvas: Canvas) {
    // ball.x = canvas.width / 2;
    // ball.y = canvas.height / 2;
    
    const intervalId = setInterval(async () => {
      

      if (canvas)
      {
        if (this.checkWinner(players, rooms, roomId, server) || players[0].giveUp || players[1].giveUp) {
          clearInterval(intervalId);
          //close socket
        }
        

        // Emit game update to clients
        const gameData = {
          ball,
          players,
        };
        server.to(roomId).emit('update', gameData);

        // Update ball position
        ball.x += ball.velocityX * ball.speed;
        ball.y += ball.velocityY * ball.speed;

        // Handle ball collisions with canvas boundaries
        if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
          ball.velocityY = -ball.velocityY;
        }
        
        // Handle ball collisions with players
        let collisionResult = this.collision(ball, canvas, players);
        if (collisionResult) {
          if (ball.x < canvas.width / 2)
            ball.velocityX = Math.abs(ball.velocityX);
          else
            ball.velocityX = -1 * Math.abs(ball.velocityX);
        }
        if (players[0] && players[1])
        {
          // Handle scoring
          if (ball.x - ball.radius < 0) {
            players[1].score++;
            this.resetBall(ball, canvas);
          } else if (ball.x + ball.radius > 900) {
            players[0].score++;
            this.resetBall(ball, canvas);
          }
        }
      }

    }, 1000 / 60);
  }

  ResetScore(players:Player[])
  {
    players[0].score = 0;
    players[1].score = 0;
  }
  
  findNbById(game: Game[], id: string) 
  {

      for (let i:number = 0; i < game.length;i++)
      {
        for (const roomId of Object.keys(game[i].rooms)) {
          if (game[i].rooms[roomId].includes(id))
            return i;
      }
    }
  }

  async handle_id(db_id: string, g_id: string, socket_id: string,games: Game[])
  {
    for(let game of games)
    {
      if (!game.players)
        return;
      if (game.players.length == 2)
      {
        if(game.players[0].id == socket_id)
        {
          game.players[0].db_id = db_id;
          const user = await this.userService.getUser(db_id);
          game.players[0].name = user.username;
          game.players[0].pic = user.avatar;
          game.players[0].g_id = g_id;
        }
        else if (game.players[1].id == socket_id)
        {
          game.players[1].db_id = db_id;
          const user = await this.userService.getUser(db_id);
          game.players[1].name = user.username;
          game.players[1].pic = user.avatar;
          game.players[1].g_id = g_id;
          //send to player the g_id  to he play again
          // console.log("------------------");
          // console.log(game.players[0].g_id);
          // console.log(game.players[0].db_id);
          // console.log("------------------");
          // console.log(game.players[1].g_id);
          // console.log(game.players[1].db_id);
        }

      }
    }
  }



  public getUserInfosFromToken(token: string): any {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      return decoded;
    } catch (error) {
      console.error('JWT verification failed:', error.message);
      return null;
    }
  }

}