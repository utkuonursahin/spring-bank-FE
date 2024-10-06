import { Card, CardContent, CardHeader } from '@/components/ui/card';

type InfoCardProps = {
    children: React.ReactNode;
};

export default function InfoCard({ children }: InfoCardProps) {
    return <Card>{children}</Card>;
}

InfoCard.Header = ({ children }: InfoCardProps) => {
    return <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">{children}</CardHeader>;
};

InfoCard.Body = ({ children }: InfoCardProps) => {
    return <CardContent>{children}</CardContent>;
};
