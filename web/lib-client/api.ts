export async function uploadPost(
  userId: string,
  day: number,
  month: number,
  year: number,
  answer: string
): Promise<void> {
  const body = {
    day,
    month,
    year,
    answer,
  };

  const uploadPostUrl = `/api/users/${userId}/posts`;

  const response = await fetch(uploadPostUrl, {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText);
  }
}
