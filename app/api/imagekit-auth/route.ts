import { getUploadAuthParams } from "@imagekit/next/server";
import { isAdmin } from "@/lib/admin/authorization";

export const runtime = "nodejs";

export async function GET() {
  if (!(await isAdmin())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

  if (!publicKey || !privateKey || !urlEndpoint) {
    return Response.json(
      {
        error:
          "ImageKit is not configured. Add the public and private API keys to the environment.",
      },
      { status: 500 },
    );
  }

  try {
    const authenticationParameters = getUploadAuthParams({
      publicKey,
      privateKey,
    });

    return Response.json({
      ...authenticationParameters,
      publicKey,
    });
  } catch (error) {
    console.error("Unable to create ImageKit upload authentication", error);

    return Response.json(
      { error: "Unable to prepare the image upload. Please try again." },
      { status: 500 },
    );
  }
}
