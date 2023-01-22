import { redirect } from "next/navigation";

export function redirectToToday() {
  if (process.env.NEXT_PUBLIC_E2E_TESTS_ACTIVE === "true") {
    // Redirect to test day
    const testPath = "/diary/6/23";
    redirect(testPath);
  }

  const today = new Date();
  const todayMonth = today.getMonth() + 1;
  const todayDay = today.getDate();

  const path = `/diary/${todayMonth}/${todayDay}`;
  redirect(path);
}
