export async function apiFunction(formData) {

  try {
    let response = await fetch('http://localhost:8080/piloto/index.php', {
      method: 'POST',
      // mode: 'no-cors',
      headers: {
        Accept: 'application/json'
      },
      body: formData
    });

    let json = await response.json();
    return json;

  } catch (err) {
    console.error(err);
  }
}