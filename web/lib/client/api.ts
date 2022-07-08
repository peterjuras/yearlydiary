import { User } from "../../types/user";

export async function createUser(): Promise<User> {
  const response = await fetch("/api/users", {
    method: "POST",
  });
  const result = await response.json();

  return result;
}

export async function updateUser(
  userId: string,
  publicPosts: boolean
): Promise<void> {
  const body = {
    publicPosts,
  };

  const response = await fetch(`/api/users/${userId}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText);
  }
}

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

export async function deleteUserData(userId: string) {
  const deleteUserUrl = `/api/users/${userId}`;

  const response = await fetch(deleteUserUrl, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText);
  }
}
