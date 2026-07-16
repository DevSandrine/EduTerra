export async function onRequest(context) {

  const url = new URL(context.request.url);

  const code = url.searchParams.get("code");

  if (!code) {
    return new Response("Code GitHub manquant", {
      status: 400
    });
  }

  const tokenResponse = await fetch(
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


  const token = await tokenResponse.json();


  return new Response(
    `
    <script>
      window.opener.postMessage(
        {
          token: "${token.access_token}"
        },
        "*"
      );
      window.close();
    </script>
    `,
    {
      headers: {
        "Content-Type": "text/html"
      }
    }
  );

}
