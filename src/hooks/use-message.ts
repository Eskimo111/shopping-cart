import { ReactNode, useState } from "react";
import Message from "../components/message/Message";
import { useDelayUnmount } from "./use-delay-unmount";

type UseMessage = {
  node: ReactNode | null;
  showMessage: (message: string, type: "success" | "fail") => void;
};
const useMessage = (): UseMessage => {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "fail">("fail");
  const [messageShow, setMessageShow] = useState(false);
  const shouldRenderMessage = useDelayUnmount(messageShow, 500);

  const showMessage = (message: string, type: "success" | "fail") => {
    setMessage(message);
    setMessageType(type);
    setMessageShow(true);
    setTimeout(() => setMessageShow(false), 2000);
  };

  // const node = {shouldRenderMessage && Message }

  return {
    node:
      shouldRenderMessage &&
      Message({ message: message, type: messageType, showing: messageShow }),
    showMessage,
  };
};

export default useMessage;
