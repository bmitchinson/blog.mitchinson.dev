export default function normalizeRecordMap(recordMap) {
  ["block", "collection", "collection_view", "notion_user"].forEach((table) => {
    Object.values(recordMap[table] || {}).forEach((record) => {
      if (record?.value?.value) {
        record.value = record.value.value;
      }
    });
  });
}
