import request from 'superagent';

export async function signUp(data) {
  const response = await request.post('/api/auth/signup')
    .ok(res => res.status < 500)
    .send(data);
  return response.body;
}

export async function signIn(data) {
  const response = await request.post('/api/auth/signin')
    .ok(res => res.status < 500)
    .send(data);
  return response.body;
}

export async function getGifs(search) {
  const response = await request
    .get('/api/gifs')
    .set('Authorization', window.localStorage.getItem('TOKEN'))
    .query({ search: search });
  return response.body;
}

export async function addFavorite(favorite) {
  const response = await request
    .post('/api/favorites')
    .set('Authorization', window.localStorage.getItem('TOKEN'))
    .send(favorite);
  return response.body;
}