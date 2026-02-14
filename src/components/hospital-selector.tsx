'use client';

import {
  ChevronsUpDown,
  Building,
  Check,
} from 'lucide-react';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { hospitals } from '@/lib/data';

export function HospitalSelector() {
  const [open, setOpen] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(hospitals[0]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="flex w-full items-center justify-between p-0 hover:bg-transparent"
        >
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={selectedHospital.avatar} alt={selectedHospital.name} />
              <AvatarFallback>
                {selectedHospital.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div className="text-left">
              <div className="font-bold text-sm text-foreground">{selectedHospital.name}</div>
              <div className="text-xs text-muted-foreground">
                {selectedHospital.location}
              </div>
            </div>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-60 p-0">
        <Command>
          <CommandInput placeholder="Search hospital..." />
          <CommandList>
            <CommandEmpty>No hospital found.</CommandEmpty>
            <CommandGroup>
              {hospitals.map((hospital) => (
                <CommandItem
                  key={hospital.id}
                  value={hospital.name}
                  onSelect={(currentValue) => {
                    const hospital = hospitals.find(
                      (h) => h.name.toLowerCase() === currentValue.toLowerCase()
                    );
                    if (hospital) {
                      setSelectedHospital(hospital);
                    }
                    setOpen(false);
                  }}
                >
                  <Building className="mr-2 h-4 w-4" />
                  {hospital.name}
                  <Check
                    className={`ml-auto h-4 w-4 ${
                      selectedHospital.id === hospital.id
                        ? 'opacity-100'
                        : 'opacity-0'
                    }`}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
