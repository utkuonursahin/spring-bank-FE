import { create } from 'zustand';
import { UserDto } from '@/dto/UserDto';
import { persist } from 'zustand/middleware';

interface UserStore {
    user: UserDto;
    setUser: (user: UserDto) => void;
}

const useUserStore = create(
    persist<UserStore>(
        (set, get) => ({
            user: {} as UserDto,
            setUser: (user: UserDto) => set({ user })
        }),
        { name: 'auth-user' }
    )
);

export default useUserStore;
