'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import useUserStore from '@/stores/UserStore';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export default function DashboardHeader() {
    const authUser = useUserStore((state) => state.user);
    return (
        <header className="flex justify-between items-center">
            <h3 className="text-2xl font-semibold tracking-tight">
                Welcome back, <span className="capitalize">{authUser.firstName}</span>
            </h3>
            <Tooltip>
                <TooltipContent className="capitalize">
                    {authUser.firstName} {authUser.lastName}
                </TooltipContent>
                <TooltipTrigger>
                    <Avatar>
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="John Doe" />
                        <AvatarFallback>
                            {authUser.firstName
                                ?.at(0)
                                ?.toUpperCase()
                                ?.concat(authUser.lastName.at(0)?.toUpperCase() || '')}
                        </AvatarFallback>
                    </Avatar>
                </TooltipTrigger>
            </Tooltip>
        </header>
    );
}
