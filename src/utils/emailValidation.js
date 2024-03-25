export function extractEmail(email) {
  if (!email) return null;
  const emailFormatRegex = /^([a-zA-Z0-9_.+-]+)@psu\.ac\.th$/;
  const match = email.match(emailFormatRegex);

  if (match) {
    const username = match[1];

    const isStudent = /^\d{10}$/.test(username);

    if (isStudent) {
      return { role: "student", username };
    } else {
      return { role: "personnel", username };
    }
  } else {
    return null;
  }
}
