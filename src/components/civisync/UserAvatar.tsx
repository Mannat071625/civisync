import { useAuth } from "@/hooks/useAuth";

export function UserAvatar() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="grid h-10 w-10 place-items-center rounded-full bg-gray-300 text-sm font-semibold">
        ?
      </div>
    );
  }

  if (user.photoURL) {
    return (
      <img
        src={user.photoURL}
        alt={user.displayName ?? "User"}
        className="h-10 w-10 rounded-full object-cover"
      />
    );
  }

  const initials =
    user.displayName?.charAt(0).toUpperCase() ??
    "G";

  return (
    <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-primary to-info text-sm font-semibold text-primary-foreground">
      {initials}
    </div>
  );
}