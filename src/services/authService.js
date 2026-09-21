import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt'
import { createUser } from '../repositories/userRepository.js'

import { verifyUserToken } from '../repositories/userRepository.js';
import { findByEmail } from '../repositories/userRepository.js';

export async function register(formData) {
  
  const tokenVerification = uuidv4();

 
  const hashedPassword = await bcrypt.hash(formData.motPass, 10);

  
  const userData = {
    nom: formData.nom,
    prenom: formData.prenom,
    email: formData.email,
    motPass: hashedPassword,
    roleUtilisateur: 'client',
    tokenVerification: tokenVerification
  };

  
  const userId = await createUser(userData);
  
  return userId;
}

export async function login(formData) {
  const { email, motPass } = formData;


  const user = await findByEmail(email);
  if (!user) {
    throw new Error('Invalid email or password');
  }

  
  const isMatch = await bcrypt.compare(motPass, user.motPass)
  if (!isMatch) {
    throw new Error('Invalid email or password')
  }

  return user;
}



export async function verifyEmail(token) {
  if (!token) {
    throw new Error('Verification token is missing');
  }

  const user = await verifyUserToken(token);
  if (!user) {
    throw new Error('Invalid or expired verification token');
  }

  return user;
}

