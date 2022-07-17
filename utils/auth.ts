export const removeFirstLogin = () => {
  let localStorageStatus = JSON.parse(localStorage.getItem('status') || '{}');
  delete localStorageStatus.firstLogin;

  localStorage.setItem('status', JSON.stringify(localStorageStatus));
};
