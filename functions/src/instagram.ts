// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Instagram from "instagram-web-api";
(async () => {
  const username = "syncoli_app";
  const password = "v2y5tW$WxGn!c/P";

  const client = new Instagram({ username, password });

  await client.login();
  const photos = await client.getPhotosByHashtag({ hashtag: "unicorn", first: 10 });

  console.log(photos);
})();
