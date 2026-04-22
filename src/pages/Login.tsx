import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, login } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      navigate('/admin');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success('Logged in successfully');
      navigate('/admin');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4 bg-mesh">
      <Card className="w-full max-w-md glass-card border-primary/20">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-black tracking-tight text-foreground">Admin Login</CardTitle>
          <CardDescription className="text-muted-foreground font-medium">Enter your credentials to manage your inventory</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@motomatch.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-secondary/30 border-border/50 h-12 rounded-xl focus:ring-primary/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-secondary/30 border-border/50 h-12 rounded-xl focus:ring-primary/20"
              />
            </div>
          </CardContent>
          <CardFooter className="pt-6">
            <Button type="submit" className="w-full h-12 bg-primary hover:opacity-90 font-bold rounded-xl shadow-lg shadow-primary/20 transition-all">
              Sign In
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
