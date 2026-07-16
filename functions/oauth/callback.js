export async function onRequest(context) {

  const url = new URL(context.request.url);

  const code = url.searchParams.get("code");

  if (!code) {
    return new Response("Code GitHub manquant", {
      status: 400
    });
  }

  const response = await fetch(
    "https://github.com/login/oauth/access_token",
    {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        client_id: context.env.GITHUB_CLIENT_ID,
        client_secret: context.env.GITHUB_CLIENT_SECRET,
        code: code
      })
    }
  );

  const data = await response.json();


return new Response(`
<!doctype html>
<html>
<body>
<script>
const token = ${JSON.stringify(data.access_token)};

window.opener.postMessage(
  "authorization:github:success:" + token,
  "*"
);

window.close();
</script>
</body>
</html>
`, {
  headers: {
    "Content-Type": "text/html"
  }
});
