import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaModule } from './modules/categoria/categoria.module';
import { ProductoModule } from './modules/producto/producto.module';
import { PedidoModule } from './modules/pedido/pedido.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT!, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    CategoriaModule,
    ProductoModule,
    PedidoModule,
    UsuarioModule,
    AuthModule,
  ],
})
export class AppModule {}
