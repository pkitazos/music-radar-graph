function useDebounce<T extends (...args: any[]) => void>(cb: T, delay = 1000) {
  let timeout: number;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    // @ts-ignore
    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}

export default useDebounce;
