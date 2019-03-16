export const call = (context, state, value) => {
  context.setState({ [state]: value });
};
