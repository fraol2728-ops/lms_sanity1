"use client";

import { VideoOff } from "lucide-react";
import { useEffect, useState } from "react";
import { getMuxSignedTokens } from "@/lib/actions/mux";
import { cn } from "@/lib/utils";

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
        className={cn(
          "aspect-video rounded-none bg-black flex items-center justify-center",
          className,
        )}
      >
        <div className="text-center">
          <VideoOff className="mx-auto mb-3 h-12 w-12 text-zinc-600" />
          <p className="text-zinc-500">No video available</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div
        className={cn(
          "aspect-video rounded-none bg-black flex items-center justify-center",
          className,
        )}
      >
        <div className="text-center">
          <VideoOff className="mx-auto mb-3 h-12 w-12 animate-pulse text-zinc-600" />
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
        className="aspect-video w-full bg-black"
        src={`https://stream.mux.com/${playbackId}.m3u8${tokens?.playback ? `?token=${tokens.playback}` : ""}`}
      >
        <track
          default
          kind="captions"
          label="English"
          src="data:text/vtt,WEBVTT"
          srcLang="en"
        />
        {title ?? "Lesson video"}
      </video>
    </div>
  );
}
