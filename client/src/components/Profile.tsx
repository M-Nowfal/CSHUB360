import type { JSX } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Profile = ({ avatar, fallBack, size = "md" }: { 
  avatar: string, 
  fallBack: string, 
  size?: "sm" | "md" | "lg" | "xl" 
}): JSX.Element => {
  return (
    <Avatar size={size}>
      <AvatarImage src={avatar} />
      <AvatarFallback>{fallBack}</AvatarFallback>
    </Avatar>
  );
}

export default Profile;
