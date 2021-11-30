import "./IRCLikeMessageItem.css";

function IRCLikeMessageItemText(props) {
  const { text, sender, isFocused } = props;
  return (
    <div className={"ircmsg" + (isFocused ? "--focused" : "")} tabIndex={0}>
      <p>
        <b $HasTextChildren>{`<${sender}>`}</b>
        {" " + text}
      </p>
    </div>
  );
}

function IRCLikeMessageItemNotice(props) {
  const { isFocused, text, sender } = props;
  return (
    <div className={"ircmsg" + (isFocused ? "--focused" : "")} tabIndex={0}>
      <p>
        <i>
          <b $HasTextChildren>{`<${sender}>`}</b>
          {" " + text}
        </i>
      </p>
    </div>
  );
}

function IRCLikeMessageItemUnknown(props) {
  const { isFocused, sender } = props;
  return (
    <div className={"ircmsg" + (isFocused ? "--focused" : "")} tabIndex={0}>
      <p>Unsupported message type was sent from {sender}</p>
    </div>
  );
}

function IRCLikeMessageItem(props) {
  const { sender, content, isFocused } = props;
  const userId = sender.userId;
  let displayName = window.mClient.getUser(userId).displayName || userId;
  switch (content.msgtype) {
    case "m.text":
      return (
        <IRCLikeMessageItemText
          sender={displayName}
          text={content.body}
          isFocused={isFocused}
        />
      );
    case "m.notice":
      return (
        <IRCLikeMessageItemNotice
          sender={displayName}
          notice={content.body}
          isFocused={isFocused}
        />
      );
    case "m.emote":
    case "m.image":
    case "m.video":
    case "m.audio":
    case "m.location":
    case "m.file":
    default:
      return (
        <IRCLikeMessageItemUnknown
          sender={sender.userId}
          isFocsued={isFocused}
        />
      );
  }
}

export default IRCLikeMessageItem;
