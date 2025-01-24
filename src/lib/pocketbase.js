import PocketBase from "pocketbase";

const url = "https://db.class.hirusha.xyz";

export const pb = new PocketBase(url);

// maybe remove this
pb.autoCancellation(false);

export const isUserLoggedIn = pb.authStore.isValid;
export const user = pb.authStore;

export async function login(username, password) {
  await pb
    .collection("viraj_users")
    .authWithPassword(username.trim(), password);
  window.location.reload();
}

export async function logout() {
  pb.authStore.clear();
}

