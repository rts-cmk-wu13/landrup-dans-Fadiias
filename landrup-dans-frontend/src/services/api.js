const API_BASE_URL = 'http://localhost:4000/api/v1';

// Login bruger
export const loginUser = async (credentials) => {
  try {
    const response = await fetch('http://localhost:4000/auth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });
    if (!response.ok) {
      throw new Error('Forkert brugernavn eller adgangskode');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fejl ved login:', error);
    throw error;
  }
};

// Opret ny bruger
export const createUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    if (!response.ok) {
      throw new Error('Kunne ikke oprette bruger');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fejl ved oprettelse af bruger:', error);
    throw error;
  }
};

// Hent alle aktiviteter
export const getAllActivities = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/activities`);
    if (!response.ok) {
      throw new Error('Kunne ikke hente aktiviteter');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fejl ved hentning af aktiviteter:', error);
    throw error;
  }
};

// Hent enkelt aktivitet
export const getActivityById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/activities/${id}`);
    if (!response.ok) {
      throw new Error('Kunne ikke hente aktivitet');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fejl ved hentning af aktivitet:', error);
    throw error;
  }
};

// Tilmeld bruger til aktivitet
export const enrollInActivity = async (activityId, userId, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/activities/${activityId}/roster/${userId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Kunne ikke tilmelde til aktivitet');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fejl ved tilmelding til aktivitet:', error);
    throw error;
  }
};

// Frameld bruger fra aktivitet
export const unenrollFromActivity = async (activityId, userId, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/activities/${activityId}/roster/${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Kunne ikke framelde fra aktivitet');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fejl ved framelding fra aktivitet:', error);
    throw error;
  }
};

// Hent bruger med aktiviteter
export const getUserWithActivities = async (userId, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/activities`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Kunne ikke hente bruger data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fejl ved hentning af bruger:', error);
    throw error;
  }
};

// Opret ny aktivitet (instruktør)
export const createActivity = async (formData, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/activities`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });
    if (!response.ok) {
      throw new Error('Kunne ikke oprette hold');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fejl ved oprettelse af hold:', error);
    throw error;
  }
};

// Rediger aktivitet (instruktør)
export const updateActivity = async (id, formData, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/activities/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });
    if (!response.ok) {
      throw new Error('Kunne ikke opdatere hold');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fejl ved opdatering af hold:', error);
    throw error;
  }
};

// Slet aktivitet (instruktør)
export const deleteActivity = async (id, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/activities/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error('Kunne ikke slette hold');
    }
    return true;
  } catch (error) {
    console.error('Fejl ved sletning af hold:', error);
    throw error;
  }
};

// Hent deltagere i en aktivitet
export const getActivityParticipants = async (activityId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/activities/${activityId}/participants`);
    if (!response.ok) {
      throw new Error('Kunne ikke hente deltagere');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fejl ved hentning af deltagere:', error);
    throw error;
  }
};

// Tilmeld nyhedsbrev
export const subscribeNewsletter = async (email) => {
  const form = new URLSearchParams();
  form.append('email', email);
  const response = await fetch(`${API_BASE_URL}/newsletter`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: form
  });
  if (!response.ok) throw new Error('Kunne ikke tilmelde nyhedsbrev');
  return response.json();
};

// Hent testimonials
export const getAllTestimonials = async () => {
  const response = await fetch(`${API_BASE_URL}/testimonials`);
  if (!response.ok) throw new Error('Kunne ikke hente testimonials');
  return response.json();
};

// Send kontaktbesked
export const sendMessage = async (name, email, message) => {
  const form = new URLSearchParams();
  form.append('name', name);
  form.append('email', email);
  form.append('message', message);
  const response = await fetch(`${API_BASE_URL}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: form
  });
  if (!response.ok) throw new Error('Kunne ikke sende besked');
  return response.json();
};
