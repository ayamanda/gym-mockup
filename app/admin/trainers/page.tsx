"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { toast } from "sonner";
import { Pencil, Trash } from "lucide-react";

interface Trainer {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  bio: string;
  image: string;
  social: {
    instagram: string;
    facebook: string;
    twitter: string;
  };
}

export default function TrainersPage() {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "trainers"));
      const trainersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Trainer[];
      setTrainers(trainersData);
    } catch (error) {
      console.error("Error fetching trainers:", error);
      toast.error("Failed to load trainers");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const trainerData = {
      name: formData.get("name"),
      specialty: formData.get("specialty"),
      experience: formData.get("experience"),
      bio: formData.get("bio"),
      image: formData.get("image"),
      social: {
        instagram: formData.get("instagram"),
        facebook: formData.get("facebook"),
        twitter: formData.get("twitter"),
      },
    };

    try {
      if (selectedTrainer) {
        await updateDoc(doc(db, "trainers", selectedTrainer.id), trainerData);
        toast.success("Trainer updated successfully");
      } else {
        await addDoc(collection(db, "trainers"), trainerData);
        toast.success("Trainer added successfully");
      }
      setIsDialogOpen(false);
      fetchTrainers();
    } catch (error) {
      console.error("Error saving trainer:", error);
      toast.error("Failed to save trainer");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this trainer?")) {
      try {
        await deleteDoc(doc(db, "trainers", id));
        toast.success("Trainer deleted successfully");
        fetchTrainers();
      } catch (error) {
        console.error("Error deleting trainer:", error);
        toast.error("Failed to delete trainer");
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-4">Trainer Management</h1>
          <p className="text-muted-foreground">
            Manage your fitness trainers and their profiles
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setSelectedTrainer(null)}>
              Add New Trainer
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedTrainer ? "Edit Trainer" : "Add New Trainer"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={selectedTrainer?.name}
                  required
                />
              </div>
              <div>
                <Label htmlFor="specialty">Specialty</Label>
                <Input
                  id="specialty"
                  name="specialty"
                  defaultValue={selectedTrainer?.specialty}
                  required
                />
              </div>
              <div>
                <Label htmlFor="experience">Experience</Label>
                <Input
                  id="experience"
                  name="experience"
                  defaultValue={selectedTrainer?.experience}
                  required
                />
              </div>
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  defaultValue={selectedTrainer?.bio}
                  required
                />
              </div>
              <div>
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  name="image"
                  defaultValue={selectedTrainer?.image}
                  required
                />
              </div>
              <div>
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  name="instagram"
                  defaultValue={selectedTrainer?.social.instagram}
                />
              </div>
              <div>
                <Label htmlFor="facebook">Facebook</Label>
                <Input
                  id="facebook"
                  name="facebook"
                  defaultValue={selectedTrainer?.social.facebook}
                />
              </div>
              <div>
                <Label htmlFor="twitter">Twitter</Label>
                <Input
                  id="twitter"
                  name="twitter"
                  defaultValue={selectedTrainer?.social.twitter}
                />
              </div>
              <Button type="submit" className="w-full">
                {selectedTrainer ? "Update Trainer" : "Add Trainer"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainers.map((trainer) => (
          <Card key={trainer.id} className="overflow-hidden">
            <div className="aspect-square relative">
              <img
                src={trainer.image}
                alt={trainer.name}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{trainer.name}</h3>
              <p className="text-primary font-medium mb-2">{trainer.specialty}</p>
              <p className="text-sm text-muted-foreground mb-4">
                {trainer.experience} experience
              </p>
              <p className="text-sm mb-4">{trainer.bio}</p>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    setSelectedTrainer(trainer);
                    setIsDialogOpen(true);
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDelete(trainer.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}