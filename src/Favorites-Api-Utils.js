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