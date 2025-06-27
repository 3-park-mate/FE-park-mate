'use client';
import { useState } from 'react';
import { Pencil } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/components/base/dialog';
import { Button } from '@repo/ui/components/base/button';
import { Input } from '@repo/ui/components/base/input';

export default function EditableNameModal({
  initialName,
}: {
  initialName: string;
}) {
  const [name, setName] = useState(initialName);
  const [newName, setNewName] = useState(initialName);

  const handleNameChange = () => {
    setName(newName);
  };

  return (
    <div className="flex items-center gap-1">
      <h1 className="text-2xl font-bold">{name}</h1>
      <Dialog>
        <DialogTrigger asChild>
          <button
            type="button"
            className="text-white p-1.5 rounded-lg cursor-pointer"
          >
            <Pencil size={18} />
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>이름 변경</DialogTitle>
          </DialogHeader>
          <Input value={newName} onChange={(e) => setNewName(e.target.value)} />
          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={handleNameChange}>확인</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
