import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';


async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('Cats example')
  .setDescription('The cats API description')
  .setVersion('1.0')
  .addTag('cats')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    credentials: true, // Allow credentials (cookies, authorization headers)
  });
    app.use(cookieParser());

  await app.listen(4000);
}
bootstrap();
