import { User } from "../../types/user";

export async function updateUser(publicPosts: boolean): Promise<void> {
  const body = {
    publicPosts,
  };

  const response = await fetch(`/api/users`, {
    method: "PUT",
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText);
  }
}

export async function uploadPost(
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

  const uploadPostUrl = `/api/posts`;

  const response = await fetch(uploadPostUrl, {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText);
  }
}

export async function deleteUserData() {
  const deleteUserUrl = `/api/users`;

  const response = await fetch(deleteUserUrl, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText);
  }
}

export async function getUserInfoFromSetupCode(
  setupCode: string
): Promise<User> {
  const getUserInfoUrl = `/api/users/setup-codes/${setupCode}`;

  const response = await fetch(getUserInfoUrl);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText);
  }

  const result = await response.json();

  return result;
}
