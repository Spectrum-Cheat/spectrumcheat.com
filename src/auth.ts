import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";

const GUILD_ID = process.env.DISCORD_GUILD_ID!;
const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN!;

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Discord({
      authorization: {
        params: {
          scope: "identify email guilds.join",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account?.access_token) {
        token.accessToken = account.access_token;
        token.discordId = account.providerAccountId;
        // Discord profile fields
        const p = profile as Record<string, string> | undefined;
        token.discordUsername = p?.username ?? null;
        token.discordGlobalName = p?.global_name ?? p?.username ?? null;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.discordId = token.discordId as string;
      session.user.accessToken = token.accessToken as string;
      session.user.discordUsername = token.discordUsername as string | null;
      session.user.discordGlobalName = token.discordGlobalName as string | null;
      return session;
    },
    async signIn({ account }) {
      if (account?.provider === "discord" && account.access_token) {
        await autoJoinGuild(account.providerAccountId, account.access_token);
      }
      return true;
    },
  },
});

async function autoJoinGuild(userId: string, accessToken: string) {
  try {
    await fetch(`https://discord.com/api/v10/guilds/${GUILD_ID}/members/${userId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bot ${BOT_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ access_token: accessToken }),
    });
  } catch {
    // ไม่ block login ถ้า join ไม่ได้
  }
}
