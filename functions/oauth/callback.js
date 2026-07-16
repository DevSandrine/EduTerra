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

function receiveMessage(event) {

  window.opener.postMessage(
    "authorization:github:success:" + JSON.stringify({
      token: "${data.access_token}"
    }),
    event.origin
  );

  window.removeEventListener("message", receiveMessage);
  window.close();

}

window.addEventListener("message", receiveMessage, false);

window.opener.postMessage(
  "authorizing:github",
  "*"
);

</script>
</body>
</html>
`, {
    headers: {
      "Content-Type": "text/html"
    }
  });

}
