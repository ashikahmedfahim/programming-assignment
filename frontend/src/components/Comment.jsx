import React from "react";
import Typography from "@material-ui/core/Typography";

const Comment = (props) => {
  return (
    <div>
      <Typography variant="h6" component="h2">
        {props.commentData.commentBy.email.split("@")[0]}
      </Typography>
      <Typography variant="body2" component="h2">
        {props.commentData.text}
      </Typography>
    </div>
  );
};

export default Comment;
