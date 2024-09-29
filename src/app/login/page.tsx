'use client'

import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';

import Button from '@/components/Form/Button';
import Input from '@/components/Form/Input';
import Label from '@/components/Form/Label';
import { authenticate } from '@/lib/actions';
 
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const result = await authenticate(username, password);

      if(result.success) {
        router.push('/');
      } else {
        setError('Väärä käyttäjätunnus tai salasana!');
        return;
      }
    } catch (error) {
      setError('Virhe kirjautumisessa!');
    }
  }

  useEffect(() => {
    setIsClient(true);
  }, []);

  // This is to prevent the form from rendering on the server
  // because browser extensions may render their own stuff
  // (e.g. icons from password managers) and that can cause
  // hydration errors.
  if (!isClient) {
    return null;
  }
 
  return (
    <div className="max-w-xs mx-auto">
      <h1 className="text-heading-green">
        Kirjaudu sisään
      </h1>
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
    </div>
  )
}

export default Login