import { VirtualizedList } from "react-native";
import Message from "./Message";
import { forwardRef } from "react";

const Messages = forwardRef((props, ref) => {
  const { chatroom } = props;
  const { messages } = chatroom;

  const getItem = (data, index) => {
    return data[index];
  };

  const getItemCount = (data) => data.length;

  const renderItem = ({ item }) => (
    <Message
      name={item.name}
      avatar={item.avatar}
      text={item.text}
      uid={item.uid}
      createdAt={item.createdAt}
      humanizedCreatedAt={item.humanizedCreatedAt}
    />
  );

  return (
    <VirtualizedList
      ref={ref}
      data={messages}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      onLayout={() => ref.current.scrollToEnd({ animated: true })}
      getItemCount={getItemCount}
      getItem={getItem}
      initialNumToRender={messages.length}
    />
  );
});

export default Messages;