import PocketBase from "pocketbase";

const url = "https://db.class.hirusha.xyz";

export const pb = new PocketBase(url);

// maybe remove this
pb.autoCancellation(false);

export const isUserLoggedIn = pb.authStore.isValid;
export const user = pb.authStore;

/**
 * Logs the user in with their email and password
 * @param {string} username the user's email
 * @param {string} password the user's password
 */
export async function login(username, password) {
  await pb
    .collection("viraj_users")
    .authWithPassword(username.trim(), password);
  window.location.reload();
}

/**
 * Logs the user out
 */
export async function logout() {
  pb.authStore.clear();
  window.location.reload();
}


/**
 * Creates a new account with the given name, email and password
 * @param {string} name The user's name
 * @param {string} email The user's email
 * @param {string} password The user's password
 */
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

/**
 * Gets all notes for the user
 * @returns {Promise<Array<import("pocketbase").Record>>} an array of all the notes
 */

export async function getAllNotes() {
  if (!isUserLoggedIn) {
    return
  }
  const records = await pb.collection('viraj_todo').getFullList();
  return records
}


/**
 * Deletes the note with the given ID
 * @param {string} id the ID of the note to delete
 */
export async function deleteNote(id) {
  if (!isUserLoggedIn) {
    return
  }
  await pb.collection('viraj_todo').delete(id);
  window.location.reload();
}

/**
 * Updates the note with the given ID
 * @param {string} id the ID of the note to update
 * @param {string} name the new name of the note
 * @param {string} content the new content of the note
 */
export async function updateNote(id, name, content) {
  if (!isUserLoggedIn) {
    return
  }
  const data = {
    "name": name,
    "content": content
  };
  await pb.collection('viraj_todo').update(id, data);
  window.location.reload();
}

/**
 * Creates a new note with the given name and content
 * @param {string} name the name of the note
 * @param {string} content the content of the note
 */
export async function addNote(name, content) {
  if (!isUserLoggedIn) {
    return
  }
  const data = {
    "userId": user.record.id,
    "name": name,
    "content": content
  };
  await pb.collection('viraj_todo').create(data);
  window.location.reload();
}
