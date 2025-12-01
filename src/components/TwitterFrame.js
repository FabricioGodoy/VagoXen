// src/components/tweeterFrame.js
import React, { useEffect, useRef } from "react";

// URL REAL DEL TWEET FIJADO (podés dejar x.com o twitter.com, da igual)
const PINNED_TWEET_URL =
  "https://x.com/vagoxeneize12/status/1840858024933478641?s=20";

const TwitterFrame = () => {
  const containerRef = useRef(null);
  const hasRendered = useRef(false);

  // Parseamos el ID una sola vez
  const match = PINNED_TWEET_URL.match(/status\/(\d+)/);
  const tweetId = match?.[1];

  useEffect(() => {
    if (!containerRef.current || !tweetId) return;

    const renderTweet = () => {
      // Evita que en modo estricto se renderice 2 veces
      if (
        !window.twttr ||
        !window.twttr.widgets ||
        typeof window.twttr.widgets.createTweet !== "function" ||
        hasRendered.current
      ) {
        return;
      }

      hasRendered.current = true;
      containerRef.current.innerHTML = "";

      window.twttr.widgets.createTweet(tweetId, containerRef.current, {
        theme: "dark",
        align: "center",
        conversation: "none", // oculta replies
      });
    };

    // Si el script ya está cargado
    if (window.twttr && window.twttr.widgets) {
      renderTweet();
      return;
    }

    // Si NO está cargado, lo agregamos UNA sola vez
    const existingScript = document.getElementById("twitter-wjs");
    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "twitter-wjs";
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.onload = renderTweet;
      document.body.appendChild(script);
    } else {
      // Si el script ya estaba pero twttr todavía no se inicializó
      existingScript.onload = renderTweet;
    }
  }, [tweetId]);

  return (
    <div
      ref={containerRef}
      className="w-full rounded-xl overflow-hidden bg-black p-2 min-h-[260px]"
    />
  );
};

export default TwitterFrame;
