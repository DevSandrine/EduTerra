export async function onRequest(context) {

  const url =
    "https://github.com/login/oauth/authorize" +
    "?client_id=" + context.env.GITHUB_CLIENT_ID +
    "&scope=repo";

  return Response.redirect(url, 302);

}
