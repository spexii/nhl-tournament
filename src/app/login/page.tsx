'use client'

import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';

import Button from '@/components/Form/Button';
import Input from '@/components/Form/Input';
import Label from '@/components/Form/Label';
import { getSessionCookie } from '@/lib/auth';
import { useAuth } from '@/lib/AuthContext';
import { SuccessfulLoginResponse } from '@/types/responses';
import { Role } from '@/types/userRoles';
 
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { setAuthenticated, setAdmin } = useAuth();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('onSubmit')

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      // Authentication successful, redirect to front page
      if (response.ok) {
        const responseBody: SuccessfulLoginResponse = await response.json();
        const admin = responseBody.role === Role.ADMIN;
        
        setAuthenticated(true);
        setAdmin(admin);
        
        router.push('/');
      } else {
        setError('Käyttäjätunnus tai salasana on väärin');
      }
    } catch (error) {
      setError('Kirjautuminen ei onnistunut.');
    }
  }

  useEffect(() => {
    setIsClient(true);

    const getCookie = async () => {
      const sessionCookie = await getSessionCookie();

      if (sessionCookie) {
        router.push('/')
      }
    }

    getCookie();
  }, []);

  if (!isClient) {
    return null;
  }
 
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label htmlFor="username">
          Käyttäjätunnus
        </Label>
        <Input
          type="text"
          name="username"
          id="username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      <div>
        <Label htmlFor="password">
          Salasana
        </Label>
        <Input
          type="password"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>
      <div>
        {error && (
          <p className="text-red-600">
            {error}
          </p>
        )}
      </div>
      <div>
        <Button type="submit">
          Kirjaudu
        </Button>
      </div>
    </form>
  )
}

export default Login