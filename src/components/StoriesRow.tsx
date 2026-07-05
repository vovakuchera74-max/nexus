"use client"
import { useState } from "react";
import s from "../styles/Stories.module.scss"

export interface Story {
  id: string;
  title: string;
  image_url: string;
  type: string;
  created_at: string;
}

export default function StorieRow({ stories }: { stories: Story[] }) {
  const [viewed, setViewed] = useState<Set<string>>(new Set());


  return (
    <div className={s.StorieRow}>
      {stories.map((data) => (
        <div
          className={`${s.stories} ${viewed.has(data.id) ? s.viewed : ""}`}
          key={data.id}
        >
          <div className={s.circle}>
            <img src={data.image_url} alt={data.title} />
          </div>
          <div className={s.circleTitle}>{data.title}</div>
        </div>
      ))}
    </div>
  );
}