namespace SignalR.Web.SD
{
    public static class Roles
    {
        public const string Marine = "marine";
        public const string Pirate = "pirate";
        public const string Government = "government";

        public static Dictionary<string, int> RoleInWorld;

        static Roles()
        {
            RoleInWorld = new Dictionary<string, int>();

            RoleInWorld.Add(Marine, 0);
            RoleInWorld.Add(Pirate, 0);
            RoleInWorld.Add(Government, 0);
        }

    }
}
