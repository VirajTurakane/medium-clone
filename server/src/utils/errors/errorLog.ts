export const errorLog = <T>(location: string, err: T) => {
  console.log(`${location} Error : ${err}`);
};
