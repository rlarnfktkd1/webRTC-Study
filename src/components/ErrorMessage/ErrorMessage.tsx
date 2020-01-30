import * as React from "react";

type Props = {
  message?: string;
};

const ErrorMessage: React.FC<Props> = ({ message }) => <aside>{message}</aside>;

export default ErrorMessage;
