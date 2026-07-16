export async function onRequest(context) {

  console.log(context.env);

  const clientId = context.env.GITHUB_CLIENT_ID;

  const url =
    "https://github.com/login/oauth/authorize" +
    "?client_id=" + clientId +
    "&scope=repo";

  return Response.redirect(url, 302);

}
