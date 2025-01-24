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
  window.location.reload();
}


export async function createAccount(name, email, password) {
  // VIRAJ: FIX THIS
  console.log(password)
  const data = {
    "password": password,
    "passwordConfirm": password,
    "email": email,
    "emailVisibility": true,
    "verified": true,
    "name": name
  };
  await pb.collection('viraj_users').create(data);
  login(email, password)
}

export async function getAllNotes() {
  if (!isUserLoggedIn) {
    return
  }
  const records = await pb.collection('viraj_todo').getFullList();
  return records
}


export async function deleteNote(id) {
  if (!isUserLoggedIn) {
    return
  }
  await pb.collection('viraj_todo').delete(id);
  window.location.reload();
}