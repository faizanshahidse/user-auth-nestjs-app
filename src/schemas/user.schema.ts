import * as mongoose from 'mongoose';

import * as bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

UserSchema.pre('save', async function (next: any) {
  const hash = await bcrypt.hash(this.password, 12);
  this.password = hash;
  next();
});

UserSchema.methods.validatePassword = async function (password) {
  if (!this.password) return false;

  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

export default UserSchema;
