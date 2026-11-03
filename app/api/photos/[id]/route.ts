import { handleError, jsonError } from "../../../../lib/api-errors";
import { isUuid } from "../../../../lib/cart-owner";
import { loadPhoto } from "../../../../lib/photo-store";

/** Serves a stored photo. The id is a random UUID, so it is not guessable. */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    if (!isUuid(id)) return jsonError("Not found.", 404);
    const photo = await loadPhoto(id);
    if (!photo) return jsonError("Not found.", 404);
    return new Response(new Uint8Array(photo.data), {
      headers: {
        "Content-Type": photo.mime,
        "Content-Length": String(photo.data.length),
        // A photo never changes once stored, so the browser can keep it.
        "Cache-Control": "private, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    return handleError(error);
  }
}
