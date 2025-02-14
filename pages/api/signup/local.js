import bcrypt from 'bcrypt';
import shortid from 'shortid';
import storage from '../../../helpers/storage';
import gravatar from 'gravatar';
import {generateToken} from '../../../utils/authToken';

export default async (req, res) => {
  const {firstName, lastName, email, password} = req.body;

  let hashedPassword = await bcrypt.hash(password, 10);
  let normalizedEmail = email.toLowerCase();

  var userObject = {
    userId: shortid.generate(),
    firstName: firstName,
    lastName: lastName,
    email: normalizedEmail,
    password: hashedPassword,
    avatar: gravatar.url(normalizedEmail, {s: '400'}),
  };

  if(req.body.address) {
    userObject.address = req.body.address;
  }

  if(req.body.invitationCode) {
    userObject.invitationCode = req.body.invitationCode;
  }

  await storage
    .get('users')
    .push(userObject)
    .write();

  const token = generateToken({
    userId: userObject.userId,
  });

  res.send({token: token});
};
