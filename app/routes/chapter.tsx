import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "هزارتو" },
    { name: "description", content: "بازی معمایی هزارتو" },
  ];
}

export default function ChapterPage() {
  return <div>فصل ها</div>;
}
