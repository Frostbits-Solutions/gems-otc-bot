export const useTelegram = () => {
  const tg = (window as any).Telegram?.WebApp;
  
  return {
    tg,
    user: tg?.initDataUnsafe?.user
  };
};