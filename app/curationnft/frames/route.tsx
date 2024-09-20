/* eslint-disable react/jsx-key */
import React from "react";
import { Button } from "frames.js/next";
import { frames, imageOptions } from "./frames";
import { DEGENCAST_API, DEGENCAST_WEB_URL, FRAMES_BASE_URL } from "@/lib/env";
import DegencastTag from "@/app/components/DegencastTag";
import { error } from "frames.js/core";

const handleRequest = frames(async (ctx) => {
  const inviteFid = ctx.searchParams?.inviteFid || "";
  const castHash = ctx.searchParams?.castHash || "";

  let tokenId;
  let communityCuration;
  let castInfo;
  let nftTokenUnit;
  let launchProgress;

  try {
    const castInfoResp = await fetch(
      `${DEGENCAST_API}/topics/casts/${castHash}/mint`
    );
    castInfo = await castInfoResp.json();
  } catch (err) {
    console.error("Error fetching castInfo", err);
    throw error("Error fetching castInfo");
  }
  launchProgress = castInfo?.data?.launchProgress || "0%";
  nftTokenUnit = castInfo?.data?.nftTokenUnit;

  console.log("castInfo", castInfo);
  console.log(
    "img",
    `${DEGENCAST_API}/3r-farcaster/cast-image?castHash=${castHash}`,
    `${FRAMES_BASE_URL}/images/degecasthat.png`
  );

  return {
    // image: `${DEGENCAST_API}/3r-farcaster/cast-image?castHash=${castHash}`,
    image: (
      <div tw="flex relative">
        <img
          tw=""
          src={`${DEGENCAST_API}/3r-farcaster/cast-image?castHash=${castHash}`}
          alt=""
        />
        <div tw="flex absolute">{Date.now()}</div>
      </div>
    ),
    imageOptions: imageOptions,
    buttons: [],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
