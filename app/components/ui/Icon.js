import { Car, CircleCheck, Clock3, CircleX, Settings, LogOutIcon, User } from "lucide-react";

const icons = { Car, CircleCheck, Clock3, CircleX, LogOutIcon, Settings, User };

export default function Icon({ icon, className, onClick }) {
  const IconComponent = icons[icon];
  if (!IconComponent) {
    return null;
  }

  return <IconComponent onClick={onClick} className={className} />;
}
