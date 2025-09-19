export default async function Validate({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/tokens/validate/" + token,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  console.log(response);

  return <div>Validate {token}</div>;
}
