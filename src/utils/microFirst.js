// A function to apply
const microAsyncFirst = runFirstFn => {
  const handleWrapper = handler => {
    const newHandler = async (req, res, ...restArgs) => {
      await runFirstFn();
      return handler(req, res, ...restArgs);
    };
    return newHandler;
  };
  return handleWrapper;
};

module.exports = microAsyncFirst;
