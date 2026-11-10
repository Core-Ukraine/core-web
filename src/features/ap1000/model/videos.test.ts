import { describe, expect, it } from "vitest";

import { VIDEO_GROUPS, videoOf, videoUrl } from "./videos";

describe("videos", () => {
  it("finds a video by its id and links it on YouTube", () => {
    expect(videoOf("HBjc-y2sowY").title).toBe("AP1000 Safety Systems");
    expect(videoUrl("HBjc-y2sowY")).toBe("https://www.youtube.com/watch?v=HBjc-y2sowY");
  });

  it("fails on a video that is not in the list", () => {
    expect(() => videoOf("nothing")).toThrow("video nothing");
  });

  it("lists every video once, with its language", () => {
    const videos = VIDEO_GROUPS.flatMap((group) => group.videos);
    expect(new Set(videos.map((video) => video.id)).size).toBe(videos.length);
    expect(new Set(videos.map((video) => video.language))).toEqual(new Set(["EN", "CZ"]));
  });
});
