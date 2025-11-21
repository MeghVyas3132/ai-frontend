import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Activity {
  id: string;
  user: string;
  action: string;
  time: string;
  type: "join" | "update" | "leave";
}

const activities: Activity[] = [
  { id: "1", user: "Sarah Johnson", action: "joined the team", time: "2 hours ago", type: "join" },
  { id: "2", user: "Mike Peters", action: "updated profile information", time: "4 hours ago", type: "update" },
  { id: "3", user: "Emma Wilson", action: "completed onboarding", time: "5 hours ago", type: "update" },
  { id: "4", user: "David Brown", action: "joined the team", time: "1 day ago", type: "join" },
];

const RecentActivity = () => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getTypeColor = (type: Activity["type"]) => {
    switch (type) {
      case "join":
        return "bg-success/10 text-success";
      case "update":
        return "bg-primary/10 text-primary";
      case "leave":
        return "bg-destructive/10 text-destructive";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3">
            <Avatar className="h-9 w-9">
              <AvatarFallback className={getTypeColor(activity.type)}>
                {getInitials(activity.user)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <p className="text-sm">
                <span className="font-medium">{activity.user}</span>{" "}
                <span className="text-muted-foreground">{activity.action}</span>
              </p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
