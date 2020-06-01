export default function AudienceService(
  auth: any,
  setAudience: any,
  setIsLoaded: any,
  setError: any
) {
  const audienceRequest = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      session_token: auth,
      from: "1509490800000",
      to: "1510826400000",
    }),
  };
  fetch("http://localhost:3000/audience", audienceRequest)
    .then((res) => res.json())
    .then(
      (result) => {
        setAudience(result.audience);
        setIsLoaded(true);
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    );
}
