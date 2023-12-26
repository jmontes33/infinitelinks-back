import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'users' })
export class User {
  @Prop()
  id: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({required: true, unique: true})
  email: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
