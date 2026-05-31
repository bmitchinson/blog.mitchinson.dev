import BLOG from "@/blog.config";
import { NotionAPI } from "notion-client";
import { getPreviewImageMap } from "./getPreviewImageMap";
import normalizeRecordMap from "./normalizeRecordMap";

export async function getPostBlocks(id) {
  const authToken = BLOG.notionAccessToken || null;
  const api = new NotionAPI({ authToken });
  const pageBlock = await api.getPage(id);
  normalizeRecordMap(pageBlock);
  pageBlock.preview_images = await getPreviewImageMap(pageBlock);
  return pageBlock;
}
