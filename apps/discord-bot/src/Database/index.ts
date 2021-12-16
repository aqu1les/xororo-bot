import { Injectable } from '@xororo/core/providers';
import mongoose from 'mongoose';

// TODO: INVERTER DEPENDENCIA
@Injectable()
export class DatabaseConnection {
  async init() {
    return mongoose
      .connect(
        `mongodb+srv://aqu1les:${process.env.DB_PASSWORD}@cluster0-kvfg5.mongodb.net/xororo?retryWrites=true&w=majority`,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }
      )
      .then(() => console.log('Connected to mongodb Atlas'));
  }
}
