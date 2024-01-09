'use server';

import { redirect } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';
import { z } from 'zod';
import { fetchJson } from '../fetch';
import { getSession } from '../session';
import { parseJWT } from '../../auth';

type LoginResponse = {
  access: string;
  refresh: string;
};

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

async function callLoginAPI(email: string, password: string) {
  const url = `${process.env.API_ORIGIN}/api/sign-in/`;

  const body = { email, password };

  const data = await fetchJson<LoginResponse>(url, body, {
    method: 'POST',
  });
  console.log('login', data);
  return data;
}

async function callRefreshAPI(refresh: string) {
  const url = `${process.env.API_ORIGIN}/api/sign-in/refresh/`;

  const body = { refresh };

  const data = await fetchJson<LoginResponse>(url, body, {
    method: 'POST',
  });
  console.log('refresh', data);
  return data;
}

async function saveLoginToSession(data: LoginResponse) {
  const parsedRefreshToken = parseJWT(data.refresh);
  const expiresAtUnixSecond = parsedRefreshToken.exp;
  const expiresAtUnixMilliSecond = expiresAtUnixSecond * 1000;

  const session = await getSession();
  session.isLoggedIn = true;
  session.accessToken = data.access;
  session.refreshToken = data.refresh;
  session.expiresAt = expiresAtUnixMilliSecond;
  await session.save();
}

export default async function login(formData: FormData) {
  noStore();

  const { email, password } = FormSchema.parse(
    Object.fromEntries(formData.entries()),
  );

  const data = await callLoginAPI(email, password);

  await saveLoginToSession(data);

  redirect('/dashboard/profile');
}

export async function refresh() {
  noStore();

  const session = await getSession();

  if (!session.refreshToken) {
    throw new Error('Not already signed in.');
  }

  const data = await callRefreshAPI(session.refreshToken);

  await saveLoginToSession(data);
}
