import React from 'react'
import type  {UserBonusType }from "../../types/bonusType"


type OneUserType = {
  users: UserBonusType;
};
export default function OneUser({users}: OneUserType): JSX.Element {
  return (
    <div>
      {users.lastName}
      {users.Status.title}
    </div>
  )
}
