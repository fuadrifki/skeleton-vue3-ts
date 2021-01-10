import Cookies from 'js-cookie';

// TOKEN CREDENTIAL
const userInfoKey = 'APP_USER_INFO';

interface UserInfoObj {
  name: string;
}

// Remove all cookies
export const removeAuthCredential = () => {
  Cookies.remove(userInfoKey);
};

// Get Data from cookies
export const getUserInfo = () => {
  const profile = Cookies.get(userInfoKey);
  return profile ? JSON.parse(profile) : false;
};

// Save to cookies
export const setUserInfo = (data: UserInfoObj): void => {
  Cookies.set(userInfoKey, data);
};