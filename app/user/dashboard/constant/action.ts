import { StringToBoolean } from 'class-variance-authority/types';

export const getUserInitials = (name: string) => {
  const userName = name.split(' ');
  if (userName.length < 1) {
    return userName[0][0];
  } else {
    return userName.map((name) => name[0]);
  }

  //   or .userName[0][0] + userName[1][0];
};
