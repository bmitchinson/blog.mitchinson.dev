import BLOG from "@/blog.config";
import { NotionAPI } from "notion-client";
import { idToUuid } from "notion-utils";
import getAllPageIds from "./getAllPageIds";
import getPageProperties from "./getPageProperties";
import filterPublishedPosts from "./filterPublishedPosts";
import normalizeRecordMap from "./normalizeRecordMap";

/**
 * @param {{ includePages: boolean }} - false: posts only / true: include pages
 */
export async function getAllPosts({ includePages = false }) {
  let id = BLOG.notionPageId;
  const authToken = BLOG.notionAccessToken || null;
  const api = new NotionAPI({ authToken });
  const response = await api.getPage(id);

  normalizeRecordMap(response);

  id = idToUuid(id);
  const collectionRecord = Object.values(response.collection)[0]?.value;
  const collection = collectionRecord?.schema
    ? collectionRecord
    : collectionRecord?.value;
  const collectionQuery = response.collection_query || {};
  const block = response.block;
  const schema = collection?.schema;

  const tagProperty = Object.values(schema || {}).find(
    (property) => property.name === "tags" || property.type === "multi_select"
  );
  const possibleTags = tagProperty?.options || [];
  const tagColorMap = {};
  possibleTags.forEach((tag) => {
    tagColorMap[tag.value] = tag.color;
  });

  const rawMetadata = block[id].value;

  // Check Type
  if (
    rawMetadata?.type !== "collection_view_page" &&
    rawMetadata?.type !== "collection_view"
  ) {
    console.log(`pageId "${id}" is not a database`);
    return null;
  } else {
    if (!Object.keys(collectionQuery).length) {
      collectionQuery[rawMetadata.collection_id] = {};

      for (const viewId of rawMetadata.view_ids || []) {
        const collectionView = response.collection_view?.[viewId]?.value;
        const collectionData = await api.getCollectionData(
          rawMetadata.collection_id,
          viewId,
          collectionView
        );

        ["block", "collection", "collection_view", "notion_user"].forEach(
          (table) => {
            response[table] = response[table] || {};
            Object.assign(
              response[table],
              collectionData.recordMap?.[table] || {}
            );
          }
        );
        normalizeRecordMap(response);

        collectionQuery[rawMetadata.collection_id][viewId] =
          collectionData.result?.reducerResults;
      }
    }

    // Construct Data
    const pageIds = getAllPageIds(collectionQuery);
    const data = [];
    for (let i = 0; i < pageIds.length; i++) {
      const id = pageIds[i];
      if (!block[id]?.value) {
        continue;
      }

      const properties = (await getPageProperties(id, block, schema)) || null;

      // Add fullwidth, createdtime to properties
      properties.createdTime = new Date(
        block[id].value?.created_time
      ).toString();
      properties.fullWidth = block[id].value?.format?.page_full_width ?? false;

      if (properties.tags) {
        properties.tags = properties.tags.map((tag) => {
          return { tag: tag, color: tagColorMap[tag] || "blue" };
        });
      }

      data.push(properties);
    }

    // remove all the the items doesn't meet requirements
    const posts = filterPublishedPosts({ posts: data, includePages });

    // Sort by date
    if (BLOG.sortByDate) {
      posts.sort((a, b) => {
        const dateA = new Date(a?.date?.start_date || a.createdTime);
        const dateB = new Date(b?.date?.start_date || b.createdTime);
        return dateB - dateA;
      });
    }
    return posts;
  }
}
