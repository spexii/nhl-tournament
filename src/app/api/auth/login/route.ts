import { NextResponse } from 'next/server';
import { authenticateUser, generateAuthToken, setSessionCookie } from '@/lib/auth';
import { convertPrismaRoleToTypeScriptRole } from '@/lib/utils';
import { SuccessfulLoginResponse } from '@/types/responses';


export async function POST(request: Request) {
  const { username, password } = await request.json();
  const user = await authenticateUser(username, password);

  if (user) {
    const role = convertPrismaRoleToTypeScriptRole(user.role);

    const response = NextResponse.json<SuccessfulLoginResponse>({ message: 'Authenticated', role });

    // Generate auth token
    const token = await generateAuthToken(user.username, role);

    // Set the session cookie
    await setSessionCookie(response, token);

    return response;
  } else {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }
}