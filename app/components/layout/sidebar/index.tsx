import {
  Headset,
  ListIcon,
  UsersRoundIcon,
  type LucideIcon,
} from "lucide-react";
import { NavLink } from "react-router";
import { cn } from "~/lib/utils";

type Item = {
  text: string;
  icon: LucideIcon;
  path: string;
};

export const Sidebar = () => {
  const items: Item[] = [
    {
      path: "/chapter",
      icon: ListIcon,
      text: "فصل ها",
    },
    {
      path: "/users",
      icon: UsersRoundIcon,
      text: "کاربران",
    },
    {
      path: "/admins",
      icon: Headset,
      text: "مدیران",
    },
  ];

  return (
    <aside className="w-[300px] h-[calc(100vh-104px)] shrink-0 bg-accent rounded-xl p-4">
      {
        <ul className="flex flex-col gap-x-2">
          {items.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "rounded-md flex py-1 px-2 gap-x-2 items-center",
                    isActive && "bg-primary text-primary-foreground"
                  )
                }
              >
                <item.icon className="size-4" />
                {item.text}
              </NavLink>
            </li>
          ))}
        </ul>
      }
    </aside>
  );
};
