import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, LogOut } from 'lucide-react';

const AdminDashboard = () => {
  const { user, logout, isLoading: authLoading } = useAuth();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<any>(null);
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);

  const { data: vehicles, isLoading } = useQuery({
    queryKey: ['vehicles'],
    queryFn: async () => {
      const { data } = await api.get('/vehicles');
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: (newVehicle: any) => api.post('/vehicles', newVehicle),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      toast.success('Vehicle added successfully');
      setIsDialogOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, ...data }: any) => api.put(`/vehicles/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      toast.success('Vehicle updated successfully');
      setIsDialogOpen(false);
      setEditingVehicle(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/vehicles/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      toast.success('Vehicle deleted successfully');
    },
  });

  if (authLoading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;

  const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const { data } = await api.post('/upload', formData);
      setImage(data.image);
      setUploading(false);
      toast.success('Image uploaded');
    } catch (error) {
      console.error(error);
      setUploading(false);
      toast.error('Image upload failed');
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    // Use the uploaded image URL or the manual input
    data.image = image;
    
    // Convert numeric fields
    const numericFields = ['price', 'engineCC', 'mileage', 'powerBHP', 'torqueNM', 'weightKG', 'seatingCapacity', 'groundClearanceMM'];
    numericFields.forEach(field => {
      const val = data[field];
      data[field] = (val !== undefined && val !== '') ? Number(val) : 0;
    });

    if (editingVehicle) {
      updateMutation.mutate({ id: editingVehicle._id, ...data });
    } else {
      createMutation.mutate(data);
    }
  };

  return (
    <div className="container mx-auto p-8 pt-24 min-h-screen bg-mesh">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-black text-foreground tracking-tight">Admin <span className="text-primary">Dashboard</span></h1>
          <p className="text-muted-foreground font-medium mt-1">Manage your vehicle inventory and specifications.</p>
        </div>
        <div className="flex gap-3">
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) setEditingVehicle(null);
          }}>
            {user?.role === 'admin' && (
              <DialogTrigger asChild>
                <Button className="bg-primary hover:opacity-90 font-bold px-6 h-11 rounded-xl shadow-lg shadow-primary/20 transition-all">
                  <Plus className="mr-2 h-4 w-4" /> Add Vehicle
                </Button>
              </DialogTrigger>
            )}
            <DialogContent className="max-w-2xl glass-dialog border-primary/20 text-foreground p-8 max-h-[90vh] overflow-y-auto custom-scrollbar">
              <DialogHeader>
                <DialogTitle className="text-2xl font-black">{editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 pt-6">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Type</Label>
                  <Select name="vehicleType" defaultValue={editingVehicle?.vehicleType || "2W"}>
                    <SelectTrigger className="bg-secondary/30 border-border/50 h-11 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border text-foreground">
                      <SelectItem value="2W">Two Wheeler</SelectItem>
                      <SelectItem value="4W">Four Wheeler</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Brand</Label>
                  <Input name="brand" defaultValue={editingVehicle?.brand} required className="bg-secondary/30 border-border/50 h-11 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Model</Label>
                  <Input name="vehicleModel" defaultValue={editingVehicle?.vehicleModel} required className="bg-secondary/30 border-border/50 h-11 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Energy Type</Label>
                  <Select name="energyType" defaultValue={editingVehicle?.energyType || "Petrol"}>
                    <SelectTrigger className="bg-secondary/30 border-border/50 h-11 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border text-foreground">
                      <SelectItem value="Petrol">Petrol</SelectItem>
                      <SelectItem value="Electric">Electric</SelectItem>
                      <SelectItem value="Diesel">Diesel</SelectItem>
                      <SelectItem value="CNG">CNG</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Price (INR)</Label>
                  <Input name="price" type="number" defaultValue={editingVehicle?.price} required className="bg-secondary/30 border-border/50 h-11 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Engine CC</Label>
                  <Input name="engineCC" type="number" step="0.1" defaultValue={editingVehicle?.engineCC} required className="bg-secondary/30 border-border/50 h-11 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Mileage (kmpl)</Label>
                  <Input name="mileage" type="number" step="0.1" defaultValue={editingVehicle?.mileage} required className="bg-secondary/30 border-border/50 h-11 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Power (BHP)</Label>
                  <Input name="powerBHP" type="number" step="0.1" defaultValue={editingVehicle?.powerBHP} required className="bg-secondary/30 border-border/50 h-11 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Torque (NM)</Label>
                  <Input name="torqueNM" type="number" step="0.1" defaultValue={editingVehicle?.torqueNM} required className="bg-secondary/30 border-border/50 h-11 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Weight (KG)</Label>
                  <Input name="weightKG" type="number" step="0.1" defaultValue={editingVehicle?.weightKG} required className="bg-secondary/30 border-border/50 h-11 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Seating Capacity</Label>
                  <Input name="seatingCapacity" type="number" defaultValue={editingVehicle?.seatingCapacity} required className="bg-secondary/30 border-border/50 h-11 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Ground Clearance (MM)</Label>
                  <Input name="groundClearanceMM" type="number" defaultValue={editingVehicle?.groundClearanceMM} required className="bg-secondary/30 border-border/50 h-11 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Usage Type</Label>
                  <Select name="usageType" defaultValue={editingVehicle?.usageType || "daily"}>
                    <SelectTrigger className="bg-secondary/30 border-border/50 h-11 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border text-foreground">
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="sports">Sports</SelectItem>
                      <SelectItem value="cruiser">Cruiser</SelectItem>
                      <SelectItem value="adventure">Adventure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">External Link</Label>
                  <Input name="link" defaultValue={editingVehicle?.link} required className="bg-secondary/30 border-border/50 h-11 rounded-xl" placeholder="https://..." />
                </div>
                 <div className="space-y-2 col-span-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Upload Image</Label>
                  <Input 
                    type="file" 
                    onChange={uploadFileHandler} 
                    className="bg-secondary/30 border-border/50 h-11 rounded-xl" 
                  />
                  {uploading && <p className="text-xs text-primary animate-pulse">Uploading...</p>}
                </div>
                <div className="space-y-2 col-span-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Or Image URL</Label>
                  <Input 
                    name="image_url" 
                    value={image} 
                    onChange={(e) => setImage(e.target.value)} 
                    placeholder="https://example.com/car-image.jpg" 
                    className="bg-secondary/30 border-border/50 h-11 rounded-xl" 
                  />
                </div>
                <div className="col-span-2 pt-4">
                  <Button type="submit" className="w-full bg-primary h-12 font-bold rounded-xl shadow-lg shadow-primary/20">
                    {editingVehicle ? 'Update Vehicle' : 'Create Vehicle'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
          <Button variant="outline" onClick={logout} className="border-destructive/30 text-destructive hover:bg-destructive/5 font-bold h-11 px-6 rounded-xl transition-all">
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      </div>

      <div className="glass-card overflow-hidden border-primary/10">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-transparent">
              <TableHead className="text-xs font-bold uppercase tracking-widest text-muted-foreground py-6 pl-8">Vehicle</TableHead>
              <TableHead className="text-xs font-bold uppercase tracking-widest text-muted-foreground py-6">Type</TableHead>
              <TableHead className="text-xs font-bold uppercase tracking-widest text-muted-foreground py-6">Fuel</TableHead>
              <TableHead className="text-xs font-bold uppercase tracking-widest text-muted-foreground py-6">Price</TableHead>
              <TableHead className="text-right text-xs font-bold uppercase tracking-widest text-muted-foreground py-6 pr-8">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={5} className="text-center py-20 font-medium text-muted-foreground">Loading vehicles...</TableCell></TableRow>
            ) : vehicles?.map((vehicle: any) => (
              <TableRow key={vehicle._id} className="border-border/50 hover:bg-primary/5 transition-colors group">
                <TableCell className="py-5 pl-8">
                  <div className="font-bold text-foreground text-lg group-hover:text-primary transition-colors">{vehicle.brand} {vehicle.vehicleModel}</div>
                </TableCell>
                <TableCell className="py-5 text-muted-foreground font-medium">{vehicle.vehicleType === '2W' ? 'Two Wheeler' : 'Four Wheeler'}</TableCell>
                <TableCell className="py-5">
                  <span className="px-3 py-1 rounded-full bg-secondary/50 text-foreground text-xs font-bold border border-border/50">
                    {vehicle.energyType}
                  </span>
                </TableCell>
                <TableCell className="py-5 font-bold text-foreground">₹{vehicle.price.toLocaleString()}</TableCell>
                <TableCell className="text-right py-5 pr-8">
                  <div className="flex justify-end gap-2">
                    <Button size="icon" variant="ghost" className="hover:bg-primary/10 text-primary h-9 w-9 rounded-lg" onClick={() => {
                      setEditingVehicle(vehicle);
                      setImage(vehicle.image || '');
                      setIsDialogOpen(true);
                    }}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    {user?.role === 'admin' && (
                      <Button size="icon" variant="ghost" className="hover:bg-destructive/10 text-destructive h-9 w-9 rounded-lg" onClick={() => {
                        if (window.confirm('Are you sure you want to delete this vehicle?')) {
                          deleteMutation.mutate(vehicle._id);
                        }
                      }}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminDashboard;
