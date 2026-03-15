"use client";

import { useEffect, useState } from "react";
import { VideoOff } from "lucide-react";
import { getMuxSignedTokens } from "@/lib/actions/mux";

interface MuxVideoPlayerProps {
  playbackId: string | null | undefined;
  title?: string;
  className?: string;
}

interface MuxTokens {
  playback: string;
  thumbnail: string;
  storyboard: string;
}

export function MuxVideoPlayer({
  playbackId,
  title,
  className,
}: MuxVideoPlayerProps) {
  const [tokens, setTokens] = useState<MuxTokens | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!playbackId) {
      setIsLoading(false);
      return;
    }

    async function fetchTokens() {
      try {
        const result = await getMuxSignedTokens(playbackId as string);
        if (
          result.playbackToken &&
          result.thumbnailToken &&
          result.storyboardToken
        ) {
          setTokens({
            playback: result.playbackToken,
            thumbnail: result.thumbnailToken,
            storyboard: result.storyboardToken,
          });
        }
      } catch {
        // Silently handle errors - tokens will be null and player may fallback
      } finally {
        setIsLoading(false);
      }
    }

    fetchTokens();
  }, [playbackId]);

  if (!playbackId) {
    return (
      <div
        className={`aspect-video bg-zinc-900 rounded-xl flex items-center justify-center ${className}`}
      >
        <div className="text-center">
          <VideoOff className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
          <p className="text-zinc-500">No video available</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div
        className={`aspect-video bg-zinc-900 rounded-xl flex items-center justify-center ${className}`}
      >
        <div className="text-center">
          <VideoOff className="w-12 h-12 text-zinc-600 mx-auto mb-3 animate-pulse" />
          <p className="text-zinc-500">Loading video...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <video
        controls
        preload="metadata"
        className="w-full aspect-video rounded-xl overflow-hidden bg-black"
        src={`https://stream.mux.com/${playbackId}.m3u8${tokens?.playback ? `?token=${tokens.playback}` : ""}`}
      >
        {title ?? "Lesson video"}
      </video>
    </div>
  );
}
