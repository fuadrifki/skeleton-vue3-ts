import Cookies from 'js-cookie';

// TOKEN CREDENTIAL
const userInfoKey = 'APP_USER_INFO';

interface UserInfoObj {
  name: string;
}

export const removeAuthCredential = () => {
  Cookies.remove(userInfoKey);
};

export const getUserInfo = () => {
  const profile = Cookies.get(userInfoKey);
  return profile ? JSON.parse(profile) : false;
};

export const setUserInfo = (data: UserInfoObj): void => {
  Cookies.set(userInfoKey, data);
};
