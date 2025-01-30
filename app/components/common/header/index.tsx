import { Link } from "react-router";

export const Header = () => {
  return (
    <header className="bg-accent p-4 rounded-xl flex">
      <Link to={"/"}>
        <h1>مدیریت هزارتو</h1>
      </Link>

      <span className="flex-1"></span>

      <div>user</div>
    </header>
  );
};
