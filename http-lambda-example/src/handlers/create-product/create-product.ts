export const handler:   (event: any, context: any) => any = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello from Lambda!',
      input: event,
      context,
    }),
  };
};
