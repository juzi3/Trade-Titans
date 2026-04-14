"use client";

import Image from "next/image";
import { useState } from "react";

const PLACEHOLDER = "/assets/player-placeholder.svg";

interface PlayerAvatarProps {
  playerId: string;
  name: string;
  size?: number;
}

const PlayerAvatar = ({ playerId, name, size = 50 }: PlayerAvatarProps) => {
  const [errored, setErrored] = useState(false);
  const src = errored
    ? PLACEHOLDER
    : `https://media-4.api-sports.io/american-football/players/${playerId}.png`;

  return (
    <Image
      src={src}
      alt={`${name} headshot`}
      width={size}
      height={size}
      style={{ objectFit: "contain" }}
      onError={() => setErrored(true)}
      unoptimized={errored}
    />
  );
};

export default PlayerAvatar;
