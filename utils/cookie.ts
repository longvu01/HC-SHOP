import Cookies from 'js-cookie';

export const setCookie = (name: string, value: string) => {
  // Set new cookies only valid for api accessToken route
  Cookies.set(name, value, {
    expires: 7,
    path: 'api/auth/accessToken',
  });
};
export const removeCookie = (name: string) => {
  // Set new cookies only valid for api accessToken route
  Cookies.remove(name, { path: 'api/auth/accessToken' });
};
