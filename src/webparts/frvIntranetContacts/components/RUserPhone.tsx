import * as React from "react";

interface Props {
    userphone: string | undefined;
    namephone: string;
  }
  
  const UserPhone = ({ userphone, namephone }: Props): JSX.Element => {
    if (userphone !== null) {
      return (
        <span>
          {userphone}
        </span>
      );
    } else {
      return (
        <span>
          {namephone}
        </span>
      );
    }
  };
  
  export default UserPhone;